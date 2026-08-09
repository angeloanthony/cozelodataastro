# GSC Analysis — sitewide baseline (00)

**Source:** `cozelosdata.com-Performance-on-Search-2026-08-08.zip`, filed as
[00-pages.csv](./gsc/00-pages.csv), [00-queries-sitewide.csv](./gsc/00-queries-sitewide.csv),
[00-Filters.csv](./gsc/00-Filters.csv), [00-devices.csv](./gsc/00-devices.csv),
[00-countries.csv](./gsc/00-countries.csv)
**Window:** Last 3 months · Search type: Web · **no page filter**

---

## 1. Filter verification — this is NOT `01-home.csv`

`00-Filters.csv` in full:

```
Filter,Value
Search type,Web
Date,Last 3 months
```

No `Page` row. This is the sitewide report. **No query in it can be attributed to any
URL.** It is filed as `00-*` and is valid as the unfiltered Pages baseline, which is what
it was wanted for.

## 2. Totals, and why two of them disagree

| Grouping | Clicks | Impressions |
| --- | --- | --- |
| Pages (11 rows) | 12 | **640** |
| Queries (13 rows) | 0 | 16 |
| Devices | 11 | **266** |
| Countries | 11 | **266** |

Devices and Countries agree at 266 — that is the property total. Pages sums to 640 because
impressions are counted per **URL surfaced**, while the property total de-duplicates per
search. 640 ÷ 266 ≈ **2.4 site URLs shown per search.** The site is repeatedly surfacing
several of its own URLs in a single result. See §5.

## 3. Query-data coverage — the governing constraint

**16 of 266 impressions carry a query. 6.0%. The other 94% are withheld.**

All 13 exposed queries have **0 clicks**. Every one of the property's 11 clicks came from a
query Google will not name.

This is not a filtering problem and page-filtered exports will not fix it. It caps what the
remaining ten exports can possibly deliver: expect 0–3 rows each. Plan the analysis around
**page-level** metrics — impressions, CTR, position per URL — because that is where the
data actually is.

## 4. Every exposed query (sitewide — unattributable)

| Query | Impr | Position |
| --- | --- | --- |
| local businesses near me | 3 | 21.67 |
| businesses | 2 | 21 |
| it companies near me | 1 | 1 |
| it services companies near me | 1 | 1 |
| software development services | 1 | 1 |
| software engineering firm | 1 | 1 |
| data center companies | 1 | 4 |
| data center equipment manufacturers | 1 | 12 |
| local businesses | 1 | 19 |
| computer networks | 1 | 20 |
| datazeo | 1 | 46 |
| service businesses near me | 1 | 69 |
| software companies | 1 | 70 |

**Hypothesis, not a conclusion:** 6 of 13 sit in an IT-infrastructure / software-company
register — `data center companies`, `data center equipment manufacturers`, `computer
networks`, `software companies`, `it companies near me`, `software engineering firm`.
Nothing here says web design, SEO, marketing, Vernal, or Utah. That is consistent with
Google reading "Cozelos **Data**" as a data/IT-infrastructure entity rather than a digital
agency.

It is also **16 impressions**. Six percent of the data cannot establish what the site
ranks for. Treat this as a question for the filtered exports, not a finding.

## 5. The identical-metric clusters — page-level, and important

| Impr | Position | URLs |
| --- | --- | --- |
| 44 | 1.43 | `/portfolio/` · `/pricing/` · `/why-cozelos-data/` |
| 1 | 1 | `/company/` · `/contact/` |

Three independent pages do not produce byte-identical impressions *and* identical average
position to two decimals by coincidence. These URLs are **co-surfacing in the same results**
— the signature of sitelinks beneath a single (almost certainly branded) result, which also
explains the 2.4-URLs-per-search ratio in §2.

**This corrects an earlier assumption.** [master-map.md](./master-map.md) §2.3 carried
`/pricing/`, `/portfolio/`, and `/why-cozelos-data/` at "position 1.43 (pasted)" as if each
were ranking. Read as sitelinks, position 1.43 is **not evidence that any of them ranks for
anything** — it is one branded result being expanded. Their 0% CTR across 132 combined
page-impressions supports that: sitelinks accumulate impressions without earning clicks.

`Search appearance.csv` is empty (header only), so GSC does not confirm the sitelink label.
Inference, flagged as such — but the arithmetic is hard to explain otherwise.

## 6. Four canonical URLs earned ZERO impressions in three months

`/ellen-cozelos/` · `/our-approach/` · `/the-cozelos-method/` · `/faq/`

Not low. **Absent.**

### This resolves the F1 test as written

`gsc/README.md` set the criterion: keep both pages only if `/the-cozelos-method/` earns
branded impressions for "Cozelos Method" as a named framework. It earned **zero impressions
of any kind**. The criterion is answered, and the answer is no.

