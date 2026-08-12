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
| F1 — Approach/Method duplication | ✅ resolved 2026-08-08 — consolidated into `/our-approach/`, Cloudflare 301 live and verified |
| F5 — homepage H1 | ⏸ deliberately deferred — blocked on `/` query data |
| F6 — homepage FAQ schema | ❌ **withdrawn — the finding was wrong** |
| F7 — six-URL split | ⏸ **still blocked** — the `/services/` export returned zero query rows, see below |
| F8 — `?page_id=` URLs | ⏸ still blocked — `?page_id=158` remains unclassified |
| F9 — `www` duplicate host | ✅ resolved — 301 to apex, path preserved, re-verified live 2026-08-11 |
| F10 — unknown paths return the homepage at 200 | 🟡 **open — next technical investigation** |

**`/services/` GSC gate completed 2026-08-11 — decision DEFERRED.** The page-filtered
export passed attribution (58 impr, 0 clicks, pos 6.88, apex isolated) but returned **zero
query rows**, along with zero Countries, Devices, and Search-appearance rows. Search Console
therefore provides insufficient query-level evidence to determine the commercial
architecture of `/services/` — which is a statement about our evidence, *not* a claim that
Google does not understand the page. The export is preserved as the clean **pre-F9
baseline**; re-pull after 4–8 weeks of post-consolidation data (no earlier than 2026-09-08)
and compare. Full record: [gsc-analysis-01-services.md](./gsc-analysis-01-services.md).
**Preserve the current `/services/` architecture unchanged until then.**

**Freeze status changed 2026-08-08.** The blanket freeze is lifted; the gate is now
*query-specific* work only. Guide-supported, site-verifiable changes are open — see
[guide-audit-2026-08-08.md](./guide-audit-2026-08-08.md) for the full 11-page compliance
audit, the A/B/C classification, and the seven Category A changes implemented against it.
F5, F7, F8 and every keyword/intent decision remain blocked on the GSC exports. **F1 is no
longer blocked** — it was resolved as a content consolidation and its 301 configured and
independently verified in production on 2026-08-08 (§3, F1).

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

## 2. The map — 10 indexable URLs

Sitemap verified live: index → `sitemap-0.xml` → **10 URLs**, all HTTP 200 — down from 11
with the F1 consolidation on 2026-08-08. The `/the-cozelos-method/` rows still present in
the §2.1–2.3 tables below are the **pre-retirement record**: that URL is no longer in the
sitemap and now 301s to `/our-approach/`.
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
| `/services/` | Commercial investigation ⛔ | Services pillar | digital marketing services Vernal Utah ⛔ | **58 (verified)** | **6.88 (verified)** |
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
⛔ = **not validated and not validatable from current data.** The `/services/` page-filtered
export (2026-08-11) returned zero query rows, so its intent classification and proposed
primary keyword remain unverified proposals. Do not act on them. See
[gsc-analysis-01-services.md](./gsc-analysis-01-services.md). Its impressions/position are
now verified figures from that export, replacing the earlier pasted numbers.

---

## 3. Findings — verified, ordered by value

### F1 — RESOLVED 2026-08-08 ✅ (history below preserved unchanged)

Resolved as a **content consolidation**, not a deletion. GSC evidence
([gsc-analysis-00-sitewide.md](./gsc-analysis-00-sitewide.md) §6) showed **both** URLs at
zero impressions over three months, so the merge carried no ranking risk — and the
reference audit ([f1-redirect-audit.md](./f1-redirect-audit.md)) found the stage names
`Attract · Engage · Convert · Grow` were the only content unique to
`/the-cozelos-method/`.

What happened:

1. The four stage names were integrated into the existing four chapters of
   `/our-approach/` — not appended beneath them. The page now names the framework in its
   section heading (`The Cozelos Method` / `Attract. Engage. Convert. Grow.`) and in its AI
   summary. Word count 851 → 864: the framework moved, nothing was padded.
2. Vocabulary normalised from "layers" to "stages" across six visible references, so the
   page carries one vocabulary.
3. `/the-cozelos-method/` retired: page file deleted, footer link removed, the homepage
   `Philosophy` button repointed to `/our-approach/` (label kept — it still names the
   framework), and the `llms.txt` entry folded into the `/our-approach/` line.

Sitemap is now **10 URLs**. The §2 inventory has since been updated to 10; its per-URL
tables retain the `/the-cozelos-method/` rows as the pre-retirement record.

⚠️ **Outstanding — the 301 does not exist yet.** This project is `output: "static"` with no
adapter and no redirect configuration, so it cannot emit a real 301.

