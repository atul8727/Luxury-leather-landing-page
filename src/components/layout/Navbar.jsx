'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

import { NAV_ITEMS, SITE } from '@/lib/constants';
import useScrollToSection from '@/hooks/useScrollToSection';
import Container from '@/components/ui/Container';
import MobileMenu from './MobileMenu';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useScrollToSection();

  /* --------------------------------
     Scroll detection
  -------------------------------- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* --------------------------------
     Lock body when mobile menu open
  -------------------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* --------------------------------
     Normal navigation
  -------------------------------- */
  const handleNavClick = (e, href) => {
    e.preventDefault();

    setMobileOpen(false);

    scrollToSection(href);
  };

  /* --------------------------------
     Contact / Enquiry Modal
     Same method as Hero
  -------------------------------- */
  const handleContactClick = (e) => {
    e.preventDefault();

    setMobileOpen(false);

    window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT));
  };

  /* --------------------------------
     Split navigation
  -------------------------------- */
  const half = Math.ceil(NAV_ITEMS.length / 2);

  const leftItems = NAV_ITEMS.slice(0, half);
  const rightItems = NAV_ITEMS.slice(half);

  /* --------------------------------
     Render nav link
  -------------------------------- */
  const renderLink = (item) => {
    const isContact = item.label.toLowerCase() === 'contact';

    return (
      <li key={item.label}>
        <a
          href={item.href}
          onClick={isContact ? handleContactClick : (e) => handleNavClick(e, item.href)}
          className="
            relative
            whitespace-nowrap
            text-[13px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#69483C]/90
            transition-colors
            hover:text-[#69483C]

            after:absolute
            after:-bottom-1.5
            after:left-0
            after:h-px
            after:w-0
            after:bg-[#69483C]
            after:transition-all
            after:duration-300

            hover:after:w-full
          "
        >
          {item.label}
        </a>
      </li>
    );
  };

  return (
    <>
      <header
        className={`
          fixed
          inset-x-0
          top-0
          z-50
          bg-[#FFE5CD]
          transition-shadow
          duration-300
          ${scrolled ? 'shadow-[0_8px_24px_rgba(20,12,8,0.25)]' : ''}
        `}
      >
        <Container
          className="
            grid
            h-[80px]
            grid-cols-[1fr_auto_1fr]
            items-center
            lg:h-[88px]
          "
        >
          {/* LEFT NAVIGATION */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center justify-start gap-8">{leftItems.map(renderLink)}</ul>
          </nav>

          {/* LOGO */}
          <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center justify-self-center" aria-label={SITE.name}>
            <div
              className="
                relative
                -mt-2
                h-[78px]
                w-[105px]
                sm:h-[94px]
                sm:w-[126px]
                lg:h-[106px]
                lg:w-[142px]
              "
            >
              <Image src="/images/LOGO-V2.png" alt={SITE.name} fill priority sizes="142px" className="object-cover" />
            </div>
          </a>

          {/* RIGHT NAVIGATION */}
          <div className="hidden items-center justify-end gap-8 lg:flex">
            <nav aria-label="Secondary">
              <ul className="flex items-center justify-end gap-8">{rightItems.map(renderLink)}</ul>
            </nav>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="
              col-start-3
              flex
              h-10
              w-10
              items-center
              justify-center
              justify-self-end
              rounded-full
              text-[#69483C]
              lg:hidden
            "
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onNavClick={handleNavClick} />
    </>
  );
}
