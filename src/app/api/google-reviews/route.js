import { NextResponse } from 'next/server';

const OUTSCRAPER_URL = 'https://api.outscraper.cloud/requests/NGYzNTgyYzEyOGNkNGNmNWFlZmVmMjMyMzE3M2NmNGUsMjAyNjA5MTYxMjU5NTdzODUxYQ';

/**
 * Clean HTML / encoded HTML from review text
 */
function cleanReviewText(value) {
  if (!value) return '';

  return (
    String(value)
      // Decode common HTML entities
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&#x27;/gi, "'")

      // Remove <br>, <br/>, <br /> etc.
      .replace(/<br\s*\/?>/gi, ' ')

      // Remove any remaining HTML tags
      .replace(/<[^>]*>/g, ' ')

      // Remove extra whitespace
      .replace(/\s+/g, ' ')

      .trim()
  );
}

/**
 * Clean normal string values
 */
function cleanString(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).trim();
}

/**
 * Convert value safely to number
 */
function safeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

export async function GET() {
  try {
    const response = await fetch(OUTSCRAPER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error('Outscraper API Error:', errorText);

      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch reviews from Outscraper',
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    /*
     * Outscraper response can have different structures.
     * Normalize everything into an array.
     */
    let rows = [];

    if (Array.isArray(data)) {
      rows = data.flat(Infinity);
    } else if (Array.isArray(data?.data)) {
      rows = data.data.flat(Infinity);
    } else if (data?.data && typeof data.data === 'object') {
      rows = [data.data];
    } else if (data && typeof data === 'object') {
      rows = [data];
    }

    /*
     * Keep only objects that contain actual review information.
     */
    const reviewRows = rows.filter(
      (item) => item && typeof item === 'object' && (item.review_id || item.review_pagination_id || item.author_title || item.review_rating),
    );

    /*
     * Convert Outscraper reviews into our frontend format.
     */
    const reviews = reviewRows.map((review, index) => ({
      id: review.review_id || review.review_pagination_id || `review-${index}`,

      name: cleanString(review.author_title) || 'Google Customer',

      avatar: review.author_image || null,

      /*
       * IMPORTANT:
       * Remove <br>, HTML tags and HTML entities.
       */
      text: cleanReviewText(review.review_text),

      rating: safeNumber(review.review_rating),

      relativeTime: cleanString(review.review_datetime_utc),

      publishTime: cleanString(review.review_datetime_utc),

      authorUri: review.author_link || null,

      reviewLink: review.review_link || null,

      reviewImage: review.review_img_url || null,

      reviewImages: Array.isArray(review.review_img_urls) ? review.review_img_urls.filter(Boolean) : [],

      ownerAnswer: review.owner_answer ? cleanReviewText(review.owner_answer) : null,

      likes: safeNumber(review.review_likes),
    }));

    /*
     * Find business information.
     */
    const business = rows.find((item) => item && typeof item === 'object' && item.name === 'Luxury Leather and Furniture Care') || rows[0] || {};

    const totalReviews = safeNumber(business.reviews_count || business.reviews || business.user_ratings_total);

    return NextResponse.json({
      success: true,

      place: {
        id: business.place_id || null,

        name: cleanString(business.name) || 'Luxury Leather and Furniture Care',

        rating: safeNumber(business.rating),

        userRatingCount: totalReviews,

        totalReviews: totalReviews,

        reviewsLink: business.reviews_link || null,

        googleMapsUri: business.location_link || null,
      },

      reviews,
    });
  } catch (error) {
    console.error('Outscraper Reviews Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while fetching Google reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      },
    );
  }
}
