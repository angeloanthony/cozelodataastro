# Cozelos Data — SEO Guide Compliance Audit

**Date:** 2026-08-08 · **Baseline:** commit `40dd5a1` + deployed F2/F3/F4
**Framework:** [SEO-Master-Guide-2026-Combined.docx](./SEO-Master-Guide-2026-Combined.docx) — Book One Parts 1–23 + Master Launch Checklist, Book Two implementation blueprint. Read in full, not summarised.
**Site state:** [master-map.md](./master-map.md) · **GSC:** [gsc/README.md](./gsc/README.md) — **11 page-filtered exports absent**

Operating mode: **Controlled unfreeze — guide-driven, GSC-gated.** Query-intent decisions
stay closed. Everything measurable from the guide + the site itself is open.

All measurements below were taken from the **built HTML inside `<main>`**, excluding the
global header, footer, and the breadcrumb root link — the same method used for F2.

---

## 1. The three sources, kept separate

| Source | What it says | Status |
| --- | --- | --- |
| **Guide** | What a page should contain, structurally | Complete — read in full |
| **Site / map** | What Cozelos Data actually contains | Complete — re-measured from `dist/` |
| **GSC** | What Google associates with each URL | **Absent** — 0 of 11 exports present |

An intent decision needs all three. A structural defect needs only the first two. This
audit only acts where the first two are sufficient.

---

## 2. Page-by-page audit — 11 canonical URLs

Measured values. `AI∑` = AI summary block present. `FAQ` = on-page Q&A + FAQPage schema.

| URL | Role | Words | H1 | AI∑ | FAQ | In-body out / in | Schema | Guide findings | A | B | C |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Entity + broad commercial | 1,624 | 1 | ⚠ hidden on mobile | ✅ 5 + schema | 8 / 0 | Org+Site+FAQPage | Summary block is `display:none` below 768px — the mobile-indexed page has no AI-citation block (Part 4 §1, Part 13 L1, Part 16 mobile-first). H1 carries no keyword/location (F5). Title 72 chars — truncates in SERP. | 1 | 2 | — |
| `/services/` | **Money — primary pillar** | 1,416 | 1 | ✅ | ❌ none | 4 / 8 | Org+Site+**Service ×6**+Breadcrumb | No FAQ on the pillar money page (Part 4 §3, Launch Checklist). No link to `/faq/` although `/faq/` links here — broken reciprocal pair (Part 10). Two YouTube embeds with no `VideoObject` (Book Two). Six services still one URL (F7). | 1 | 3 | — |
| `/pricing/` | Money — conversion | 1,057 | 1 | ⚠ no location | ❌ none | 4 / 6 | Org+Site+Breadcrumb | Summary omits location, which the guide's summary spec requires (Part 4 §1). Real prices visible but no `Offer` schema (Book Two). Title 72 chars. Content depth strong: Definition ✅ Pricing ✅ Mistakes ✅ Process ⚠ FAQ ❌. | 1 | 2 | — |
| `/why-cozelos-data/` | Authority — differentiation | 897 | 1 | ✅ | ❌ none | 4 / 2 | Org+Site+Breadcrumb | `/company/` links here; no link back — broken reciprocal pair (Part 10). Comparison-page blocks: Definition ✅ Mistakes ✅ Pricing ⚠ (links out) FAQ ❌. Never references the founder despite being the trust argument. | 1 | 1 | 1 |
| `/company/` | Entity — organisation | 1,130 | 1 | ✅ | ❌ none | 5 / **1** | Org+Site+Breadcrumb | Thinnest inbound on the site (1). Meta description **255 chars** — truncated (Part 14: 150–155). Credentials claim "Active UEI" but only a **DUNS** is published; DUNS was retired for federal registration in 2022. Zero outbound authoritative sources for WOSB / Section 508 / WCAG claims (Launch Checklist). | 3 | 1 | — |
| `/ellen-cozelos/` | Entity — founder / E-E-A-T | 1,155 | 1 | ✅ | ❌ none | 3 / 2 | Org+Site+Breadcrumb+**Person** | Meta description **243 chars** — truncated. `Person` node exists here, but the `Organization.founder` node emitted sitewide is an **anonymous second Person** with no `@id` — two entities for one human (Part 13 L3 entity coherence). | 2 | — | 1 |
| `/our-approach/` | Authority — philosophy | 851 | 1 | ✅ | ❌ none | 3 / 2 | Org+Site+Breadcrumb | Meta description **219 chars** — truncated. Duplicate of `/the-cozelos-method/` (F1). Summary has no location — correct here, forcing one would be keyword insertion. | 1 | 1 | 1 |
| `/portfolio/` | Authority — proof | 1,770 | 1 | ✅ | ❌ none | 4 / 9 | Org+Site+Breadcrumb | Best-linked page on the site. Grid-card `alt` is the bare project name; the case-study images below use a full descriptive `alt` — inconsistent (Part 16). Before/after slider and the 1M+/200+/100% counters are unverified claims (Part 2 "real details"). | 1 | 2 | — |
| `/the-cozelos-method/` | Authority — framework | **349** | 1 | ✅ | ❌ none | 4 / 1 | Org+Site+Breadcrumb | **Below the guide's 400-word thin-content line** (Part 2 "what gets you penalised"). Confirmed duplicate of `/our-approach/` (F1). Fixing either the thinness or the duplication is the same decision. | — | 1 | — |
| `/contact/` | Money — conversion | **354** | 1 | ✅ | ❌ none | 2 / 10 | Org+Site+Breadcrumb | Short, but it is a form page with Process ✅ and full NAP ✅ — padding it would be exactly what the guide warns against. Highest inbound on the site, correctly. | — | — | 1 |
| `/faq/` | Authority — long-tail Q&A | 1,472 | 1 | ✅ | ✅ 25 + schema | 4 / 3 | Org+Site+Breadcrumb+**FAQPage** | Only 3 inbound despite being the long-tail authority page. 5 of its 25 Q&As are duplicated verbatim on `/` with a second FAQPage node — pre-existing and deliberate (F6), but a duplication the guide's Book Two flags. | — | 1 | 1 |

