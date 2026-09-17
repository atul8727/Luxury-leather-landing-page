'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

export default function MobileMenu({ open, onNavClick }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed inset-x-0 top-[76px] z-40 bg-navbar lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 pb-8 pt-4">
            <ul className="flex flex-col divide-y divide-navbar-text/10">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => onNavClick(e, item.href)}
                    className="block py-4 text-[15px] font-medium tracking-[0.08em] text-navbar-text uppercase"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={SITE.phoneHref} className="mt-5 flex items-center gap-2 text-[14px] font-medium text-navbar-text/90">
              <Phone size={16} strokeWidth={1.75} />
              {SITE.phone}
            </a>
            <Button href="#contact" variant="light" onClick={() => window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))} className="mt-5 w-full">
              Get a Free Quote
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
