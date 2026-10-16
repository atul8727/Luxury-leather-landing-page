"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SocialRail from "./SocialRail";
import { SITE } from "@/lib/constants";
import { OPEN_ENQUIRY_MODAL_EVENT } from "@/components/modal/EnquiryModal";

const VIDEO_ID = "906pebnHx4g";

export default function Hero() {
  const hostRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let player = null;
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !hostRef.current) return;

      const target = document.createElement("div");
      hostRef.current.appendChild(target);

      player = new window.YT.Player(target, {
        videoId: VIDEO_ID,
        playerVars: {
          controls: 0,
          autoplay: 1,
          mute: 1,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          loop: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            // 1 = playing, 0 = ended
            if (e.data === 1) setReady(true);
            if (e.data === 0) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prev) prev();
        createPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      cancelled = true;
      if (player && player.destroy) player.destroy();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#1a1210] pt-[76px] lg:pt-[84px]"
    >
      {/* Background YouTube video & Fallback Image */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]"
        aria-hidden="true"
      >
        {/* Poster / Fallback Image (video reload / load hone tak ye image dikhegi) */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/images/hero/hero-main.png"
            alt="Luxury Leather Care"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Dark overlay taaki text clearly readable rahe */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Video iframe container */}
        <div
          ref={hostRef}
          className={`absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: "calc(max(100cqw, 177.78cqh) * 1.25)",
            height: "calc(max(100cqh, 56.25cqw) * 1.25)",
          }}
        />

        {/* Video overlay to maintain text contrast while video is playing */}
        <div
          className={`absolute inset-0 z-2 bg-black/35 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Blocker: koi hover/click YouTube tak na pahunche */}
        <div className="pointer-events-auto absolute inset-0 z-10" />
      </div>

      <Container className="relative z-20 flex min-h-[560px] flex-col items-center justify-center py-20 text-center sm:min-h-[620px] lg:min-h-[680px] lg:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block text-[13px] font-medium tracking-[0.2em] text-navbar-text/75 uppercase">
            {SITE.name}
          </span>

          <h1 className="font-display text-[36px] leading-[1.08] text-navbar-text sm:text-[48px] lg:text-[58px]">
            Bring Your Favourite Pieces Back to Life.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-navbar-text/85">
            Expert leather cleaning, repair, restoration and protection for
            furniture and cherished leather pieces carefully restored to look
            and feel their best.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="light"
              onClick={() =>
                window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))
              }
            >
              Send an Enquiry
              <ArrowRight size={16} strokeWidth={2} />
            </Button>

            <Button href="#before-after" variant="outlineLight">
              View Transformations
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
          </div>
        </div>
      </Container>

      <SocialRail />
    </section>
  );
}