### Sitewide, measured

| Check | Result |
| --- | --- |
| One H1 per page | ✅ 11/11 |
| Canonical self-referencing | ✅ 11/11 |
| Sitemap = the 11 URLs | ✅ verified in `dist/sitemap-0.xml` |
| `/payment/ /terms/ /privacy/` | ✅ `noindex, follow`, excluded from sitemap |
| `robots.txt` allows AI crawlers | ✅ `User-agent: * / Allow: /` — GPTBot, ClaudeBot, PerplexityBot, Google-Extended all permitted; sitemap declared |
| `llms.txt` | ✅ present, NAP and pricing match `site.ts` exactly |
| NAP consistency | ✅ single source `site.ts` → footer, contact, schema, llms.txt all identical |
| Images with `alt` | ✅ 100% (hero background correctly `alt=""` decorative) |
| Below-fold images lazy | ✅ 100%; hero `eager` + `fetchpriority=high` — correct |
| Image format | ✅ WebP throughout, responsive `widths`/`sizes` |
| Duplicate business entities in schema | ✅ none — one `#organization`, `Service`/`Person` reference it |
| Outbound authoritative links | ❌ **zero sitewide** (only client sites + the Google review link) |
| AI summary present | 11/11 — but 1 is hidden on mobile |
| On-page FAQ | **2/11** (`/` and `/faq/`) |

---

## 3. Findings, classified

### A — implement now (guide-supported, site-verifiable, GSC-independent)

