# COZELOS DATA — SEO BATCH 1 IMPLEMENTATION PROMPT

## Controlled foundation release

**Status:** Approved for implementation · **Scope:** Exactly six changes · **Authority:** [seo-implementation-report-2026-08-12.md](seo-implementation-report-2026-08-12.md) §17

---

## Required reading

Before touching any file, read in this order:

1. [cozelos-seo-master-context.md](cozelos-seo-master-context.md) — strategic baseline and its two layers
2. [seo-implementation-report-2026-08-12.md](seo-implementation-report-2026-08-12.md) — the audit, especially §2 (verified/blocked baseline), §16 (roadmap), §17 (this batch)

**Core rule from the master context, restated:** the document contains a strategy layer and a status-flag layer. **The status flags are authoritative.** Do not use a flagged claim as a premise. Do not fill gaps by inference.

---

## Prerequisite status — no research dependency remains

This is stated explicitly so no one blocks on the wrong thing.

| Research item | Blocks this batch? |
|---|---|
| **R-1** Attach rate | **NO** — gates F7 and therefore Batch 2. Not this batch |
| **R-2** `?page_id=866` identity | **NO** — legacy footprint only |
| **R-3** Citation audit | **NO** — parallel workstream |
| **R-4** GBP completeness | **NO** — parallel workstream |
| **R-5** Testimonial provenance | **NO** — gates `Review`/`AggregateRating`, not in this batch |
| **R-6** Client consent for case studies | **NO** — gates P3-1 publication, not in this batch |
| **R-7** DNS/hosting control | **N/A** — gates P0-1 (`www` → apex 301), which is **already excluded from this batch** |

> **Conclusion: R-1 through R-6 do not block Batch 1. R-7's only dependent item is excluded from Batch 1. No research dependency remains for the approved changes. Proceed.**

---

## What this batch is — and is not

**Batch 1 is foundation work. It is not a ranking campaign.**

It removes technical defects and establishes a clean measurement baseline. It deliberately does not attempt to win any keyword.

**Correct statement of outcome after this batch:**

> The technical SEO baseline was improved without changing search-targeting copy, creating new URLs, changing navigation architecture, or introducing unverified business claims.

**A claim like this would indicate a scope violation:**

> `/pricing/` is now optimized for "how much does a website cost in Utah."

If the work produces that second sentence, the scope was exceeded. Stop and report.

---

## The six approved changes

Anything not listed below is **out of scope by default.** Do not extend, improve, or tidy adjacent code.

### Change 1 — Remove duplicate `FAQPage` schema from the homepage

**Files:** `src/pages/index.astro` and/or `src/components/FAQ.astro`
**Type:** Technical · **Risk:** None

`FAQPage` is currently emitted on both `/` and `/faq/`. The homepage version is a 5-item subset of the canonical 25-item page.

- Emit `FAQPage` structured data **only** on `/faq/`
- **The visible 5-FAQ block on the homepage must not change** — same five questions, same layout, same "Read all 25 FAQs" link
- This is a schema-only removal

**Acceptance:** `dist/index.html` contains no `"FAQPage"`; `dist/faq/index.html` still does; homepage renders identically.

### Change 2 — Trim five meta descriptions to ≤160 characters

**Files:** frontmatter of `src/pages/index.astro`, `contact.astro`, `portfolio.astro`, `pricing.astro`, `why-cozelos-data.astro`
**Type:** Metadata · **Risk:** None

Current lengths: `/` 174 · `/contact/` 174 · `/portfolio/` 181 · `/pricing/` 182 · `/why-cozelos-data/` 176.

- Trim each to **≤160 characters**
- Keep the lead value proposition inside the first 120 characters
- Preserve the existing brand voice — this is a trim, not a rewrite
- **Do not add keywords.** Do not change what the description claims

**Acceptance:** all five ≤160; no factual claim added or altered.

### Change 3 — Verify and correct `sameAs`

**File:** `src/data/site.ts:43–48`
**Type:** **Factual** · **Risk:** None

The source comments these as *"Placeholder handles — update when live profiles are created."*

**Verification is an implementation step, not a prerequisite. Perform it first, then act:**

