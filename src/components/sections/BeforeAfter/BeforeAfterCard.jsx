"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

export default function BeforeAfterCard({ item }) {
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
    <div className="flex flex-col gap-4 rounded-[22px] bg-cream p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div
        ref={containerRef}
        className="relative aspect-[4/5] w-full touch-none overflow-hidden rounded-[16px] select-none bg-ink/5"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* AFTER image - always full width, sits underneath */}
        <div className="absolute inset-0">
          <Image
            src={item.after}
            alt={`${item.title} - after restoration`}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* BEFORE image - clipped to slider position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="relative h-full" style={{ width: width || "100%" }}>
            <Image
              src={item.before}
              alt={`${item.title} - before restoration`}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Badges - fixed to the corners, always visible regardless of slider position */}
        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase shadow-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase shadow-sm">
          After
        </span>

        {/* Divider line + drag handle */}
        <div
          className="absolute inset-y-0 z-30 flex w-0 items-center justify-center"
          style={{ left: `${position}%` }}
        >
          <div className="absolute inset-y-0 w-[2px] bg-cream" />
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
            className="relative flex h-11 w-11 -translate-x-1/2 cursor-ew-resize items-center justify-center rounded-full border border-ink/10 bg-cream text-ink shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          >
            <ChevronsLeftRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <p className="pb-1 text-center font-display text-[15px] text-ink-soft">
        {item.title}
      </p>
    </div>
  );
}