| # | Page | Finding | Guide | Change |
| --- | --- | --- | --- | --- |
| **A1** | `/` | AI summary is `hidden md:block` = `display:none` below 768px. Google indexes mobile-first, so the citation block is absent from the version that is indexed. Same failure class as F4 (`sr-only`), which was accepted and fixed. | Part 4 §1, Part 13 Layer 1, Part 16 | Render it on mobile; move it below the trust row on mobile only so the fold stays unchanged. Desktop untouched. |
| **A2** | sitewide | `Organization.founder` emits an anonymous `Person` with no `@id`, while `/ellen-cozelos/` emits a `Person` with `@id #ellen-cozelos`. Two nodes, one person. | Part 13 Layer 3 | Give `founder` the `#ellen-cozelos` `@id` so the nodes merge. |
| **A3** | `/company/` `/ellen-cozelos/` `/our-approach/` | Meta descriptions 255 / 243 / 219 chars — the tail is never rendered. | Part 14 (150–155) | Tighten to ≤160 chars keeping the same terms and order. No new keyword targeting. |
| **A4** | `/why-cozelos-data/` `/services/` | Two one-way link pairs: `/company/`→`/why-cozelos-data/` and `/faq/`→`/services/` have no return link. | Part 4 §2, Part 10 ("links MUST go both directions") | Add exactly 2 links, both genuinely useful. Not a link-count pass. |
| **A5** | `/portfolio/` | Grid-card `alt` is the bare project name; the case studies on the same page use a full descriptive `alt`. | Part 16 | Match the descriptive pattern already used below. |
| **A6** | `/company/` | WOSB / Section 508 / WCAG 2.1 AA claims carry no authoritative source, on the page written for contracting officers. Site has zero outbound authoritative links. | Launch Checklist "outbound links to authoritative sources"; Part 22 Vertical 1 (trust/verification) | Add 2 links: SBA WOSB program, W3C WCAG 2.1. Both verified live. |
| **A7** | `/pricing/` | AI summary omits the location the guide's summary spec requires — on a money page. | Part 4 §1 | Name the location once, naturally, in the summary sentence. |

### B — needs GSC or a human decision

| # | Page | Finding | Blocked on |
| --- | --- | --- | --- |
| B1 | `/` | H1 "We Build Digital Assets That Grow Businesses." carries no keyword or location while the title does. Guide Part 2 confirms Title Match Score; the H1 contradicts the title. | **GSC** — `/` sits at ~2.1 and has the most to lose (F5) |
| B2 | `/` `/pricing/` | Titles at 72 chars truncate; the `\| Cozelos Data` suffix is dropped. Shortening = changing what the title targets. | **GSC** |
| B3 | `/services/` | Money pillar has no FAQ. Every service-relevant question already lives on `/faq/` with FAQPage schema, so adding them here duplicates Q&A across two URLs — a cannibalisation decision, not a formatting one. | **GSC** — needs to show which URL owns those questions |
| B4 | `/services/` | Two YouTube embeds, no `VideoObject`. | **Human** — needs real `uploadDate` and `duration`; inventing them is an unsupported claim |
| B5 | `/services/` | Six-URL split (F7). | **GSC** |
| B6 | `/pricing/` | Real prices visible, no `Offer`/`priceSpecification` schema. F3 deliberately excluded prices. | **Human** — reverses a prior decision |
| B7 | `/company/` | "SAM Ready — active UEI" and "DUNS / UEI Active" are claimed, but only a **DUNS** (059220399) is published, in the visible strip and in `Organization.identifier`. DUNS was retired for federal registration in April 2022. For a contracting audience this reads as stale. | **Human** — needs the actual UEI |
| B8 | sitewide | `Organization.sameAs` points at three social profiles marked in `site.ts` as *"Placeholder handles — update when live profiles are created."* If they 404, the entity graph asserts profiles that do not exist. | **Human** — confirm the profiles exist |
| B9 | `/portfolio/` | Before/after slider ("8.2s · Page 7" → "Sub-second · #1 ranked") and the 1M+ views / 200+ leads / 100% retention counters are unverified. Wernex is listed as "#1 Rankings" while its own outcome sentence says "#1 local rankings **as the goal**". | **Human** — only the business knows what is true |
| B10 | `/the-cozelos-method/` | 349 words, below the 400-word thin line, **and** a confirmed duplicate of `/our-approach/`. One decision, not two. | **GSC** (F1) |
| B11 | `/our-approach/` | Same pair, other side. | **GSC** (F1) |
| B12 | `/faq/` | Only 3 inbound links for the long-tail authority page. | **GSC** — which questions matter decides which pages should link in |
| B13 | sitewide | `site.description` (used in every `Organization.description`) advertises "branding" and "advertising", which are not among the six services. Branding appears only as a line item on one portfolio project. | **Human** — is branding a service or not? |
| B14 | `/` `/pricing/` `/why-cozelos-data/` `/portfolio/` `/the-cozelos-method/` `/contact/` | Meta descriptions of 174–184 chars — over the guide's 150–155 but only losing a short tail, unlike the 219–255 group fixed in A3. Rewriting a description on a page sitting at position 1–2 is a CTR bet, not a truncation fix. | **GSC** — CTR per URL decides whether these are worth touching |
| B15 | off-site | The LinkedIn company page is real (see §9) but lists **Huntsville, Alabama** as its location, while the site, schema, `llms.txt`, and GBP all say Vernal, Utah. Part 16 wants NAP identical character-for-character across every profile; Book Two treats a site/profile mismatch as an entity-confusion signal. | **Human** — external profile, requires authorisation to edit |

