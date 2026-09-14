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
        <div className="flex flex-col items-center text-center">
          <MaisonIcon className="mb-3" />
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Maisons We Restore
          </p>
          <h2
            className="mx-auto mt-2 text-center uppercase"
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
              {/* <span
                className="absolute left-4 top-4 font-display text-[13px] font-bold uppercase tracking-wide"
                style={{ color: "#614338" }}
              >
                {brand.name}
              </span> */}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}