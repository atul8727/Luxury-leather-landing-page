'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/constants';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 lg:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Get In Touch"
            title="Get a Free Quote"
            description="Tell us about the piece you'd like restored and our team will get back to you with a personalised quote, usually within one business day."
            onClick={() => window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))}
          />

          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-center gap-3 text-[14.5px] text-ink-soft">
              <Phone size={17} strokeWidth={1.75} className="text-ink" />
              <a href={SITE.phoneHref} className="hover:text-ink">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[14.5px] text-ink-soft">
              <Mail size={17} strokeWidth={1.75} className="text-ink" />
              <a href={SITE.emailHref} className="hover:text-ink">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-[14.5px] text-ink-soft">
              <MapPin size={17} strokeWidth={1.75} className="text-ink" />
              Noida &middot; Delhi &middot; Bangalore &middot; Hyderabad &middot; Jaipur &middot; Mumbai &middot; Kolkata &middot; Ludhiana
            </li>
          </ul>
        </div>

        <div className="rounded-[24px] border border-ink/10 bg-white/70 p-6 sm:p-8">
          {submitted ? (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-center">
              <h3 className="font-display text-[20px] text-ink">Thank you</h3>
              <p className="text-[14.5px] text-ink-soft">We&apos;ve received your request and will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" id="name" name="name" placeholder="Your name" required />
                <Field label="Phone number" id="phone" name="phone" type="tel" placeholder="+91 00000 00000" required />
              </div>
              <Field label="Email" id="email" name="email" type="email" placeholder="you@example.com" required />
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[13px] font-medium text-ink-soft">
                  What needs restoring?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about the item and its condition"
                  className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
                />
              </div>
              <Button type="submit" variant="primary" className="mt-1 w-full">
                Send Request
              </Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

function Field({ label, id, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        className="rounded-xl border border-ink/15 bg-white px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none"
        {...props}
      />
    </div>
  );
}
