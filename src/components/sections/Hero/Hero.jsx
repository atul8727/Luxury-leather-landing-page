import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SocialRail from "./SocialRail";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navbar pt-[76px] lg:pt-[84px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Artisan hand-finishing a restored leather sneaker"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#241813]/55" />
      </div>

      <Container className="relative flex min-h-[560px] flex-col items-center justify-center py-20 text-center sm:min-h-[620px] lg:min-h-[680px] lg:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block text-[13px] font-medium tracking-[0.2em] text-navbar-text/75 uppercase">
            {SITE.name}
          </span>
          <h1 className="font-display text-[36px] leading-[1.08] text-navbar-text sm:text-[48px] lg:text-[58px]">
            Bring Your Favourite Pieces Back to Life.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-navbar-text/85">
            Expert leather cleaning, repair, restoration and protection for furniture and
            cherished leather pieces carefully restored to look and feel their best.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="#contact" variant="light">
              Get a Free Quote
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
            <Button href="#before-after" variant="outlineLight">
              View Transformations
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </Container>

      <SocialRail />
    </section>
  );
}