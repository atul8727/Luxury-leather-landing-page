"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ServiceCard({ service, index }) {
  const reversed = index % 2 === 1;

  const [position, setPosition] = useState(50);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    setWidth(el.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 py-12 sm:gap-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
      <div
        ref={containerRef}
        className={`relative aspect-[4/3] w-full touch-none overflow-hidden rounded-2xl bg-white select-none ${
          reversed ? "lg:order-2" : ""
        }`}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={service.after}
            alt={`${service.title} - after`}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Before Image (Clipped/Resized Overlay) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <div className="relative h-full" style={{ width: width || "100%" }}>
            <Image
              src={service.before}
              alt={`${service.title} - before`}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Divider Line & Handle Button */}
        <div
          className="absolute inset-y-0 z-10 flex w-0 items-center justify-center"
          style={{ left: `${position}%` }}
        >
          {/* Vertical Line */}
          <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]" />
          
          {/* Circular Drag Button with Left-Right Arrows */}
          <button
            type="button"
            aria-label="Drag to compare before and after"
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            className="relative flex h-10 w-10 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-md transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-900"
          >
            <ChevronLeft size={16} strokeWidth={2.5} className="-mr-1" />
            <ChevronRight size={16} strokeWidth={2.5} className="-ml-1" />
          </button>
        </div>
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        <span className="inline-block rounded-full border border-ink/20 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
          Service {index + 1}
        </span>
        <h3 className="mt-4 font-display text-[24px] leading-snug text-ink sm:text-[28px]">
          {service.tag}
        </h3>
        <p className="mt-2 text-[13px] font-semibold tracking-[0.02em] text-ink uppercase">
          {service.title}
        </p>
        <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">{service.description}</p>
        <Button href="#contact" variant="primary" className="mt-7">
          Get a Free Quote
          <ArrowRight size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}