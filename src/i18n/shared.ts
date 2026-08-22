/**
 * Shared cross-page content (playbook §2, domain 3).
 *
 * The three translation domains, kept strictly separate:
 *   domain 1  page content    src/i18n/content/<locale>/<page>.json
 *   domain 2  application chrome  src/data/i18n.ts  (strings / t)
 *   domain 3  shared content   src/i18n/content/<locale>/shared.json  <- here
 *
 * A string belongs here when it is user-visible AND appears on more than one
 * page, so translating it per page would let the copies drift. The six service
 * titles are the first case: they render in the footer of every page and again
 * on /services/.
 *
 * src/data/site.ts keeps owning service STRUCTURE — order, slug, icon, imagery,
 * the relationships between them. This module owns the localized LABEL and
 * one-line teaser, joined on the slug, which is the stable identifier site.ts
 * already exports and already uses for /services/#<slug> anchors. Nothing is
 * matched by array index or by the English string.
 *
 * `short` joined Step 24 (Services page localization) for the same reason as
 * `title`: it renders in more than one place — the homepage's ServicesGrid
 * card AND the Service JSON-LD `description` field on /services/ — so
 * translating it per-page would let the copies drift. The full per-service
 * body copy (problem/why/results/value/benefits/process/deliverables/cta) is
 * single-consumer (only /services/ renders it) and lives in
 * src/i18n/content/<locale>/services.json instead, exactly like Step 21 moved
 * FAQ q/a there.
 *
 * shared.json is deliberately NOT registered in content-pages.ts: it is content
 * without a URL. The localized route filters on SLUG_BY_KEY, so it can never
 * become a page — while the validators, which read the content directory, pick
 * it up automatically and hold en/it to the same structure.
 *
 * `projects` joined Step 25 (Portfolio localization) for the same reason as
 * the service `title`/`short`: category, tagline and summary each render in
 * more than one place — ProjectCard.astro (homepage FeaturedProjects AND the
 * /portfolio/ grid) and, for `category`, the case-study section of
 * PortfolioPage.astro too. Single-consumer project prose (overview/challenge/
 * strategy/solution/outcome/businessImpact/results) is only ever read by
 * PortfolioPage.astro and lives in src/i18n/content/<locale>/portfolio.json
 * instead, exactly like `services.json` holds the single-consumer service body.
 * Project identity (slug, name, accent, image, liveUrl, featured, stack) stays
 * in src/data/site.ts, never translated — joined here by `slug`, never by
 * array position.
 */
import {
  services as SERVICE_STRUCTURE,
  type Service,
  projects as PROJECT_STRUCTURE,
  type Project,
} from "../data/site";
import { getPageContent } from "./content";

export interface SharedContent {
  /**
   * Locale-aware Organization/ProfessionalService JSON-LD `description`
   * (Step 29). Read by Seo.astro instead of the hardcoded `site.description`,
   * so the graph's description renders in Italian on Italian pages. The
   * English value is `site.description` verbatim — nothing about the English
   * output changes; only the Italian locale gains a real translation instead
   * of silently inheriting the English string.
   */
  schemaDescription: string;
  services: Record<string, { title: string; short: string }>;
  /**
   * Presentation of shared business data. The values themselves live in
   * src/data/site.ts and are interpolated in — a translator frames them,
   * never rewrites them. Placeholder parity is enforced by the engine, so a
   * locale cannot silently drop the opening time or the timezone.
   */
  business: { hours: string };
  /** Site-wide footer copy — rendered on every page, so it is shared, not page content. */
  footer: {
    brandHeadline: string;
    tagline: string;
    locality: string;
    description: string;
    review: string;
    about: string;
    ellen: string;
    why: string;
    approach: string;
    faq: string;
    government: string;
    payment: string;
    privacy: string;
    terms: string;
    sitemap: string;
    /** Placeholders {year} and {brand} — interpolate, never translate a number or the brand. */
    copyright: string;
  };
  /**
   * Reusable CTA copy. These are persuasive marketing prose reused across many
   * pages, so they are shared content (domain 3), not chrome. The header's
   * "Get a Quote" button label stays in the chrome dictionary: it is part of the
   * site frame, not page copy.
   *
   * `start` / `work` are the DEFAULTS for CTASection. A caller that passes its
   * own label still wins — page-specific copy outranks the shared default.
   */
  cta: { start: string; work: string; call: string; callNote: string };
  /**
   * Localized project label + teaser + result badges, keyed by `Project.slug`
   * (site.ts). `tagline` is optional — only the projects that carry one in
   * site.ts carry one here; ProjectCard's `tagline ?? summary` fallback applies
   * after localization, same as before it.
   *
   * `results` lives here rather than in portfolio.json because ProjectCard.astro
   * (full variant) renders it too, not just PortfolioPage.astro's case-study
   * section — the same "read from more than one file" rule that put category/
   * tagline/summary here. Metric values that are pure notation ("30+", "<1s",
   * "24/7") are identical in every locale; only the word-based ones translate.
   */
  projects: Record<
    string,
    { category: string; tagline?: string; summary: string; results: { metric: string; label: string }[] }
  >;
}

/** The shared content object for a locale, falling back to master per file. */
export const getShared = (locale: string): SharedContent =>
  getPageContent<SharedContent>("shared", locale);

/**
 * site.ts services with `title` replaced by the localized label. A drop-in
 * replacement for importing `services` directly — every consumer keeps reading
 * `s.title` and gets the right language for free.
 *
 * The `?? s.title` fallback means a service added to site.ts but not yet to
 * shared.json renders its English title instead of blank. That is a safety net,
 * not the contract: scripts/i18n-check.mjs fails the build-time check when
 * site.ts and shared.json disagree, so the gap is reported rather than shipped.
 */
export function getServices(locale: string): Service[] {
  const shared = getShared(locale);
  return SERVICE_STRUCTURE.map((s) => ({
    ...s,
    title: shared.services?.[s.slug]?.title ?? s.title,
    short: shared.services?.[s.slug]?.short ?? s.short,
  }));
}

/**
 * site.ts projects with `category`/`tagline`/`summary` replaced by the
 * localized versions. Same drop-in shape as getServices: every consumer keeps
 * reading `p.category` / `p.tagline` / `p.summary` and gets the right
 * language for free. Identity fields (slug, name, accent, image, liveUrl,
 * featured, stack) are never touched — they pass through unchanged.
 *
 * The `?? p.category` / `?? p.summary` fallbacks are a safety net for a
 * project added to site.ts but not yet translated, not the contract — see the
 * getServices doc comment above for why.
 */
export function getProjects(locale: string): Project[] {
  const shared = getShared(locale);
  return PROJECT_STRUCTURE.map((p) => ({
    ...p,
    category: shared.projects?.[p.slug]?.category ?? p.category,
    tagline: shared.projects?.[p.slug]?.tagline ?? p.tagline,
    summary: shared.projects?.[p.slug]?.summary ?? p.summary,
    results: shared.projects?.[p.slug]?.results ?? p.results,
  }));
}
