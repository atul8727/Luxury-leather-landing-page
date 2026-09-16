'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const whatsappOpened = useRef(false);

  useEffect(() => {
    // Prevent opening WhatsApp more than once
    if (whatsappOpened.current) return;

    whatsappOpened.current = true;

    const email = searchParams.get('email') || '';
    const phone = searchParams.get('phone') || '';
    const brand = searchParams.get('brand') || '';

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!whatsappNumber) {
      console.error('NEXT_PUBLIC_WHATSAPP_NUMBER is not configured.');
      return;
    }

    const whatsappMessage = `
Hi! I want a free estimate.

📧 Email: ${email}
📞 Phone: ${phone}
🏷️ Brand: ${brand}
    `.trim();

    const whatsappUrl =
      `https://api.whatsapp.com/send/?phone=${whatsappNumber}` + `&text=${encodeURIComponent(whatsappMessage)}` + `&type=phone_number&app_absent=0`;

    // Open WhatsApp in a NEW TAB
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-xl text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-9 w-9 text-ink"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Thank You</h1>

        {/* Main Message */}
        <p className="mt-4 text-base leading-7 text-ink-soft sm:text-lg">
          Thank you for contacting Luxury Leather and Furniture Care. Your enquiry has been submitted successfully.
        </p>

        {/* Secondary Message */}
        <p className="mt-2 text-sm leading-6 text-ink-soft">Our team will review your enquiry and get back to you shortly.</p>

        {/* WhatsApp Message */}
        {/* <p className="mt-6 text-sm text-ink-soft">WhatsApp has been opened in a new tab.</p> */}

        {/* Back to Home */}
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-ink px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
