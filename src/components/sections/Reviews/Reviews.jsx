import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { REVIEWS } from "@/data/reviews";
import ReviewCard from "./ReviewCard";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-maisons py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-[13px] font-medium tracking-[0.16em] text-ink-soft uppercase">
            Customers Love Us
          </span>
          <h2 className="font-display text-[28px] leading-[1.15] text-ink sm:text-[34px] lg:text-[40px]">
            What Our Customers Say
          </h2>
          <Badge>5.0 &nbsp;|&nbsp; 286 reviews</Badge>
        </div>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <div key={review.id} className="min-w-[280px] sm:min-w-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
