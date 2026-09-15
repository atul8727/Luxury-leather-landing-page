import Image from "next/image";

import { REVIEWS } from "@/data/reviews";
import ReviewCard from "./ReviewCard";

function TestimonialIcon({ className = "" }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image
        src="/icons/Vector.png"
        alt=""
        fill
        sizes="42px"
        className="object-contain brightness-0 invert"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="bg-[#755244] py-[88px] sm:py-[100px] lg:py-[116px]"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 xl:px-0">
        {/* Heading */}
        <div className="flex flex-col items-center text-center text-[#FFE6D1]">
          <TestimonialIcon />

          <p className="mt-2 font-inter text-[14px] font-medium uppercase leading-none tracking-[0.02em] sm:text-[16px]">
            Customer Love Us
          </p>

          <h2 className="mt-[18px] font-display text-[34px] font-bold uppercase leading-[1.08] tracking-[-0.01em] sm:text-[42px] lg:text-[52px]">
            What Our Customers Say
          </h2>
        </div>

        {/* Google rating bar - matches grid width with centered image */}
        <div className="mt-[70px] flex h-[72px] w-full items-center justify-center rounded-[12px] bg-white px-6 shadow-md">
          <div className="relative h-[30px] w-[240px]">
            <Image
              src="/images/reviews/Group 47.png"
              alt="Google 5.0 Rating & Reviews"
              fill
              sizes="240px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Review cards - horizontal scroll on mobile, grid from sm up */}
        <div
          className="
            mt-[29px]
            -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-[26px] sm:gap-y-[30px] sm:overflow-visible sm:px-0 sm:pb-0
            xl:grid-cols-4
          "
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="w-[85%] shrink-0 snap-start sm:w-auto sm:shrink"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}