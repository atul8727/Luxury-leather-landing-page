"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

const SESSION_KEY = "ll-promo-seen";

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    const timer = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative grid w-full max-w-[820px] grid-cols-1 overflow-hidden rounded-[22px] bg-cream shadow-2xl sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            <div
              className="hidden flex-col justify-end bg-navbar p-8 sm:flex"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(44,30,23,0.15), rgba(44,30,23,0.75)), url(/images/hero/hero-main.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <span className="text-[12px] font-medium tracking-[0.16em] text-navbar-text/80 uppercase">
                Limited Time Offer
              </span>
              <p className="mt-3 font-display text-[26px] leading-[1.15] text-navbar-text">
                Flat 20% off your first restoration
              </p>
              <p className="mt-2 text-[13.5px] text-navbar-text/80">
                Valid on shoes, bags, jackets and furniture booked this week.
              </p>
            </div>

            <div className="p-7 sm:p-8">
              {submitted ? (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-2 text-center">
                  <h3 id="promo-modal-title" className="font-display text-[20px] text-ink">
                    You&apos;re on the list
                  </h3>
                  <p className="text-[14px] text-ink-soft">
                    A member of our team will call you shortly with your quote.
                  </p>
                  <Button variant="secondary" onClick={close} className="mt-4">
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <h3 id="promo-modal-title" className="font-display text-[21px] leading-snug text-ink">
                    Claim your free quote &amp; discount
                  </h3>
                  <p className="mt-2 text-[13.5px] text-ink-soft">
                    Share your details and we&apos;ll call you back with a personalised quote.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Full name"
                      aria-label="Full name"
                      className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone number"
                      aria-label="Phone number"
                      className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                    />
                    <select
                      aria-label="Item to restore"
                      defaultValue=""
                      className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink focus:border-ink focus:outline-none"
                    >
                      <option value="" disabled>
                        What would you like restored?
                      </option>
                      <option>Shoes</option>
                      <option>Bag</option>
                      <option>Jacket</option>
                      <option>Furniture</option>
                    </select>
                    <Button type="submit" variant="primary" className="mt-1 w-full">
                      Claim My Discount
                    </Button>
                  </form>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-4 w-full text-center text-[12.5px] text-ink-soft underline-offset-2 hover:underline"
                  >
                    No thanks, I&apos;ll pay full price
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
