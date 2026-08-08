# GSC Export Drop — Cozelos Data

**Documentation only.** Nothing in this folder changes the site. Drop the 11 CSVs
described below into this directory; that is the entire job of this folder.

SEO work on cozelosdata.com is **frozen** until all 11 files are present. No source file,
metadata, schema, sitemap, canonical, redirect, or page content changes until the analysis
built from these exports has been produced and reviewed.

---

## ⚠️ The one rule that matters

# THE PAGE FILTER MUST BE APPLIED **BEFORE** EXPORTING THE QUERIES TAB.

A sitewide Queries export is **not** an acceptable substitute and will not be used.

Why: an unfiltered Queries export lists queries for the whole property with no way to tell
which URL earned them. If "web design vernal" shows 20 impressions, that report cannot say
whether Google matched it to `/`, `/services/`, or `/portfolio/` — and the entire point of
the next phase is deciding which existing URL should own which intent. Attribution
guessed from an unfiltered export is not evidence.

---

## Export procedure

For **each** URL in the table below, repeat this sequence:

```
Google Search Console
  → Performance
    → Search results
      → Date range: Last 3 months
        → + New filter → Page → URL is exactly → <paste the URL>
          → Queries tab          ← only after the page filter is applied
            → Export → Download CSV
```

Confirm before exporting that the filter chips above the chart read **Last 3 months** and
**Page: exactly `<url>`**. If the Page chip is absent, the export is sitewide — discard it
and reapply the filter.

## The 11 required exports

| # | Exact URL to filter on | Save as |
| --- | --- | --- |
| 1 | `https://cozelosdata.com/` | `01-home.csv` |
| 2 | `https://cozelosdata.com/services/` | `02-services.csv` |
| 3 | `https://cozelosdata.com/pricing/` | `03-pricing.csv` |
| 4 | `https://cozelosdata.com/why-cozelos-data/` | `04-why-cozelos-data.csv` |
| 5 | `https://cozelosdata.com/company/` | `05-company.csv` |
| 6 | `https://cozelosdata.com/ellen-cozelos/` | `06-ellen-cozelos.csv` |
| 7 | `https://cozelosdata.com/our-approach/` | `07-our-approach.csv` |
| 8 | `https://cozelosdata.com/portfolio/` | `08-portfolio.csv` |
| 9 | `https://cozelosdata.com/the-cozelos-method/` | `09-the-cozelos-method.csv` |
| 10 | `https://cozelosdata.com/contact/` | `10-contact.csv` |
| 11 | `https://cozelosdata.com/faq/` | `11-faq.csv` |

These are the 11 canonical URLs in the sitemap, and the same 11 pages inventoried in
[master-map.md](../master-map.md). `/payment/`, `/terms/`, and `/privacy/` are `noindex`
and excluded from the sitemap — no export needed.

Expected location: `docs/seo/gsc/` (this folder). Filenames are a recommendation, not a
requirement — a differently named file is fine as long as it is obvious which URL it came
from. Search Console's own download is typically a ZIP containing `Queries.csv`; unzip it
and rename.

## Expected columns

Each CSV should contain one row per query with these fields:

| Column | Notes |
| --- | --- |
| Query | The search term |
| Clicks | Whole number |
| Impressions | Whole number |
| CTR | Usually a percentage string, e.g. `6.25%` |
| Position | Average position, one decimal, e.g. `7.1` |

A file with **zero query rows** is still a valid and useful result — it means Google is
recording no query-level data for that URL in the window, which is itself evidence about
the page's search role. Keep the empty export rather than skipping the URL.

## Optional but useful

If they are easy to pull, these add trend and coverage context. They are not blockers.

- The same 11 exports at **Last 28 days**, saved with a `-28d` suffix, to separate a
  long-run average from current movement.
- The **Pages** tab, unfiltered, last 3 months — a whole-property page list, useful for
  spotting URLs earning impressions that are not among the 11 (notably the legacy
  `?page_id=` URLs, an open item in the master map).

---

## What gets produced once all 11 files are here

The deliverable is a page-by-page decision matrix:

```
URL → query → impressions / clicks / CTR / position → intent
    → is the current page satisfying that intent?
    → is another existing page a better match? (cannibalization)
    → smallest high-confidence action
```

Every proposed action is tagged:

- **A** — evidence-supported, ready to implement
- **B** — evidence-supported but requires a human decision
- **C** — speculative; not implemented

Only **A** items are implemented, and only after review.

**This is not a keyword-list exercise.** "Here are 40 keywords to target" is the wrong
output. The question is always: *what is Google already associating with this URL, does
the page satisfy that intent, and what is the smallest change that improves the match?*

The four decisions deliberately left open until this data exists:

| Ref | Open decision |
| --- | --- |
| F1 | Consolidate `/the-cozelos-method/` into `/our-approach/`? (duplication confirmed) |
| F5 | Should the homepage H1 become more keyword/location explicit? |
| F7 | Do any of the six services warrant their own URL, or is `/services/#anchor` correct? |
| — | Which pages have a real title/meta CTR opportunity, and where a genuine content gap exists |

Governing framework: [SEO-Master-Guide-2026-Combined.docx](../SEO-Master-Guide-2026-Combined.docx).
Project source of truth: [master-map.md](../master-map.md).

**No code changes until the GSC analysis has been produced and reviewed.**
