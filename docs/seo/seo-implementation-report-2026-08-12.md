# Cozelos Data — SEO Implementation Report 01

## Baseline, Evidence, Architecture & Opportunity Audit

**Date:** 2026-08-12 · **Scope:** Audit only — no files modified, nothing committed, nothing deployed
**Baseline reference:** [cozelos-seo-master-context.md](cozelos-seo-master-context.md) — read in full before this document
**Method:** Repository inspection · rendered-build analysis (`dist/`) · GSC exports · live HTTP verification · SERP research

---

## 1. Executive assessment

The site is **technically well built and strategically well positioned. It has almost no topical surface.**

That is the entire finding in one sentence, and everything below elaborates it.

Ten indexable pages carry roughly **14,000 words of content between them**. Six services share a single URL, giving each about 270 words. `/services/` — the commercial core of the business — returned **zero query rows** in its page-filtered GSC export. The homepage returned **one** row: `datazeo`, one impression, position 46.

Meanwhile the domain's only real search visibility sits on **three legacy WordPress URLs** that no longer exist as pages.

So this is not an optimization problem. Nothing on the current site is meaningfully competing yet — which is unusual, and good news: there is no accumulated damage to undo. The technical foundation is clean, the schema graph is properly constructed, canonicals are correct, and the positioning is coherent.

**The bottleneck is that the site has not yet been given anything to rank with.**

Three findings are more consequential than the rest:

1. **A `www.` host variant is being indexed separately** (`www.cozelosdata.com/services/`, 41 impressions). Host duplication is splitting an already-tiny signal.
2. **Every H1 on the site is a brand statement with no topical overlap with its own title tag.** `/services/` is titled *"Web Design, SEO & Marketing Services in Vernal, UT"* and headed *"Six disciplines. One system built to grow your business."*
3. **78% of impressions are desktop** (206 vs 59 mobile). For a local service business that ratio is inverted, and it corroborates the identity investigation: the current visibility is not local-consumer intent.

The largest verified opportunity is **not** new content clusters. It is that eight genuine Utah client builds are currently rendered as portfolio cards rather than as case studies — first-party evidence that no competitor in this market can copy.

---

## 2. Verified business/entity baseline

Per master context §29, claims are sorted into three categories. **Only 🟢 VERIFIED claims may appear as factual SEO premises.**

### 🟢 VERIFIED — safe to use

| Claim | Evidence |
|---|---|
| Digital agency in Vernal, Utah | Site, GBP, third-party databases (ZoomInfo, aiHit) |
| NAP: 431 East Main St. Suite 201, Vernal UT 84078 · (435) 219-5120 · Mon–Fri 9–5 MT | `site.ts`, rendered sitewide, schema |
| Six services as currently described | `site.ts:90–314`, rendered, `llms.txt` |
| Pricing: $2,500 / $4,500 / $7,500 / $10,000–$30,000+ scoped; monthly $295 / $495 / $795 / $1,500+; $500 Discovery credited | `pricing.astro:16–141`, FAQ |
| Client owns domain, hosting, source code, content | FAQ, stated sitewide |
| Eight completed client builds with live URLs | `site.ts:339–582`; all eight resolve |
| Static Astro build, fast delivery | Verified: `output: "static"`, Astro 6.4.2 |
| WCAG 2.1 AA / Section 508 accessibility as a build standard | Stated as build practice, not a certification |
| Founded by Ellen Cozelos | Consistent across all four site eras |
| "Making Businesses Stronger. Making Life Better." | **Documented since 2019 Huntsville site** |
| Woman-Owned Small Business | Consistent 2019 → present |
| CAGE 897W0 · DUNS 059220399 | Published 2019 → present, unchanged |

### 🟡 STRATEGIC — may guide architecture; not a factual claim

- "Digital assets that grow businesses" — positioning, not a verifiable attribute
- "Fast. Secure. Built to Rank." — brand promise; *speed* is measurable, *ranks* is not a guarantee
- Website builds as the anchor product with five attaching services — stated by the owner side, **attach rate unconfirmed**
- Five authority pillars (1–4 actionable, 5 frozen)
- Uintah Basin / Eastern Utah as the real market
- The 60–90 day ranking-improvement claim — a typical outcome, currently unevidenced by first-party data

### 🔴 BLOCKED / UNVERIFIED — must not be used as SEO premises

| Claim | Why blocked |
|---|---|
| **Master's degree, Columbia University** | 2019 company site stated **B.S. Computer Science**. Currently asserted in `Person` schema `alumniOf`. Unresolved |
| **"NASA and Department of Defense" / "aerospace"** framing | The documented 2019 version (U.S. Army, NASA, Army Corps of Engineers; data systems; named roles) is more specific and more defensible. Current framing unverified |
| **Federal past performance of any kind** | USAspending: zero prime contracts, zero IDVs, zero subawards, 2007→present |
| **"SAM Ready" / active registration** | Not publicly discoverable. Public search returns nothing for the company or CAGE 897W0 |
| **"DUNS / UEI Active"** | Site publishes a DUNS only; no `uei` field exists. DUNS retired for federal award use April 2022 |
| **Cybersecurity as a sellable service** | Historical only. Current expression is build hardening + $295/mo monitoring |
| **Enterprise / systems engineering capability** | Historical (Era 1–3). No current commercial expression |
| **Government contracting as an active practice** | Credentialed; no award record; capability and capacity unconfirmed |
| **Delivery capacity beyond the founder** | Historically a staffed firm; **current bench unknown** |
| **Legacy rankings as demand evidence** | 17 exposed impressions. Position 1 at 1–3 impressions is *association*, not demand |
| Testimonials as schema `Review`/`AggregateRating` | Three testimonials exist on-site; provenance not verified for structured data |

**Do not fill any gap above by inference.**

---

## 3. Current URL inventory

13 routes + `404`. Ten indexable, three `noindex, follow`, correctly excluded from the sitemap.

