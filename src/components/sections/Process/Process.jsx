import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/data/process";

function ProcessIcon({ className = "" }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image
        src="/icons/Vector.png"
        alt=""
        fill
        sizes="42px"
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

// Default = shoes (4 steps, home page "/").
// /bags par 3 steps props se aate hain aur center mein dikhte hain.
export default function Process({ steps = PROCESS_STEPS }) {
  const isThree = steps.length === 3;

  // 4 steps: purana grid (bilkul unchanged).
  // 3 steps: flex + center, card size 4-step wale ke barabar.
  const wrapperClass = isThree
    ? "mx-auto mt-12 flex max-w-[1115px] flex-wrap justify-center gap-10 lg:gap-8"
    : "mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8";

  const itemClass = isThree
    ? "flex w-full flex-col sm:w-[calc(50%-20px)] lg:w-[calc((100%-64px)/3)]"
    : "flex flex-col";

  return (
    <section
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, #FFF2E6 0%, #FFE5CD 50%, #FFF2E6 100%)",
      }}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <ProcessIcon className="mb-2" />
          <SectionHeading eyebrow={`${steps.length} Easy Steps`} />
        </div>
        <h2
          className="mx-auto w-full max-w-[791px] px-4 text-center uppercase sm:px-0"
          style={{
            fontFamily: "'Roboto Slab', serif",
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 6vw, 3.125rem)", // ~28px mobile -> 50px desktop
            lineHeight: "1.2",
            letterSpacing: "0%",
            color: "#614338",
          }}
        >
          Your Restoration Journey, Made Simple
        </h2>

        <div className={wrapperClass}>
          {steps.map((step) => (
            <div key={step.number} className={itemClass}>
              <div className="relative aspect-square overflow-hidden rounded-[20px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-tl-[20px] rounded-br-[16px] bg-[#69483C] font-display text-[16px] font-semibold text-[#FFE6D1]">
                  {step.number}
                </span>
              </div>
              <h3
                className="mt-5 font-display text-[19px] font-bold uppercase tracking-wide"
                style={{ color: "#614338" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2 text-[14px] leading-relaxed"
                style={{ color: "#101010" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}