**Correction (measured 2026-08-08):** an earlier note here said the retired URL would
return **404**. It will not — see F10. The host serves unknown paths as the homepage with
HTTP 200. So after deploy, `/the-cozelos-method/` becomes a **soft 404** that
self-canonicalises to `/`, not to `/our-approach/`. That is the wrong consolidation target,
which makes the 301 more necessary than a 404 would have — not less. At zero impressions
the practical cost is still nil.

Configure alongside the `www` → apex rule in F9, as two separately documented rules.

#### Resolution — 301 configured and verified 2026-08-08 ✅

Supersedes the ⚠️ block directly above, which is left in place as the record of what was
outstanding before the rule existed. The soft-404 described there was measured in
production and is now closed.

The redirect lives in **Cloudflare Redirect Rules** ("Retire The Cozelos Method"), not in
the repo — this project is still `output: "static"` with no adapter, so nothing about the
build changed. Rule shape:

| Field | Value |
| --- | --- |
| Match | `lower(http.request.uri.path) in {"/the-cozelos-method" "/the-cozelos-method/"}` |
| Target | `https://cozelosdata.com/our-approach/` |
| Status | 301 |
| Preserve query string | enabled |

Matching is on **path only**, not full URI. The first attempt matched the full URI and let
`/the-cozelos-method/?utm_source=…` fall through to the origin — a 200 soft-404 on the
homepage. `lower()` keeps the match case-insensitive; the two-value set covers the
missing trailing slash. Both were live gaps, not hypotheticals.

Verified against production, every variant one 301 then 200, no loops:

| Request | Hops | Final | Query |
| --- | --- | --- | --- |
| `/the-cozelos-method/` | 1 | `/our-approach/` 200 | n/a |
| `/the-cozelos-method` | 1 | `/our-approach/` 200 | n/a |
| `/the-cozelos-method/?utm_source=test&a=1` | 1 | `/our-approach/?utm_source=test&a=1` 200 | preserved |
| `/the-cozelos-method?gclid=test` | 1 | `/our-approach/?gclid=test` 200 | preserved |
| `/THE-COZELOS-METHOD/` | 1 | `/our-approach/` 200 | n/a |
| `/The-Cozelos-Method/` | 1 | `/our-approach/` 200 | n/a |

`www` + a retired path produces **two** hops, which is correct rather than a defect — F9
fires first, then F1, each once:

```
www.cozelosdata.com/the-cozelos-method/?utm_source=test&a=1
  → 301 → cozelosdata.com/the-cozelos-method/?utm_source=test&a=1   (F9)
  → 301 → cozelosdata.com/our-approach/?utm_source=test&a=1         (F1)
  → 200
```

Collapsing this to one hop would mean duplicating F1's path logic onto the `www` host, so
it is deliberately left as two.

**F9 re-tested after the F1 edit and still passes** — `/`, `/services/`, `/pricing/`,
`/portfolio/`, `/?page_id=158` each return exactly one 301 to the apex with path and query
preserved and a 200 final. No regression from this change.

**F10 was not tested and not touched.** The catch-all remains a separate open finding; the
F1 redirect now intercepts this one path *before* F10's fallback can serve it, but F10's
behaviour for every other unknown path is unchanged and still as described below.

### F10 — the host serves every unknown path as the homepage (new, 2026-08-08)

Measured live. `https://cozelosdata.com/definitely-not-a-real-page-xyz/` returns:

| | Value |
| --- | --- |
| Status | **HTTP 200** (not 404) |
| Body | **158,873 bytes — byte-identical to the homepage** |
| `<title>` | Web Design & SEO in Vernal, Utah — Custom Sites That Rank |
| Canonical | `https://cozelosdata.com/` |
| `noindex` | none |

Production is **Cloudflare** (`Server: cloudflare`, `cf-cache-status: DYNAMIC`, `CF-RAY`
present on both apex and `www`).

Two consequences:

1. **This fully explains F8.** The `?page_id=` URLs are not special legacy handling — they
   are the same catch-all. Any URL that does not match a built page returns the homepage
   with the homepage canonical.
2. **Every mistyped or stale URL is an indexable soft 404.** Google flags these in the
   Coverage report and it is an unbounded surface: an infinite space of URLs all returning
   200 with identical content.

Self-canonicalisation limits the damage, which is why nothing has gone visibly wrong. But
the correct behaviour is a real 404 for unknown paths, with explicit 301s for the URLs that
genuinely moved.

