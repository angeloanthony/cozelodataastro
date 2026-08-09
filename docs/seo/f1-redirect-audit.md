# F1 — `/the-cozelos-method/` retirement: reference audit

**Date:** 2026-08-08 · **Status:** audit only, nothing modified
**Decision being prepared:** 301 `/the-cozelos-method/` → `/our-approach/`, `/our-approach/` survives
**Evidence:** both URLs at **zero impressions** over 3 months
([gsc-analysis-00-sitewide.md](./gsc-analysis-00-sitewide.md) §6)

---

## 1. Every reference found

Searched the whole repository excluding `node_modules`, `.git`, `dist`, `.astro`, for both
`the-cozelos-method` and case-insensitive `cozelos method`.

### Code — 4 references, 3 files

| # | File | Line | Reference | Scope |
| --- | --- | --- | --- | --- |
| 1 | [Footer.astro](../../src/components/Footer.astro) | 97 | `<a href="/the-cozelos-method/">The Cozelos Method</a>` | **Sitewide** — renders on all 14 pages |
| 2 | [Philosophy.astro](../../src/components/Philosophy.astro) | 50 | `<Button href="/the-cozelos-method/">See the Cozelos Method</Button>` | Homepage only |
| 3 | [the-cozelos-method.astro](../../src/pages/the-cozelos-method.astro) | 10 | `breadcrumbs` entry → own URL | The page itself |
| 4 | [llms.txt](../../public/llms.txt) | 29 | `- The Cozelos Method: https://cozelosdata.com/the-cozelos-method/` | Absolute URL, AI crawler map |

### Documentation — 24 references, 4 files

`docs/seo/master-map.md` (16), `docs/seo/guide-audit-2026-08-08.md` (6),
`docs/seo/gsc-analysis-00-sitewide.md` (3), `docs/seo/gsc/README.md` (2). Historical
record — see §2.

### Confirmed absent

- `primaryNav` in [site.ts](../../src/data/site.ts) — **not** in the header nav
- `src/scripts/`, `src/data/`, `src/layouts/` — no references
- No analytics/event references (GA4 is a single sitewide `gtag config`, no per-page events)
- No tests, validators, or content collections exist in this project
- Root `README.md` — no reference
- No hardcoded absolute URL anywhere except `llms.txt` line 29

## 2. What needs changing

| # | Reference | Change? | Why |
| --- | --- | --- | --- |
| 1 | `Footer.astro:97` | **YES — required** | Sitewide link. Left alone it points every page at a dead URL. |
| 2 | `Philosophy.astro:50` | **YES — required** | The homepage's only in-body link to the page. Repoint to `/our-approach/`; the button label needs rewording since "See the Cozelos Method" would no longer name a page. |
| 3 | `the-cozelos-method.astro:10` | **N/A** | Goes away with the file. |
| 4 | `llms.txt:29` | **YES — required** | Advertises a dead absolute URL to AI crawlers. Note `/our-approach/` is **already listed** on line 28, so this line is deleted, not repointed. |
| — | `docs/seo/*` | **NO** | Deliberate historical record. F1's whole audit trail is these files. Do not rewrite history; add a resolution note instead. |
| — | `astro.config.mjs` sitemap filter | **Conditional** — see §3 | Depends on redirect mechanism. |

## 3. Does it appear in the generated sitemap?

**Yes.** `dist/sitemap-0.xml` currently contains
`https://cozelosdata.com/the-cozelos-method/`.

The sitemap is generated from built pages, and the `filter` in
[astro.config.mjs](../../astro.config.mjs) only excludes `/payment/`, `/terms/`, and
`/privacy/`. So:

- **If the page file is deleted** → it drops out of the sitemap automatically. No config
  change needed.
- **If an Astro `redirects` entry replaces it** → that emits a real HTML file at the same
  path, which may re-enter the sitemap. **Verify the built sitemap after implementing**, and
  add the path to the filter if it appears. Flagged as needing verification, not asserted —
  I have not tested how `@astrojs/sitemap` treats redirect routes in this version.

## 4. Does it appear in structured data?

**Only on its own page.** `dist/the-cozelos-method/index.html` emits a `BreadcrumbList`
containing the URL. Checked `dist/index.html` and `dist/our-approach/index.html` — neither
references it in any JSON-LD block.

No `Organization`, `WebSite`, `Service`, `Person`, or `FAQPage` node anywhere refers to it.
Nothing in the entity graph breaks when the page goes.

## 5. What links to it

