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
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <ProcessIcon className="mb-2" />
          <SectionHeading
            eyebrow="4 Easy Steps"
            title="Your Restoration Journey, Made Simple"
          />
        </div>

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
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/90 font-display text-[14px] text-ink">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[19px] text-ink">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}