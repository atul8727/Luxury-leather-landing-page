import { Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { InstagramGlyph, FacebookGlyph, WhatsAppGlyph, YouTubeGlyph } from "@/components/ui/SocialGlyphs";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
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

const iconFor = (label) => {
  switch (label) {
    case "Instagram":
      return InstagramGlyph;
    case "Facebook":
      return FacebookGlyph;
    case "YouTube":
      return YouTubeGlyph;
    default:
      return WhatsAppGlyph;
  }
};

export default function Footer() {
  return (
    <footer className="bg-navbar text-navbar-text">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-1">
          <span className="font-display text-[22px] font-semibold">Luxury Leather</span>
          <p className="max-w-xs text-[14px] leading-relaxed text-navbar-text/75">
            {SITE.name} is a team of experienced technicians focused on quality, efficient, and
            innovative solutions. We restore and care for leather products, helping make
            resources reusable while reducing waste.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {SOCIAL_LINKS.map(({ label, href }) => {
              const Icon = iconFor(label);
              return (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-navbar-text/25 transition-colors hover:bg-navbar-text/10"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[13px] font-medium tracking-[0.14em] text-navbar-text/60 uppercase">
            Navigation
          </h3>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[14px] text-navbar-text/85 hover:text-navbar-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[13px] font-medium tracking-[0.14em] text-navbar-text/60 uppercase">
            Cities We Serve
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
            {CITIES.map((c) => (
              <li key={c} className="text-[14px] text-navbar-text/85">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[13px] font-medium tracking-[0.14em] text-navbar-text/60 uppercase">
            Contact
          </h3>
          <ul className="flex flex-col gap-4">
            <li>
              <a href={SITE.emailHref} className="flex items-center gap-2 text-[14px] text-navbar-text/85 hover:text-navbar-text">
                <Mail size={16} strokeWidth={1.75} />
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 text-[14px] text-navbar-text/85 hover:text-navbar-text">
                <Phone size={16} strokeWidth={1.75} />
                {SITE.phone}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-navbar-text/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-[12px] text-navbar-text/60 sm:flex-row">
          <span>Copyright © {new Date().getFullYear()} Luxury Leather and Furniture Care</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-navbar-text">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-navbar-text">
              Terms &amp; Conditions
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
