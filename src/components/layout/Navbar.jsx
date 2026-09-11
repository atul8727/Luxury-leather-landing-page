"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import useScrollToSection from "@/hooks/useScrollToSection";
import Container from "@/components/ui/Container";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  const half = Math.ceil(NAV_ITEMS.length / 2);
  const leftItems = NAV_ITEMS.slice(0, half);
  const rightItems = NAV_ITEMS.slice(half);

  const renderLink = (item) => (
    <li key={item.href}>
      <a
        href={item.href}
        onClick={(e) => handleNavClick(e, item.href)}
        className="text-[13px] font-medium tracking-[0.12em] text-[#69483C]/90 uppercase whitespace-nowrap transition-colors hover:text-[#69483C] relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#69483C] after:transition-all after:duration-300 hover:after:w-full"
      >
        {item.label}
      </a>
    </li>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-[#FFF2E6] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_24px_rgba(20,12,8,0.25)]" : ""
        }`}
      >
        {/* <Container className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center lg:h-[112px]"> */}
        <Container className="grid h-[104px] grid-cols-[1fr_auto_1fr] items-center lg:h-[120px]">
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center justify-start gap-8">
              {leftItems.map(renderLink)}
            </ul>
          </nav>

          {/* LOGO */}
          <a
          
  href="#top"
  onClick={(e) => handleNavClick(e, "#top")}
  className="flex items-center justify-self-center py-1"
  aria-label={SITE.name}
>
  <div className="relative h-[78px] w-[105px] sm:h-[94px] sm:w-[126px] lg:h-[106px] lg:w-[142px]">
    <Image
      src="/images/LOGO-V2.png"
      alt={SITE.name}
      fill
      priority
      sizes="142px"
      className="object-contain"
    />
  </div>
</a>

          <div className="hidden items-center justify-end gap-8 lg:flex">
            <nav aria-label="Secondary">
              <ul className="flex items-center justify-end gap-8">
                {rightItems.map(renderLink)}
              </ul>
            </nav>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="col-start-3 flex h-10 w-10 items-center justify-self-end rounded-full text-[#69483C] lg:hidden"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onNavClick={handleNavClick} />
    </>
  );
}