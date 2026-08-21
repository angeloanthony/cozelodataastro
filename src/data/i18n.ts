/**
 * Locale registry + pure helpers (playbook §6.2).
 *
 * English is the master language: it is the only content anyone edits by hand.
 * Italian is generated. Nothing here reads the filesystem or contacts an API —
 * these are pure functions so they are safe to call from any component.
 */

export interface LocaleMeta {
  code: string;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
  ogLocale: string;
  /** hreflang value emitted in <link rel="alternate"> and the sitemap. */
  hreflang: string;
}

export const LOCALES = [
  { code: "en", name: "English", flag: "US", dir: "ltr", ogLocale: "en_US", hreflang: "en-US" },
  { code: "it", name: "Italiano", flag: "IT", dir: "ltr", ogLocale: "it_IT", hreflang: "it-IT" },
] as const satisfies readonly LocaleMeta[];

export const DEFAULT_LOCALE = "en";
export type Locale = (typeof LOCALES)[number]["code"];

export function getLocaleMeta(code: string): LocaleMeta {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/** "/it/services/" -> "it"; anything else -> "en". */
export function getLangFromUrl(url: URL): Locale {
  const seg = url.pathname.split("/").filter(Boolean)[0];
  const hit = LOCALES.find((l) => l.code === seg && l.code !== DEFAULT_LOCALE);
  return (hit?.code ?? DEFAULT_LOCALE) as Locale;
}

export function isRtl(code: string) {
  return getLocaleMeta(code).dir === "rtl";
}

/**
 * Application chrome — playbook §2, domain 2. Nav, buttons, footer headings and
 * aria labels live here, NOT in page JSON, so they are translated once per
 * locale instead of re-translated per page (which is how they drift).
 *
 * Hand-authored. The AI engine never touches this file.
 */
export const strings = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.why": "Why Us",
    "nav.pricing": "Investment",
    "nav.portfolio": "Portfolio",
    "nav.company": "Company",
    "nav.contact": "Contact",
    "nav.menu": "Menu",
    "cta.start": "Start Your Project",
    "cta.work": "See the Work",
    "cta.call": "Schedule a Call",
    "lang.label": "Language",
    "lang.switch": "Change language",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "skip.main": "Skip to content",
  },
  it: {
    "nav.home": "Home",
    "nav.services": "Servizi",
    "nav.why": "Perché noi",
    "nav.pricing": "Investimento",
    "nav.portfolio": "Portfolio",
    "nav.company": "Azienda",
    "nav.contact": "Contatti",
    "nav.menu": "Menu",
    "cta.start": "Inizia il tuo progetto",
    "cta.work": "Guarda i lavori",
    "cta.call": "Prenota una chiamata",
    "lang.label": "Lingua",
    "lang.switch": "Cambia lingua",
    "footer.services": "Servizi",
    "footer.company": "Azienda",
    "footer.contact": "Contatti",
    "skip.main": "Vai al contenuto",
  },
} as const;

type StringKey = keyof (typeof strings)["en"];

/** UI-string lookup with master fallback. Never returns undefined. */
export function t(key: StringKey, locale: string = DEFAULT_LOCALE, vars?: Record<string, unknown>) {
  const dict = (strings as Record<string, Record<string, string>>)[locale] ?? strings.en;
  let s = dict[key] ?? strings.en[key] ?? String(key);
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

/** Swap the locale prefix on a path — used by the language switcher. */
export function switchLocalePath(currentPath: string, target: string) {
  const segs = currentPath.split("/").filter(Boolean);
  if (segs[0] && LOCALES.some((l) => l.code === segs[0] && l.code !== DEFAULT_LOCALE)) segs.shift();
  const rest = segs.join("/");
  const prefix = target === DEFAULT_LOCALE ? "" : `/${target}`;
  return rest ? `${prefix}/${rest}/` : `${prefix}/`;
}
