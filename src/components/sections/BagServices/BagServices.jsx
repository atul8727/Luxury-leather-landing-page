import Container from "@/components/ui/Container";
import { BAG_SERVICES, BAG_SERVICES_FOOTER_TEXT } from "@/data/bagServices";
import ServiceCard from "@/components/sections/Services/ServiceCard";
import Image from "next/image";

const CARD_GRADIENT = "linear-gradient(180deg, #FFF2E6 0%, #FFE5CD 50%, #FFF2E6 100%)";

function ShoeIcon({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/icons/Vector.png"
        alt=""
        fill
        sizes="32px"
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

// Same layout as the default Services section, but with bags content/images.
export default function BagServices() {
  const [intro, ...cards] = BAG_SERVICES;

  return (
    <section id="services" className="bg-cream" style={{ background: "#FFF2E6" }}>
      {/* Heading area — same gradient as the cards */}
      <div style={{ background: CARD_GRADIENT }}>
        <Container className="py-20 lg:py-28">
          <div className="mx-auto max-w-5xl text-center">
            <ShoeIcon className="mx-auto h-5 w-8 text-gold" />
            <span
              className="mt-3 inline-block text-[13px] font-medium tracking-[0.18em] uppercase"
              style={{ color: "#614338" }}
            >
              {intro.tag}
            </span>
            <h2
              className="mt-4 font-display text-[28px] leading-[1.15] uppercase sm:text-[34px] lg:text-[40px]"
              style={{ color: "#614338" }}
            >
              {intro.title}
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#101010" }}>
              {intro.description}
            </p>
            <p className="mt-6 text-[15px] font-semibold" style={{ color: "#101010" }}>
              {BAG_SERVICES_FOOTER_TEXT}
            </p>
          </div>
        </Container>
      </div>

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