'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowUp, ChevronDown, Mail, Phone, ShieldCheck } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal, { OPEN_ENQUIRY_MODAL_EVENT } from '@/components/modal/EnquiryModal';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

/* =====================================================================
   POLICY CONTENT
   Edit text here — the layout below renders it automatically.
   Block types: 'p' (paragraph) | 'list' (bullets) | 'note' (highlight) | 'contact'
===================================================================== */

const EFFECTIVE_DATE = '1st February, 2022';

const INTRO = [
  'Luxury Leather & Furniture Care respects your privacy and is committed to protecting the personal information you share with us through our website and services.',
  'This Privacy Policy explains what information we may collect, how we use it, how we protect it, and your choices regarding your information.',
];

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    blocks: [
      {
        type: 'p',
        text: 'When you visit our website, contact us, request a quotation, or enquire about our services, we may collect information such as:',
      },
      {
        type: 'list',
        items: [
          'Name',
          'Mobile number',
          'Email address',
          'Address or service location',
          'Details about the leather goods, furniture, bags, shoes, jackets or other products requiring our services',
          'Photographs or videos of items shared with us for assessment or quotation',
          'Any other information voluntarily provided through contact forms, WhatsApp, email, phone calls or other communication channels',
        ],
      },
    ],
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    blocks: [
      { type: 'p', text: 'We may use the information collected to:' },
      {
        type: 'list',
        items: [
          'Respond to your enquiries and service requests',
          'Provide quotations and estimates',
          'Schedule inspections, pickup, delivery or service appointments',
          'Provide leather repair, restoration, cleaning, colour restoration and furniture care services',
          'Communicate with you regarding your order or enquiry',
          'Improve our website, services and customer experience',
          'Maintain business and service records',
          'Prevent fraud, misuse or unauthorized activity',
          'Comply with applicable legal and regulatory requirements',
          'Send promotional or marketing communications where permitted and where applicable',
        ],
      },
    ],
  },
  {
    id: 'photographs-and-videos',
    title: 'Photographs and Videos',
    blocks: [
      {
        type: 'p',
        text: 'If you voluntarily provide photographs or videos of your products for assessment, quotation or service purposes, we may use them to understand the condition of the item and determine the appropriate service.',
      },
      {
        type: 'p',
        text: 'Before using customer photographs or videos for public marketing, advertising, social media or promotional purposes, we will seek appropriate permission where required.',
      },
    ],
  },
  {
    id: 'cookies-and-tracking',
    title: 'Cookies and Tracking Technologies',
    blocks: [
      {
        type: 'p',
        text: 'Our website may use cookies and similar technologies to improve functionality, understand website usage and measure advertising performance.',
      },
      {
        type: 'p',
        text: 'We may use services such as Google Analytics, Google Ads, Meta advertising tools, Google Tag Manager or similar technologies. These services may collect information about your interaction with our website and may use cookies or similar identifiers.',
      },
      {
        type: 'p',
        text: 'You can manage or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.',
      },
    ],
  },
  {
    id: 'advertising-and-marketing',
    title: 'Advertising and Marketing',
    blocks: [
      {
        type: 'p',
        text: 'We may use online advertising platforms, including Google Ads and Meta advertising services, to promote our products and services.',
      },
      {
        type: 'p',
        text: 'These platforms may receive certain information through cookies, pixels or similar technologies in accordance with their respective privacy policies and applicable laws.',
      },
      { type: 'note', text: 'We do not sell your personal information to advertisers.' },
    ],
  },
  {
    id: 'sharing-of-information',
    title: 'Sharing of Information',
    blocks: [
      {
        type: 'p',
        text: 'We may share personal information only where reasonably necessary for operating our business, providing services, processing enquiries, maintaining our website, advertising measurement, or complying with legal obligations.',
      },
      { type: 'p', text: 'This may include sharing information with:' },
      {
        type: 'list',
        items: [
          'Service providers and technology providers',
          'Website hosting and maintenance providers',
          'Communication or messaging platforms',
          'Advertising and analytics providers',
          'Delivery, pickup or logistics partners where required',
          'Government authorities or law-enforcement agencies where legally required',
        ],
      },
      { type: 'note', text: 'We do not sell or rent your personal information as a business practice.' },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    blocks: [
      {
        type: 'p',
        text: 'We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration or disclosure.',
      },
      {
        type: 'p',
        text: 'However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.',
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining business records, resolving disputes, complying with legal obligations and protecting our legitimate business interests.',
      },
      {
        type: 'p',
        text: 'When information is no longer required, we may securely delete or anonymize it where reasonably practicable.',
      },
    ],
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites and Services',
    blocks: [
      {
        type: 'p',
        text: 'Our website may contain links or integrations to third-party websites and services, including social media, payment, messaging, advertising or other platforms.',
      },
      {
        type: 'p',
        text: 'We are not responsible for the privacy practices or content of third-party websites. We recommend reviewing the privacy policies of those third parties before providing them with personal information.',
      },
    ],
  },
  {
    id: 'your-rights-and-choices',
    title: 'Your Rights and Choices',
    blocks: [
      {
        type: 'p',
        text: 'Depending on applicable law, you may have rights regarding your personal information, including the right to request access to, correction of, or deletion of certain personal information.',
      },
      {
        type: 'p',
        text: 'You may also choose not to provide certain information. However, this may prevent us from responding to an enquiry or providing certain services.',
      },
      {
        type: 'p',
        text: 'To make a privacy-related request, you may contact us using the details provided below.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    title: 'Children’s Privacy',
    blocks: [
      {
        type: 'p',
        text: 'Our website and services are not specifically directed toward children. We do not knowingly collect personal information from children for purposes that are prohibited by applicable law.',
      },
    ],
  },
  {
    id: 'changes-to-this-policy',
    title: 'Changes to This Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'We may update this Privacy Policy from time to time to reflect changes in our business, technology, services or applicable legal requirements.',
      },
      {
        type: 'p',
        text: 'Any updated version will be published on this page with the revised effective date.',
      },
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    blocks: [
      {
        type: 'p',
        text: 'If you have any questions, concerns or requests regarding this Privacy Policy or the handling of your personal information, please contact us:',
      },
      { type: 'contact' },
    ],
  },
];

/* =====================================================================
   NAV / FOOTER LINK FIX
   Navbar + Footer use "#section" links that only exist on the home page.
   On this page we send those links to "/#section" instead, open the
   enquiry popup for Contact links, and let external links work normally.
===================================================================== */

const HOME_HASHES = new Set(['#top', '#services', '#before-after', '#about-us', '#reviews']);

/* =====================================================================
   SMALL PIECES
===================================================================== */

function OrnamentIcon({ className = '' }) {
  return (
    <div className={`relative h-5 w-[42px] ${className}`}>
      <Image src="/icons/Vector.png" alt="" fill sizes="42px" className="object-contain" aria-hidden="true" />
    </div>
  );
}

function Bullet() {
  return <span aria-hidden="true" className="mt-[10px] h-[7px] w-[7px] shrink-0 rotate-45 bg-[#B08968]" />;
}

function Block({ block }) {
  if (block.type === 'p') {
    return <p className="text-[15px] leading-[1.85] text-[#4A3A32]">{block.text}</p>;
  }

  if (block.type === 'list') {
    return (
      <ul className="flex flex-col gap-3">
        {block.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.75] text-[#4A3A32]">
            <Bullet />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === 'note') {
    return (
      <div className="flex items-start gap-3 rounded-[14px] border border-[#E6D7CD] border-l-[4px] border-l-[#B08968] bg-[#FFF8F2] px-4 py-4 sm:px-5">
        <ShieldCheck size={20} strokeWidth={1.75} className="mt-[2px] shrink-0 text-[#755244]" aria-hidden="true" />
        <p className="text-[15px] font-medium leading-[1.7] text-[#614338]">{block.text}</p>
      </div>
    );
  }

  if (block.type === 'contact') {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href={SITE.emailHref}
          className="group flex min-w-0 items-center gap-4 rounded-[16px] border border-[#E6D7CD] bg-[#FFF8F2] p-4 transition-colors duration-300 hover:border-[#B08968] hover:bg-[#FFE5CD]/60"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#69483C] text-[#FFE6D1]">
            <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A7368]">Email</span>
            <span className="mt-0.5 block break-words text-[14px] font-medium text-[#3A2821] sm:text-[15px]">{SITE.email}</span>
          </span>
        </a>

        <a
          href={SITE.phoneHref}
          className="group flex min-w-0 items-center gap-4 rounded-[16px] border border-[#E6D7CD] bg-[#FFF8F2] p-4 transition-colors duration-300 hover:border-[#B08968] hover:bg-[#FFE5CD]/60"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#69483C] text-[#FFE6D1]">
            <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A7368]">Phone</span>
            <span className="mt-0.5 block text-[14px] font-medium text-[#3A2821] sm:text-[15px]">{SITE.phone}</span>
          </span>
        </a>
      </div>
    );
  }

  return null;
}