Fix location: **Cloudflare**, not this repository.

> **⚠️ Superseded 2026-08-11.** The object-storage inference below is **withdrawn** — the
> three headers it rests on have simpler explanations (the 4-hour TTL is Cloudflare's
> default Browser Cache TTL applied to CDN-cached assets, not an origin setting). The
> serving layer is a Cloudflare first-party static-asset server. Full evidence and the
> Layer 2 diagnosis: [f10-layer2-diagnosis.md](./f10-layer2-diagnosis.md). The practical
> conclusion changed too: `dist/404.html` has **never been deployed**, so deploying it may
> resolve F10 with no Cloudflare change at all — test before configuring anything.

Header evidence (2026-08-08) says this is **probably not** a default Cloudflare Pages
deployment:

| Header | Observed | Pages default |
| --- | --- | --- |
| `Cache-Control` on hashed `/_astro/*` asset | `public, max-age=14400, must-revalidate` | `public, max-age=31536000, immutable` |
| `Access-Control-Allow-Origin` on HTML | `*` | not set |
| `ETag` | plain MD5-style hash | — |

The CORS wildcard plus a plain-hash `ETag` plus a 4-hour asset TTL is the signature of an
object-storage origin (R2/S3-style) behind Cloudflare, or a Worker — not Pages. That also
explains F10: a bucket-backed setup returning `index.html` for unmatched keys.

**Therefore: do not add `public/_redirects` to this repo.** If this is not Pages the file
is never read, and it would sit in the tree looking like a working redirect while doing
nothing.

**Use Cloudflare Redirect Rules instead.** They run at the edge, before the origin, so they
work identically whether the backend is Pages, a Worker, or a bucket — which sidesteps the
question entirely. Two rules is well inside the free-plan allowance.

Note that F10 itself (unknown paths returning 200) **cannot** be fixed by Redirect Rules —
that is origin behaviour and needs whoever configured the catch-all. Separate task.

#### Read-only investigation 2026-08-11 — F10 has two independent layers

Re-probed live as part of the post-`/services/`-gate work. **Nothing was changed.** The
behaviour is unchanged from 2026-08-08: unknown paths still return `200` with 158,942 bytes
of homepage HTML, canonical `https://cozelosdata.com/`, no `noindex`.

The probe set below is what is new, and it splits F10 into two layers that can be addressed
independently:

| Request | Code | Bytes | Reading |
| --- | --- | --- | --- |
| `/services` (no trailing slash) | **308** | 0 | → `/services/`. The stack **has a route table.** |
| `/definitely-not-a-real-page-xyz` | 200 | 158,942 | No 308 first — unknown paths skip normalisation entirely |
| `/definitely-not-a-real-page-xyz/` | 200 | 158,942 | Catch-all |
| `/wp-login.php` | 200 | 158,942 | Catch-all |
| `/_astro/nope.js` | 200 | 158,942 | Catch-all, served as `Content-Type: text/html` |
| `/?page_id=158` | 200 | 158,942 | Homepage route + ignored query |
| `/?page_id=262`, `/?page_id=866` | 200 | 158,942 | Same |
| `/?utm_source=test` | 200 | 158,942 | **Same — byte-identical to the `page_id` URLs** |
| `/robots.txt` | 200 | 1,911 | Real file |
| `/sitemap-0.xml` | 200 | 1,865 | Real file |

**Layer 1 — this repository has no 404 document at all.** There is no
`src/pages/404.astro`, and [astro.config.mjs](../../astro.config.mjs) sets
`output: "static"`. An Astro static build emits `404.html` **only** when that route is
authored. So `dist/` currently contains no 404 document — meaning even a host configured to
serve one has nothing to serve. This half of F10 is a repository concern, it is fixable
here, and it is a prerequisite for any host-side fix.

**Layer 1 implemented 2026-08-11** — [src/pages/404.astro](../../src/pages/404.astro) added;
`npm run build` now emits `dist/404.html` (38,212 bytes), page count 13 → 14. `astro check`
clean. Verified additive-only: every other page's HTML is byte-identical once the
content-hashed `AiSummary.*.css` filename is normalised, and the shared stylesheet gained
exactly two Tailwind utilities with none removed or altered. The document carries
`noindex, follow` and emits **no** `BreadcrumbList` — deliberately, so it never asserts that
the requested URL has a place in the site hierarchy. **Not committed and not deployed.**

