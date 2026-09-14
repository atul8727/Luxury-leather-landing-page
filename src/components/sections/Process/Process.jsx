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

export default function Process() {
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
          <SectionHeading
            eyebrow="4 Easy Steps"
           
          />
        </div>
        <h2
  className="mx-auto text-center uppercase"
  style={{
    fontFamily: "'Roboto Slab', serif",
    fontWeight: 700,
    fontSize: "50px",
    lineHeight: "60px",
    letterSpacing: "0%",
    color: "#614338",
    width: "791px",
    maxWidth: "100%",
  }}
>
  Your Restoration Journey, Made Simple
</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="flex flex-col">
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