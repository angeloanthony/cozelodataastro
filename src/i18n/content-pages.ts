/**
 * Page registry (playbook §6.3 companion): content key <-> URL slug.
 *
 * A page appears here only once its master JSON has been extracted. Adding a
 * row is what makes a page eligible for localized routing — nothing else needs
 * to change, because every route, link and tag derives from this registry.
 *
 * Slugs are NOT localized: Italian pages live at /it/<same-slug>/. That keeps
 * one canonical slug per page across locales and matches the reference
 * implementation. The homepage uses the empty slug.
 */
export interface ContentPage {
  /** Filename stem under src/i18n/content/<locale>/ */
  key: string;
  /** URL slug, without slashes. "" is the homepage. */
  slug: string;
}

export const CONTENT_PAGES: ContentPage[] = [
  { key: "why-cozelos-data", slug: "why-cozelos-data" },
];

export const SLUG_BY_KEY: Record<string, string> = Object.fromEntries(
  CONTENT_PAGES.map((p) => [p.key, p.slug]),
);

export const KEY_BY_SLUG: Record<string, string> = Object.fromEntries(
  CONTENT_PAGES.map((p) => [p.slug, p.key]),
);
