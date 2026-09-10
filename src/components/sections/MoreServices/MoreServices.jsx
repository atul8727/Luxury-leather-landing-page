"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/data/moreServices";
import CompareSlider from "./CompareSlider";

// Map each category title to its respective image icon path
const SERVICE_ICONS = {
  Bags: "/icons/Vector (1).png",
  Shoes: "/icons/Vector (2).png",
  Sofa: "/icons/Vector (3).png",
  Jackets: "/icons/Vector (4).png",
};

function MoreServicesIcon({ className = "" }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image
        src="/icons/Vector.png"
        alt=""
        fill
        sizes="42px"
        className="object-contain"
        aria-hidden="true"
      />
    </div>
  );
}

export default function MoreServices() {
  const [activeId, setActiveId] = useState(SERVICE_CATEGORIES[0].id);
  const active =
    SERVICE_CATEGORIES.find((cat) => cat.id === activeId) || SERVICE_CATEGORIES[0];

  return (
    <section
      className="py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, #FFF2E6 0%, #FFE5CD 50%, #FFF2E6 100%)",
      }}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <MoreServicesIcon className="mb-2" />
          <SectionHeading
            eyebrow="More Of Our Services"
            title="Clean, Repair, Restoration and Customisation Service Available For"
            titleColor="#614338"
            maxWidth="max-w-3xl"
          />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const iconSrc = SERVICE_ICONS[cat.title] || "/icons/Vector (1).png";
            const isActive = cat.id === activeId;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                aria-pressed={isActive}
                className={`group flex cursor-pointer flex-col items-center gap-3 rounded-[24px] border px-5 py-8 text-center shadow-sm transition-all duration-300 ${
                  isActive
                    ? "border-transparent bg-[#69483C]"
                    : "border-black/5 bg-white hover:border-[#69483C]/30"
                }`}
              >
                {/* Icon Container */}
                <div className="flex h-12 w-12 items-center justify-center">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <img
                      src={iconSrc}
                      alt={cat.title}
                      className={`h-full w-full object-contain transition-all duration-300 ${
                        isActive ? "brightness-0 invert" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Title */}
                <span
                  className={`font-display text-[18px] font-bold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-[#69483C]"
                  }`}
                >
                  {cat.title}
                </span>

                {/* Subtitle */}
                <span
                  className={`text-[12.5px] transition-colors duration-300 ${
                    isActive ? "text-white/80" : "text-[#69483C]/80"
                  }`}
                >
                  {cat.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Content — stacks below image on mobile, sits on the LEFT on desktop */}
          <div key={`${active.id}-content`} className="order-2 animate-fadeIn lg:order-1">
            <h3
              className="font-display text-[24px] leading-snug sm:text-[28px]"
              style={{ color: "#614338" }}
            >
              {active.heading}
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-black">
              {active.description}
            </p>
            {active.highlight && (
              <p className="mt-4 font-semibold" style={{ color: "#614338" }}>
                {active.highlight}
              </p>
            )}
            <Button
              href="#contact"
              variant="secondary"
              className="mt-7"
              style={{ color: "#000000" }}
            >
              Read More
              <ArrowRight size={15} strokeWidth={2} />
            </Button>
          </div>

          {/* Before/After compare slider — stacks above content on mobile, sits on the RIGHT on desktop */}
          <div
            key={`${active.id}-image`}
            className="order-1 animate-fadeIn lg:order-2"
          >
            <CompareSlider
              before={active.before}
              after={active.after}
              beforeAlt={active.beforeAlt}
              afterAlt={active.afterAlt}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}