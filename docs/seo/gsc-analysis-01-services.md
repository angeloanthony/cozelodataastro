# GSC Analysis 01 — `/services/` page-filtered export

**Analysis date:** 2026-08-11 · **Export pulled:** 2026-08-11 · **Status:** gate complete
**Outcome:** attribution **PASS** · query evidence **INSUFFICIENT** · commercial architecture decision **DEFERRED**

Companion to [gsc-analysis-00-sitewide.md](./gsc-analysis-00-sitewide.md). Source of truth
for page state: [master-map.md](./master-map.md). Governing framework:
[SEO-Master-Guide-2026-Combined.docx](./SEO-Master-Guide-2026-Combined.docx).

> **A note on file numbering.** This analysis is `01` because it is the second analysis
> document (after `00-sitewide`). Its export artifacts in [gsc/](./gsc/) carry the `02-`
> prefix, because that folder numbers **URLs** per the table in
> [gsc/README.md](./gsc/README.md), where `/services/` is URL #2. The two sequences are
> independent. This is not a mismatch.

---

## 1. Artifacts

Intact download preserved as [gsc/02-services-2026-08-11.zip](./gsc/02-services-2026-08-11.zip).
Its seven members are also extracted alongside it, prefixed `02-services-`, so the evidence
is greppable in version control without unzipping:

| File | Rows (excl. header) |
| --- | --- |
| [02-services-filters.csv](./gsc/02-services-filters.csv) | 3 |
| [02-services-chart.csv](./gsc/02-services-chart.csv) | 70 |
| [02-services-pages.csv](./gsc/02-services-pages.csv) | 1 |
| [02-services-queries.csv](./gsc/02-services-queries.csv) | **0** |
| [02-services-countries.csv](./gsc/02-services-countries.csv) | **0** |
| [02-services-devices.csv](./gsc/02-services-devices.csv) | **0** |
| [02-services-search-appearance.csv](./gsc/02-services-search-appearance.csv) | **0** |

Two byte-identical copies of this ZIP existed in the source folder; one was kept.

---

## 2. Attribution — PASS

`Filters.csv` contents, verbatim:

```
Filter,Value
Search type,Web
Date,Last 3 months
Page,+https://cozelosdata.com/services/
```

The Page filter row is present. The value carries a `+` operator prefix rather than the
bare URL. **No claim is made here about what `+` encodes** — the prefix is not documented
in the export and guessing it would be exactly the kind of assumption this gate exists to
prevent.

Attribution is instead established independently, from the export's own `Pages.csv`:

```
Top pages,Clicks,Impressions,CTR,Position
https://cozelosdata.com/services/,0,58,0%,6.88
```

**One row.** Three consequences, each verifiable from the files:

1. The resolved scope is a single URL. Whatever the operator means, it did not widen the
   filter beyond one page.
2. `https://www.cozelosdata.com/services/` — a separate row in the sitewide Pages report
   with 41 impressions — is **excluded**, so the filter is apex-specific.