/* =====================================================================
   PAGE
===================================================================== */

export default function PrivacyPolicy() {
  const router = useRouter();
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  /* globals.css sets `body { overflow-x: hidden }`, which stops `position: sticky`
     from working. `clip` still prevents sideways scroll but keeps sticky alive.
     Restored automatically when leaving this page. */
  useEffect(() => {
    const prev = document.body.style.overflowX;
    document.body.style.overflowX = 'clip';
    return () => {
      document.body.style.overflowX = prev;
    };
  }, []);

  /* Highlight the section currently in view */
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Fix Navbar / Footer links for a non-home page */
  const handleLinkCapture = (e) => {
    const anchor = e.target.closest ? e.target.closest('a') : null;
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';

    if (HOME_HASHES.has(href)) {
      e.preventDefault();
      e.stopPropagation();
      router.push(href === '#top' ? '/' : `/${href}`);
      return;
    }

    if (href === '#contact' || href === 'enquiry') {
      e.preventDefault();
      e.stopPropagation();
      window.dispatchEvent(new Event(OPEN_ENQUIRY_MODAL_EVENT));
      return;
    }

    if (/^https?:\/\//i.test(href)) {
      // let the browser open external links normally
      e.stopPropagation();
    }
  };

  /* Mobile TOC: close the list first, then scroll (otherwise the layout shift
     from the closing list makes the scroll land in the wrong place). */
  const goToSection = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    setTocOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }, 320);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <div onClickCapture={handleLinkCapture}>
        <Navbar />
      </div>

      <main id="top">
        {/* ============================ HERO ============================ */}
        <section className="pt-[80px] lg:pt-[88px]" style={{ background: 'linear-gradient(180deg, #FFE5CD 0%, #FFF2E6 100%)' }}>
          <Container className="pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-14">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
              <ol className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8A7368]">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#614338]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-[#614338]">
                  Privacy Policy
                </li>
              </ol>
            </nav>

            <div className="flex flex-col items-center text-center">
              <OrnamentIcon />

              <p className="mt-2 text-[14px] font-medium uppercase leading-none tracking-[0.02em] text-[#755244] sm:text-[16px]">
                Your Privacy Matters
              </p>

              <h1
                className="mt-[18px] text-center uppercase"
                style={{
                  fontFamily: "'Roboto Slab', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 7vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: '#614338',
                }}
              >
                Privacy Policy
              </h1>

              <span className="mt-6 inline-flex items-center rounded-full border border-[#B08968]/50 bg-white/60 px-5 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#755244]">
                Effective Date: {EFFECTIVE_DATE}
              </span>
            </div>
          </Container>
        </section>

        {/* ============================ BODY ============================ */}
        <section className="py-12 sm:py-16 lg:py-20" style={{ background: '#FFF8F2' }}>
          <Container>
            <div className="mx-auto max-w-[1120px]">
              <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
                {/* ---------- Mobile table of contents ---------- */}
                <div className="lg:hidden">
                  <div className="rounded-[16px] border border-[#E6D7CD] bg-white">
                    <button
                      type="button"
                      onClick={() => setTocOpen((v) => !v)}
                      aria-expanded={tocOpen}
                      aria-controls="privacy-toc-mobile"
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#614338]">On this page</span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          tocOpen ? 'bg-[#755244] text-[#FFE6D1]' : 'bg-[#FFE6D1] text-[#755244]'
                        }`}
                      >
                        <ChevronDown size={16} strokeWidth={2.5} className={`transition-transform duration-300 ${tocOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    <div
                      id="privacy-toc-mobile"
                      className={`grid overflow-hidden transition-all duration-300 ease-out ${
                        tocOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="min-h-0">
                        <ol className="flex flex-col border-t border-[#E6D7CD] px-2 py-2">
                          {SECTIONS.map((s, i) => (
                            <li key={s.id}>
                              <a
                                href={`#${s.id}`}
                                onClick={(e) => goToSection(e, s.id)}
                                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] text-[#4A3A32] transition-colors hover:bg-[#FFE6D1]/60"
                              >
                                <span className="w-6 shrink-0 text-[12px] font-semibold text-[#B08968]">{String(i + 1).padStart(2, '0')}</span>
                                {s.title}
                              </a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------- Desktop sticky table of contents ---------- */}
                <aside className="hidden lg:block">
                  <div className="sticky top-[112px] max-h-[calc(100vh-136px)] overflow-y-auto rounded-[20px] border border-[#E6D7CD] bg-white p-5 no-scrollbar">
                    <div className="mb-4 inline-block">
                      <h2 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#614338]">On this page</h2>
                      <div className="mt-1 h-[2px] w-full bg-[#B08968]/40" />
                    </div>

                    <nav aria-label="Privacy policy sections">
                      <ol className="flex flex-col gap-0.5">
                        {SECTIONS.map((s, i) => {
                          const active = activeId === s.id;
                          return (
                            <li key={s.id}>
                              <a
                                href={`#${s.id}`}
                                onClick={() => setActiveId(s.id)}
                                aria-current={active ? 'true' : undefined}
                                className={`flex items-start gap-3 rounded-[10px] border-l-[3px] px-3 py-2 text-[13.5px] leading-snug transition-colors duration-200 ${
                                  active
                                    ? 'border-l-[#B08968] bg-[#FFE6D1] font-semibold text-[#614338]'
                                    : 'border-l-transparent text-[#5A4438] hover:bg-[#FFF2E6] hover:text-[#614338]'
                                }`}
                              >
                                <span className="w-6 shrink-0 text-[12px] font-semibold text-[#B08968]">{String(i + 1).padStart(2, '0')}</span>
                                <span>{s.title}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ol>
                    </nav>
                  </div>
                </aside>

                {/* ---------- Content ---------- */}
                <article className="min-w-0 flex flex-col gap-6">
                  {/* Intro */}
                  <div className="rounded-[20px] border border-[#E6D7CD] bg-white p-6 sm:p-8">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFE6D1] text-[#755244] sm:flex">
                        <ShieldCheck size={22} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div className="flex flex-col gap-4">
                        {INTRO.map((text) => (
                          <p key={text} className="text-[15px] leading-[1.85] text-[#4A3A32] sm:text-[16px]">
                            {text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sections */}
                  {SECTIONS.map((section, index) => (
                    <section
                      key={section.id}
                      id={section.id}
                      aria-labelledby={`${section.id}-title`}
                      className="scroll-mt-[110px] rounded-[20px] border border-[#E6D7CD] bg-white p-6 sm:p-8"
                    >
                      <header className="mb-5 flex items-center gap-4">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tl-[14px] rounded-br-[14px] rounded-tr-[4px] rounded-bl-[4px] bg-[#69483C] font-display text-[15px] font-semibold text-[#FFE6D1]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h2 id={`${section.id}-title`} className="font-display text-[20px] font-bold leading-snug text-[#614338] sm:text-[24px]">
                          {section.title}
                        </h2>
                      </header>

                      <div className="flex flex-col gap-4">
                        {section.blocks.map((block, i) => (
                          <Block key={`${section.id}-${i}`} block={block} />
                        ))}
                      </div>
                    </section>
                  ))}

                  {/* Footer actions */}
                  <div className="mt-2 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                    <Button href="/" variant="secondary" className="w-full sm:w-auto">
                      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
                      Back to Home
                    </Button>

                    <Button as="button" type="button" onClick={scrollToTop} variant="primary" className="w-full sm:w-auto">
                      Back to Top
                      <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
                    </Button>
                  </div>
                </article>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <div onClickCapture={handleLinkCapture}>
        <Footer />
      </div>

      <EnquiryModal />
    </>
  );
}