| URL | Type | Title (len) | Desc len | H1 | Words | Schema beyond base | Verdict |
|---|---|---|---|---|---|---|---|
| `/` | Home | Web Design & SEO in Vernal, Utah — Custom Sites That Rank (72) | **174** ⚠ | We Build Digital Assets That Grow Businesses. | 1,846 | FAQPage ⚠, Person | Improve |
| `/services/` | Service hub | Web Design, SEO & Marketing Services in Vernal, UT (65) | 162 | Six disciplines. One system built to grow your business. | 1,607 | **Service ×6** | **Frozen (F7)** |
| `/pricing/` | Commercial | Investment & Pricing — Web Design Growth Plans, Vernal UT (72) | **182** ⚠ | An investment in growth — priced for return. | 1,255 | Breadcrumb | Improve |
| `/portfolio/` | Proof | Utah Web Design Portfolio — Real Business Results (64) | **181** ⚠ | Real businesses. Real transformations. | 1,960 | Breadcrumb | **Biggest opportunity** |
| `/why-cozelos-data/` | Persuasion | Why Cozelos Data — A Digital Asset, Not Just a Website (54) | **176** ⚠ | Most agencies sell you a website. We hand you an asset. | 1,102 | Breadcrumb | Improve |
| `/our-approach/` | Method | Our Approach — How Cozelos Data Builds Digital Assets (53) | 156 | Four stages between a stranger and a customer. | 1,052 | Breadcrumb | Improve |
| `/company/` | Entity | About Cozelos Data — Enterprise Expertise, Built in Utah (56) | 143 | Enterprise expertise, built for the businesses that matter. | 1,360 | Breadcrumb | ⚠ contains blocked claims |
| `/ellen-cozelos/` | Person entity | Ellen Cozelos — Founder of Cozelos Data \| Technology Leader (59) | 150 | Enterprise technology, brought home to the businesses that matter. | 1,344 | **Person + CollegeOrUniversity** ⚠ | ⚠ blocked credential |
| `/faq/` | Support | Frequently Asked Questions — Cozelos Data (41) | 158 | Everything you actually want to ask. | 1,657 | **FAQPage** | Improve |
| `/contact/` | Conversion | Contact Cozelos Data — Let's Build Something That Lasts (55) | **174** ⚠ | Let's build something that lasts. | 542 | Breadcrumb | Leave |
| `/payment/` | Utility | Pay Your Invoice — Cozelos Data (31) | 123 | Pay your invoice securely. | 438 | noindex | Leave |
| `/privacy/` | Legal | Privacy Policy (29) | 63 | Privacy Policy | 488 | noindex | Leave |
| `/terms/` | Legal | Terms of Service (31) | 68 | Terms of Service | 528 | noindex | Leave |

**Total indexable content: ~13,700 words across 10 pages.**

### 3b. Intent and hierarchy per URL

Indexable pages only. **Editorial inbound** counts links inside `<main>` only, excluding global nav and footer.

| URL | Primary topic | Search intent | Geo intent | Commercial intent | Editorial inbound | Parent | Children / supporting | Verdict |
|---|---|---|---|---|---|---|---|---|
| `/` | Digital agency, Vernal UT | Navigational + commercial | **Explicit** — Vernal, Utah in title | **High** — price + CTA above fold | 12 | — (root) | `/services/`, `/portfolio/`, `/pricing/`, `/contact/` | **Improve** |
| `/services/` | Six digital services | Commercial investigation | **Explicit** — "in Vernal, UT" | **High** — every section ends in a CTA | 8 | `/` | Six `#anchor` sections (no child URLs) | **Frozen — F7** |
| `/pricing/` | Cost of web design / plans | **Transactional** | Implicit — "Vernal UT" in title only | **Highest on site** — 8 prices | 6 | `/` | `/faq/` (Pricing category) | **Improve** |
| `/portfolio/` | Utah client work, 8 builds | Commercial investigation + trust | **Explicit** — "Utah" in title | Medium — proof, not offer | 8 | `/` | 8 projects (no child URLs) | **Improve — biggest opportunity** |
| `/why-cozelos-data/` | Differentiation, objections | Commercial investigation | None | Medium — persuasion | **2** ⚠ | `/` | `/our-approach/`, `/faq/` | **Improve** |
| `/our-approach/` | Method — the Cozelos Method | Informational | None | Low — methodology | **2** ⚠ | `/why-cozelos-data/` (logical) | `/services/` | **Improve** |
| `/company/` | Business entity, story | Navigational + trust | **Explicit** — "Built in Utah" | Low | **2** ⚠ | `/` | `/ellen-cozelos/` | ⚠ **Contains blocked claims** |
| `/ellen-cozelos/` | Founder, E-E-A-T | Navigational (brand/person) | Implicit | Low | **2** ⚠ | `/company/` | — | ⚠ **Blocked credential** |
| `/faq/` | 25 objection answers | **Informational — commercial-intent questions** | None | Medium — pre-sale objections | 4 | `/` | Should link to service anchors | **Improve** |
| `/contact/` | Conversion | **Transactional** | **Explicit** — address, map | **Conversion endpoint** | 10 | `/` | — | **Leave as is** |
| `/payment/` | Invoice payment | Transactional (existing clients) | None | Post-sale | 0 | — | — | **Leave — noindex correct** |
| `/privacy/` | Legal | Informational | None | None | 0 | — | — | **Leave — noindex correct** |
| `/terms/` | Legal | Informational | None | None | 0 | — | — | **Leave — noindex correct** |

**Three observations from the intent columns:**

1. **`/pricing/` carries the highest commercial intent on the site and only implicit geographic intent.** It is the page most likely to capture *"how much does a website cost"* demand and it has no `Offer` schema — see §7 S6.
2. **`/faq/` is misclassified by its own structure.** It is treated as a support page, but 25 answers about cost, timeline, ownership, and ranking are commercial-intent content sitting behind an informational presentation with no topical H2s.
3. **Four pages carry a real topic and only 2 editorial inbound links each.** No page on the site has zero indexable inbound (global nav guarantees a floor), so there are no true orphans — but `/company/`, `/why-cozelos-data/`, `/our-approach/`, and `/ellen-cozelos/` are functionally orphaned in the editorial layer, which is the layer that expresses hierarchy.

### Non-canonical URLs currently indexed

| URL | Impressions | Avg position | Status |
|---|---|---|---|
| `/?page_id=158` (old Contact) | 131 | 13.63 | Serves homepage; self-canonical to `/` ✓ |
| `/?page_id=262` (old Company) | 57 | 2.60 | Serves homepage; self-canonical to `/` ✓ |
| `/?page_id=866` (**unidentified**) | 46 | 2.74 | Serves homepage; self-canonical to `/` ✓ |
| **`www.cozelosdata.com/services/`** | 41 | 2.61 | ⚠ **Host duplication — see §5** |

Every page verified as returning HTTP 200 with a correct self-referential canonical. **No action required on the three `page_id` URLs** — consolidation is already correctly signalled. Frozen per master context §30.

---

## 4. Current information architecture

