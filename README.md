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

- **Project inquiry form** — see "Contact form" below. (`ContactForm.astro`, despite
  the name, is the live-chat / call CTA block, not a form.)
- **Dark mode** persists via `localStorage` and respects the OS preference.
- All animations honor `prefers-reduced-motion`.
- Build pins Vite to 7.x (see `overrides`) so Tailwind's plugin dedupes with
  Astro 6's bundler.

## Contact form (project inquiry)

`/contact/`, `/it/contact/` and `/es/contact/` carry an asynchronous project
inquiry form alongside the existing chat / call / email options.

| Piece | Where |
| --- | --- |
| Form UI + client script | `src/components/ProjectInquiryForm.astro` |
| Copy (all three locales) | `src/i18n/content/<locale>/contact.json` → `inquiry` |
| Server endpoint `POST /api/contact` | `public/_worker.js` |
| Worker routing (scopes it to `/api/*`) | `public/_routes.json` |

`public/` is copied verbatim into `dist/`, so `_worker.js` and `_routes.json`
land at the root of the published output — where Cloudflare Pages looks for
them. Every request outside `/api/*` is served straight from static assets and
never touches the Worker.

### Required configuration

The form is **off until it is configured**, and renders nothing until then, so a
half-configured deploy can never show a broken form.

1. **Turnstile widget** — Cloudflare Dashboard → Turnstile → Add widget.
   Mode `Managed`; domains `cozelosdata.com`, `www.cozelosdata.com`, and
   `localhost` for local testing. Paste the **site key** into
   `site.turnstileSiteKey` in `src/data/site.ts` (it is public by design), then
   rebuild. Keep the **secret key** out of the repository.
2. **Email Sending** — Cloudflare Dashboard → Compute & AI → Email Service →
   Email Sending → onboard the sending domain (adds SPF/DKIM records
   automatically since DNS is already on Cloudflare). Create an API token with
   the email-sending permission.
3. **Pages environment** — Pages project `cozelodataastro` → Settings →
   Variables and Secrets (Production **and** Preview):

   | Name | Type | Value |
   | --- | --- | --- |
   | `TURNSTILE_SECRET_KEY` | Secret | Turnstile widget secret |
   | `CF_EMAIL_API_TOKEN` | Secret | API token with email-sending permission |
   | `CF_ACCOUNT_ID` | Plaintext | Cloudflare account id |
   | `CONTACT_FROM_EMAIL` | Plaintext | Sender, on the onboarded domain |
   | `CONTACT_TO_EMAIL` | Plaintext | Where inquiries are delivered |
   | `TURNSTILE_HOSTNAMES` | Plaintext | *Optional.* Comma-separated hostname allowlist; defaults to the request's own hostname |
   | `CONTACT_FROM_NAME` | Plaintext | *Optional.* Display name on the notification |

No secret belongs in this repository, in `src/`, or in client JavaScript. The
only key that appears in the page HTML is the Turnstile **site** key, which is
public by design.

### Local testing

```bash
npm run build
wrangler pages dev dist --port 8788 \
  -b TURNSTILE_SECRET_KEY=... -b CF_ACCOUNT_ID=... -b CF_EMAIL_API_TOKEN=... \
  -b CONTACT_FROM_EMAIL=... -b CONTACT_TO_EMAIL=...
```

To preview the form's layout before a real widget exists, temporarily set
`site.turnstileSiteKey` to Cloudflare's always-passes test key
`1x00000000000000000000AA`. Submissions will still be rejected (the test token
reports hostname `example.com` and carries no action), which is the correct
fail-closed behavior — never deploy with a test key.
