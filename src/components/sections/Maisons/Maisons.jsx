import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MAISONS } from "@/data/maisons";

export default function Maisons() {
  return (
    <section className="bg-maisons py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Shoe Atelier Catalogue"
          title="Maisons We Restore"
          description="From heritage houses to contemporary designers, our artisans understand the construction and finish of every maison we work with."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {MAISONS.map((brand) => (
            <div
              key={brand.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10"
            >
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                sizes="(min-width: 1024px) 14vw, 45vw"
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
