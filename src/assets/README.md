# Image assets

Drop optimized source images here. Astro's `<Image>` component (via
`src/lib/images.ts`) will automatically pick them up, generate responsive
WebP/AVIF variants, and lazy-load them. If a file below is absent, the
component falls back to the original CSS gradient mockup — the site always
builds either way.

Expected files (all optional):

    hero/digital-ecosystem.webp      Homepage hero visual
    portfolio/forebear-find.webp     Forebear Find portfolio card + case study
    services/web-development.webp    Website Design service mockup
    services/marketing.webp          Online Marketing service mockup
    services/automation.webp         Business Automation service mockup

Recommended export sizes (wider is fine — Astro downsizes):
    hero            ~1200×900
    portfolio       ~1000×640  (16:10)
    services        ~900×600