```
/                          ← 1,846 w
├── /services/             ← 1,607 w — SIX services on ONE URL (~270 w each)
├── /why-cozelos-data/     ← 1,102 w
├── /pricing/              ← 1,255 w
├── /portfolio/            ← 1,960 w — EIGHT case studies on ONE URL (~245 w each)
├── /company/              ← 1,360 w
│   └── /ellen-cozelos/    ← 1,344 w  (not in nav)
├── /our-approach/         ← 1,052 w  (not in nav)
├── /faq/                  ← 1,657 w  (not in nav)
└── /contact/              ←   542 w
```

### Does it express the strategic model?

| Model element | Expressed? |
|---|---|
| Brand: Cozelos Data | ✅ Strongly and consistently |
| Core proposition: digital assets that grow businesses | ✅ H1, hero, `llms.txt`, schema `slogan` |
| **Core capability: website/digital asset development as anchor** | ❌ **Not expressed.** Website Design is service `01` of six, given identical structural weight |
| Supporting capabilities as attachments | ❌ Presented as six equals |
| Geographic market | ⚠️ Partial — Vernal strong; Uintah Basin appears in `areaServed` and prose but has no page |
| Proof | ⚠️ Present but compressed — eight builds as cards, not case studies |

**Discrepancy to report before any restructuring (as instructed):**

The repository does **not** currently express the anchor-plus-attachments model. It expresses six co-equal services. Two structural facts show it:

- `services` in `site.ts` is a flat array of six with identical shape — same fields, same rendering, same weight. Website Design is distinguished only by `index: "01"` and a price in its CTA.
- The sitemap `serialize()` assigns `/services/`, `/pricing/`, `/why-cozelos-data/` priority 0.9 equally; no service outranks another because none has its own URL.

This is not a defect — it is a faithful implementation of the earlier six-equal-services model. **It becomes a defect only once the anchor model is confirmed.** That confirmation is F7, still blocked on the owner interview.

**I am not recommending restructuring in this report.** The attach rate decides it.

---

## 5. Technical SEO findings

**Stack:** Astro 6.4.2 · `output: "static"` · `@astrojs/sitemap` 3.7.3 · Tailwind 4.1.18 · `prefetchAll` on viewport · `inlineStylesheets: "auto"` · GA4 `G-QJQ93FD0MZ` present.

| # | Finding | Severity | Detail |
|---|---|---|---|
| T1 | **`www.` host variant indexed separately** | **P0** | `www.cozelosdata.com/services/` — 41 impressions, position 2.61. The canonical points to the apex host, which helps, but the variant is still accruing separate impressions. Needs a host-level 301 from `www` → apex. **Deployment config — not a code change** |
| T2 | Canonical implementation | ✅ Correct | Self-referential from `Astro.url.pathname`, verified live on real pages *and* on legacy query-string URLs |
| T3 | Sitemap | ✅ Correct | 10 URLs; `filter()` excludes `/payment/`, `/terms/`, `/privacy/`; `serialize()` weights home 1.0 → 0.7 |
| T4 | `robots.txt` | ✅ Adequate | `Allow: /` + sitemap declaration. No crawl waste to block on a 13-page static site |
| T5 | `noindex` on utility pages | ✅ Correct | `noindex, follow` on `/payment/`, `/privacy/`, `/terms/`, `404` — and excluded from sitemap. Consistent |
| T6 | Redirects | ⚠️ None configured | Static output with no redirect map. Fine today; **required infrastructure before any URL restructuring** |
| T7 | One `<h1>` per page | ✅ Correct | Verified across all 13 |
| T8 | Image handling | ✅ Good | Astro `<Image>`, WebP, `widths`/`sizes`, lazy below fold, eager on hero |
| T9 | `llms.txt` | ✅ Present | Accurate and current. ⚠️ Contains the government-contracting block flagged in §2 |
| T10 | GA4 | ✅ Present | `G-QJQ93FD0MZ`. **Conversion events not verified** — see §18 |
| T11 | 404 page | ✅ Exists, noindex | |

**No P0 technical defects in the codebase.** T1 is the only P0 and it lives in hosting configuration.

---

## 6. Metadata findings

| # | Finding | Severity | Pages |
|---|---|---|---|
| M1 | **H1 has no topical overlap with its own title** | **P1** | All 10 indexable |
| M2 | Meta description exceeds ~160 characters | P1 | `/` 174 · `/contact/` 174 · `/why-cozelos-data/` 176 · `/portfolio/` 181 · `/pricing/` 182 |
| M3 | Title exceeds ~60 characters after brand suffix | P2 | `/` 72 · `/pricing/` 72 · `/services/` 65 · `/portfolio/` 64 |
| M4 | `/ellen-cozelos/` description asserts a blocked claim | **BLOCKED** | *"Master's from Columbia University"* |
| M5 | Titles are otherwise well-formed | ✅ | Geographic + service modifiers present on the commercial pages |

**On M1 — the most consequential metadata finding.** Every H1 is a brand or benefit statement:

| URL | Title targets | H1 says |
|---|---|---|
| `/services/` | Web Design, SEO & Marketing Services in Vernal, UT | Six disciplines. One system built to grow your business. |
| `/pricing/` | Investment & Pricing — Web Design Growth Plans, Vernal UT | An investment in growth — priced for return. |
| `/portfolio/` | Utah Web Design Portfolio — Real Business Results | Real businesses. Real transformations. |

The brand voice is genuinely good and worth protecting. But the H1 is the strongest on-page topical signal, and right now **not one page uses it to say what the page is about.** The fix is not to flatten the voice — it is to let the H1 carry the subject and the immediately-following deck carry the brand line, which most of these pages already have.

---

## 7. Schema / entity findings

Graph emitted sitewide by [Seo.astro](../../src/components/Seo.astro):
`["ProfessionalService","Organization"]` + `WebSite`, plus per-page `Service[]`, `BreadcrumbList`, and page-level `Person` / `FAQPage`.

**This is a well-constructed graph.** Single organization entity with a stable `@id`; the founder `Person` uses the same `@id` on `/company/` and `/ellen-cozelos/` rather than duplicating; `Service` nodes reference `provider` by `@id` instead of declaring new businesses. That is better than most agency sites.

