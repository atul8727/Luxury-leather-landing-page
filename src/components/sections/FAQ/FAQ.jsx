"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-maisons py-20 lg:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Have a Question" title="Frequently Asked Questions" />

        <div className="mt-10 divide-y divide-ink/10 border-t border-b border-ink/10">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display text-[16px] text-ink sm:text-[17px]">
                    {faq.question}
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={1.75}
                    className={`shrink-0 text-ink-soft transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  />
                </button>
                <div
                  id={`faq-panel-${index}`}
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="text-[14.5px] leading-relaxed text-ink-soft">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
