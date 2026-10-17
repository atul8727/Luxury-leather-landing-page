"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";
import { INSTAGRAM_REELS_URL } from "@/data/reels";

export default function ReelModal({
  items = [],
  initialIndex = 0,
  reel = null,
  onClose,
}) {
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  // Normalize reels list
  const reelsList = items && items.length > 0 ? items : reel ? [reel] : [];
  const safeInitialIndex =
    initialIndex >= 0 && initialIndex < reelsList.length ? initialIndex : 0;

  const [currentIndex, setCurrentIndex] = useState(safeInitialIndex);
  const [videoFailed, setVideoFailed] = useState(false);

  const currentReel = reelsList[currentIndex] || {};
  const videoRef = useRef(null);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < reelsList.length - 1;

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setVideoFailed(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setVideoFailed(false);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [canGoNext]);

  // Lock body scroll and set up keyboard navigation / focus trap
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Auto-focus the close button or first interactive element
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], video, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], video[controls], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);

      // Return focus to the triggering element
      if (previouslyFocusedRef.current && previouslyFocusedRef.current.focus) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [onClose, goToPrev, goToNext]);

  // Play video with audio when mounted or when slide changes
  useEffect(() => {
    setVideoFailed(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [currentIndex]);

  // Touch swipe support for mobile
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  if (!currentReel || Object.keys(currentReel).length === 0) return null;

  const videoSrc = currentReel.videoUrl || currentReel.video || "";
  const instagramUrl =
    currentReel.permalink ||
    (currentReel.shortcode
      ? `https://www.instagram.com/reel/${currentReel.shortcode}/`
      : INSTAGRAM_REELS_URL);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={currentReel.caption || "Instagram Reel"}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-[420px] flex-col items-center">
        {/* Top bar: Close button */}
        <div className="mb-2 flex w-full items-center justify-end px-1">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reel"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Left Arrow Button (Previous Reel) */}
        {reelsList.length > 1 && (
          <button
            type="button"
            onClick={goToPrev}
            disabled={!canGoPrev}
            aria-label="Previous reel"
            className="absolute -left-4 sm:-left-16 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/90 hover:scale-105 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft size={26} />
          </button>
        )}

        {/* Right Arrow Button (Next Reel) */}
        {reelsList.length > 1 && (
          <button
            type="button"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Next reel"
            className="absolute -right-4 sm:-right-16 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/90 hover:scale-105 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight size={26} />
          </button>
        )}

        {/* Video / Embed Container (9:16) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
        >
          {videoSrc && !videoFailed ? (
            <video
              key={currentReel.id}
              ref={videoRef}
              src={videoSrc}
              poster={currentReel.thumbnail}
              controls
              autoPlay
              playsInline
              onError={() => setVideoFailed(true)}
              className="h-full w-full object-cover bg-black"
            />
          ) : videoFailed ? (
            <div
              className="flex h-full w-full flex-col items-center justify-center bg-cover bg-center p-6 text-center text-white"
              style={
                currentReel.thumbnail
                  ? {
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url("${currentReel.thumbnail}")`,
                    }
                  : undefined
              }
            >
              <InstagramGlyph size={48} className="mb-4 opacity-80" />
              <p className="text-sm font-medium">
                This video could not be loaded here
              </p>
              <p className="mt-1 text-xs text-white/70">
                Please watch it on Instagram
              </p>
            </div>
          ) : currentReel.shortcode ? (
            <iframe
              key={currentReel.shortcode}
              src={`https://www.instagram.com/reel/${currentReel.shortcode}/embed`}
              title={currentReel.caption || "Instagram reel"}
              className="h-full w-full border-0 bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
              <InstagramGlyph size={48} className="mb-4 opacity-80" />
              <p className="text-sm font-medium">
                Watch this reel on Instagram
              </p>
            </div>
          )}
        </div>

        {/* Bottom Bar: Caption & External Link */}
        <div className="mt-3 flex w-full items-center justify-between gap-3 px-1 text-white">
          {currentReel.caption ? (
            <p className="line-clamp-1 text-xs text-white/80">
              {currentReel.caption}
            </p>
          ) : (
            <span />
          )}

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <InstagramGlyph size={13} />
            <span>Open on Instagram</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}