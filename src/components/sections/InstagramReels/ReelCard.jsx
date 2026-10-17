"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { InstagramGlyph } from "@/components/ui/SocialGlyphs";

export default function ReelCard({ reel, onOpen, isPaused = false }) {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  // Guarantee instant autoplay as soon as UI loads on mobile & desktop
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !reel.videoUrl || videoFailed) return;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    if (isPaused) {
      v.pause();
    } else {
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy handled silently
        });
      }
    }
  }, [reel.videoUrl, videoFailed, isPaused]);

  return (
    <button
      type="button"
      onClick={() => onOpen(reel)}
      aria-label={`Play reel: ${reel.caption || "Instagram reel"}`}
      className="group relative block aspect-[9/16] w-full cursor-pointer select-none overflow-hidden rounded-[18px] bg-cream-2 text-left shadow-md ring-1 ring-black/5 transform-gpu transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:ring-black/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navbar"
    >
      {/* Thumbnail: instantaneous image underneath */}
      {reel.thumbnail && !imgFailed ? (
        <Image
          src={reel.thumbnail}
          alt={reel.caption || "Instagram reel"}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 85vw"
          className="object-cover"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-cream-2 to-line text-ink-soft">
          <InstagramGlyph size={36} />
        </div>
      )}

      {/* Video: autoplays instantly on load with hardware acceleration */}
      {reel.videoUrl && !videoFailed && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          onError={() => setVideoFailed(true)}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transform-gpu"
        />
      )}
    </button>
  );
}