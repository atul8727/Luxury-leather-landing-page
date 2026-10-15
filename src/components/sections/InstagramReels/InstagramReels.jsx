"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";
import {
  REELS,
  REELS_EYEBROW,
  REELS_TITLE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_REELS_URL,
} from "@/data/reels";

import ReelCard from "./ReelCard";
import ReelModal from "./ReelModal";

// Card widths: mobile ~1.3 cards, tablet (sm 2, md 3), desktop (lg/xl 4) (gap = 16px)
const CARD_W =
  "w-[74%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-48px)/4)]";

export default function InstagramReels({
  eyebrow = REELS_EYEBROW,
  title = REELS_TITLE,
  items = REELS,
}) {
  const railRef = useRef(null);
  const cardRatiosRef = useRef(new Map());

  const [active, setActive] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const [canAutoplay, setCanAutoplay] = useState(false);
  const [playingIds, setPlayingIds] = useState(() => new Set());
  const [nearViewportIds, setNearViewportIds] = useState(() => new Set());

  // Check prefers-reduced-motion & navigator.connection.saveData
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isSaveData = Boolean(
      navigator.connection && navigator.connection.saveData === true
    );

    const updateAutoplayPreference = () => {
      setCanAutoplay(!motionQuery.matches && !isSaveData);
    };

    updateAutoplayPreference();
    motionQuery.addEventListener("change", updateAutoplayPreference);

    return () => {
      motionQuery.removeEventListener("change", updateAutoplayPreference);
    };
  }, []);

  // Update carousel prev/next buttons
  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, items]);

  // IntersectionObserver: tracks in-view cards (threshold >= 0.6) and limits to max 3 concurrent playing videos
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = rail.querySelectorAll("[data-card-id]");
    if (!cards.length) return;

    const ratiosMap = cardRatiosRef.current;
    ratiosMap.clear();

    const updatePlayingCards = () => {
      if (document.hidden) {
        setPlayingIds(new Set());
        return;
      }

      const visibleIds = [];
      items.forEach((item) => {
        const idStr = String(item.id);
        const ratio = ratiosMap.get(idStr) || 0;
        if (ratio >= 0.6) {
          visibleIds.push(idStr);
        }
      });

      // Performance guard: at most 3-4 videos playing simultaneously
      const MAX_CONCURRENT_VIDEOS = 3;
      const toPlay = new Set(visibleIds.slice(0, MAX_CONCURRENT_VIDEOS));
      setPlayingIds(toPlay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        setNearViewportIds((prev) => {
          let updated = false;
          const next = new Set(prev);
          entries.forEach((entry) => {
            const id = entry.target.getAttribute("data-card-id");
            if (!id) return;
            ratiosMap.set(id, entry.intersectionRatio);
            if (entry.isIntersecting && !next.has(id)) {
              next.add(id);
              updated = true;
            }
          });
          return updated ? next : prev;
        });

        updatePlayingCards();
      },
      {
        threshold: [0, 0.25, 0.6, 0.8, 1.0],
      }
    );

    cards.forEach((card) => observer.observe(card));

    const handleVisibilityChange = () => {
      updatePlayingCards();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [items]);

  const scrollByDir = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  // Open modal directly on the page so video plays right here
  const handleOpen = (reel) => {
    setActive(reel);
  };

  const hasItems = items && items.length > 0;

  return (
    <section id="instagram" className="bg-cream py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        {hasItems ? (
          <div className="relative mt-12">
            {/* Prev / Next arrows (desktop) */}
            <button
              type="button"
              onClick={() => scrollByDir(-1)}
              disabled={!canPrev}
              aria-label="Previous reels"
              className="absolute -left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navbar text-navbar-text shadow-md transition hover:bg-[#4f372d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-navbar disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByDir(1)}
              disabled={!canNext}
              aria-label="Next reels"
              className="absolute -right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navbar text-navbar-text shadow-md transition hover:bg-[#4f372d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-navbar disabled:pointer-events-none disabled:opacity-0 md:flex"
            >
              <ChevronRight size={20} />
            </button>

            {/* Horizontal scroll rail */}
            <div
              ref={railRef}
              onScroll={updateArrows}
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-2 sm:mx-0 sm:px-0"
            >
              {items.map((reel) => (
                <div
                  key={reel.id}
                  data-card-id={String(reel.id)}
                  className={`${CARD_W}`}
                >
                  <ReelCard
                    reel={reel}
                    onOpen={handleOpen}
                    shouldPlay={!active && playingIds.has(String(reel.id))}
                    nearViewport={nearViewportIds.has(String(reel.id))}
                    canAutoplay={canAutoplay}
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

      {/* Lightbox Modal Player */}
      {active && <ReelModal reel={active} onClose={() => setActive(null)} />}
    </section>
  );
}