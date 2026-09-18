'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

export default function ServiceCard({ service, index }) {
  const reversed = index % 2 === 1;

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

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, updateFromClientX]);

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
    startDrag(e.touches[0].clientX);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 4));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 py-12 sm:gap-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
      <div ref={containerRef} className={`relative aspect-[4/3] w-full overflow-hidden bg-white select-none ${reversed ? 'lg:order-2' : ''}`}>
        {/* After Image — full background, revealed on the RIGHT of the line */}
        <div className="absolute inset-0 bg-white">
          <Image
            src={service.after}
            alt={`${service.title} - after`}
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="pointer-events-none object-contain  "
            draggable={false}
          />
        </div>

        {/* Before Image — clipped overlay, revealed on the LEFT of the line */}
        <div className="absolute inset-y-0 left-0 overflow-hidden bg-white" style={{ width: `${position}%` }}>
          <div className="relative h-full" style={{ width: width || '100%' }}>
            <Image
              src={service.before}
              alt={`${service.title} - before`}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="pointer-events-none object-contain "
              draggable={false}
            />
          </div>
        </div>

        {/*
          Divider Line + Handle — uses your actual Figma PNGs
          (public/icons/Line 2.png, public/icons/Group 13.png).
        */}
        <div className="absolute inset-y-0 z-20 -translate-x-1/2" style={{ left: `${position}%` }}>
          <div
            className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[3px] -translate-x-1/2 bg-white/80 shadow-[0_0_4px_rgba(0,0,0,0.35)]"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <img src="/icons/Line 2.png" alt="" aria-hidden="true" draggable={false} className="h-full w-full select-none object-fill" />
          </div>

          {/* Invisible hit-area around the line so it's grabbable too, without changing how it looks */}
          <div
            aria-hidden="true"
            onPointerDown={onHandlePointerDown}
            onTouchStart={onHandleTouchStart}
            className="absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 touch-none cursor-ew-resize"
          />

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
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 touch-none cursor-ew-resize items-center justify-center transition-transform duration-150 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
          >
            <img src="/icons/Group 13.png" alt="" draggable={false} className="h-10 w-10 select-none" />
          </button>
        </div>
      </div>

      <div className={reversed ? 'lg:order-1' : ''}>
        <span className="inline-block rounded-full border border-ink/20 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase">
          Service {index + 1}
        </span>
        <h3 className="mt-4 font-display text-[24px] leading-snug uppercase sm:text-[28px]" style={{ color: '#614338' }}>
          {service.tag}
        </h3>
        <p className="mt-2 text-[13px] font-semibold tracking-[0.02em] uppercase" style={{ color: '#614338' }}>
          {service.title}
        </p>
        <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: '#101010' }}>
          {service.description}
        </p>
        <Button variant="primary" className="mt-7" onClick={() => window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))}>
          Get a Free Quote
          <ArrowRight size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}