| # | Finding | Severity |
|---|---|---|
| S1 | **`FAQPage` emitted on both `/` and `/faq/`** — homepage carries a 5-item subset of the 25-item page | **P1** — two competing FAQPage entities for the same content set |
| S2 | **`sameAs` may point at non-existent profiles** | **P1** — `site.ts:44` comments them as *"Placeholder handles — update when live profiles are created."* Facebook/Instagram return 200 (both platforms do so for missing pages); LinkedIn returns 999 (bot block). **Inconclusive externally — verify manually.** A `sameAs` pointing nowhere weakens entity resolution |
| S3 | `identifier` publishes DUNS + CAGE, no UEI | **BLOCKED** — see §2 |
| S4 | `Person.alumniOf` asserts Columbia | **BLOCKED** — degree level unresolved |
| S5 | No `WebPage` / `AboutPage` / `ContactPage` nodes | P2 — pages exist in the graph only as breadcrumb items |
| S6 | `/pricing/` has **no `Offer` / `PriceSpecification`** despite eight visible prices | **P1 — clean, supportable win** |
| S7 | `Service.areaServed` is `State: Utah` only | P2 — omits Vernal and Uintah Basin, which the Organization node does include |
| S8 | No `Review` / `AggregateRating` | Correct to omit — provenance unverified (§2) |
| S9 | Portfolio projects have no `CreativeWork` / `Project` nodes | P2 — depends on the case-study decision |
| S10 | `logo` is a URL string, not an `ImageObject` | P3 — cosmetic |

---

## 8. Internal-linking findings

Two graphs exist and they tell opposite stories.

**Global graph (nav + footer): perfectly flat.** Every one of the 13 pages links to every other — 12 in, 12 out, universally. No page is signalled as more important than another.

**Editorial graph (links inside `<main>` only):**

| URL | Editorial inbound | Notes |
|---|---|---|
| `/` | 12 | Every page links home |
| `/contact/` | 10 | Healthy — CTAs |
| `/portfolio/` | 8 | Healthy |
| `/services/` | 8 | Healthy |
| `/pricing/` | 6 | Adequate |
| `/faq/` | 4 | Thin |
| **`/company/`** | **2** | ⚠️ In primary nav, near-orphaned editorially |
| **`/why-cozelos-data/`** | **2** | ⚠️ In primary nav, near-orphaned editorially |
| **`/ellen-cozelos/`** | **2** | ⚠️ The E-E-A-T page. Not in nav. Linked only from `/` and `/company/` |
| **`/our-approach/`** | **2** | ⚠️ Not in nav |
| `/payment/` `/privacy/` `/terms/` | 0 | Correct — noindex utility pages |

**Six of ten indexable pages are absent from the primary navigation:** `/ellen-cozelos/`, `/faq/`, `/our-approach/`, plus the three utility pages.

The combination is the issue: a flat global graph gives every page identical link weight, and the editorial graph — the layer that could express hierarchy — is too thin to counteract it. **The site currently has no way to tell Google which page matters most.**

`/ellen-cozelos/` is the sharpest case. It is the strongest E-E-A-T asset on the site, it is absent from navigation, and it has two editorial inbound links.

---

## 9. Local SEO findings

| # | Finding | Status |
|---|---|---|
| L1 | NAP consistency | ✅ Single source in `site.ts`, rendered identically sitewide and into schema |
| L2 | Google Business Profile | ✅ Exists — review deep link `g.page/r/CSm0JDFiiZShEBM` |
| L3 | `areaServed` | ✅ Vernal (City) · Uintah Basin (AdministrativeArea) · Utah (State) · US (Country) |
| L4 | `geo` coordinates | ✅ 40.4555, −109.5287 — correct for Vernal |
| L5 | Opening hours in schema | ✅ Mon–Fri 09:00–17:00 |
| L6 | **Impressions are 78% desktop** | ⚠️ **206 desktop vs 59 mobile.** Inverted for a local service business |
| L7 | **No local query coverage** | ⚠️ The only near-me queries in GSC (`local businesses near me` p21, `service businesses near me` p69) land on the **legacy** URL, not on any current page |
| L8 | No Uintah Basin page | Gap — the market is named in prose and schema but has no addressable URL |
| L9 | Citation footprint | ⚠️ Unverified. ZoomInfo, Datanyze, aiHit carry entries; consistency unaudited |
| L10 | Legal name mismatch | ⚠️ `legalName: "Cozelos Data"`; external sources show **"Cozelos Data LLC"** |

**On L6 — this is a real diagnostic, not a curiosity.** A Vernal web-design firm ranking for local intent should skew mobile. A 78/22 desktop split says the impressions being served are research/B2B/technical in nature. Combined with the query set (`software development services`, `IT companies near me`, `data center companies`), it independently corroborates the identity investigation: **the domain's current visibility is not local-consumer visibility.**

---

## 10. Existing commercial-page opportunities (no new URLs)

Ordered by confidence.

| # | Page | Opportunity | Why it's safe |
|---|---|---|---|
| C1 | `/pricing/` | Add `Offer` / `PriceSpecification` schema; give the H1 a topical subject | Eight prices are already visible on the page. Schema would describe existing, supportable content |
| C2 | `/portfolio/` | Give each of the eight projects a topical `<h3>` and richer per-project copy in place | Content already exists in `site.ts` (`challenge`, `strategy`, `solution`, `outcome`, `businessImpact`) but renders compressed |
| C3 | `/faq/` | 25 answers already target real question intent; add topical H2s per category and internal links to the relevant service anchor | Content exists; only structure and linking change |
| C4 | `/` | Trim description to ≤160; remove duplicate `FAQPage`; add editorial links to `/our-approach/` and `/ellen-cozelos/` | Pure fixes |
| C5 | `/our-approach/` | Strong differentiator content, near-orphaned. Add nav or footer placement and inbound editorial links | Existing content, better distribution |
| C6 | `/why-cozelos-data/` | In nav but only 2 editorial inbound. Link from `/services/`, `/pricing/`, `/portfolio/` | Existing content |
| C7 | `/services/` | ⚠️ **Frozen.** Metadata-only fixes permitted; no architectural change until F7 | Constraint |

---

## 11. Keyword opportunity map

Grounded in the GSC exports, not invented.

### What the domain actually has today

| Query | Position | Impressions | Lands on |
|---|---|---|---|
| software development services | 1 | 3 | **legacy** `?page_id=158` |
| it companies near me | 1 | 1 | **legacy** |
| it services companies near me | 1 | 1 | **legacy** |
| software engineering firm | 1 | 1 | **legacy** |
| data center companies | 4 | 1 | **legacy** |
| local businesses near me | 21.67 | 3 | **legacy** |
| computer networks | 20 | 1 | **legacy** |
| datazeo | 46 | 1 | `/` |

**`/services/` owns zero identifiable queries. `/` owns one, and it is a misspelling of a competitor's name.**

Total identifiable query surface across the entire property: **13 rows, ~14 impressions.** Everything else is anonymized or below threshold. This is a domain with essentially no query footprint yet.

### Tier 1 — Core local commercial (primary targets, currently unserved)

`web design vernal utah` · `website design vernal utah` · `web developer vernal utah` · `web design uintah basin` · `seo vernal utah` · `local seo vernal utah` · `digital marketing vernal utah` · `website design company vernal`

