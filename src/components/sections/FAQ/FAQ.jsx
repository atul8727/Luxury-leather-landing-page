'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { FAQS } from '@/data/faq';
import { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';

function FaqIcon({ className = '' }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image src="/icons/Vector.png" alt="" fill sizes="42px" className="object-contain" aria-hidden="true" />
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-[88px] sm:py-[100px] lg:py-[116px]" style={{ background: '#FFF8F2' }}>
      <Container className="max-w-4xl">
        {/* Heading Section */}
        <div className="flex flex-col items-center text-center">
          <FaqIcon />
          <p className="mt-2 font-inter text-[14px] font-medium uppercase leading-none tracking-[0.02em] text-[#755244] sm:text-[16px]">
            Have a Question
          </p>
          <h2 className="mt-[18px] font-display text-[34px] font-bold uppercase leading-[1.08] tracking-[-0.01em] text-[#755244] sm:text-[42px] lg:text-[52px]">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items - with a narrower max-width wrapper compared to CTA */}
        <div className="mx-auto mt-[70px] max-w-3xl flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="rounded-[16px] border border-[#E6D7CD] bg-white px-6 transition-colors duration-300">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-[16px] font-semibold text-[#3A2821] sm:text-[18px]">{faq.question}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      open ? 'bg-[#755244] text-[#FFE6D1]' : 'bg-[#FFE6D1] text-[#755244]'
                    }`}
                  >
                    {open ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                  </span>
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <p className="font-inter text-[15px] leading-relaxed text-[#5A5A5A]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Card — keeps full container width */}
        <div
          className="mt-20 flex flex-col items-center gap-8 overflow-hidden rounded-[24px] px-8 py-10 sm:px-10 lg:flex-row lg:items-center lg:gap-12 lg:px-14 lg:py-12"
          style={{ background: '#755244' }}
        >
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-display text-[26px] font-bold leading-snug text-[#FFE6D1] sm:text-[32px]">Still Have Questions?</h3>
            <p className="mt-3 font-inter text-[15px] leading-relaxed text-[#FFE6D1]/80">
              Can&apos;t find the answer you&apos;re looking for? Our team is happy to walk you through the process and give you a free, no-obligation
              quote.
            </p>
            <Button variant="primary" className="mt-7" onClick={() => window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT))}>
              Get a Free Quote
            </Button>
          </div>

          <div className="w-full max-w-md shrink-0 lg:w-[380px]">
            <Image
              src="/images/cta/ChatGPT Image Sep 1, 2026, 05_17_59 PM 1.png"
              alt="Restored leather bag and shoes"
              width={800}
              height={600}
              className="h-auto w-full object-contain rounded-[16px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
