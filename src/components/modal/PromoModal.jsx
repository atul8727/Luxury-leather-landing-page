"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

const SESSION_KEY = "ll-promo-seen";

export const OPEN_PROMO_MODAL_EVENT = "open-promo-modal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    phone: "",
    brand: "",
  });

  const dialogRef = useRef(null);

  // --------------------------------------------------
  // Auto open once per session
  // --------------------------------------------------
  useEffect(() => {
    let alreadySeen = false;

    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }

    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // --------------------------------------------------
  // Open modal from anywhere on website
  // Example:
  // window.dispatchEvent(new Event(OPEN_PROMO_MODAL_EVENT))
  // --------------------------------------------------
  useEffect(() => {
    const onOpenRequest = () => {
      setOpen(true);
      setSubmitted(false);
      setError("");
    };

    window.addEventListener(OPEN_PROMO_MODAL_EVENT, onOpenRequest);

    return () => {
      window.removeEventListener(OPEN_PROMO_MODAL_EVENT, onOpenRequest);
    };
  }, []);

  // --------------------------------------------------
  // Close modal
  // --------------------------------------------------
  const close = () => {
    setOpen(false);

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Ignore sessionStorage errors
    }
  };

  // --------------------------------------------------
  // Escape key + body scroll lock
  // --------------------------------------------------
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  // --------------------------------------------------
  // Input change
  // --------------------------------------------------
  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear error when user starts typing again
    if (error) {
      setError("");
    }
  };

  // --------------------------------------------------
  // Submit form
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = form.email.trim();
    const phone = form.phone.trim();
    const brand = form.brand.trim();

    // Email validation
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // Phone validation
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    // Brand validation
    if (!brand) {
      setError("Please tell us the product brand.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          brand,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");

        return;
      }

      // Successfully sent through Nodemailer
      setSubmitted(true);

      // Mark as seen
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Ignore
      }
    } catch (error) {
      console.error("Promo form error:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
            if (e.target === e.currentTarget) {
              close();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-modal-title"
            tabIndex={-1}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="relative w-full max-w-[420px] overflow-hidden rounded-[22px] bg-cream shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white"
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            <div className="p-7 sm:p-8">
              {/* -------------------------------- */}
              {/* SUCCESS STATE */}
              {/* -------------------------------- */}

              {submitted ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center gap-2 text-center">
                  <h3
                    id="promo-modal-title"
                    className="font-display text-[20px] text-ink"
                  >
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
                  {/* -------------------------------- */}
                  {/* HEADING */}
                  {/* -------------------------------- */}

                  <h3
                    id="promo-modal-title"
                    className="pr-8 font-display text-[21px] leading-snug text-ink"
                  >
                    Claim your free quote &amp; discount
                  </h3>

                  <p className="mt-2 text-[13.5px] text-ink-soft">
                    Share your details and we&apos;ll call you back with a
                    personalised quote.
                  </p>

                  {/* -------------------------------- */}
                  {/* FORM */}
                  {/* -------------------------------- */}

                  <form
                    onSubmit={handleSubmit}
                    className="mt-5 flex flex-col gap-4"
                  >
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="promo-email"
                        className="mb-1.5 block text-[13px] font-medium text-ink"
                      >
                        Email Id <span className="text-red-600">*</span>
                      </label>

                      <input
                        id="promo-email"
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="promo-phone"
                        className="mb-1.5 block text-[13px] font-medium text-ink"
                      >
                        Phone No. <span className="text-red-600">*</span>
                      </label>

                      <input
                        id="promo-phone"
                        name="phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                      />
                    </div>

                    {/* Brand */}
                    <div>
                      <label
                        htmlFor="promo-brand"
                        className="mb-1.5 block text-[13px] font-medium text-ink"
                      >
                        What Brand is your product?{" "}
                        <span className="text-red-600">*</span>
                      </label>

                      <input
                        id="promo-brand"
                        name="brand"
                        required
                        type="text"
                        autoComplete="off"
                        placeholder="e.g. Louis Vuitton, Gucci..."
                        value={form.brand}
                        onChange={handleChange("brand")}
                        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p
                        role="alert"
                        className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-600"
                      >
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="mt-1 w-full"
                    >
                      {submitting ? "Submitting..."  : "Submit on WhatsApp"}
                    </Button>
                  </form>

                  {/* No Thanks */}
                  {/* <button
                    type="button"
                    onClick={close}
                    className="mt-4 w-full text-center text-[12.5px] text-ink-soft underline-offset-2 hover:underline"
                  >
                    No thanks, I&apos;ll pay full price
                  </button> */}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
