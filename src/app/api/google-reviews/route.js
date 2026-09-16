import { NextResponse } from 'next/server';

const OUTSCRAPER_URL = 'https://api.outscraper.cloud/requests/NGYzNTgyYzEyOGNkNGNmNWFlZmVmMjMyMzE3M2NmNGUsMjAyNjA5MTYxMjU5NTdzODUxYQ';

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
        { status: response.status },
      );
    }

    const data = await response.json();

    console.log('Outscraper Response:', data);

    /*
     * Outscraper response contains review information
     * in the returned rows themselves.
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
     * Keep only objects that actually contain review information.
     */
    const reviewRows = rows.filter(
      (item) => item && typeof item === 'object' && (item.review_id || item.review_pagination_id || item.author_title || item.review_rating),
    );

    const reviews = reviewRows.map((review, index) => ({
      id: review.review_id || review.review_pagination_id || `review-${index}`,

      name: review.author_title || 'Google Customer',

      avatar: review.author_image || null,

      text: review.review_text || '',

      rating: Number(review.review_rating || 0),

      relativeTime: review.review_datetime_utc || '',

      publishTime: review.review_datetime_utc || '',

      authorUri: review.author_link || null,

      reviewLink: review.review_link || null,

      reviewImage: review.review_img_url || null,

      reviewImages: Array.isArray(review.review_img_urls) ? review.review_img_urls : [],

      ownerAnswer: review.owner_answer || null,

      likes: Number(review.review_likes || 0),
    }));

    /*
     * Get business information from the first available row.
     */
    const business = rows.find((item) => item && typeof item === 'object' && item.name === 'Luxury Leather and Furniture Care') || rows[0] || {};

    const totalReviews = Number(business.reviews_count || business.reviews || business.user_ratings_total || 0);

    return NextResponse.json({
      success: true,

      place: {
        id: business.place_id || null,

        name: business.name || 'Luxury Leather and Furniture Care',

        rating: Number(business.rating || 0),

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
        error: error.message,
      },
      { status: 500 },
    );
  }
}
