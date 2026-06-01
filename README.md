# Cozelos Data — Astro 6 Website

Premium digital agency website for **Cozelos Data** (Vernal, Utah). Built with Astro 6, Tailwind CSS v4, and TypeScript. Static output, fully responsive, dark mode, SEO + structured data, accessibility, View Transitions, and rich interactive motion.

## Quick start

```bash
npm install
npm run build      # type-checks (astro check) then builds to dist/
npm run preview    # serve the production build locally
# or
npm run dev        # local dev server with hot reload
```

The production site is generated as static files in `dist/` — deploy that folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, etc.).

## Project structure

```
src/
  components/     Reusable .astro components (Hero, ServicesGrid, Portfolio, etc.)
  data/site.ts    Single source of truth: company info, services, projects, FAQ…
  layouts/        BaseLayout (head, fonts, View Transitions, header/footer)
  pages/          Routes: index, services, portfolio, company, contact, payment, privacy, terms
  scripts/main.ts Progressive-enhancement interactions (reveals, counters, tilt, magnetic…)
  styles/         global.css — Tailwind v4 @theme + design tokens
public/           favicon.svg, og-image.svg, robots.txt, llms.txt
```

## Editing content

Almost all copy, services, portfolio items, testimonials, FAQ, and contact
details live in **`src/data/site.ts`**. Edit there and every page updates.

## Images (optional, auto-optimized)

The site renders entirely from CSS gradient mockups and inline SVG with **zero
image files required**. To use real images, drop optimized files into
`src/assets/` and they're picked up automatically — resized, converted to
responsive WebP, lazy-loaded, and hashed by Astro's `<Image>` component.

Recognized paths (all optional; missing files fall back to the CSS mockup):

    src/assets/hero/digital-ecosystem.webp      → homepage hero visual
    src/assets/portfolio/forebear-find.webp     → Forebear Find card + case study
    src/assets/services/web-development.webp     → Website Design service card
    src/assets/services/marketing.webp           → Online Marketing service card
    src/assets/services/automation.webp          → Business Automation service card

To add more images, place the file under `src/assets/...`, then reference its
path (relative to `src/assets/`) via the optional `image` field on a service or
project in `src/data/site.ts`. The lookup/fallback is handled by
`src/lib/images.ts`. No code changes needed for the five paths above.

## Notes

- **Contact form** uses a `mailto:` fallback with client-side validation. To
  capture submissions server-side, point the form `action` in
  `src/components/ContactForm.astro` at an endpoint (Formspree, Netlify Forms, etc.).
- **Dark mode** persists via `localStorage` and respects the OS preference.
- All animations honor `prefers-reduced-motion`.
- Build pins Vite to 7.x (see `overrides`) so Tailwind's plugin dedupes with
  Astro 6's bundler.