1. Open each of the three URLs in a real browser: Facebook, Instagram, LinkedIn
2. Confirm each resolves to a **genuine Cozelos Data profile** — not a 200-with-empty-state, not a search page, not someone else's account
3. Note: a separate search surfaced a Facebook page under a **numeric ID**, so the `/cozelosdata` vanity handle may be incorrect. Check this specifically

**Then:**
- Profile verified → keep the URL
- Profile verified under a different URL → correct it
- Profile does not exist or cannot be verified → **remove that entry from `sameAs`**

> **HARD STOP:** if a profile's status cannot be determined with confidence, **remove it from `sameAs` and report it as unresolved.** Do not guess, do not leave an unverified URL in structured data, and do not create a profile to make the URL valid — that is a business decision, not an implementation step.

**Acceptance:** every remaining `sameAs` URL manually confirmed; any removals and any unresolved cases listed in the report.

### Change 4 — Add `Offer` / `PriceSpecification` to `/pricing/`

**File:** `src/pages/pricing.astro`
**Type:** Schema · **Risk:** Low

Add structured data for the four project tiers and four monthly plans already defined at `pricing.astro:16–141`.

- `Offer` with `PriceSpecification`, `priceCurrency: "USD"`
- Reference the organization `@id` (`https://cozelosdata.com/#organization`) as seller — **do not declare a new organization entity**
- Derive prices from the **existing `tiers` and `plans` arrays**. Do not hard-code a second copy — the schema and the rendered page must not be able to drift
- Enterprise is `$10,000–$30,000+ scoped` — model it as a range or omit a fixed price. **Do not invent a single number**

> **STRICTLY SCHEMA ONLY.** On this page in this batch: **no H1 rewrite, no copy expansion, no keyword targeting, no heading changes, no new sections.** The page's visible content must be byte-identical apart from the injected JSON-LD.

**Acceptance:** Rich Results Test passes on `/pricing/`; visible content unchanged; prices in schema match rendered prices because both read the same arrays.

### Change 5 — Add four editorial internal links

**Files:** `portfolio.astro`, `pricing.astro`, `services.astro`, `faq.astro` — one link each
**Type:** Linking · **Risk:** Low

| From | To | Placement |
|---|---|---|
| `/portfolio/` | `/our-approach/` | Existing body copy |
| `/pricing/` | `/why-cozelos-data/` | Existing body copy |
| `/services/` | `/ellen-cozelos/` | Existing body copy |
| `/faq/` | `/our-approach/` | Existing body copy |

- Each link must be **genuinely contextual** — inside a sentence that already had a reason to reference the target
- **Do not create a "related links" block.** Do not add a link module, card row, or footer widget
- Exactly one link per page. Four links total
- `/services/` → `/ellen-cozelos/` is a link only. **It must not repeat or amplify any credential claim** — see Exclusions

**Acceptance:** exactly four new internal links; each inside prose; no new components.

### Change 6 — Surface `/our-approach/` and `/faq/`

**File:** `src/components/Footer.astro` (default) — or `src/data/site.ts:53–61` (`primaryNav`) **only with prior brand sign-off**
**Type:** Linking · **Risk:** Low as implemented; medium as a decision

Six of ten indexable pages sit outside primary navigation.

> **DEFAULT IMPLEMENTATION: footer only.** Add `/our-approach/` and `/faq/` to a structured footer column.
>
> **Do not modify `primaryNav` unless brand sign-off has already been obtained and is recorded in writing.** Primary navigation is brand surface, not just SEO surface. If sign-off has not happened, implement the footer version and note in the report that the nav variant remains available pending approval.

**Acceptance:** both pages reachable from a structured footer column; `primaryNav` unchanged unless documented sign-off exists.

---

## Explicit exclusions

Not in this batch. Do not implement, and do not "while I'm here" any of them:

| Excluded | Why |
|---|---|
| **Broad H1 rewrites** | Highest-value metadata action, but touches brand voice on every page. Requires a review pass — Build Next |
| **Primary-navigation restructuring** | Brand decision. Footer variant is the approved path (Change 6) |
| **Any new page, route, or URL** | Gated on F7 / R-1 |
| **`/services/` architecture** | Frozen. Metadata-only changes permitted; structure untouched |
| **`www` → apex redirect (P0-1)** | Hosting config, requires R-7, and **do not deploy** |
| **`/company/` and `/ellen-cozelos/` content** | Contain blocked claims (§2) |
| **Any government / federal / cybersecurity / enterprise-engineering content** | Blocked (§15) |
| **`Review` / `AggregateRating` schema** | Blocked on R-5 |
| **Case-study expansion** | Content unblocked, URL structure gated on F7 |
| **Legacy URLs** (`?page_id=158/262/866`) | Frozen. Canonicals already correct |
| **Canonical logic, `robots.txt`, sitemap config** | Verified correct. Do not touch |
| **Keyword insertion of any kind** | Not a Batch 1 activity |