### C — do not do

| # | Finding | Why not |
| --- | --- | --- |
| C1 | Add "Vernal, Utah" to the summaries on `/why-cozelos-data/`, `/our-approach/`, `/the-cozelos-method/`, `/faq/` | These are philosophy and Q&A pages. Inserting a location there is keyword insertion, which the guide names as a penalty. |
| C2 | Pad `/contact/` (354 words) toward 800 | Guide: depth, not word count. It is a form page with a clear process and full NAP. |
| C3 | Rewrite `ServicesGrid` alt text ("X preview") | Weak, but not wrong — and a better `alt` requires knowing what the images depict. Not verifiable from source. |
| C4 | Another internal-link pass to raise the count | F2 already took in-body links 62 → 80. The guide's 3–5 rule is an architecture principle, not a quota. Only broken reciprocal pairs are worth closing (A4). |
| C5 | Add explicit `User-agent: GPTBot / ClaudeBot / PerplexityBot` blocks to `robots.txt` | `User-agent: * / Allow: /` already permits every one of them. Redundant. |
| C6 | Duplicate homepage FAQPage schema or remove it | F6 verified it is correct and scoped to the 5 questions rendered. |
| C7 | Touch the sitemap, canonicals, or `/payment/ /terms/ /privacy/` noindex | All verified correct. |

---

## 4. Top 10 guide-supported opportunities

