import Image from "next/image";
import { Briefcase, Footprints, Sofa, Shirt } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/data/moreServices";

const ICONS = { Bags: Briefcase, Shoes: Footprints, Sofa: Sofa, Jackets: Shirt };

export default function MoreServices() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="More Of Our Services"
          title="Clean, Repair, Restoration and Customisation Service Available For"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.title] || Briefcase;
            return (
              <div
                key={cat.id}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-5 py-7 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-2 text-ink">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <span className="font-display text-[17px] text-ink">{cat.title}</span>
                <span className="text-[12.5px] text-ink-soft">{cat.subtitle}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]">
            <Image
              src="/images/bag/bag-restoration.jpg"
              alt="Restored luxury leather handbag"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-display text-[24px] leading-snug text-ink sm:text-[28px]">
              Bag Cleaning Service and Bag Repair Service
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
              Restore the beauty and elegance of your favourite leather bags with our expert
              cleaning and repair solutions. From deep cleaning and conditioning to colour
              touch-ups and precision repairs, we bring back their original charm while
              protecting them for years to come. Loved and trusted by clients across India, we
              deliver artistry, attention, and a touch of royalty with every restoration.
            </p>
            <Button href="#contact" variant="primary" className="mt-7">
              Get a Free Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
