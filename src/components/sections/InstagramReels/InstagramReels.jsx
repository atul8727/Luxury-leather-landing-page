"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";
import {
  REELS_EYEBROW,
  REELS_TITLE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
} from "@/data/reels";

import ReelCard from "./ReelCard";
import ReelModal from "./ReelModal";

// Card widths: mobile ~1.3 cards, tablet (sm 2, md 3), desktop (lg/xl 4) (gap = 16px)
const CARD_W =
  "w-[76%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-48px)/4)]";

export default function InstagramReels({
  eyebrow = REELS_EYEBROW,
  title = REELS_TITLE,
  items = [],
}) {
  const railRef = useRef(null);
  const scrollRafRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Optimized arrow update: only changes state when disabled status actually toggles
  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const nextPrev = el.scrollLeft > 6;
    const nextNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 6;
    setCanPrev((prev) => (prev !== nextPrev ? nextPrev : prev));
    setCanNext((prev) => (prev !== nextNext ? nextNext : prev));
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      updateArrows();
    });
  }, [updateArrows]);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => {
      window.removeEventListener("resize", updateArrows);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [updateArrows, items]);

  const scrollByDir = (dir) => {
    const el = railRef.current;
    if (!el) return;
    // Smooth scroll by ~80% of visible width
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const handleOpen = (reel, index) => {
    setActiveIndex(index);
  };

  const closeModal = useCallback(() => setActiveIndex(null), []);

  const hasItems = items && items.length > 0;

  return (
    <section id="instagram" className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        {hasItems ? (
          <div className="relative mt-12">
            {/* Prev arrow */}
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              disabled={!canPrev}
              aria-label="Previous reels"
              className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navbar text-navbar-text shadow-md transition hover:bg-[#4f372d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-navbar disabled:pointer-events-none disabled:opacity-0 sm:flex cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              disabled={!canNext}
              aria-label="Next reels"
              className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navbar text-navbar-text shadow-md transition hover:bg-[#4f372d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-navbar disabled:pointer-events-none disabled:opacity-0 sm:flex cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Ultra-smooth hardware-accelerated horizontal scroll rail */}
            <div
              ref={railRef}
              onScroll={handleScroll}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-2 sm:mx-0 sm:px-0 overscroll-x-contain [will-change:scroll-position] transform-gpu"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {items.map((reel, index) => (
                <div
                  key={reel.id}
                  data-card-id={String(reel.id)}
                  className={`${CARD_W}`}
                >
                  <ReelCard
                    reel={reel}
                    onOpen={() => handleOpen(reel, index)}
                    isPaused={activeIndex !== null}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-12 text-center text-ink-soft">
            Our latest reels are on Instagram. Come and say hi!
          </p>
        )}

        {/* Follow button */}
        <div className="mt-10 flex justify-center">
          <Button
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramGlyph size={16} />
            <span>Follow {INSTAGRAM_HANDLE}</span>
          </Button>
        </div>
      </Container>

      {/* Lightbox Modal Player with Left/Right navigation */}
      {activeIndex !== null && (
        <ReelModal
          items={items}
          initialIndex={activeIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
}