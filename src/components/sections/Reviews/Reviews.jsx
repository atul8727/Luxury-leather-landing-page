'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import ReviewCard from './ReviewCard';

function TestimonialIcon({ className = '' }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image src="/icons/Vector.png" alt="" fill sizes="42px" className="object-contain brightness-0 invert" aria-hidden="true" />
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div className="w-[85%] shrink-0 sm:w-auto">
      <div className="h-[230px] animate-pulse rounded-[12px] bg-white/20" />
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/google-reviews', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await response.json();

        // console.log('Google Reviews:', data);

        if (data.success) {
          setReviews(data.reviews || []);
          setPlace(data.place || null);
        }
      } catch (error) {
        console.error('Reviews fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="bg-[#755244] py-[88px] sm:py-[100px] lg:py-[116px]">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 xl:px-0">
        {/* Heading */}
        <div className="flex flex-col items-center text-center text-[#FFE6D1]">
          <TestimonialIcon />

          <p className="mt-2 font-inter text-[14px] font-medium uppercase leading-none tracking-[0.02em] sm:text-[16px]">Customer Love Us</p>

          <h2 className="mt-[18px] font-display text-[34px] font-bold uppercase leading-[1.08] tracking-[-0.01em] sm:text-[42px] lg:text-[52px]">
            What Our Customers Say
          </h2>
        </div>

        {/* Google Rating */}
        <div className="mt-[70px] flex h-[72px] w-full items-center justify-center rounded-[12px] bg-white px-6 shadow-md">
          {place ? (
            <div className="flex items-center justify-center">
              <div className="relative h-[30px] w-[240px]">
                <Image src="/images/reviews/Group 47.png" alt="Google Rating & Reviews" fill sizes="240px" className="object-contain" />
              </div>
            </div>
          ) : (
            <div className="relative h-[30px] w-[240px]">
              <Image src="/images/reviews/Group 47.png" alt="Google Rating & Reviews" fill sizes="240px" className="object-contain" />
            </div>
          )}
        </div>

        {/* Reviews */}
        <div
          className="
            mt-[29px]
            -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-[26px] sm:gap-y-[30px]
            sm:overflow-visible sm:px-0 sm:pb-0
            xl:grid-cols-4
          "
        >
          {loading ? (
            <>
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
            </>
          ) : reviews.length > 0 ? (
            reviews.slice(0, 12).map((review) => (
              <div key={review.id || review.review_id} className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink">
                <ReviewCard review={review} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-white">No reviews available.</div>
          )}
        </div>

        {/* Google Reviews Link */}
        {place?.reviewsLink && (
          <div className="mt-[42px] flex justify-center">
            <a
              href={place.reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
        inline-flex items-center gap-2
        rounded-full
        border border-[#FFE6D1]/60
        bg-transparent
        px-6 py-3
        font-inter text-[14px] font-medium
        text-[#FFE6D1]
        transition-all duration-300
        hover:bg-[#FFE6D1]
        hover:text-[#755244]
      "
            >
              View All Reviews on Google
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