**Currently: no page targets these with an aligned H1.** `/services/` and `/` carry them in titles only.

### Tier 2 — Commercial-intent problem queries (highest realistic ROI)

`how much does a website cost in utah` · `website design cost` · `how long does seo take` · `why isn't my business showing up on google` · `how to rank on google maps` · `custom website vs template` · `do i own my website` · `website maintenance cost`

**These are already partly answered inside `/faq/`** — 25 answers, several matching this intent exactly, currently with no topical H2 structure and no dedicated URLs.

### Tier 3 — Industry × service (justified by verified portfolio only)

Build only where a real client build backs it:

| Industry | Backing project |
|---|---|
| Tourism / tours | Adventure Tours Vernal |
| Hospitality / hotels | Best Western Vernal Inn |
| Healthcare / Medicare | Vernal Medicare, Alta Medicare |
| Pest control / local services | Wernex Pest Control |
| Luxury / transport | High Class Limousine |
| Genealogy / multilingual | Forebear Find |
| Parking / international | ParkingWay.it |

**Seven verticals with real proof.** This is the differentiator.

### Tier 4 — AI search / entity

`ai search optimization` · `llms.txt` · `how chatgpt finds local businesses` · `entity optimization for local business` · `google ai overviews for small business`

Low current volume, low competition, and Cozelos genuinely implements this (`llms.txt` ships on client sites). Credible authority play, not a near-term traffic play.

### 🔴 Excluded

All Pillar 5 / government / federal / cybersecurity / enterprise-engineering keywords. Blocked per §2.

---

## 12. Content-cluster recommendations

**Recommendation: do not build clusters yet.** Two prerequisites are unmet — F7 (whether services get their own URLs) and the proof layer. Building spokes before the pillars have URLs creates orphans that must be re-pointed later.

Sequenced for when unblocked:

**Cluster A — Website (anchor).** Pillar: the website capability. Spokes: cost, custom vs template, redesign vs rebuild, speed, ownership. *Blocked on F7.*

**Cluster B — SEO.** Pillar: SEO capability. Spokes: local SEO, technical SEO, GBP optimization, how long SEO takes, why a business isn't showing on Google. *Blocked on F7.*

**Cluster C — Industry proof.** Pillar: `/portfolio/`. Spokes: seven per-industry case studies. **Not blocked** — see §13.

**Cluster D — AI search.** Pillar: AI search optimization. Spokes as Tier 4. *Blocked on F7.*

**Cluster E — Uintah Basin / geographic.** One genuine regional page, **not** a city-page template. *Blocked on F7 and on §14 discipline.*

---

## 13. Portfolio / case-study opportunities

**This is the single largest unblocked opportunity on the site.**

`site.ts:339–582` already stores, for each of eight projects: `challenge`, `strategy`, `solution`, `outcome`, `businessImpact`, `services[]`, `stack[]`, `results[]`, `liveUrl`. That is a complete case-study data model **already populated**.

It renders as eight cards on one URL — roughly 245 words per project.

| Attribute | Value |
|---|---|
| Content status | **Already written and stored** |
| Blocked? | **No** — every claim is 🟢 VERIFIED |
| Competitive value | No competitor in this market has comparable first-party proof |
| Strategic fit | Master context §16, §17 — "potentially Cozelos Data's single biggest SEO asset" |
| Serves | Both Project A (rank) and Project B (demonstrate expertise) |
| Risk | Low — real clients, live sites, existing copy |

**Eight real builds across seven verticals, with live URLs, in a market whose SERP is dominated by templated city pages.** This is the moat.

The only open question is URL structure (`/portfolio/[slug]/` vs. expanded sections). That interacts with F7 and should be decided alongside it — but the *content* work is unblocked and can proceed now.

---

## 14. Competitive findings

SERP research on `web design vernal utah` and `seo company vernal utah`.

**Competitor set:**

| Type | Who | Characteristic |
|---|---|---|
| **Genuine local** | Salt Creative (`sltcreative.com/web-design-vernal-utah`), Allreds Web Design (Vernal family studio) | Real local presence — the actual competition |
| **Programmatic doorway operators** | WRIS, Appeal Design, 50 Creative Solutions, Lost Highway Media, Jessica Leigh Web Design, Due Web Studio | Templated `/[city]/[service]` pages at national scale |
| **Out-of-area agencies with city pages** | 12AM Agency, EZMarketing, MV3 Marketing, SEO Werkz, Utah SEO Experts | State/city landing pages, no local presence |
| **Directories** | Yelp, YellowPages | Occupy SERP slots for the head term |

**The decisive finding:** this SERP is **dominated by programmatic city pages from firms with no presence in Vernal.** Perhaps two genuine local competitors exist.

That is unusually favourable, and it validates master context §14 from the opposite direction: the doorway-page tactic is already saturated here, so competing on that axis means fighting a dozen firms at their own game with less scale. **Genuine local depth — real named Vernal clients, real results, real case studies — is the axis on which none of them can compete.**

Cozelos already surfaces for `seo company vernal utah` variants (both `/` and `/services/` appeared in research results), so the domain is not invisible. It is under-served with content.

Directory SERP features mean **GBP and citation consistency carry real weight** for the head terms.

---

## 15. Blocked / unverified opportunities

Not rejected — quarantined until evidence exists.

| Opportunity | Blocked on |
|---|---|
| Government / federal web development cluster | No federal past performance; SAM not publicly verifiable |
| Section 508 / accessibility compliance authority pages | Would sit inside the government cluster |
| Cybersecurity service pages | No current commercial expression |
| Enterprise / systems engineering pages | Historical only |
| Software development / custom programming pages | Pending owner interview (data-management question) |
| Managed IT as a seventh local service | Pending owner interview — but note this has the **strongest** legacy demand signal |
| Founder E-E-A-T amplification | Columbia degree level unresolved |
| `Review` / `AggregateRating` schema | Testimonial provenance unverified |
| Any content citing "NASA/DoD" as company experience | Company vs. personal experience unresolved |
| Case study citing federal work | None exists |

---

## 16. Roadmap

Every action carries the full field set: **priority · file · problem · evidence · change · SEO rationale · conversion rationale · dependencies · risk · type.**
Sorted into four buckets: **Fix now · Build next · Research first · Blocked pending evidence.**

---

### 🟩 FIX NOW

Verified, low-risk, no new URLs, nothing frozen or blocked.

