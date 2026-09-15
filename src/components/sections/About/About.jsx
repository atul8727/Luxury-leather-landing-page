"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterCard({ item }) {
  const [position, setPosition] = useState(50);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;
      if (clientX != null) updateFromClientX(clientX);
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, updateFromClientX]);

  const startDrag = (clientX) => {
    setIsDragging(true);
    updateFromClientX(clientX);
  };

  // Only the center handle can start a drag now — clicking/tapping
  // anywhere else on the image does nothing.
  const onHandlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX);
  };
  const onHandleTouchStart = (e) => {
    e.stopPropagation();
    startDrag(e.touches[0].clientX);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <div
        ref={containerRef}
        className="relative aspect-[4/5] w-full touch-none overflow-hidden select-none bg-white"
      >
        {/* AFTER image - always full width, sits underneath */}
        <div className="absolute inset-0">
          <Image
            src={item.after}
            alt={`${item.title} - after restoration`}
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="pointer-events-none object-contain"
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
              className="pointer-events-none object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* Badges */}
        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase shadow-sm">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cream uppercase shadow-sm">
          After
        </span>

        {/* Divider Line + Handle */}
        <div
          className="absolute inset-y-0 z-30 -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[3px] -translate-x-1/2 bg-white/80 shadow-[0_0_4px_rgba(0,0,0,0.35)]">
            <img
              src="/icons/Line 2.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-full w-full select-none object-fill"
            />
          </div>

          <button
            type="button"
            aria-label="Drag to compare before and after"
            role="slider"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onPointerDown={onHandlePointerDown}
            onTouchStart={onHandleTouchStart}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          >
            <img
              src="/icons/Group 13.png"
              alt=""
              draggable={false}
              className="h-10 w-10 select-none"
            />
          </button>
        </div>
      </div>
      <p className="px-4 py-3 text-center font-display text-[15px] text-ink-soft">
        {item.title}
      </p>
    </div>
  );
}