3. 58 impressions is far below the ~266 sitewide total, so this is not a mislabeled
   sitewide export. This is the arithmetic check described in
   [gsc/README.md](./gsc/README.md#keep-the-filter-record-from-the-zip).

The export is attributable to `/services/`. The gate passes.

---

## 3. Volume

| Metric | Value |
| --- | --- |
| Date window | 2026-06-01 → 2026-08-09 (70 days; last 3 months, subject to GSC's reporting lag) |
| Search type | Web |
| Impressions | 58 |
| Clicks | **0** |
| CTR | 0% |
| Average position | 6.88 |
| Days with ≥1 impression | 21 of 70 |

For continuity with the earlier pull: the sitewide Pages report on 2026-08-08 recorded
53 impressions at position 7.13 for this URL. This export records 58 at 6.88. Different
three-month windows three days apart — the drift is expected and the two are consistent.

---

## 4. Query evidence — INSUFFICIENT

**`Queries.csv` contains zero rows.** So do `Countries.csv`, `Devices.csv`, and
`Search appearance.csv`. Only the aggregate tables (`Chart.csv`, `Pages.csv`) carry data.

The correct statement of this result:

> **Google Search Console currently provides insufficient query-level evidence to determine
> the commercial architecture of `/services/`.**

This is a statement about the evidence available to us, not about Google's understanding of
the page. It must not be restated as "Google does not know what `/services/` is" — that is
a different and unsupported claim. The page demonstrably ranks, sometimes at position ~1;
what is missing is the query attribution, which Google withholds for rare queries.

### What therefore cannot be determined

None of the following may be concluded from this export, and none should be inferred
elsewhere from it:

- search intent served by `/services/`
- commercial intent, or whether it is commercial at all
- keyword ownership
- query-level cannibalization against `/`, `/pricing/`, `/portfolio/`, or any other URL
- the final money-page hierarchy
- whether `/services/` should remain a single hub or split into service-specific money
  pages (**F7**)

### Caveat on the empty dimension tables

Query anonymization for rare terms is the expected and documented cause of an empty
`Queries.csv` (see [gsc/README.md](./gsc/README.md#expect-few-rows--that-is-not-a-failed-export)).
`Countries.csv` and `Devices.csv` being empty as well is less usual, since those dimensions
are not anonymized the same way. That leaves a residual possibility that the dimension
tables failed to populate for a mechanical reason rather than a data one.

Cheap decisive check for the next pull: with the page filter applied, note whether the
**Queries tab renders rows on screen**. UI rows + empty export = export artifact, redo it.
Empty in both = the finding stands as recorded here.

---

## 5. Daily pattern — inference, not proven cause

`Chart.csv` resolves the 58 impressions to 21 active days and shows two visibly different
regimes. **The following is an inference from the shape of the data. No cause is claimed.**

### Regime A — 2026-06-18 → 2026-07-30

14 active days · **49 impressions** · positions `1, 1.2, 1.5, 1.5, 1.4, 1, 1, 1.8, 1.5, 1,
1, 16, 2.5, 2.5` · 0 clicks throughout.

Excluding the single outlier of 16 on 07-25, every day sits between position 1.0 and 2.5.

This resembles the signature already recorded for `/portfolio/`, `/pricing/`, and
`/why-cozelos-data/` in [gsc-analysis-00-sitewide.md](./gsc-analysis-00-sitewide.md) —
44 impressions each, position 1.43, zero clicks — which was interpreted there as **homepage
sitelink / co-surfacing behavior rather than independent ranking**. A near-top average
position sustained across dozens of impressions at 0% CTR is more consistent with
co-surfacing beneath a brand result than with independent query ranking.

If that reading is right, roughly 84% of this page's impressions are not independent
rankings. It revises the premise under which `/services/` was selected for export — it was
chosen partly because its impressions looked *less* sitelink-shaped than its peers, and at
daily resolution the majority of them look sitelink-shaped after all.

**This remains an inference.** It cannot be confirmed without query or search-appearance
data, and `Search appearance.csv` — the table that would have shown a Sitelinks breakdown —
is empty.

### Regime B — 2026-07-31 → 2026-08-09

7 active days · **9 impressions** · positions `93, 100, 3, 94, 10, 1.5, 4`.

These cannot all be sitelinks; a sitelink does not appear at position 94. This is the
genuinely independent portion of the evidence — roughly 5 impressions where `/services/`
matched a query on its own merits and ranked deep enough to be effectively invisible. The
average position of 6.88 is the blend of these two regimes, not a description of either.

### Explicit F9 non-attribution

**The 07-31 regime change is not attributed to F9.** The `www` → apex consolidation work is
dated 2026-08-08 through 2026-08-10 in this repository's commit history — eight to ten days
*after* the shift begins. The timing rules F9 out as the cause. What did cause it is
**unknown and is not to be guessed at.**

---

## 6. Status of this export: PRE-F9 BASELINE

This export was taken on 2026-08-11, after the F9 commits, but its three-month window
(2026-06-01 → 2026-08-09) covers almost entirely the period **before** `www` → apex
consolidation took effect. Only the last day or two could contain post-consolidation data,
which is negligible.

**Treat this document and its artifacts as the clean pre-F9 `/services/` baseline.**

Baseline figures to compare against, apex URL isolated:

| | |
| --- | --- |
| Impressions | 58 |
| Clicks | 0 |
| CTR | 0% |
| Average position | 6.88 |
| Query rows | 0 |

Relevant context for the comparison: before consolidation the same page's visibility was
split across two hosts — apex 53 impressions at position 7.13, `www` 41 at 2.61
(sitewide report, 2026-08-08). F9 removed that split. Whether consolidation measurably
improves `/services/` is precisely what the post-F9 re-pull is meant to answer.

---

## 7. Decision — DEFERRED

The commercial-architecture decision for `/services/` is **deferred, not resolved.**

Deferring is the deliberate outcome of an evidence-quality judgment: forcing an A–E
architecture call on aggregate-only data would convert a weak-data situation into a
subjective restructure, which is the specific failure mode this gate was built to prevent.

**Not to be done on the basis of this export:**

- no service-specific money pages (`/web-design/`, `/seo/`, …)
- no rewrite of `/services/`
- no change to its title, H1, structure, or targeting
- in particular, no retargeting of `/services/` toward the sitewide query rows in
  [gsc/00-queries-sitewide.csv](./gsc/00-queries-sitewide.csv) — those are unattributed and
  assigning them to this page is exactly the error the page filter was applied to avoid

**Preserve the current `/services/` architecture unchanged.**

### Revisit condition

Allow **4–8 weeks** of post-F9 data to accumulate — that is, re-pull no earlier than
**2026-09-08**, and preferably in **early October 2026**, so the three-month window is
dominated by post-consolidation data.

Repeat the identical export (Performance → Search results → Last 3 months → Page → URLs
exactly matching `https://cozelosdata.com/services/` → Queries → Export), verify
`Filters.csv` the same way, and compare against §6.

---

## 8. Effect on open findings

| Ref | Item | Effect of this export |
| --- | --- | --- |
| F5 | Homepage H1 keyword/location | Unaffected — blocked on `/` query data, not `/services/`. Still deferred. |
| F7 | Six-URL service split | **Still blocked.** This was the decision the export was meant to inform; it could not. Deferred to the post-F9 re-pull. |
| F8 | `?page_id=` legacy URLs | **Still blocked.** `?page_id=158` remains unclassified; this export covers `/services/` only and says nothing about it. |
| F9 | `www` duplicate host | Resolved. Re-verified live 2026-08-11: `https://www.cozelosdata.com/services/` → `301` → `https://cozelosdata.com/services/`, path preserved. |
| F10 | Unknown paths return the homepage at 200 | Unaffected by this export; independent of `/services/` query intent. Next technical investigation — see [master-map.md](./master-map.md) §3 F10. |

No source file, template, schema, sitemap, canonical, redirect, or page content was changed
in the course of producing this analysis.
