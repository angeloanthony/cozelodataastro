# Cozelos Data — SEO Master Map

**Built:** 2026-08-08 · **Source:** live site fetched as Googlebot + `src/` inspection
**Status:** on-site columns complete and verified · GSC query columns **pending export**

This file is the working reference for Cozelos Data SEO. Work from this map — do not
invent a strategy alongside it. Update it when pages change or new GSC data lands.

---

## 0. Implementation status

| Finding | Status |
| --- | --- |
| F4 — hidden Website Design copy | ✅ implemented 2026-08-08 |
| F2 — internal-link graph | ✅ implemented 2026-08-08 |
| F3 — `Service` schema wiring | ✅ implemented 2026-08-08 |
| F1 — Approach/Method duplication | ⏸ blocked on GSC export |
| F5 — homepage H1 | ⏸ deliberately deferred |
| F6 — homepage FAQ schema | ❌ **withdrawn — the finding was wrong** |
| F7 — six-URL split | ⏸ blocked on GSC export |
| F8 — `?page_id=` URLs | ⏸ blocked on GSC export |

All SEO changes are frozen until the page-filtered GSC exports land.

---

## 1. What is blocked, and the exact export needed

Everything in this map that can be read from the site is filled in and verified against
production. The **GSC query-level columns cannot be filled from here** — there is no
Search Console API access in this environment (the connected Google services are
unauthorized, and GSC query data is not derivable from the site itself).

Page-level impressions/positions carried over from the earlier paste are marked
`(pasted)` — they are unverified here and the date range is unknown.

To finish the map, export from Search Console → **Performance → Search results**:

| Setting | Value |
| --- | --- |
| Date range | Last 3 months (and again: last 28 days, for trend) |
| Tab | **Queries**, with a **Page** filter applied — one export per URL |
| Columns | Query, Clicks, Impressions, CTR, Position |
| Also export | **Pages** tab, full list, same range |
| Also export | Queries tab unfiltered, top 500 rows |

Per-page query exports are the critical ones. Without the page filter the query list is
sitewide and cannot be attributed, which is exactly the mistake this map exists to prevent.

Drop the CSVs anywhere in the repo (suggest `docs/seo/gsc/`) and the query columns below
get filled from real data rather than assumption.

---

## 2. The map — 11 indexable URLs

Sitemap verified live: index → `sitemap-0.xml` → these 11 URLs, all HTTP 200.
`/payment/`, `/terms/`, `/privacy/` are excluded from the sitemap and carry
`noindex, follow` — correct, leave alone.

### 2.1 Identity and on-page state

| URL | Role | Title tag (live) | H1 (live) | Words | AI summary |
| --- | --- | --- | --- | --- | --- |
| `/` | Entity + broad commercial | Web Design & SEO in Vernal, Utah — Custom Sites That Rank \| Cozelos Data | We Build Digital Assets That Grow Businesses. | 2,145 | ✅ (desktop only) |
| `/services/` | **Money — primary pillar** | Web Design, SEO & Marketing Services in Vernal, UT \| Cozelos Data | Six disciplines. One system built to grow your business. | 1,904 | ✅ |
| `/pricing/` | Money — conversion | Investment & Pricing — Web Design Growth Plans, Vernal UT \| Cozelos Data | An investment in growth — priced for return. | 1,563 | ✅ |
| `/contact/` | Money — conversion | Contact Cozelos Data — Let's Build Something That Lasts \| Cozelos Data | Let's build something that lasts. | 868 | ✅ |
| `/portfolio/` | Authority — proof | Utah Web Design Portfolio — Real Business Results \| Cozelos Data | Real businesses. Real transformations. | 2,311 | ✅ |
| `/company/` | Entity — organization | About Cozelos Data — Enterprise Expertise, Built in Utah \| Cozelos Data | Enterprise expertise, built for the businesses that matter. | 1,681 | ✅ |
| `/ellen-cozelos/` | Entity — founder / E-E-A-T | Ellen Cozelos — Founder of Cozelos Data \| Technology Leader | Enterprise technology, brought home to the businesses that matter. | 1,674 | ✅ |
| `/why-cozelos-data/` | Authority — differentiation | Why Cozelos Data — A Digital Asset, Not Just a Website \| Cozelos Data | Most agencies sell you a website. We hand you an asset. | 1,406 | ✅ |
| `/our-approach/` | Authority — philosophy | Our Approach — How Cozelos Data Builds Digital Assets \| Cozelos Data | Four layers between a stranger and a customer. | 1,388 | ✅ |
| `/the-cozelos-method/` | Authority — framework | The Cozelos Method — Attract, Engage, Convert, Grow \| Cozelos Data | The Cozelos Method. | 861 | ✅ |
| `/faq/` | Authority — long-tail Q&A | Frequently Asked Questions — Cozelos Data | Everything you actually want to ask. | 1,981 | ✅ |

