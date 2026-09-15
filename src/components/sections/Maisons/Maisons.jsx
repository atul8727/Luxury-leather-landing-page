import Image from "next/image";
import Container from "@/components/ui/Container";
import { MAISONS } from "@/data/maisons";

function MaisonIcon({ className = "" }) {
  return (
    <div className={`relative h-8 w-8 ${className}`}>
      <Image
        src="/icons/Vector.png"
        alt=""
        fill
        sizes="24px"
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

export default function Maisons() {
  return (
    <section className="bg-[#FFF8F2] py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center px-4 text-center sm:px-0">
          <MaisonIcon className="mb-3" />
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Maisons We Restore
          </p>
          <h2
            className="mx-auto mt-2 w-full max-w-[791px] text-center uppercase"
            style={{
              fontFamily: "'Roboto Slab', serif",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 6vw, 3.125rem)", // ~28px mobile -> 50px desktop
              lineHeight: "1.2",
              letterSpacing: "0%",
              color: "#614338",
            }}
          >
            The Shoe Atelier Catalogue
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {MAISONS.map((brand) => (
            <div
              key={brand.id}
              className="relative aspect-square w-full max-w-[340px] justify-self-center overflow-hidden rounded-[20px] border border-ink/10 bg-white"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}