**P0-1 · 301 `www` → apex**
*File:* hosting/DNS config — **not the repository** · *Type:* Technical
*Problem:* `www.cozelosdata.com/services/` is indexed as a separate URL.
*Evidence:* GSC `00-pages.csv` — 41 impressions, avg position 2.61, distinct from the apex `/services/` row.
*Change:* Host-level 301 from `www` to apex for all paths.
*SEO rationale:* Consolidates a split host signal on a property whose total signal is ~241 impressions. Canonical already points to apex, which mitigates but does not eliminate the split.
*Conversion rationale:* None directly — prevents visitors landing on a duplicate host.
*Dependencies:* Requires DNS/hosting access. **Unknown who holds it** (§18 Q10).
*Risk:* Low, but misconfiguration breaks the site — verify on staging.

**P0-2 · Remove duplicate `FAQPage` from `/`**
*File:* `src/pages/index.astro` / `src/components/FAQ.astro` · *Type:* Technical
*Problem:* `FAQPage` schema is emitted on **both** `/` and `/faq/`; the homepage version is a 5-item subset of the canonical 25.
*Evidence:* Rendered-build extraction — `FAQPage`, `Question`, `Answer` types present in both `dist/index.html` and `dist/faq/index.html`.
*Change:* Emit `FAQPage` only on `/faq/`. **Visible 5-FAQ block on the homepage stays exactly as is.**
*SEO rationale:* Two competing FAQPage entities for one content set is an ambiguous signal; the subset adds nothing the canonical page lacks.
*Conversion rationale:* None — no visible change.
*Dependencies:* None.
*Risk:* **None.** Markup-only.

**P0-3 · Verify and correct `sameAs`**
*File:* `src/data/site.ts:43–48` · *Type:* **Factual**
*Problem:* Social URLs may not resolve to real profiles.
*Evidence:* Source comment reads *"Placeholder handles — update when live profiles are created."* External check inconclusive — Facebook/Instagram return 200 for missing pages; LinkedIn returns 999 (bot block). A separate search surfaced a Facebook page under a **numeric ID**, suggesting the `/cozelosdata` vanity handle may be wrong.
*Change:* Manually open all three. Remove any that don't resolve; correct the Facebook URL if the numeric ID is canonical.
*SEO rationale:* `sameAs` is a primary entity-resolution signal. Pointing at non-existent profiles weakens it and risks associating the entity with nothing.
*Conversion rationale:* Dead social links in the footer damage trust.
*Dependencies:* None.
*Risk:* **None.**

**P0-4 · Trim 5 meta descriptions to ≤160 characters**
*File:* frontmatter of `/`, `/contact/`, `/portfolio/`, `/pricing/`, `/why-cozelos-data/` · *Type:* Metadata
*Problem:* Descriptions run 174–182 characters and truncate in SERP.
*Evidence:* Measured from rendered build — 174 / 174 / 181 / 182 / 176.
*Change:* Copy edit to ≤160, preserving the lead value proposition in the first 120.
*SEO rationale:* Not a ranking factor; a CTR factor. On `/pricing/` the truncation currently cuts the sentence carrying the price.
*Conversion rationale:* Direct — the description is the click decision.
*Dependencies:* None.
*Risk:* **None.**

**P0-5 · Confirm GA4 conversion events**
*File:* GA4 property `G-QJQ93FD0MZ` · *Type:* Measurement
*Problem:* GA4 is installed; conversion events unverified.
*Evidence:* `G-QJQ93FD0MZ` present in the built output. No event configuration inspected.
*Change:* Verify form submit, `tel:`, `mailto:`, and Stripe payment-link clicks register as events/conversions.
*SEO rationale:* None directly.
*Conversion rationale:* **Prerequisite for every future claim about SEO producing leads.** Without it, results cannot be attributed.
*Dependencies:* GA4 property access.
*Risk:* None — read-only inspection first.

**P1-2 · Add `Offer` / `PriceSpecification` to `/pricing/`**
*File:* `src/pages/pricing.astro` · *Type:* Schema
*Problem:* Eight visible prices carry no structured data.
*Evidence:* `pricing.astro:16–141` defines 4 project tiers + 4 monthly plans, all rendered with explicit prices; schema extraction shows only `BreadcrumbList` beyond the sitewide base.
*Change:* `Offer` with `PriceSpecification` per tier, `priceCurrency: "USD"`, referencing the org `@id` as seller.
*SEO rationale:* Highest-commercial-intent page on the site (§3b) with no commercial markup. Describes visible, fixed, supportable content — the schema-integrity test in §7 passes.
*Conversion rationale:* Price-qualified visitors arrive better informed.
*Dependencies:* None.
*Risk:* **Low.** Prices must stay in sync with rendered copy — derive both from one source.

**P1-3 · Add editorial inbound links to four under-linked pages**
*File:* `/portfolio/` → `/our-approach/` · `/pricing/` → `/why-cozelos-data/` · `/services/` → `/ellen-cozelos/` · `/faq/` → `/our-approach/` · *Type:* Linking
*Problem:* `/company/`, `/why-cozelos-data/`, `/our-approach/`, `/ellen-cozelos/` each have **2** editorial inbound links.
*Evidence:* Editorial link graph computed from `<main>` in the rendered build (§8).
*Change:* One contextual link each, in existing body copy.
*SEO rationale:* The global graph is perfectly flat (12 in / 12 out everywhere), so the editorial layer is the only way to express hierarchy. Four topical pages currently sit at the floor.
*Conversion rationale:* `/ellen-cozelos/` is the strongest trust asset and is nearly unreachable from the commercial path.
*Dependencies:* None. **Must be genuinely contextual — not a link block.**
*Risk:* Low. Guard against link-for-metrics padding (master context §14 discipline).

**P1-4 · Surface `/our-approach/` and `/faq/`**
*File:* `src/data/site.ts:53–61` (`primaryNav`) or `src/components/Footer.astro` · *Type:* Linking
*Problem:* Six of ten indexable pages sit outside primary navigation.
*Evidence:* `primaryNav` contains 7 entries; `/ellen-cozelos/`, `/faq/`, `/our-approach/` are absent.
*Change:* Add both to nav, **or** to a structured footer column.
*SEO rationale:* `/our-approach/` carries the differentiator content; `/faq/` carries commercial-intent Q&A. Both are currently reachable mainly via footer.
*Conversion rationale:* FAQ is a standard pre-sale objection path.
*Dependencies:* **Brand sign-off — nav is brand surface, not just SEO surface.**
*Risk:* Medium *as a decision*, low as an implementation. Footer-column variant carries no brand risk.

