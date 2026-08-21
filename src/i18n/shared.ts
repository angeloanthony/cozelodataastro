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
 * body copy, the relationships between them. This module owns only the
 * localized LABEL, joined on the slug, which is the stable identifier site.ts
 * already exports and already uses for /services/#<slug> anchors. Nothing is
 * matched by array index or by the English string.
 *
 * shared.json is deliberately NOT registered in content-pages.ts: it is content
 * without a URL. The localized route filters on SLUG_BY_KEY, so it can never
 * become a page — while the validators, which read the content directory, pick
 * it up automatically and hold en/it to the same structure.
 */
import { services as SERVICE_STRUCTURE, type Service } from "../data/site";
import { getPageContent } from "./content";

export interface SharedContent {
  services: Record<string, { title: string }>;
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
  }));
}