| # | Page | Finding | Guide principle | Implementation | Expected benefit | GSC? | Class |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `/` | Mobile-indexed page has no AI summary | Part 4 §1 / Part 13 L1 / Part 16 | Unhide; reorder below trust row on mobile | Restores the citation block on the version Google actually indexes | No | **A** |
| 2 | `/company/` | Stale identifier: DUNS published, UEI claimed but absent | Part 16 NAP / Part 22 trust | Publish the UEI; keep DUNS as legacy | Contracting credibility; correct entity identifier | No | **B** |
| 3 | `/company/` `/ellen-cozelos/` `/our-approach/` | Meta descriptions 219–255 chars | Part 14 | Tighten to ≤160, same terms | Full snippet renders; CTR is a NavBoost input | No | **A** |
| 4 | sitewide | Founder is two schema entities | Part 13 L3 | `@id` the `founder` node | One coherent person entity across the graph | No | **A** |
| 5 | `/services/` | Money pillar has no FAQ | Part 4 §3 / Launch Checklist | New questions unique to `/services/`, not copies of `/faq/` | Long-tail + AI Overview surface on the pillar | **Yes** | **B** |
| 6 | `/company/` | No outbound authoritative sources for compliance claims | Launch Checklist | SBA WOSB + W3C WCAG 2.1 | Verifiable claims for the government reader | No | **A** |
| 7 | `/why-cozelos-data/` `/services/` | Two broken reciprocal link pairs | Part 10 | 2 contextual links | Closes the loop on `/company/` (1 inbound) and `/faq/` (3 inbound) | No | **A** |
| 8 | `/` | H1 has no keyword or location | Part 2 Title Match / Part 4 §4 | Deferred | — | **Yes** | **B** |
| 9 | `/the-cozelos-method/` | 349 words + duplicate of `/our-approach/` | Part 2 thin content / Book Two cannibalisation | Consolidate or justify as a named-framework entity page | Removes the site's only thin page and its only duplicate | **Yes** | **B** |
| 10 | `/portfolio/` | Unverified result claims on the proof page | Part 2 "real details" / Book Two risk register | Substantiate or soften | Protects E-E-A-T on the page whose whole job is proof | No | **B** |

---

## 5. External / off-site readiness (documented only — nothing modified)

Assessed from the site side. **No external profile was touched.**

| Item | Site-side state | Action owner |
| --- | --- | --- |
| GBP NAP alignment | Site NAP is single-sourced and internally consistent; ready to match against GBP character-for-character | Human — verify against the live GBP |
| GBP review link | `googleReviewHref` deep link live on `/` and in the footer ✅ | — |
| Bing Places | No evidence of a claim; feeds ChatGPT/Perplexity answers (Part 12 Tier 1) | Human |
| Yelp / BBB / YellowPages | Not referenced anywhere on site | Human |
| Chamber of Commerce (Vernal / Uintah Basin) | Tier-1 foundation link, not present | Human |
| `sameAs` social profiles | Marked as placeholders in `site.ts` | Human — B8 |
| Branded mentions | Part 12 now rates unlinked mentions above backlinks for AI Overview visibility; nothing on-site blocks this | Human |
| Multi-engine citation check | robots.txt + llms.txt are correctly configured for it | Human — monthly, Part 13 |

Competitor research was **not** used to justify any change in this audit. Per the brief,
any competitor-derived opportunity would be filed separately from GSC-supported ones.

---

## 6. AI / GEO readiness (Part 13 + 2026 update)

| Requirement | State |
| --- | --- |
| Direct answer near the top | ✅ 11/11 summary blocks — **1 hidden on mobile** → A1 |
| Concise summaries | ✅ |
| Clear entity relationships | ⚠ founder duplicated → A2; `sameAs` unverified → B8 |
| Structured facts / tables | ✅ pricing tiers, NAICS table, service deliverables |
| Useful FAQs | ⚠ 2 of 11 pages |
| Original expertise | ✅ real founder record, 8 named client builds with live URLs |
| Authoritative references | ❌ zero → A6 |
| Machine-readable structured data | ✅ Org, WebSite, Breadcrumb, Service ×6, Person, FAQPage ×2 |
| Clear next action | ✅ CTA above the fold (tap-to-call in every summary) and at the bottom |
| AI crawlers allowed | ✅ |
| `llms.txt` | ✅ |

---

## 7. Implemented — Category A only

Ten source files. `astro check` 0 errors / 0 warnings / 0 hints; production build clean;
14 pages out, same as before.