Titles are assembled in [Seo.astro](../../src/components/Seo.astro) — `| Cozelos Data`
is appended automatically unless the title already contains the brand.

### 2.2 Technical state

Current state, measured from rendered HTML **after** the F2/F3 implementation.

| URL | Canonical | Schema emitted | In-body links out (destinations) | Pages linking in |
| --- | --- | --- | --- | --- |
| `/` | self | Org + WebSite + **FAQPage** | services (+6 anchors), portfolio (+4 anchors), pricing, faq, ellen-cozelos, why-cozelos-data, the-cozelos-method, contact | 0 |
| `/services/` | self | Org + WebSite + Breadcrumb + **Service ×6** | our-approach, pricing, portfolio, contact | 8 |
| `/pricing/` | self | Org + WebSite + Breadcrumb | services, faq, portfolio, contact | 6 |
| `/contact/` | self | Org + WebSite + Breadcrumb | pricing, faq | 9 |
| `/portfolio/` | self | Org + WebSite + Breadcrumb | services, pricing, contact | 9 |
| `/company/` | self | Org + WebSite + Breadcrumb | services, why-cozelos-data, ellen-cozelos, portfolio, contact | 1 |
| `/ellen-cozelos/` | self | Org + WebSite + Breadcrumb + **Person** | company, portfolio, contact | 2 |
| `/why-cozelos-data/` | self | Org + WebSite + Breadcrumb | services, pricing, portfolio, contact | 2 |
| `/our-approach/` | self | Org + WebSite + Breadcrumb | services, portfolio, contact | 2 |
| `/the-cozelos-method/` | self | Org + WebSite + Breadcrumb | services, portfolio, our-approach, contact | 1 |
| `/faq/` | self | Org + WebSite + Breadcrumb + **FAQPage** | services, portfolio, pricing, contact | 3 |

"In-body" excludes the global header and footer, which link everywhere from everywhere
and carry little targeting signal, and excludes the breadcrumb link to `/`.

Remaining thin spots, for after the GSC evidence lands: `/company/` (1 inbound),
`/the-cozelos-method/` (1 inbound — unresolved by design, see F1), and `/` (0 in-body
inbound, which is normal for a homepage carrying sitewide header/footer links).

### 2.3 Search targeting — proposed, pending GSC confirmation

Primary keywords below are **proposals to validate against the query exports**, not
decisions. The cluster assignment is safe to treat as settled; the keyword is not.

| URL | Intent | Cluster | Proposed primary keyword | GSC impr. | GSC pos. |
| --- | --- | --- | --- | --- | --- |
| `/` | Commercial brand/entity | Root | web design Vernal Utah / digital agency Vernal Utah | 178 (pasted) | 2.12 (pasted) |
| `/services/` | Commercial investigation | Services pillar | digital marketing services Vernal Utah | 53 (pasted) | 7.13 (pasted) |
| `/pricing/` | Commercial + cost | Services pillar | website design cost Utah | 44 (pasted) | 1.43 (pasted) |
| `/contact/` | Navigational/transactional | Conversion | contact — brand only | — | — |
| `/portfolio/` | Evaluative proof | Proof | Utah web design portfolio | 44 (pasted) | 1.43 (pasted) |
| `/company/` | Entity/brand research | Entity | Cozelos Data (brand) | — | — |
| `/ellen-cozelos/` | Person entity | Entity | Ellen Cozelos (brand) | — | — |
| `/why-cozelos-data/` | Comparison | Trust | why choose a custom website over a template | 44 (pasted) | 1.43 (pasted) |
| `/our-approach/` | Process research | Methodology ⚠️ | web design process / approach | — | — |
| `/the-cozelos-method/` | Framework/brand | Methodology ⚠️ | The Cozelos Method (brand) | — | — |
| `/faq/` | Informational long-tail | Q&A | many — one per question | — | — |