Known limitation, unavoidable without touching canonical logic (out of scope): the document
self-canonicalises to `https://cozelosdata.com/404/`, since `Seo.astro` derives canonical
from `Astro.url.pathname` at build time. Served under any unknown path it will therefore
point at `/404/`. `noindex` neutralises the consequence; revisit only if Layer 2 lands and
the canonical proves to matter.

**Layer 2 — the origin's unmatched-key behaviour** remains a Cloudflare/origin
configuration task, as recorded above. **Layer 1 alone changes nothing in production.**
Until the origin is configured to serve `404.html` with an HTTP 404 status for unmatched
keys, unknown paths will continue to return the homepage at 200 exactly as before. Header signature re-checked 2026-08-11 and unchanged
(`Access-Control-Allow-Origin: *` on HTML, `/_astro/*` at `max-age=14400, must-revalidate`,
plain-hash `ETag`) — still consistent with an object-storage or Worker origin rather than
Pages default.

#### Correction to point 1 above — F8 does **not** block F10

The claim recorded on 2026-08-08 that the `?page_id=` URLs "are the same catch-all" does not
survive this probe set. Two pieces of evidence:

1. `/services` returns `308` while `/definitely-not-a-real-page-xyz` returns `200` directly.
   The stack therefore distinguishes known routes from unknown ones — it is not blind.
2. `/?utm_source=test` returns bytes identical to `/?page_id=158`. Both are simply the
   **real `/` route with a query string the static host ignores** — not unmatched keys.

The two URL classes return identical bytes, which is why they looked like one mechanism, but
they arrive there by different paths. **Consequence: making unknown paths return 404 would
not change `?page_id=158` behaviour at all**, because `/` is a matched route. The
`?page_id=158` classification question (F8) genuinely blocks *redirecting* those URLs; it
does **not** block fixing unknown-path handling.

This decouples F10 from the F8 evidence gap. It does not by itself authorise a change —
Layer 2 is still someone else's console — but it removes the stated reason F10 was waiting.

#### Secondary observation — stale asset requests return HTML

`/_astro/nope.js` returns homepage HTML with `Content-Type: text/html`. A browser holding a
stale hashed asset URL after a deploy receives an HTML document where it expects JavaScript,
which fails as a parse error rather than a clean 404. This is a robustness issue rather than
an SEO one, and it resolves along with Layer 2.

---

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

**Measured live 2026-08-08** (as Googlebot), after a sitewide GSC Pages report showed
`?page_id=158` 131 impr / 6 clicks, `?page_id=262` 57 impr, `?page_id=866` 46 impr:

| URL | Status | Canonical emitted | Bytes |
| --- | --- | --- | --- |
| `/` | 200 | `https://cozelosdata.com/` | 158,873 |
| `/?page_id=158` | 200 | `https://cozelosdata.com/` | 158,873 |
| `/?page_id=262` | 200 | `https://cozelosdata.com/` | 158,873 |
| `/?page_id=866` | 200 | `https://cozelosdata.com/` | 158,873 |

All three serve **byte-identical homepage HTML**. There is no distinct legacy content
behind any of them at the serving layer — the "historical content" scenario is ruled out
*for what Google can fetch today*. What is still unknown is what Google **associates** with
them from the previous WordPress site, and that is a query-attribution question the
page-filtered exports answer. Impressions ≠ content. Still do not redirect.

### F9 — `www` is a live duplicate host ✅ RESOLVED 2026-08-11 (history below preserved unchanged)

**Re-verified live 2026-08-11** — the redirect is in place at the edge and is correct:

| Request | Result |
| --- | --- |
| `https://www.cozelosdata.com/` | `301` → `https://cozelosdata.com/` |
| `https://www.cozelosdata.com/services/` | `301` → `https://cozelosdata.com/services/` |

One hop, `301` (not `302`), and the **path is preserved** rather than being flattened to the
homepage — all three properties correct. `Server: cloudflare` on the redirect response, so
it is running as an edge rule, consistent with the F10 note that redirect configuration
lives in Cloudflare rather than in this repository.

Consequence for measurement: the apex/`www` impression split recorded below (53 + 41 for
`/services/`) should collapse onto the apex from the consolidation date forward. That is the
comparison the pre-F9 baseline in
[gsc-analysis-01-services.md](./gsc-analysis-01-services.md) exists to support.

Original finding follows.

---


Measured live: `https://www.cozelosdata.com/` and `https://www.cozelosdata.com/services/`
both return **200 with no redirect** to the apex. The sitewide GSC Pages report shows
`www.cozelosdata.com/services/` earning 41 impressions alongside 53 for the apex
`/services/`.

