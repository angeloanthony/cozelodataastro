/**
 * The heart of the multilingual system (playbook §6.3).
 *
 * Everything existence-aware flows from here: a localized route, hreflang entry,
 * sitemap alternate, switcher option or internal link is emitted ONLY when the
 * translated content actually exists. Otherwise it falls back to the master.
 * Nothing can 404.
 *
 * This file reads committed JSON only. It never contacts an API, so the build
 * stays deterministic, offline-capable and CI-safe.
 */
import { DEFAULT_LOCALE, LOCALES } from "../data/i18n";
import { CONTENT_PAGES, KEY_BY_SLUG } from "./content-pages";

type Json = Record<string, any>;

const files = import.meta.glob<Json>("./content/*/*.json", {
  eager: true,
  import: "default",
});

const load = (locale: string, page: string): Json | undefined =>
  files[`./content/${locale}/${page}.json`];

/** Locales that actually have this page (master always counts). */
export function getAvailableLocales(page: string): string[] {
  return LOCALES.map((l) => l.code).filter(
    (c) => c === DEFAULT_LOCALE || !!load(c, page),
  );
}

/**
 * URL for a page in a locale — localized if that translation exists, else the
 * master URL. This is why a link can never 404.
 */
export function localePageHref(slug: string, locale: string): string {
  const key = KEY_BY_SLUG[slug];
  const localized =
    locale !== DEFAULT_LOCALE && !!key && getAvailableLocales(key).includes(locale);
  const prefix = localized ? `/${locale}` : "";
  return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

/**
 * Rewrite one href so it stays in-locale. External URLs, tel:, mailto:,
 * fragments, query strings and asset paths are left untouched.
 */
export function localizeHref(href: string, locale: string): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/") || href.startsWith("//")) return href;
  const i = href.search(/[?#]/);
  const path = i === -1 ? href : href.slice(0, i);
  const rest = i === -1 ? "" : href.slice(i);
  const slug = path.replace(/^\/+|\/+$/g, "");
  // The root is routed through localePageHref like any other slug, so it is
  // existence-aware too: until the homepage is translated, "/" stays "/".
  // Special-casing it here produced a link to a non-existent /it/ (QA catch).
  if (slug === "") return localePageHref("", locale) + rest;
  return slug in KEY_BY_SLUG ? localePageHref(slug, locale) + rest : href;
}

/**
 * Rewrite every href inside an HTML-bearing copy string (playbook §3, type 1:
 * HTML-bearing copy is stored as an HTML string and rendered via set:html).
 * Without this, links embedded in prose would leak out of the locale.
 */
export function localizeHtml(html: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) return html;
  return html.replace(/href="([^"]+)"/g, (m, h) => `href="${localizeHref(h, locale)}"`);
}

/** Recursively localize every href-bearing string in a content object. */
function deepLocalizeHrefs<T>(node: T, locale: string): T {
  if (typeof node === "string") return node as T;
  if (Array.isArray(node)) return node.map((n) => deepLocalizeHrefs(n, locale)) as T;
  if (node && typeof node === "object") {
    const out: Json = {};
    for (const [k, v] of Object.entries(node as Json)) {
      if (typeof v === "string" && (k === "href" || k === "url")) out[k] = localizeHref(v, locale);
      // Convention: any key ending in "Html" holds markup whose hrefs must also move.
      else if (typeof v === "string" && k.endsWith("Html")) out[k] = localizeHtml(v, locale);
      else out[k] = deepLocalizeHrefs(v, locale);
    }
    return out as T;
  }
  return node;
}

/** Load a page's content for a locale, falling back to master. */
export function getPageContent<T = Json>(page: string, locale: string): T {
  const master = load(DEFAULT_LOCALE, page);
  if (!master) throw new Error(`Missing master content: ${page}`);
  if (locale === DEFAULT_LOCALE) return master as T;
  return deepLocalizeHrefs((load(locale, page) ?? master) as T, locale);
}

/** Every committed (locale, page) pair that is NOT the master — drives routing. */
export function getLocalizedContent(): { locale: string; page: string }[] {
  return Object.keys(files)
    .map((k) => k.match(/^\.\/content\/([^/]+)\/([^/]+)\.json$/))
    .filter((m): m is RegExpMatchArray => !!m && m[1] !== DEFAULT_LOCALE)
    .map((m) => ({ locale: m[1], page: m[2] }));
}

/** hreflang entries for a page: every existing locale plus x-default -> master. */
export function hreflangAlternates(slug: string) {
  const key = KEY_BY_SLUG[slug];
  const codes = key ? getAvailableLocales(key) : [DEFAULT_LOCALE];
  // Explicit annotation, not inference: LOCALES is `as const`, so the inferred
  // element type would be the narrow hreflang union and pushing "x-default"
  // below fails to compile (playbook §10, "broadening a TS union breaks as const").
  const rows: { hreflang: string; href: string }[] = codes.map((c) => ({
    hreflang: LOCALES.find((l) => l.code === c)!.hreflang,
    href: localePageHref(slug, c),
  }));
  rows.push({ hreflang: "x-default", href: localePageHref(slug, DEFAULT_LOCALE) });
  return rows;
}

/** Registered pages — exported for tooling/validation. */
export const REGISTERED_PAGES = CONTENT_PAGES;

/**
 * Interpolate {token} placeholders from the data layer into a content string
 * (playbook §6.8, "never translate a number").
 *
 * Prices, phone numbers, addresses and dates must not appear literally in a
 * translated file — they would go stale in one language and not the other, and
 * a translator has no business rewriting them. They live in src/data/*, are
 * written into the master as {tokens}, and are substituted here at render time.
 * The engine validates placeholder parity, so a dropped token fails the build
 * rather than silently rendering "{phone}" to a visitor.
 */
export function interp(s: string, vars: Record<string, string | number>): string {
  let out = s;
  for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
  return out;
}
