import Container from "@/components/ui/Container";

function ShoeIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 20"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 14.5c0-3 2.6-5.8 6-6.6 1.4-2.4 3.9-4.4 6.6-4.9.7-.1 1.3.5 1.1 1.2l-.8 3c3.2.3 6.4 1.6 8.6 3.6.9.8.4 2.2-.8 2.2H6.2C4.9 13 4 13.6 4 14.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M4 14.5c0 1.4 1.3 2.5 3 2.5h18c1.7 0 3-.9 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14 9.3c2.6.5 5 1.7 6.6 3.3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function About() {
  return (
    <section id="about-us" className="bg-[#FFF2E6] py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <ShoeIcon className="mx-auto h-5 w-8 text-gold" />

          <span className="mt-3 inline-block text-[13px] font-medium tracking-[0.18em] text-ink-soft uppercase">
         SHoes Services
          </span>

          <h2 className="mt-4 font-display text-[28px] leading-[1.15] text-ink sm:text-[34px] lg:text-[40px]">
           Best Shoes Cleaning and Repair Service
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
           Restore the original charm of your favorite footwear with our expert shoes cleaning 
           service and shoes repair service. Whether your shoes are stained, discolored, or
            showing signs of wear and tear, our skilled team uses advanced techniques and 
            premium products to deliver outstanding results. As seen in the transformation above,
             we bring dull and damaged shoes back to life—leaving them looking fresh, clean, 
             and nearly new. At our facility, every pair receives personalized care and attention to 
             detail. From deep cleaning and stain removal to material restoration and repairs, we ensure 
             your shoes are treated with the highest standards of craftsmanship. Perfect for sneakers, 
             designer footwear, and everyday wear, our services are trusted by those
            who value quality and longevity. Give your shoes a second life with professionals who care.
          </p>

          <p className="mt-6 text-[15px] font-semibold text-ink">
         Book your appointment today and experience the difference a premium shoe care service can make.
          </p>
        </div>
      </Container>
    </section>
  );
}