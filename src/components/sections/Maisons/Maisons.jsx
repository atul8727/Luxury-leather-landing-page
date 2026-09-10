import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section className="bg-maisons py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center text-center">
          <MaisonIcon className="mb-3" />
          <SectionHeading
            eyebrow="The Shoe Atelier Catalogue"
            title="Maisons We Restore"
            description="From heritage houses to contemporary designers, our artisans understand the construction and finish of every maison we work with."
          />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {MAISONS.map((brand) => (
            <div
              key={brand.id}
              className="group relative aspect-square w-full max-w-[340px] justify-self-center overflow-hidden rounded-[20px] border border-ink/10 bg-white"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(min-width: 768px) 22vw, 45vw"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}