Measured from built HTML, in-body (excluding the global footer):

| Source | In-body | Footer |
| --- | --- | --- |
| `/` | **1** | 1 |
| all 13 other pages | 0 | 1 |

So: **one in-body link, from the homepage** (the `Philosophy` component), plus the sitewide
footer link. `/our-approach/` does **not** link to it — deliberately, per master-map F2.

**Links out of it, which disappear with the page:** `/services/`, `/portfolio/`, and a
`CTASection` secondary to `/our-approach/`. Removing them costs `/services/` and
`/portfolio/` one inbound source each. Both are already well linked (8 and 9 inbound), so
this is not a concern.

## 6. The exact redirect required

```
/the-cozelos-method/  →  301  →  /our-approach/
```

**This project cannot currently emit a real 301.** `astro.config.mjs` is
`output: "static"` with **no adapter**, and the repository contains **no** `_redirects`,
`_headers`, `netlify.toml`, `vercel.json`, or `wrangler.toml`. Astro's `redirects` option
without an adapter produces an HTML file with `<meta http-equiv="refresh">` — a *soft*
redirect. Google does eventually consolidate soft redirects, but its own guidance prefers a
server-side 301, and the meta-refresh page would need excluding from the sitemap (§3).

Three options, cheapest first:

| Option | Mechanism | Real 301? | Notes |
| --- | --- | --- | --- |
| **A** | Host/CDN redirect rule | **Yes** | Correct answer. Same place the `www` → apex rule belongs (F9) — do both in one sitting. |
| **B** | Add a `public/_redirects` file | Yes, if the host reads it | Only works on Netlify/Cloudflare Pages. **Requires knowing the host** — undetermined from this repo. |
| **C** | Astro `redirects` config | No — meta refresh | Fallback only. Also needs the sitemap filter update. |

**The SEO cost of getting this wrong is near zero.** The page has 0 impressions and 0
clicks over 3 months. Even a plain 404 would forfeit nothing measurable in search. The
redirect matters for *users* following the footer link and for tidiness — not for rankings.
That is a materially lower-stakes situation than F8, where `?page_id=158` earns 6 real
clicks.

## 7. Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Page deleted but footer/Philosophy links not updated → sitewide 404s for users | **High** | The three code changes in §2 must ship in the **same commit** as the deletion. |
| No host redirect configured → `/the-cozelos-method/` 404s | Low (SEO) / Medium (UX) | 0 impressions means no ranking loss. Still fix at host level. |
| **Content loss** — the named framework vocabulary | **Medium, and the real risk** | See below. |
| Astro `redirects` stub re-enters the sitemap | Low | Verify built sitemap after implementing (§3). |
| Editing `docs/seo/*` to erase the reference | Low | Don't. It is the audit trail. |

### The content-loss risk is the one worth pausing on

`/our-approach/` and `/the-cozelos-method/` share the same four principle lines, which is
what made them duplicates. But the **stage names are unique to `/the-cozelos-method/`**:

| | `/the-cozelos-method/` | `/our-approach/` |
| --- | --- | --- |
| Stage labels | **Attract · Engage · Convert · Grow** | "First impressions", "Speed & experience", "Visibility & search", "Outcomes & growth" |

`/our-approach/` has the philosophy; `/the-cozelos-method/` has the branded framework name.
master-map F1 already anticipated this: *"Merge the framework naming into `/our-approach/`."*

A delete-and-redirect that skips this step silently discards the only named,
trademarkable-sounding asset on the site. **The merge should carry Attract/Engage/Convert/Grow
into `/our-approach/` as the stage labels** — which also lifts `/our-approach/` from 851
words without padding, since it is real content moving rather than filler.

That is a content decision, not a mechanical one, and it is not part of this audit.

---

## Implementation checklist (for the later commit — not executed)

1. Carry Attract/Engage/Convert/Grow into `our-approach.astro` as stage labels
2. `Footer.astro:97` — remove the list item (`/our-approach/` is already on line 98)
3. `Philosophy.astro:50` — repoint to `/our-approach/`, reword the button label
4. `llms.txt:29` — delete the line (`/our-approach/` already listed on line 28)
5. Delete `src/pages/the-cozelos-method.astro`
6. Configure the 301 at host level — bundle with the `www` → apex rule (F9)
7. Verify: built sitemap has 10 URLs and no `the-cozelos-method`; 0 broken internal hrefs;
   `astro check` clean
8. Append the F1 resolution to `master-map.md` — do not rewrite the existing history