---

## Stop conditions

**Halt immediately and report — do not work around — if any approved change appears to require:**

1. Modifying `/services/` architecture or its six section anchors
2. Changing any canonical, `robots.txt`, or sitemap configuration
3. Touching any legacy `?page_id=` URL
4. Creating, deleting, or renaming any route
5. Stating, repeating, or strengthening any claim on the §2 blocked list
6. Modifying `primaryNav` without documented brand sign-off
7. Adding a price, credential, certification, client name, or testimonial not already present and verified
8. Any change to `/pricing/` visible copy

---

## Pre-commit validation gate

**Nothing is committed until all of the following are produced and reviewed.**

### 1. Build
```
npm run build
```
Must complete clean, including `astro check`. Report any warning introduced by this batch.

### 2. Schema validation
- Rich Results Test **passes on `/pricing/`** with `Offer` detected
- `dist/index.html` contains **no** `"FAQPage"`
- `dist/faq/index.html` **still** contains `"FAQPage"`
- Exactly **one** `FAQPage` entity property-wide
- No new organization or duplicate entity introduced

### 3. URL and sitemap comparison
- Diff `dist/sitemap-0.xml` before vs. after
- **Expected result: identical.** Batch 1 creates no URLs
- Any difference is a scope violation — stop and report

### 4. Metadata verification
- All five trimmed descriptions ≤160 characters, measured from rendered output
- No title changed
- No H1 changed
- Every page still has exactly one `<h1>`

### 5. Link verification
- Exactly four new internal links, all resolving
- No new components or link blocks
- `/our-approach/` and `/faq/` reachable from the footer

### 6. `sameAs` verification
- Every remaining URL manually confirmed against a real profile
- Removals listed
- Unresolved cases listed explicitly

### 7. `git diff`
Produce the **complete diff** for review. Expected footprint: roughly seven files, no new files, no deletions.

---

## Reporting requirements

Report per change: what was done, acceptance criteria met/not met, anything that could not be completed and why.

**Language discipline in the report:**

- ✅ *"Added `Offer`/`PriceSpecification` structured data describing the pricing already visible on `/pricing/`."*
- ❌ *"Optimized `/pricing/` for pricing keywords."*
- ✅ *"Removed the duplicate `FAQPage` entity; a single canonical entity now exists on `/faq/`."*
- ❌ *"Improved FAQ SEO."*

State outcomes factually. Do not characterize this batch as a ranking improvement.

---

## Measurement expectation

**This batch is not measurable on rankings, and must not be reported as if it were.**

The property currently has **9 clicks and 241 impressions** in total. Any ranking movement in the following weeks is indistinguishable from noise and must not be attributed to this work.

What Batch 1 is measured on:

| Measure | Success condition |
|---|---|
| Schema validity | Rich Results Test clean on `/pricing/`; one `FAQPage` property-wide |
| Entity integrity | All `sameAs` resolve, or are removed |
| Metadata | Five descriptions ≤160 chars |
| URL stability | Sitemap diff empty |
| Build health | Clean build, no new warnings |
| Instrumentation | GA4 conversion events confirmed (P0-5, may run in parallel) |

**The real measurement gate remains the next `/services/` GSC export.** Until it returns non-zero query rows, this property cannot be evaluated on search performance at all.

---

## Sequence

```
Audit ─────────────── COMPLETE
   ↓
Research (R-1…R-7) ── parallel · NON-BLOCKING for Batch 1
   ↓
Batch 1 ───────────── THIS DOCUMENT · ready now
   ↓
Validation gate ───── required before commit
   ↓
Measurement baseline
   ↓
Batch 2 ───────────── informed by R-1 (attach rate) and F7
```

**Do not deploy. Do not commit until the validation gate is complete and reviewed.**
