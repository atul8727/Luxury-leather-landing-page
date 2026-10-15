'use client';

import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import SocialRail from './SocialRail';
import { SITE } from '@/lib/constants';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

const VIDEO_ID = '906pebnHx4g';
const VIDEO_SRC =
  `https://www.youtube.com/embed/${VIDEO_ID}` +
  `?si=mk5X0ub5Vbq9YWEp&controls=0` +
  `&autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&cc_load_policy=0&iv_load_policy=3&disablekb=1&rel=0`;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[76px] lg:pt-[84px]">
      {/* Background YouTube video */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden [container-type:size]" aria-hidden="true">
        <iframe
          src={VIDEO_SRC}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute top-0 left-1/2 -translate-x-1/2 border-0"
          style={{ width: 'calc(max(100cqw, 177.78cqh) * 1.2)', height: 'calc(max(100cqh, 56.25cqw) * 1.2)' }}
        />
      </div>

      <Container className="relative flex min-h-[560px] flex-col items-center justify-center py-20 text-center sm:min-h-[620px] lg:min-h-[680px] lg:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block text-[13px] font-medium tracking-[0.2em] text-navbar-text/75 uppercase">{SITE.name}</span>

          <h1 className="font-display text-[36px] leading-[1.08] text-navbar-text sm:text-[48px] lg:text-[58px]">
            Bring Your Favourite Pieces Back to Life.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-navbar-text/85">
            Expert leather cleaning, repair, restoration and protection for furniture and cherished leather pieces carefully restored to look and feel
            their best.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button variant="light" onClick={() => window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))}>
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