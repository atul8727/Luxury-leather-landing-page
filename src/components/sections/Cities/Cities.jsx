import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CITIES } from "@/data/cities";
import CityCard from "./CityCard";

export default function Cities() {
  return (
    <section id="cities" className="bg-maisons py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Where We Work"
          title="Serving Leather Lovers Across India"
          description="From metros to growing cities, our pickup, restoration and delivery network keeps expert leather care within reach wherever you are."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CITIES.map((city) => (
            <CityCard key={city} name={city} />
          ))}
        </div>
      </Container>
    </section>
  );
}