`/our-approach/` is also at zero — so **neither page has search equity to protect**, and
consolidating carries essentially no ranking risk in either direction. That removes the
actual reason F1 was gated.

Caveat: a 3-month window, and both pages have existed for at least ~2 months of it. Zero is
strong but not infinite evidence. And *which* URL survives remains an architecture
decision — the data says the merge is safe, not which name to keep.

**F1 moves from "blocked on GSC" to "ready for your decision."** Still not something I act
on unilaterally.

## 7. Legacy and duplicate URLs — now quantified

| URL | Impr | Clicks | CTR | Position |
| --- | --- | --- | --- | --- |
| `/?page_id=158` | 131 | **6** | 4.58% | 13.63 |
| `/?page_id=262` | 57 | 0 | 0% | 2.6 |
| `/?page_id=866` | 46 | 0 | 0% | 2.74 |
| `www…/services/` | 41 | 0 | 0% | 2.61 |

`?page_id=158` earns **as many clicks as the homepage** (6 each) at a *better* CTR (4.58%
vs 3.37%). These are half the property's clicks coming from a URL that serves byte-identical
homepage HTML (verified in master-map F8).

`www/services/` sits at position **2.61** while the apex `/services/` sits at **7.13**. The
duplicate host outranks the canonical one. Given every `www` page emits the apex canonical
(F9), that is a signal Google has not fully consolidated the two hosts.

Both remain **do-not-touch**: the redirect decision is host-level, outside this repo, and
`?page_id=158`'s 6 clicks must not be discarded on a hunch.

## 8. Homepage — evidence on F5 (H1) and title changes

| Metric | Value |
| --- | --- |
| Impressions | 178 |
| Clicks | 6 |
| CTR | 3.37% |
| Position | 2.12 |

3.37% CTR at position 2.12 is far below the ~15–20% typical of that position. Two readings
fit, and **this file cannot distinguish them**:

- the 178 impressions are largely non-branded queries where the site surfaces high but
  reads as irrelevant — a title/H1 problem; or
- they are largely sitelink/branded impressions inflating the average position — in which
  case CTR is being measured against a position the page never really held, and the H1 is
  not implicated.

§5 makes the second reading more plausible, which argues *against* touching the H1.

**F5 and homepage title changes stay gated.** Zero homepage query data is exposed, and the
one metric that looked actionable (CTR at position 2) has an innocent explanation that is
better supported than the alarming one.

## 9. Device split

| Device | Impr | Clicks | Position |
| --- | --- | --- | --- |
| Desktop | 206 | 8 | 4.76 |
| Mobile | 59 | 3 | 14.37 |
| Tablet | 1 | 0 | 1 |

Mobile visibility is materially weaker — position 14.37 against desktop's 4.76. Consistent
with A1 (the AI summary that was `display:none` on mobile until 2026-08-08), but this
window **predates that fix**, so it is a baseline to re-measure against, not evidence the
fix worked. Re-check in ~60 days.

## 10. What remains unknowable

- **Which queries belong to which URL.** 94% anonymised; no export changes that.
- **Whether the 44/1.43 cluster is formally sitelinks.** `Search appearance.csv` is empty.
- **What earned the 11 clicks.** Every click sits behind a withheld query.
- **Whether the IT/data-centre query register is real or noise.** 16 impressions.

## 11. A / B / C

| Ref | Item | Class | Note |
| --- | --- | --- | --- |
| — | File the export, correct the master map's "position 1.43 = ranking" reading | **A** | Documentation only; done in this file |
| F1 | Consolidate `/our-approach/` ÷ `/the-cozelos-method/` | **B — now decidable** | Both at zero impressions; merge is risk-free, but the surviving URL is your call |
| F5 | Homepage H1 | **B — stays gated** | No homepage query data; CTR anomaly has a better innocent explanation |
| B2 | Homepage / pricing title length | **B — stays gated** | Same reason |
| F8 | `?page_id=` redirects | **B — stays gated** | 6 real clicks on `158`; host-level change |
| F9 | `www` → apex 301 | **B — host-level** | Duplicate outranks canonical; needs your hosting access, not a commit |
| — | Pull `/services/` filtered export | **next** | 53 impressions at position 7.13 — the only page whose position suggests genuine non-branded ranking |
| — | Pull the remaining 9 filtered exports | **low value** | At 6% coverage, expect 0–3 rows each |

---

## What I would actually do next

Not eleven exports. Two things:

1. **`/services/` exact-URL export.** It is the one page whose profile (53 impressions,
   position 7.13, no sitelink twin) looks like real independent ranking rather than branded
   co-surfacing. If any page has usable query data, it is this one.
2. **Decide F1.** The gate it was waiting on has opened.

Everything else is better served by waiting for more data to accumulate than by exporting
more of the 6%.