| # | File | Change | Verified |
| --- | --- | --- | --- |
| A1 | [Hero.astro](../../src/components/Hero.astro) | Dropped `hidden md:block` from the summary; added `.hero-copy`; mobile-only `flex` + `order:99` moves it below the trust row | `hidden` gone from `<main>`; summary text present in the mobile-rendered HTML; order rule shipped in CSS |
| A2 | [Seo.astro](../../src/components/Seo.astro) | `Organization.founder` now carries `@id #ellen-cozelos` + `url` | Founder `@id` matches the `Person` node on all 14 pages |
| A3 | [company.astro](../../src/pages/company.astro) [ellen-cozelos.astro](../../src/pages/ellen-cozelos.astro) [our-approach.astro](../../src/pages/our-approach.astro) | Meta descriptions 255 → 143, 243 → 150, 219 → 156 | Measured from built HTML |
| A4 | [why-cozelos-data.astro](../../src/pages/why-cozelos-data.astro) | Added `→ /company/`, anchor "company and founder story" | `/company/` inbound 1 → 2 |
| A4 | [services.astro](../../src/pages/services.astro) | Closing CTA secondary `→ /faq/` instead of the duplicated `/portfolio/` link | `/faq/` inbound 3 → 4; `/services/` still links `/portfolio/` editorially |
| A5 | [ProjectCard.astro](../../src/components/ProjectCard.astro) | Grid-card `alt` → `"{name} — {category} website by Cozelos Data"` | 8 portfolio cards now match the case-study pattern |
| A6 | [Credentials.astro](../../src/components/Credentials.astro) | Two outbound authoritative links: W3C WCAG 2.1, SBA WOSB program | Both URLs fetched and confirmed live before adding |
| A7 | [pricing.astro](../../src/pages/pricing.astro) | Summary now names Vernal, Utah once, in the opening clause | Present in built HTML |

Validation run: JSON-LD parses on all 14 pages with no `undefined` values · 14/14
canonicals self-referencing · `noindex` only on `/payment/ /terms/ /privacy/` · sitemap
holds exactly the 11 canonical URLs · **614 internal hrefs checked, 0 broken** (page and
anchor targets both resolved) · exactly 14 HTML pages built, no new URLs.

---

## 8. Verification pass — 2026-08-08, post-implementation

Each A finding was re-checked against the guide text, the source, and the rendered build.
**Two defects were found in my own implementation and corrected.**

### Corrections made during verification

**A1 — mobile layout regression (found, fixed).** Making `.hero-copy` a flex column
blockifies its children, and the default cross-axis alignment is `stretch`. The first
child is the `inline-flex` "Woman-Owned Small Business · Vernal, Utah" pill — it would
have rendered as a full-width bar on phones. Added `.hero-badge { align-self: flex-start }`
inside the same media query. Verified in a real browser: the badge measures **308px at
390px, 360px, and 1280px viewports** — its intrinsic width, unchanged.

**A6 — factual error (found, fixed).** My added sentence described WCAG 2.1 as "the
standard Section 508 references." That is wrong: the Revised 508 Standards incorporate
**WCAG 2.0** Level A and AA by reference (§E205.4, §702.10.1 — confirmed against
access-board.gov). Rewritten to "WCAG 2.1 at level AA, which contains every success
criterion the Revised Section 508 Standards incorporate from WCAG 2.0" — accurate, and it
still sources both claims. An audit that exists to remove unsupported claims must not
introduce one.

**A3 — refinement.** The `/ellen-cozelos/` description had dropped the Columbia University
credential. Part 14's formula asks for a specific proof point; the credential was restored
inside the character budget (150 chars).

### Browser-verified before/after — homepage hero

Chrome via Playwright, against production builds of the stashed baseline and the current
tree. Values are `y` position / width in CSS px.

| Element | 390px before | 390px after | 1280px before | 1280px after |
| --- | --- | --- | --- | --- |
| WOSB badge | y 102 · w 308 | y 102 · w **308** | y 48 · w 308 | y 48 · w **308** |
| H1 | y 146 · w 350 | y 146 · w 350 | y 102 · w 795 | y 102 · w 795 |
| CTA buttons | y 437 | y 437 | y 581 | y 581 |
| Trust row | y 529 | y 529 | y 665 | y 665 |
| **AI summary** | **`display:none` · 0×0** | y 589 · 350×237 | y 405 · 672×140 | y 405 · **672×140** |

