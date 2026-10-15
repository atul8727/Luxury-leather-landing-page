"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Eye, Play } from "lucide-react";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";

export default function ReelCard({
  reel,
  onOpen,
  shouldPlay = false,
  nearViewport = false,
  canAutoplay = false,
}) {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Guarantee muted DOM property on mount / update (needed for iOS / WebKit autoplay)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, [nearViewport]);

  // Handle play / pause based on in-view state and hover preview
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !reel.videoUrl) return;

    const mustPlay = (canAutoplay && shouldPlay) || isHovered;

    if (mustPlay) {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser prevented autoplay silently
        });
      }
    } else {
      v.pause();
    }
  }, [canAutoplay, shouldPlay, isHovered, reel.videoUrl]);

  return (
    <button
      type="button"
      onClick={() => onOpen(reel)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      aria-label={`Play reel: ${reel.caption || "Instagram reel"}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[18px] bg-cream-2 text-left shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navbar"
    >
      {/* Thumbnail: always present underneath so there is zero layout shift */}
      {reel.thumbnail && !imgFailed ? (
        <Image
          src={reel.thumbnail}
          alt={reel.caption || "Instagram reel thumbnail"}
          fill
          sizes="(min-width: 1280px) 190px, (min-width: 1024px) 220px, (min-width: 640px) 30vw, 56vw"
          className="object-cover"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-cream-2 to-line text-ink-soft">
          <InstagramGlyph size={36} />
        </div>
      )}

      {/* Muted autoplay preview video (loaded only when near viewport) */}
      {reel.videoUrl && nearViewport && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setIsVideoReady(true)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Bottom gradient overlay for caption readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      {/* Play icon (bottom-left) */}
      <span className="absolute bottom-3.5 left-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navbar shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-white">
        <Play size={16} fill="currentColor" aria-hidden="true" className="translate-x-[1px]" />
      </span>

      {/* Caption text */}
      {reel.caption ? (
        <span className="absolute bottom-4 left-16 right-4 line-clamp-1 text-[13px] font-medium text-white drop-shadow">
          {reel.caption}
        </span>
      ) : null}
    </button>
  );
}