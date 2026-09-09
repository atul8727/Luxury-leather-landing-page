# Luxury Leather and Furniture Care — Website

A production-ready Next.js (App Router) single-page website for Luxury Leather and
Furniture Care, built from the supplied design reference.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it. To build for production:

```bash
npm run build
npm run start
```

## What's included

- **Single landing page** with smooth-scroll navigation: `/#services`, `/#cities`,
  `/#before-after`, `/#about-us`, `/#reviews`, `/#contact`
- **Sections**: Hero, About, Services (13 cards), Before &amp; After (draggable
  comparison slider), Cities, Maisons We Restore, 4-step Process, Reviews, More
  Services, FAQ, final CTA, Contact form, Footer
- **Promo popup modal** — opens automatically ~2.5s after the page loads, with a
  lead-capture form; won't reopen again in the same browser session once dismissed
- **Social icon rail** on the hero's right edge (Instagram / Facebook / WhatsApp /
  YouTube — custom minimal icons, since the platform's logo icon set doesn't ship
  brand marks)
- Brand colours, gradients and section backgrounds wired up exactly as specified
  (navbar `#614338`, hero/services gradient, results `#69483C`, maisons `#FFF8F2`)
- Playfair Display + Jost, self-hosted (no external font requests at build or
  runtime)

## Replacing the placeholder content

Every image in `public/images/` is a **generated placeholder** (soft brand-toned
graphics with a text label) so the site is fully navigable and visually complete
before real photography is available. To swap in real photos/video:

1. Drop replacement files into the matching `public/images/<folder>/` path, keeping
   the same filename (or update the path in the matching file under `src/data/`).
2. For the hero, once you have a real video, swap the `<Image>` in
   `src/components/sections/Hero/Hero.jsx` for a `<video>` element (autoplay, muted,
   loop, `playsInline`, with the current image as a `poster` fallback).

## Editing content

All repeated card/list content lives in `src/data/*.js` — services, before/after
pairs, maisons/brands, reviews, process steps, service categories, FAQs and cities.
Edit those files rather than the components to update copy.

## Project structure

```
src/
├── app/            → Next.js routes, layout, global styles, fonts
├── components/
│   ├── ui/         → Button, Container, SectionHeading, Badge, Card, social icons
│   ├── layout/     → Navbar, MobileMenu, Footer
│   ├── modal/      → PromoModal (popup lead form)
│   └── sections/   → one folder per landing-page section
├── data/           → all repeated content, as plain JS arrays
├── hooks/          → useScrollToSection, useMediaQuery
└── lib/            → constants (nav items, site info), small utils
```
