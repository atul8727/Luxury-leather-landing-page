import Image from "next/image";
import Container from "@/components/ui/Container";
import { EmailGlyph, PhoneGlyph } from "@/components/ui/SocialGlyphs";
import { SITE } from "@/lib/constants";
import { CITIES } from "@/data/cities";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#before-after" },
  { label: "About Us", href: "#about-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_ICONS = [
  { label: "Facebook", href: "#", src: "/icons/Group 76.png" },
  { label: "Twitter", href: "#", src: "/icons/Group 77.png" },
  { label: "LinkedIn", href: "#", src: "/icons/Group 78.png" },
  { label: "Instagram", href: "#", src: "/icons/Group 79.png" },
];

export default function Footer() {
  return (
    <footer className="bg-[#5C3D31] text-[#FFE6D1]">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* Col 1: Logo & Brand description */}
        <div className="flex flex-col gap-5 lg:col-span-1">
          <div className="relative h-28 w-[190px] sm:h-36 sm:w-[240px]">
            <Image
              src="/images/LOGO-V2.png"
              alt={SITE.name}
              fill
              sizes="240px"
              className="object-contain object-left"
            />
          </div>
          <p className="max-w-xs font-inter text-[14px] leading-relaxed text-[#FFE6D1]/80">
            {SITE.name} is a team of experienced technicians focused on quality,
            efficient, and innovative solutions. We restore and care for leather
            products, helping make resources reusable while reducing waste.
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <div className="mb-5 inline-block">
            <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-[#FFE6D1] uppercase">
              Navigation
            </h3>
            <div className="mt-1 h-[2px] w-full bg-[#FFE6D1]/30" />
          </div>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-inter text-[14px] text-[#FFE6D1]/80 transition-colors hover:text-[#FFE6D1]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services (Cities We Serve) */}
        <div>
          <div className="mb-5 inline-block">
            <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-[#FFE6D1] uppercase">
              Services
            </h3>
            <div className="mt-1 h-[2px] w-full bg-[#FFE6D1]/30" />
          </div>
          <ul className="grid grid-cols-1 gap-y-3">
            {CITIES.map((c) => (
              <li key={c} className="font-inter text-[14px] text-[#FFE6D1]/80">
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Socials */}
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-5 inline-block">
              <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-[#FFE6D1] uppercase">
                Contact
              </h3>
              <div className="mt-1 h-[2px] w-full bg-[#FFE6D1]/30" />
            </div>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-3 font-inter text-[14px] text-[#FFE6D1]/80 transition-colors hover:text-[#FFE6D1]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFE6D1]/30 text-[#FFE6D1]">
                    <EmailGlyph size={16} />
                  </span>
                  <span className="break-all">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 font-inter text-[14px] text-[#FFE6D1]/80 transition-colors hover:text-[#FFE6D1]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#FFE6D1]/30 text-[#FFE6D1]">
                    <PhoneGlyph size={16} />
                  </span>
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-4 inline-block">
              <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-[#FFE6D1] uppercase">
                Our Socials
              </h3>
              <div className="mt-1 h-[2px] w-full bg-[#FFE6D1]/30" />
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_ICONS.map(({ label, href, src }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center transition-transform hover:scale-105"
                >
                  <Image
                    src={src}
                    alt={label}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Copyright & Legal */}
      <div className="border-t border-[#FFE6D1]/15">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 font-inter text-[12px] text-[#FFE6D1]/60 sm:flex-row">
          <span>
            Copyright © {new Date().getFullYear()} {SITE.name}
          </span>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-[#FFE6D1]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#FFE6D1]">
              Terms &amp; Conditions
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
