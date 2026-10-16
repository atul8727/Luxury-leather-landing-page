"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";
import { INSTAGRAM_REELS_URL } from "@/data/reels";

export default function ReelModal({ reel, onClose }) {
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

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
  }, [onClose]);

  const videoRef = useRef(null);

  const videoSrc =
    reel.videoUrl ||
    reel.video ||
    (reel.shortcode
      ? ""
      : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");

  // Play unmuted on mount, with muted fallback if blocked by browser
  useEffect(() => {
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
  }, [reel]);

  const instagramUrl =
    reel.permalink ||
    (reel.shortcode
      ? `https://www.instagram.com/reel/${reel.shortcode}/`
      : INSTAGRAM_REELS_URL);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={reel.caption || "Instagram Reel"}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-[420px] flex-col items-center">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reel"
          className="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black/90 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:-right-12 sm:top-0"
        >
          <X size={20} />
        </button>

        {/* Video / Embed Container (9:16) */}
        <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={reel.thumbnail}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover bg-black"
            />
          ) : reel.shortcode ? (
            <iframe
              src={`https://www.instagram.com/reel/${reel.shortcode}/embed`}
              title={reel.caption || "Instagram reel"}
              className="h-full w-full border-0 bg-white"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-white">
              <InstagramGlyph size={48} className="mb-4 opacity-80" />
              <p className="text-sm font-medium">Watch this reel on Instagram</p>
            </div>
          )}
        </div>

        {/* Caption & External link */}
        <div className="mt-3 flex w-full items-center justify-between gap-3 px-1 text-white">
          {reel.caption ? (
            <p className="line-clamp-1 text-xs text-white/80">{reel.caption}</p>
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