Every pre-existing element sits at identical coordinates on both viewports. Desktop
summary geometry is unchanged to the pixel. The only difference is the mobile summary
going from **not rendered at all** to rendered below the trust row — which also confirms
the original finding: the block really was `display:none` on the mobile-indexed page.

### Result

| Finding | Verdict |
| --- | --- |
| A1 mobile AI summary | **PASS** (after badge fix) |
| A2 founder `@id` | **PASS** |
| A3 three overlong descriptions | **PASS** (255→143, 243→150, 219→156) |
| A4 two reciprocal links | **PASS** |
| A5 portfolio alt text | **PASS** — 16 images, all descriptive |
| A6 W3C / SBA references | **PASS** (after factual correction) |
| A7 Vernal, Utah in pricing summary | **PASS** |

Re-validated after the corrections: `astro check` 0/0/0 · build clean · JSON-LD parses on
all 14 pages · one `#organization` per page · founder `@id` consistent on all 14 · 14/14
canonicals · noindex only on the 3 utility pages · sitemap = the 11 URLs · **614 internal
hrefs, 0 broken** · 14 HTML pages, no new URLs · hero CSS rules present **only** inside
`@media(max-width:768px)`.

---

## 9. B-finding evidence check

**B7 — UEI. Missing factual input, nothing else.** The page asserts "Active registration
with a current UEI" and "Universal Entity Identifier active and current", but the only
identifier that exists anywhere in the codebase is `duns: "059220399"` in `site.ts`,
surfaced in the visible strip and in `Organization.identifier`. **Required input: the
12-character SAM.gov Unique Entity ID.** With it, the fix is mechanical — add `uei` to
`site.ts`, add a `PropertyValue` to the schema, relabel the strip. Without it there is
nothing to write; a UEI must not be inferred, generated, or omitted-by-deletion.

**B8 — placeholder social profiles. Partially resolved; does not move to A.**

| Profile | Evidence | Verdict |
| --- | --- | --- |
| LinkedIn | Renders a real page: **"Cozelos Data LLC"**, IT Services and IT Consulting, founded 2018, 2–10 employees, 50 followers. Raw `curl` returns 999 (LinkedIn's standard bot block), so the block is not evidence of absence. | **REAL** — the `site.ts` "placeholder" comment is wrong for this one |
| Facebook | `curl` returns 400 to a desktop UA and `<title>Log into Facebook</title>` to a mobile UA. Facebook serves the same login wall for existing and non-existent pages. | **INCONCLUSIVE** |
| Instagram | HTTP 200, 607KB JavaScript shell, `<title>Instagram</title>`, no profile markers (`biography`, username, og:title) **and** no absence markers ("Sorry, this page isn't available"). Instagram serves this shell to unauthenticated clients regardless. | **INCONCLUSIVE** |

So the premise behind B8 is now known to be at least partly false — LinkedIn is a live
profile, not a placeholder. Two of three remain unverifiable from this environment, and a
login wall is not a 404. **Recommendation: B8 stays B.** It needs a human with a browser
to load the Facebook and Instagram URLs while signed in. Two sub-actions follow from what
*is* known: correct the misleading comment in `site.ts`, and see B15 for the LinkedIn
location mismatch.

**B14 — confirmed GSC-gated.** Untouched. Current lengths: `/` 174, `/pricing/` 182,
`/why-cozelos-data/` 176, `/portfolio/` 181, `/the-cozelos-method/` 184, `/contact/` 174.

---

## 10. What stays frozen

Untouched, deliberately: homepage H1 (F5), all title tags, the `/our-approach/` ÷
`/the-cozelos-method/` decision (F1), the six-URL split (F7), `?page_id=` redirects (F8),
sitemap, canonicals, robots.txt, noindex utility pages, and every FAQ/keyword targeting
question that needs the query exports.

The gate reopens when the 11 page-filtered CSVs land in `docs/seo/gsc/`.