⚠️ = unresolved cannibalization, see finding F1.

---

## 3. Findings — verified, ordered by value

### F1 — `/our-approach/` and `/the-cozelos-method/` are the same page

Not "possible overlap." Confirmed duplicate content at the concept level. Both pages are
built from the same four stages, with the principle lines matching near-verbatim:

| Stage | `/the-cozelos-method/` | `/our-approach/` |
| --- | --- | --- |
| 1 | "Beautiful design earns attention." | "Beautiful design earns attention." |
| 2 | "Performance keeps visitors engaged." | "Performance keeps visitors engaged." |
| 3 | "SEO brings customers." | "SEO brings customers." |
| 4 | "Strategy turns customers into growth." | "Strategy turns customers into growth." |

Source: [the-cozelos-method.astro:13-42](../../src/pages/the-cozelos-method.astro#L13-L42)
and [our-approach.astro:14-63](../../src/pages/our-approach.astro#L14-L63).

`/the-cozelos-method/` (861 words) is the short version of `/our-approach/` (1,388
words). Two URLs competing for one intent, and `/the-cozelos-method/` is the thinnest
page on the site with **zero in-body internal links in either direction** — it is an
orphan reachable only through global navigation.

`/why-cozelos-data/` is *not* part of this problem. It is a comparison/differentiation
page ("most agencies sell you a website, we hand you an asset"), a distinct intent.
Keep it.

**Recommended:** consolidate to one URL. Merge the framework naming into
`/our-approach/`, 301 `/the-cozelos-method/` → `/our-approach/`. Only keep both if the
GSC export shows `/the-cozelos-method/` earning branded impressions for "Cozelos Method"
as a named framework — which would make it an entity page rather than a duplicate.
**Check the export before deciding.**

### F2 — Internal linking is effectively absent ✅ FIXED

**Correction (2026-08-08):** the counts first published here were understated. They came
from grepping page source for literal `href="/…"`, which missed links written as template
literals (`href={\`/services/#${s.slug}\`}`) and links passed as component props
(`Button href=`, `CTASection secondaryHref=`). The corrected baseline was measured from
rendered HTML inside `<main>`, excluding the global header and footer. The finding held —
the numbers did not.

Corrected baseline, before the fix:

| Page | Editorial links out (excl. `/contact/` CTAs) |
| --- | --- |
| `/contact/` | 0 |
| `/portfolio/` | 0 |
| `/company/` | portfolio, ellen-cozelos |
| `/pricing/` | portfolio |
| `/services/` | portfolio |
| `/faq/` | pricing |
| `/the-cozelos-method/` | our-approach |

The homepage was already well linked (its `ServicesGrid` links all six service anchors,
and `FeaturedProjects` links four portfolio anchors). `/pricing/` emitted **10** links to
`/contact/` and one editorial link.

**Implemented: 18 contextual links added across 8 pages**, using descriptive anchors and
the existing `link-underline` inline-link idiom.

Reconciliation (an earlier report of this work said "15 links" — that was a prose
miscount; the implementation always contained 18). Counted three independent ways, all
agreeing:

1. `git diff` adds **18** `href="/…"` occurrences and removes **0**.
2. Rendered in-body links inside `<main>`, excluding the global header/footer and the
   breadcrumb root link: **62 before → 80 after = +18**.
3. The source → destination table below has **18** rows, all of them new.

| Page | In-body links before | After | Added |
| --- | --- | --- | --- |
| `/` | 21 | 21 | 0 |
| `/services/` | 8 | 11 | 3 |
| `/portfolio/` | 2 | 4 | 2 |
| `/pricing/` | 11 | 13 | 2 |
| `/contact/` | 0 | 2 | 2 |
| `/faq/` | 2 | 4 | 2 |
| `/why-cozelos-data/` | 4 | 6 | 2 |
| `/company/` | 4 | 6 | 2 |
| `/the-cozelos-method/` | 2 | 4 | 2 |
| `/ellen-cozelos/` | 4 | 5 | 1 |
| `/our-approach/` | 4 | 4 | 0 |
| **Total** | **62** | **80** | **18** |

The links added, source → destination (anchor):

| # | Source | Destination | Anchor |
| --- | --- | --- | --- |
| 1 | `/services/` | `/our-approach/` | our approach to building digital assets |
| 2 | `/services/` | `/pricing/` | investment and monthly growth plans |
| 3 | `/services/` | `/portfolio/` | real Utah client builds |
| 4 | `/portfolio/` | `/services/` | services page |
| 5 | `/portfolio/` | `/pricing/` | investment for a build like these |
| 6 | `/pricing/` | `/services/` | what each of the six services includes |
| 7 | `/pricing/` | `/faq/` | frequently asked questions |
| 8 | `/contact/` | `/pricing/` | what a project typically costs |
| 9 | `/contact/` | `/faq/` | answers to the questions most businesses ask first |
| 10 | `/faq/` | `/services/` | what each of the six services covers |
| 11 | `/faq/` | `/portfolio/` | the client builds these answers describe |
| 12 | `/why-cozelos-data/` | `/services/` | six connected services |
| 13 | `/why-cozelos-data/` | `/pricing/` | investment page |
| 14 | `/company/` | `/services/` | six connected services |
| 15 | `/company/` | `/why-cozelos-data/` | the standards we hold ourselves to |
| 16 | `/ellen-cozelos/` | `/portfolio/` | the client work that has come out of it |
| 17 | `/the-cozelos-method/` | `/services/` | all six services |
| 18 | `/the-cozelos-method/` | `/portfolio/` | the projects it has produced |

Destinations gained: `/services/` +6 source pages (2 → 8 linking pages), `/portfolio/` +4,
`/pricing/` +4, `/faq/` +2, `/why-cozelos-data/` +1, `/our-approach/` +1.

One same-destination overlap exists and was left in place deliberately: `/services/` now
links `/portfolio/` twice — once as editorial copy in the intro ("real Utah client
builds") and once via the pre-existing `CTASection` button ("See the Work"). Different
context, different anchor, not an accidental duplicate. Flagged rather than removed.

No reciprocal `/our-approach/` → `/the-cozelos-method/` link was added: reinforcing two
duplicate pages before F1 is decided would work against the consolidation.

### F3 — `Service` schema is dead code ✅ FIXED

[Seo.astro:96-103](../../src/components/Seo.astro#L96-L103) builds a `Service` node when a
`serviceName` prop is passed. **No page passes it.** Every page emits
`ProfessionalService + Organization + WebSite` (+ `BreadcrumbList` where breadcrumbs are
set), plus `Person` on `/ellen-cozelos/` and `FAQPage` on `/faq/`.

The plumbing exists; nothing uses it. This is a free, valid structured-data win the
moment service content gets its own URLs — and not a box-ticking addition, since the
page genuinely describes a service offering.

**Implemented:** the prop was generalized from `serviceName?: string` to
`services?: ServiceRef[]`, and `/services/` now emits six `Service` nodes built from the
same `services` array the page renders, each `@id`'d to its section anchor and referencing
`#organization` as provider. No second business entity, no prices, no ratings.

### F4 — The Website Design section on `/services/` is visually hidden ✅ FIXED

[services.astro:91](../../src/pages/services.astro#L91) applies `sr-only` to the entire
text block for any service that has a `reelVideoId`. Exactly one service has one:
**Website Design & Development** ([site.ts:126](../../src/data/site.ts#L126)) — the most
commercially valuable section on the page Google is already ranking at ~7.

The code comment says the text "stays in the DOM for SEO." That is the risk, not the
mitigation: Google routinely discounts visually-hidden text, and hidden-text-for-search
is a pattern the guidelines specifically name. It also creates a real accessibility
mismatch — screen-reader users get a full service description that sighted users can
only receive by watching a video.

**Recommended:** show the copy *and* the reel. Keep the video as the lead visual with the
text below it, rather than swapping one for the other.

**Implemented:** the `sr-only` condition was removed from the rendering pattern itself,
not patched per service. The reel now leads the section and the copy renders normally
below it, on desktop and mobile. Verified: zero `sr-only` occurrences inside `<main>` on
the built `/services/` page.

### F5 — Homepage H1 carries no keyword and no location

`We Build Digital Assets That Grow Businesses.` — strong brand line, zero search signal
on the site's highest-authority page. The title tag does the work
("Web Design & SEO in Vernal, Utah"), and the H1 contradicts it.

Low-risk fix: keep the brand voice, add the entity. Something like *"We build digital
assets that grow Utah businesses."* — validate against homepage query data first, since
`/` sits at ~2.1 and is the page with the most to lose.

### F6 — ~~Homepage FAQ block has no FAQPage schema~~ ❌ WITHDRAWN

**This finding was wrong.** It came from grepping `index.astro`, which contains no schema
of its own — but the homepage FAQ is rendered by `FAQ.astro`, and that component emits its
own `FAQPage` node ([FAQ.astro:14-27](../../src/components/FAQ.astro#L14-L27)) scoped to
exactly the questions it renders.

Verified against the built output: the homepage emits `FAQPage` with 5 questions (matching
its `limit={5}`), `/faq/` emits `FAQPage` with 25. Correct behavior, already implemented,
nothing to do.

### F7 — The six service pillars already exist as anchors

`/services/` renders one `<section id>` per service using slugs already defined in
[site.ts](../../src/data/site.ts): `website-design`, `video-production`,
`online-marketing`, `seo`, `business-automation`, `ongoing-support`.

So `/services/#seo` is already addressable, and the URL slugs for any future split are
already decided. This is why the six-URL split is a **later** decision, not a first move:
the content exists, it is reachable, and splitting it before the query data arrives risks
cutting a page that currently ranks as a whole.

### F8 — `?page_id=` legacy URLs (carried forward, unchanged)

`/?page_id=2` returns 200, not 301, with `<link rel="canonical" href="https://cozelosdata.com/">`.
Self-healing via canonical, low urgency. A 301 stripping unknown query parameters is
cleaner but must not break any parameter the site legitimately uses. **Do not touch until
`?page_id=158` (131 impressions, position ~13.6) is identified in the export** — that URL
has real impressions and needs to be classified before anything redirects it.

---

## 4. Sprint 01 — ordered

Nothing here changes the sitemap or robots. Both are verified correct.

| # | Action | Depends on GSC? |
| --- | --- | --- |
| 1 | Pull the query exports in §1 | — |
| 2 | Classify `?page_id=158 / 262 / 866` against the export | yes |
| 3 | Resolve F1 — consolidate or justify `/the-cozelos-method/` | yes |
| 4 | ~~Fix F4 — unhide the Website Design copy on `/services/`~~ ✅ done | **no** |
| 5 | ~~Build the internal-link graph (F2)~~ ✅ done | **no** |
| 6 | Optimize `/services/` title, summary, headings to real queries | yes |
| 7 | Fix F5 — homepage H1 | yes (validate first) |
| 8 | Decide the six-URL split (F7) — `Service` schema (F3) ✅ already wired | yes |
| 9 | Case studies from real projects; then external authority | no |

Items **4 and 5 are unblocked right now** and are the two highest-confidence on-site
wins available. Everything else waits for evidence.

---

## 5. Ground rules

- Fix existing pages before creating new ones.
- One URL per intent. Never a URL per keyword variation.
- No generic blog content ("What Is SEO?"). Cozelos has real projects and a founder with
  a verifiable record — publish what only Cozelos can publish.
- Schema where it is valid and describes real page content, not to check a box.
- Depth over word count. Do not pad to hit a number.
- Local hierarchy: Vernal → Uintah Basin → Eastern Utah → Utah → national.
- Money pages first; authority pages exist to feed them.