**P1-6 · Add `WebPage` / `AboutPage` / `ContactPage` nodes**
*File:* `src/components/Seo.astro` · *Type:* Schema
*Problem:* Pages appear in the graph only as breadcrumb items.
*Evidence:* Graph inventory (§7) — no `WebPage` type on any page.
*Change:* Emit a page-level node linked to `WebSite` via `isPartOf` and to the org via `about`/`publisher`.
*SEO rationale:* Completes the entity graph; gives each URL a first-class node.
*Conversion rationale:* None.
*Dependencies:* None.
*Risk:* Low — additive, centralized in one component.

**P1-7 · Extend `Service.areaServed`**
*File:* `src/components/Seo.astro:118` · *Type:* Schema
*Problem:* `Service` nodes claim `State: Utah` only, while the Organization node correctly lists Vernal, Uintah Basin, Utah, and US.
*Evidence:* Schema source, line 118.
*Change:* Mirror the Organization `areaServed` array onto Service nodes.
*SEO rationale:* Aligns service-level geography with the local strategy; Uintah Basin currently appears at org level only.
*Conversion rationale:* None.
*Dependencies:* None.
*Risk:* **None.**

---

### 🟦 BUILD NEXT

Higher value, higher care. Not first-batch.

**P1-1 · Rewrite H1s to carry a topical subject**
*File:* all 10 indexable pages · *Type:* Metadata + **Strategic** (touches brand voice)
*Problem:* No H1 shares vocabulary with its own title tag.
*Evidence:* §6 M1 — e.g. `/services/` titled *"Web Design, SEO & Marketing Services in Vernal, UT"*, headed *"Six disciplines. One system built to grow your business."*
*Change:* H1 carries the subject; the existing brand line moves to the deck immediately below (most pages already have a deck).
*SEO rationale:* **Highest-value metadata action available.** The H1 is the strongest on-page topical signal and not one page uses it.
*Conversion rationale:* Neutral-to-positive if the brand line is preserved directly beneath. **Negative if the voice is flattened.**
*Dependencies:* Brand review. Interacts with F7 on `/services/`.
*Risk:* **Medium — the brand voice is a genuine asset.** Needs a review pass, page by page.

**P1-5 · Restructure `/faq/` with topical H2s and service links**
*File:* `src/pages/faq.astro`, `src/data/site.ts` (`faqCategories`) · *Type:* Structure
*Problem:* 25 commercial-intent answers presented without topical structure or onward links.
*Evidence:* §3b — `/faq/` is the second-largest content asset (1,657 words) with 4 editorial inbound links and no outbound service links.
*Change:* Topical H2 per category; each category links to the relevant `/services/#anchor`.
*SEO rationale:* Surfaces Tier-2 commercial-intent questions (§11) that are already answered on-site.
*Conversion rationale:* Routes objection-stage readers to the matching service.
*Dependencies:* Service anchors must remain stable — interacts with F7.
*Risk:* Low.

**P3-1 · Expand eight portfolio projects into full case studies**
*File:* `src/pages/portfolio.astro`, `src/data/site.ts:339–582` · *Type:* Strategic (content)
*Problem:* Complete case-study data renders as ~245-word cards.
*Evidence:* `site.ts` already stores `challenge`, `strategy`, `solution`, `outcome`, `businessImpact`, `services[]`, `stack[]`, `results[]`, `liveUrl` for all eight.
*Change:* Full case-study treatment per project.
*SEO rationale:* **The largest verified opportunity on the site** (§13). First-party proof that the programmatic-doorway competitor set structurally cannot replicate (§14).
*Conversion rationale:* Proof is the primary objection-closer at the $2,500–$7,500 price point.
*Dependencies:* **URL structure gated on F7** (`/portfolio/[slug]/` vs expanded sections). **Client consent for named results.** Content work itself is unblocked.
*Risk:* Low on content, medium on URL structure if built before F7 resolves.

**P3-2 · `CreativeWork` schema per project** — follows P3-1. *Type:* Schema. *Risk:* Low.
**P3-3 · Industry landing pages for the seven verified verticals** — follows P3-1. *Dependencies:* F7 + P3-1. *Risk:* Medium — must be genuinely differentiated, not city-page templates (master context §14).

---

### 🟨 RESEARCH FIRST

No implementation. Evidence-gathering that unblocks decisions.

| # | Question | Method | Unblocks |
|---|---|---|---|
| R-1 | **Attach rate** — how often does a website client also buy video/ads/SEO/automation/monthly? | Owner interview Q2 | **F7 — the entire architecture** |
| R-2 | What is `?page_id=866`? | GSC URL Inspection, or old WordPress DB | Legacy footprint closure |
| R-3 | Is the citation footprint consistent? | Manual audit vs. the `site.ts` NAP | Local SEO baseline |
| R-4 | How complete is the Google Business Profile? | GBP dashboard review | Local SEO — directories hold SERP slots (§14) |
| R-5 | Are the three testimonials attributable? | Client confirmation | `Review` / `AggregateRating` schema |
| R-6 | Will clients consent to named case studies? | Client outreach | P3-1 publication |
| R-7 | Who controls DNS/hosting config? | Internal | **P0-1** |

---

### 🟥 BLOCKED PENDING EVIDENCE

Everything in §15. Quarantined, not rejected — each becomes actionable the moment its evidence exists.

| Blocked item | Unblocking evidence required |
|---|---|
| Government / federal cluster · Section 508 authority pages | Named past performance + verified SAM registration |
| Cybersecurity service pages | Confirmation it is currently sold and deliverable |
| Enterprise / systems engineering pages | Same |
| Software development / custom programming pages | Owner interview — the data-management question |
| Managed IT as a seventh local service | Owner interview. **Note: strongest legacy demand signal of any blocked item** |
| Founder E-E-A-T amplification | Columbia degree level resolved |
| `Review` / `AggregateRating` schema | R-5 |
| Any "NASA/DoD" content as *company* experience | Company vs. personal experience resolved |

---

## 17. Recommended first implementation batch

**Principle: smallest possible change set, every item 🟢 VERIFIED, nothing touching frozen or blocked territory.**

Six items. None alters site architecture, creates a URL, changes a canonical, touches `/services/` structure, or touches any legacy URL.

