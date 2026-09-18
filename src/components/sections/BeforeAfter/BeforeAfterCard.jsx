"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterCard({ item }) {
  const [position, setPosition] = useState(50);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  /* --------------------------------
     Container width
  -------------------------------- */
  useEffect(() => {
    const el = containerRef.current;

    if (!el) return;

    const updateWidth = () => {
      setWidth(el.getBoundingClientRect().width);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  /* --------------------------------
     Calculate slider position
  -------------------------------- */
  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();

    if (!rect.width) return;

    const pct = ((clientX - rect.left) / rect.width) * 100;

    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  /* --------------------------------
     Drag events
  -------------------------------- */
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches?.[0]?.clientX ?? e.clientX;

      if (clientX != null) {
        updateFromClientX(clientX);
      }
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);

    window.addEventListener("touchmove", handleMove, {
      passive: true,
    });

    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);

      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, updateFromClientX]);

  /* --------------------------------
     Start dragging
  -------------------------------- */
  const startDrag = (clientX) => {
    setIsDragging(true);
    updateFromClientX(clientX);
  };

  const onHandlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    startDrag(e.clientX);
  };

  const onHandleTouchStart = (e) => {
    e.stopPropagation();

    if (e.touches?.[0]) {
      startDrag(e.touches[0].clientX);
    }
  };

  /* --------------------------------
     Keyboard controls
  -------------------------------- */
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 4));
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 4));
    }

    if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    }

    if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      {/* =====================================
          IMAGE CONTAINER
          NO aspect-ratio here
      ===================================== */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none "
      >
        {/* -------------------------------------
            AFTER IMAGE
        ------------------------------------- */}
        <Image
          src={item.after}
          alt={`${item.title} - after restoration`}
          width={1200}
          height={1500}
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="block h-auto w-full object-contain"
          draggable={false}
        />

        {/* -------------------------------------
            BEFORE IMAGE
        ------------------------------------- */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{
            width: `${position}%`,
          }}
        >
          <div
            className="relative h-full"
            style={{
              width: width || "100%",
            }}
          >
            <Image
              src={item.before}
              alt={`${item.title} - before restoration`}
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="block h-full w-full object-contain object-left"
              draggable={false}
            />
          </div>
        </div>

        {/* -------------------------------------
            BEFORE BADGE
        ------------------------------------- */}
        <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream shadow-sm">
          Before
        </span>

        {/* -------------------------------------
            AFTER BADGE
        ------------------------------------- */}
        <span className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream shadow-sm">
          After
        </span>

        {/* -------------------------------------
            DIVIDER
        ------------------------------------- */}
        <div
          className="absolute inset-y-0 z-30 -translate-x-1/2"
          style={{
            left: `${position}%`,
          }}
        >
          {/* Line */}
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[3px] -translate-x-1/2 bg-white/80 shadow-[0_0_4px_rgba(0,0,0,0.35)]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <img
              src="/icons/Line 2.png"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-full w-full select-none object-fill"
            />
          </div>

          {/* Hit area */}
          <div
            aria-hidden="true"
            onPointerDown={onHandlePointerDown}
            onTouchStart={onHandleTouchStart}
            className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 touch-none cursor-ew-resize"
          />

          {/* Handle */}
          <button
            type="button"
            role="slider"
            aria-label="Drag to compare before and after"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            tabIndex={0}
            onPointerDown={onHandlePointerDown}
            onTouchStart={onHandleTouchStart}
            onKeyDown={onKeyDown}
            className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 touch-none cursor-ew-resize items-center justify-center transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
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

      {/* =====================================
          TITLE
      ===================================== */}
      <p className="m-0 px-4 py-1.5 text-center font-display text-[15px] leading-tight text-ink-soft">
        {item.title}
      </p>
    </div>
  );
}
