"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState } from "react";

function GoogleG() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.5 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-2.1 14.2-5.6l-6.6-5.6c-2 1.5-4.6 2.4-7.6 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.6C41.6 36.2 44 30.6 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`flex w-full flex-col rounded-[19px] bg-white px-5 py-5 text-[#1D1D1D] transition-shadow duration-300 hover:shadow-xl sm:px-5 ${
        expanded ? "min-h-[270px]" : "h-[270px]"
      }`}
    >
      {/* Customer */}
      <div className="flex items-center gap-[14px]">
        {/* Keep badge outside overflow-hidden avatar */}
        <div className="relative h-10 w-10 shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#F1ECE8]">
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          <span className="absolute -bottom-[2px] -right-[3px] z-10 flex h-[17px] w-[17px] items-center justify-center rounded-full bg-white p-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.18)]">
            <GoogleG />
          </span>
        </div>

        <h3 className="font-inter text-[14px] font-semibold leading-5 text-[#252525]">
          {review.name}
        </h3>
      </div>

      {/* Rating */}
      <div
        className="mt-[17px] flex items-center gap-[1px] text-[#F9B800]"
        aria-label={`${review.rating || 5} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={14}
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Review */}
      <p
        className={`mt-[11px] font-inter text-[15px] font-normal leading-[1.7] text-[#1E1E1E] ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {review.text}
      </p>

      {/* Read more */}
      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        className={`self-start font-inter text-[14px] font-normal text-[#969696] transition-colors duration-200 hover:text-[#755244] ${
          expanded ? "mt-4" : "mt-auto pt-2"
        }`}
        aria-expanded={expanded}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </article>
  );
}