Mitigating fact: canonical is built from the hardcoded `SITE` constant in
[astro.config.mjs](../../astro.config.mjs), so **every `www` page emits the apex
canonical** — verified above. Same self-healing pattern as F8, not a split-index
emergency.

There is **no redirect configuration in this repository** (no `_redirects`, `_headers`,
`netlify.toml`, `wrangler.toml`, or `vercel.json`). A `www` → apex 301 is a host/DNS/CDN
change, not a code change, and is out of scope for any commit here. Record only.

---

### F11 — the live `robots.txt` is Cloudflare-managed and blocks AI crawlers (new, 2026-08-11)

Found incidentally while probing F10. **Record only — no change proposed here.**

The served [robots.txt](https://cozelosdata.com/robots.txt) is **1,911 bytes**. This
repository's [public/robots.txt](../../public/robots.txt) is four lines. They are not the
same file: Cloudflare is injecting a managed block at the edge, delimited by
`# BEGIN Cloudflare Managed content` / `# END Cloudflare Managed Content`, ahead of the
repo's own directives.

**This repository is therefore not the source of truth for `robots.txt`.** Editing
`public/robots.txt` will not remove or alter the managed block.

What the managed block does:

| Directive | Value |
| --- | --- |
| `Content-Signal` (on `User-agent: *`) | `search=yes, ai-train=no, use=reference` |
| `Disallow: /` | Amazonbot, Applebot-Extended, Bytespider, CCBot, **ClaudeBot**, CloudflareBrowserRenderingCrawler, **Google-Extended**, **GPTBot**, meta-externalagent |

Scope of the effect, stated precisely — **not** "the site is blocked from AI":

- **Classic search is unaffected.** Googlebot and Bingbot are not in the disallow list, and
  the content signal explicitly permits `search=yes`. Indexing and ranking are untouched.
- Named AI crawlers above are disallowed, and `ai-train=no` reserves rights against
  training use.
- Several AI retrieval agents are **not** named and so are not blocked by name — notably
  OAI-SearchBot and PerplexityBot. GPTBot and OAI-SearchBot are distinct agents serving
  different purposes.
- `Google-Extended` governs Gemini/Vertex grounding, which is not the same surface as
  Google's AI Overviews. Do not assume blocking it removes the site from AI Overviews, and
  do not assume it does not — verify before claiming either.

**Why this matters later, not now.** Master Guide Part 13 (AI citation) and Part 22 (the
Agentic Web) both assume AI systems can fetch the site. A managed block that disallows
several of them is a live tension with that goal, and it is a *business decision* — training
opt-out versus citation reach — not a technical defect. It belongs to the AI/GEO phase.

Two things to carry forward:

1. Any AI-citation measurement must account for this. Testing "does ChatGPT cite Cozelos"
   without knowing GPTBot is disallowed would misread the result.
2. The untidy detail: the merged file contains **two** `User-agent: *` groups (one managed,
   one from the repo). Both are `Allow: /`, so there is no practical conflict, but a single
   consolidated group would be cleaner if the managed block is ever configured off.

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

### Sprint 02 — revised 2026-08-11, after the `/services/` gate

Item 1 is complete for `/services/` and returned zero query rows, so items 2, 3, 6, 7 and 8
above stay blocked — and items 2 and 3 are now blocked indefinitely rather than pending,
since no further export is planned before the post-F9 re-pull. Revised order:

| # | Action | Depends on GSC? | State |
| --- | --- | --- | --- |
| 1 | ~~`/services/` page-filtered export~~ ✅ done 2026-08-11 — zero query rows, decision deferred | — | closed |
| 2 | ~~**F10 Layer 1** — author `src/pages/404.astro`~~ ✅ implemented 2026-08-11, **not deployed** | **no** | done, uncommitted |
| 3 | **F10 Layer 2** — origin returns 404 for unmatched keys (Cloudflare/origin console) | **no** | outside this repo |
| 4 | F11 — decide the AI-crawler posture in the Cloudflare managed `robots.txt` | no | business decision |
| 5 | Re-pull `/services/` and compare to the pre-F9 baseline | — | **not before 2026-09-08** |
| 6 | Everything intent-related: F5, F7, F8, titles, targeting, money pages | yes | blocked on #5 |

F5, F7 and F8 were each reviewed on 2026-08-11 against this export and **none can be safely
resolved without `/services/` query intent** — F7 directly, F8 because `?page_id=158`
remains unclassified, F5 because it needs `/` query data this export does not contain. They
stay deferred. See [gsc-analysis-01-services.md](./gsc-analysis-01-services.md) §8.

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
