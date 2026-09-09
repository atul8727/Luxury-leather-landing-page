import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-navbar py-20 lg:py-24">
      <div className="absolute inset-0">
        <Image
          src="/images/cta/cta-bag.jpg"
          alt="Restored leather bag ready for delivery"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl font-display text-[28px] leading-[1.2] text-navbar-text sm:text-[36px] lg:text-[42px]">
          Ready to Restore Your Favourite Pair?
        </h2>
        <Button href="#contact" variant="light">
          Get a Free Quote
        </Button>
      </Container>
    </section>
  );
}
