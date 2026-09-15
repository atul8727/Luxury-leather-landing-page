"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BeforeAfterCard from "./BeforeAfterCard";
import { BEFORE_AFTER } from "@/data/beforeAfter";

export default function BeforeAfter() {
  const [pageIndex, setPageIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const computePerPage = () => {
      const w = window.innerWidth;
      if (w < 640) return 1; // mobile: one card at a time
      if (w < 1024) return 2; // tablet: two at a time
      return 3; // desktop: three at a time
    };

    const handleResize = () => {
      setPerPage(computePerPage());
      setPageIndex(0); // avoid out-of-range page after resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < BEFORE_AFTER.length; i += perPage) {
      chunks.push(BEFORE_AFTER.slice(i, i + perPage));
    }
    return chunks;
  }, [perPage]);

  const totalPages = pages.length;

  const goPrev = () => {
    setPageIndex((p) => (p === 0 ? totalPages - 1 : p - 1));
  };
  const goNext = () => {
    setPageIndex((p) => (p === totalPages - 1 ? 0 : p + 1));
  };

  // clamp pageIndex if totalPages shrinks after resize
  const safePageIndex = Math.min(pageIndex, totalPages - 1);

  return (
  <section id="before-after" className="py-20 lg:py-28" style={{ backgroundColor: "#69483C" }}>
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            eyebrow="Before & After"
            title="Real Work. Real Results."
            description="We offer expert leather repair service for all kinds of leather items, including wallets, jackets, handbags, shoes, furniture, etc. Our experienced professionals are proficient in repairing leather scratches, rips, faded colors, cuts, and other damages. To ensure long-lasting effects, we exclusively use top-notch supplies and equipment. We seamlessly play around with all kinds of materials like nubuck, patent, coated canvas, metallic leather, suede etc."
            titleColor="#FFE5CD"
            eyebrowColor="#FFE5CD"
            descriptionColor="#FFE5CD"
            maxWidth="max-w-3xl"
          />
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${safePageIndex * 100}%)` }}
          >
            {pages.map((page, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div
                  className={`grid gap-6 ${
                    perPage === 1
                      ? "grid-cols-1 max-w-sm mx-auto"
                      : perPage === 2
                      ? "grid-cols-2"
                      : "grid-cols-3"
                  }`}
                >
                  {page.map((item) => (
                    <BeforeAfterCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div
              className="flex items-center gap-3 rounded-full px-4 py-2"
              style={{ backgroundColor: "#5C4033" }}
            >
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                className="flex h-5 w-5 items-center justify-center text-[#FFE5CD] transition-opacity hover:opacity-70"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-1.5">
                {pages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPageIndex(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className="h-[6px] w-[6px] rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        i === safePageIndex ? "#FFE5CD" : "rgba(255,229,205,0.4)",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="flex h-5 w-5 items-center justify-center text-[#FFE5CD] transition-opacity hover:opacity-70"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}