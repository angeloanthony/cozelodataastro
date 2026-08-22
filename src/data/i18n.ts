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
    // Chrome, not shared content: this labels the header/menu button that is part
    // of the site frame. The persuasive CTA copy lives in shared.json.
    "cta.quote": "Get a Quote",
    "lang.label": "Language",
    "lang.switch": "Change language",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "skip.main": "Skip to content",
    // Accessibility labels: never rendered as visible text, but they are chrome
    // like any other string — a screen-reader user on /it/ hears the landmark
    // and control names, so they translate with the rest of the frame.
    "a11y.primaryNav": "Primary",
    "a11y.breadcrumb": "Breadcrumb",
    "a11y.theme": "Toggle dark mode",
    "a11y.menuOpen": "Open menu",
    "a11y.menuClose": "Close menu",
    // The brand name is data, not copy: it is interpolated, never translated.
    "a11y.home": "{brand} home",
    // The AiSummary callout under a page H1. Visible UI chrome, reused on every
    // page that supplies a hero summary — so it lives here, not in page JSON.
    // {phone} is data: the component splits the sentence on it and renders the
    // number as a tel: link, so a locale can put it anywhere in the sentence.
    "summary.quote": "Call {phone} for a free quote.",
    // ServicesGrid's card link label — reused across every card, on the
    // homepage and wherever else the grid renders. Chrome, not page content.
    "cta.learnMore": "Learn more",
    // ProjectCard's link labels and image-alt framing (Step 25) — reused across
    // every card, on the homepage (FeaturedProjects) and the /portfolio/ grid.
    // Chrome, not page content, exactly like cta.learnMore above.
    "card.viewProject": "View Project",
    "card.visitWebsite": "Visit Website",
    "card.viewCaseStudy": "View Case Study",
    "card.imageAltSuffix": "website by Cozelos Data",
    // Carousel/accessibility chrome (Step 29). "{n}" is a literal placeholder,
    // NOT resolved by t()'s `vars` substitution here — these three
    // "goTo*"/"…Slide" strings are read into the client-side carousel script
    // via a data attribute and the {n} is filled in per-dot at runtime
    // (PortfolioGrid.astro / FeaturedProjects.astro), the same "never
    // translate a number, interpolate at render" rule interp() applies to
    // page content, just applied client-side.
    "carousel.swipe": "Swipe",
    "carousel.goToSlide": "Go to slide {n}",
    "carousel.goToProject": "Go to project {n}",
    "testimonial.prev": "Previous testimonial",
    "testimonial.next": "Next testimonial",
    "testimonial.goTo": "Go to testimonial {n}",
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
    "cta.quote": "Richiedi un preventivo",
    "lang.label": "Lingua",
    "lang.switch": "Cambia lingua",
    "footer.services": "Servizi",
    "footer.company": "Azienda",
    "footer.contact": "Contatti",
    "skip.main": "Vai al contenuto",
    "a11y.primaryNav": "Principale",
    "a11y.breadcrumb": "Percorso di navigazione",
    "a11y.theme": "Attiva/disattiva la modalità scura",
    "a11y.menuOpen": "Apri il menu",
    "a11y.menuClose": "Chiudi il menu",
    "a11y.home": "Home di {brand}",
    "summary.quote": "Chiamaci al {phone} per un preventivo gratuito.",
    "cta.learnMore": "Scopri di più",
    "card.viewProject": "Vedi il progetto",
    "card.visitWebsite": "Visita il sito",
    "card.viewCaseStudy": "Vedi il case study",
    "card.imageAltSuffix": "sito web di Cozelos Data",
    "carousel.swipe": "Scorri",
    "carousel.goToSlide": "Vai alla slide {n}",
    "carousel.goToProject": "Vai al progetto {n}",
    "testimonial.prev": "Testimonianza precedente",
    "testimonial.next": "Testimonianza successiva",
    "testimonial.goTo": "Vai alla testimonianza {n}",
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
