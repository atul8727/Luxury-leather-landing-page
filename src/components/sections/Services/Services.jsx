import Container from "@/components/ui/Container";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";
import Image from "next/image";

const CARD_GRADIENT = "linear-gradient(180deg, #FFF2E6 0%, #FFE5CD 50%, #FFF2E6 100%)";

export default function Services() {
  const [intro, ...cards] = SERVICES;

  return (
    <section id="services" className="bg-cream" style={{ background: "#FFF2E6" }}>
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* Vector Icon Image from public/icons/Vector.png */}
          <div className="relative mx-auto h-6 w-10">
            <Image
              src="/icons/Vector.png"
              alt="Shoe Icon"
              fill
              className="object-contain"
            />
          </div>

          <span className="mt-3 inline-block text-[13px] font-medium tracking-[0.18em] text-ink-soft uppercase">
            {intro.tag}
          </span>
          
          <h2 
            className="mt-4 font-display text-[28px] leading-[1.15] sm:text-[34px] lg:text-[40px]"
            style={{ color: "#614338" }}
          >
            {intro.title}
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{intro.description}</p>
          <p className="mt-6 text-[15px] font-semibold text-ink">
            Book your appointment today and experience the difference a premium shoe care service
            can make.
          </p>
        </div>
      </Container>

      <div>
        {cards.map((service, index) => (
          <div
            key={service.id}
            className={index !== 0 ? "border-t border-ink/10" : ""}
            style={{ background: CARD_GRADIENT }}
          >
            <Container>
              <ServiceCard service={service} index={index} />
            </Container>
          </div>
        ))}
      </div>
    </section>
  );
}