| # | Change | File | Risk | Rationale |
|---|---|---|---|---|
| **1** | Remove `FAQPage` schema from `/`; retain on `/faq/`. Visible 5-FAQ block unchanged | `index.astro` / `FAQ.astro` | **None** | Eliminates two competing FAQPage entities. Homepage version is a subset of the canonical one |
| **2** | Trim descriptions to ≤160 ch on `/`, `/contact/`, `/portfolio/`, `/pricing/`, `/why-cozelos-data/` | 5 frontmatter blocks | **None** | Currently 174–182 ch; all truncate in SERP. Copy edit only |
| **3** | Verify the three `sameAs` URLs manually; remove non-resolving entries | `site.ts:43–48` | **None** | Source comments them as placeholders. A `sameAs` pointing nowhere weakens entity resolution |
| **4** | Add `Offer` / `PriceSpecification` to `/pricing/` for the four project tiers and four monthly plans | `pricing.astro` | **Low** | Prices are visible and fixed. Schema describes existing supportable content |
| **5** | Add editorial inbound links: `/portfolio/` → `/our-approach/`; `/pricing/` → `/why-cozelos-data/`; `/services/` → `/ellen-cozelos/`; `/faq/` → `/our-approach/` | 4 pages, 1 link each | **Low** | Four pages sit at 2 editorial inbound. Contextual, not manufactured |
| **6** | Add `/our-approach/` and `/faq/` to the primary nav **or** a structured footer column | `site.ts:53–61` / `Footer.astro` | **Low** | Six of ten indexable pages are outside the nav. ⚠️ Nav is brand-facing — confirm before changing |

**Explicitly excluded from batch 1:**

- H1 rewrites (P1-1) — highest SEO value, but touches brand voice on every page. **Wants a review pass, not a first batch.**
- Anything on `/services/` beyond metadata — frozen (F7)
- Anything on `/company/` or `/ellen-cozelos/` — contains blocked claims
- The `www` redirect — hosting config, and "do not deploy"
- Case-study expansion — largest opportunity, but URL structure is gated on F7

**Expected effect:** essentially zero ranking movement. That is the point. This batch removes defects and establishes a clean measurement baseline before anything substantive is built.

---

## 18. Risks and unresolved questions

### Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | **Building architecture before F7 resolves** | Everything structural stays gated on the owner interview |
| R2 | **Publishing blocked claims** — the government block sits in `llms.txt`, `Credentials.astro`, `/company/`, `/ellen-cozelos/`, schema `identifier` and `alumniOf`. It is *already published* | Do not amplify. Correction is its own decision, pending Ellen |
| R3 | Case studies naming clients without permission | Confirm consent before publishing named results |
| R4 | Measurement baseline too small to read | 9 clicks / 241 impressions total. **Any change will look like noise.** Set expectations before batch 1 |
| R5 | Nav changes affect brand, not just SEO | Item 6 needs sign-off |
| R6 | GA4 present but conversions unverified | P0-5 before claiming any conversion outcome |
| R7 | Legacy URLs consolidate on Google's schedule | "Do nothing" resolves to "let it consolidate." Acceptable, but not indefinite |

### Unresolved questions

1. **Attach rate** — decides F7, decides the whole architecture
2. **`?page_id=866`** — 46 impressions at position 2.74, still unidentified
3. **Columbia degree level** — asserted in structured data
4. **SAM status, UEI, public-display setting**
5. **Legal name** — "Cozelos Data LLC"?
6. **Testimonial provenance** — blocks `Review` schema
7. **Client consent** for named case studies
8. **Citation footprint** — never audited
9. **GBP optimization state** — profile exists; completeness unassessed
10. **`www` redirect** — who controls DNS/hosting config?

---

## Final gate

**1. What does Google currently understand Cozelos Data to be?**
A software and IT services company. Every identifiable query in GSC — `software development services`, `it companies near me`, `it services companies near me`, `software engineering firm`, `data center companies`, `computer networks` — resolves to the **legacy** `?page_id=158`. Google's understanding is inherited from the pre-2025 business and has not yet been updated.

**2. What does the website currently claim Cozelos Data is?**
A premium digital agency in Vernal, Utah selling six connected services, anchored on custom website builds from $2,500, with a Woman-Owned Small Business / government-ready credential layer attached.

**3. Which of those claims are verified?**
The agency identity, NAP, six services, pricing, ownership terms, eight client builds, the static/fast stack, the founder's name, and the tagline's provenance. **Not verified:** the Columbia degree level, federal past performance, active SAM registration, cybersecurity/enterprise-engineering capability, and delivery capacity beyond the founder.

**4. Where does the website currently have genuine topical authority?**
**Nowhere.** `/services/` returns zero query rows; `/` returns one (`datazeo`, position 46). The only demonstrated authority on the domain is the legacy IT/software association, which belongs to URLs that no longer exist as pages. This is a pre-authority site.

**5. Where is the largest verified SEO opportunity?**
**The portfolio.** Eight real client builds across seven verticals, with live URLs and complete case-study copy already stored in `site.ts`, rendered as ~245-word cards. It is fully verified, entirely unblocked, and it is the one asset the programmatic doorway competitors structurally cannot replicate.

**6. Which pages should be improved before creating new pages?**
`/portfolio/`, `/faq/`, `/pricing/`, and `/`. All four hold real content that is under-structured. `/faq/` in particular already answers Tier-2 commercial-intent questions with no topical structure to surface them.

**7. Which new pages are justified?**
**Today: none.** Case-study pages are content-justified but URL-gated on F7. Everything else is gated on F7 or blocked. Creating pages now would mean re-pointing them later.

**8. Which claims must remain blocked?**
All of §2's red list: the Columbia degree level, "NASA/DoD/aerospace" as *company* experience, federal past performance, "SAM Ready," "DUNS/UEI Active," cybersecurity as a service, enterprise/systems engineering, government contracting as an active practice, delivery capacity beyond the founder, and legacy rankings as demand evidence.

**9. What is the smallest high-confidence implementation we can make first?**
The six items in §17: remove duplicate FAQPage · trim five meta descriptions · verify `sameAs` · add pricing `Offer` schema · add four editorial links · surface two orphaned pages in nav or footer. No new URLs, no architecture change, nothing frozen or blocked, all six verified.

**10. What evidence will we use to measure whether it worked?**
Honestly: **batch 1 is not measurable on rankings**, and it should not be presented as if it were. At 9 clicks and 241 impressions, ranking movement is indistinguishable from noise. The correct measures are:

- **Validation, not traffic** — Rich Results Test clean on `/pricing/`; single `FAQPage` entity property-wide; all `sameAs` resolving
- **Coverage** — `www.` impressions trending to zero after P0-1; `/services/` producing *any* query rows in the next GSC export
- **Instrumentation** — GA4 conversion events confirmed firing, giving the first real conversion baseline
- **The real measurement gate** is the next `/services/` GSC export. Until it returns non-zero query rows, this property cannot be measured on search performance at all — which is precisely why the first batch is defect removal and baseline establishment rather than a growth attempt.

---

**End of report. No implementation until reviewed.**
