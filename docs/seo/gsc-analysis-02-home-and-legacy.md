# GSC Analysis 02 — `/` and `/?page_id=158` page-filtered exports

**Date:** 2026-08-12 · **Exports pulled:** 2026-08-12 05:23 / 05:24 · **Window:** 2026-06-01 → 2026-08-09
**Both gates:** attribution **PASS** · **Outcome:** the property's entire identifiable query
surface has been attributed, and it does not belong to the pages we assumed.

Companion to [gsc-analysis-00-sitewide.md](./gsc-analysis-00-sitewide.md) and
[gsc-analysis-01-services.md](./gsc-analysis-01-services.md). Site state:
[master-map.md](./master-map.md). Backlog: [backlog-2026-08-12.md](./backlog-2026-08-12.md).

---

## 1. Gates — both PASS

### Homepage

```
Filter,Value
Search type,Web
Date,Last 3 months
Page,https://cozelosdata.com/
```

The prefix trap did **not** occur. `https://cozelosdata.com/` is a prefix of every URL on the
site, so a *contains*-style match would have silently returned the whole property. The
export's own `Pages.csv` disproves that — **exactly one row**:

```
https://cozelosdata.com/,7,186,3.76%,2.12
```

Eleven rows would have meant a sitewide export wearing a Page filter. One row means the scope
resolved to the homepage alone. **PASS.**

Note the filter value carries **no `+` prefix**, unlike the `/services/` export of
2026-08-11 (`Page,+https://cozelosdata.com/services/`). The encoding differs between pulls.
No claim is made about what either form means; in all three cases scope was proved
independently from `Pages.csv`, which is why the ambiguity never mattered.

### `?page_id=158`

```
Filter,Value
Search type,Web
Date,Last 3 months
Page,https://cozelosdata.com/?page_id=158
```

Query string intact, not truncated. `Pages.csv` again a single row:

```
https://cozelosdata.com/?page_id=158,7,140,5%,12.98
```

**PASS.**

### Internal consistency

Both `Chart.csv` files sum exactly to their `Pages.csv` totals — 186 impressions / 7 clicks
for `/`, 140 / 7 for `?page_id=158`. No reconciliation gap.

---

## 2. The decomposition — this is the finding

The sitewide Queries export (2026-08-11, 13 rows) decomposes **perfectly and completely**
across the two page-filtered exports. Every query, every impression count, every position,
value-for-value:

| Query | Impr | Pos | Belongs to |
| --- | --- | --- | --- |
| software development services | 3 | **1** | `?page_id=158` |
| local businesses near me | 3 | 21.67 | `?page_id=158` |
| businesses | 2 | 21 | `?page_id=158` |
| it companies near me | 1 | **1** | `?page_id=158` |
| it services companies near me | 1 | **1** | `?page_id=158` |
| software engineering firm | 1 | **1** | `?page_id=158` |
| data center companies | 1 | 4 | `?page_id=158` |
| data center equipment manufacturers | 1 | 12 | `?page_id=158` |
| local businesses | 1 | 19 | `?page_id=158` |
| computer networks | 1 | 20 | `?page_id=158` |
| service businesses near me | 1 | 69 | `?page_id=158` |
| software companies | 1 | 70 | `?page_id=158` |
| **datazeo** | 1 | 46 | **`/`** |

**12 of 13 rows — 17 of 18 impressions — belong to a legacy WordPress query URL.** The
homepage owns exactly one row.

The corollary is the part that matters most:

> `/services/`, `/pricing/`, `/portfolio/`, `/why-cozelos-data/`, `/faq/`, `/company/`,
> `/contact/`, `/our-approach/` and `/ellen-cozelos/` own **zero** identifiable queries
> between them.

Every impression those pages have ever recorded is anonymised. This is why the `/services/`
export returned nothing: there was nothing there to return, and there is nothing on any other
current page either.

---

## 3. Homepage — 186 impressions, 7 clicks, one query row

| | |
| --- | --- |
| Impressions | 186 |
| Clicks | 7 |
| CTR | 3.76% |
| Avg position | 2.12 |
| Exposed query rows | **1** — `datazeo`, 1 impression, position 46, 0 clicks |
| Country of that row | Belize |
| Device of that row | Desktop |
| Coverage | **0.5%** of impressions exposed |

The single exposed row is noise: one desktop impression from Belize at position 46 for a
string that is not the brand name. It carries no information about what the homepage ranks
for domestically.

`Chart.csv` shows the homepage active across the window at positions mostly between 1 and 5,
with clicks landing on 2026-07-19, 07-23, and 08-09. **All 7 clicks come from anonymised
queries.** We know the homepage converts impressions to clicks at 3.76%; we do not know for
what.

**The homepage export did not fail. It answered.** The answer is that Google withholds
essentially all of this URL's query data, and at 186 impressions it will keep doing so.

---

## 4. `?page_id=158` — the site's only query-productive URL

| | |
| --- | --- |
| Impressions | 140 |
| Clicks | 7 |
| CTR | 5.00% — the highest on the property |
| Avg position | 12.98 |
| Exposed query rows | **12**, totalling 17 impressions |
| Country | United States, 17/17 |
| Device | Desktop 10 (pos 8.9) · Mobile 7 (pos 31.14) |
| Coverage | **12%** of impressions exposed |

Active on **42 separate days** across the window, with impressions continuing through
2026-08-09 and rising in the most recent pull (131 → 140 in three days, +1 click). Compare
`?page_id=262` (frozen at 57) and `?page_id=866` (frozen at 46), which have not moved at all.
**This URL is live and growing, not dormant residue.**

### The query set, graded

**Tier 1 — commercially specific, top-of-page.** These are the real finding:

| Query | Impr | Position |
| --- | --- | --- |
| software development services | 3 | 1 |
| it companies near me | 1 | 1 |
| it services companies near me | 1 | 1 |
| software engineering firm | 1 | 1 |
| data center companies | 1 | 4 |

**Tier 2 — relevant but deep:** data center equipment manufacturers (12), computer networks
(20), software companies (70).

**Tier 3 — broad/junk:** local businesses near me (21.67), businesses (21), local businesses
(19), service businesses near me (69).

**Position 1 at 1–3 impressions is not proof of competitive strength.** It means that in a
handful of searches, this URL was the top result — plausibly highly localised, long-tail, or
low-competition contexts. It is real evidence of *association*, not of *demand*.

---

## 5. The strategic finding — Google's Cozelos is an IT company

Set the Tier 1 queries beside the company's own registered identity in
[site.ts](../../src/data/site.ts):

| NAICS | Description | Matching queries |
| --- | --- | --- |
| 541511 **(primary)** | Custom Computer Programming Services | software development services · software engineering firm |
| 541512 | Computer Systems Design Services | it companies near me · it services companies near me · computer networks |
| 541513 | Computer Facilities Management Services | data center companies · data center equipment manufacturers |
| 513210 | Software Publishers | software companies |

Every Tier 1 and Tier 2 query maps onto a NAICS code the business is registered under. The
2026-08-08 audit independently found the LinkedIn page categorised as **"IT Services and IT
Consulting."**

Now set that against what the website actually sells — the six services on `/services/`:

```
Website Design & Development · Video Production · Online Marketing
SEO Optimization · Business Automation · Ongoing Support & Maintenance
```

**Not one of the identifiable queries corresponds to any of the six.** No query mentions web
design, websites, SEO, video, marketing, or automation.

> Google's identifiable association for this domain matches Cozelos Data's **registered and
> professional identity** — IT, software development, computer systems, data centres — not
> the **marketing positioning** the website expresses. And that association is attached to a
> retired WordPress URL that today serves homepage HTML.

This is the most consequential thing the GSC work has produced. It is stated as what it is:
an observation about 17 exposed impressions out of 326 across two URLs. It is a lead, not a
mandate.

### A related, verifiable oddity

`/?page_id=158` emits `<link rel="canonical" href="https://cozelosdata.com/">` — it has been
telling Google it *is* the homepage this whole time. Google indexes and ranks it separately
anyway, with a different query set from `/`. **The self-canonical is not consolidating these
two URLs**, which is the mechanism F8 was assuming would eventually resolve them.

---

## 5b. Confirmed from the Internet Archive — and the business confirms it is current

**Business answer received 2026-08-12: Cozelos Data still offers these services.** Scenario A.
That makes the following historical evidence a live asset rather than a post-mortem.

The prior WordPress site is archived at
[web.archive.org · 2025-01-08](http://web.archive.org/web/20250108172432/https://cozelosdata.com/).
Fetched read-only. Its identity is unambiguous:

| | Old site (2025-01-08) | Current site |
| --- | --- | --- |
| `<title>` | Home - Cozelos Data | Web Design & SEO in Vernal, Utah — Custom Sites That Rank |
| H1 | **"Needing Expert Software Engineers?"** | "We Build Digital Assets That Grow Businesses." |
| Services | **Software Engineering · Cyber Security · Artificial Neuron Networks** | Website Design · Video Production · Online Marketing · SEO · Business Automation · Ongoing Support |

The old Software Engineering copy names the actual practice:

> "Model-Based Systems and Software Engineering (**MBSE**), **Real-Time Embedded Software
> Development**, Requirements Engineering, System and Software Architecture Design,
> Development, Integration, and Deployment, **DoDAF**/…"

MBSE, real-time embedded, DoDAF — that is defence and government systems engineering. It
aligns exactly with the credentials the *current* site still carries: WOSB, CAGE 897W0,
NAICS 541511/541512/541513/513210, a `/company/` page the earlier audit described as written
for contracting officers, and a capability statement offered in `llms.txt`.

### And the legacy URLs are identified

The archived navigation resolves the query-string URLs directly:

| URL | Was | Today |
| --- | --- | --- |
| `?page_id=158` | **Contact** page | serves the new marketing homepage |
| `?page_id=262` | **Company** page (About / Founder / List of Apps) | same |
| `?page_id=866` | not referenced in the 2025-01 snapshot | same |

`?page_id=158` being the old **Contact** page explains its whole profile: the highest CTR on
the property (5.00%), and the local/entity queries — `it companies near me`,
`it services companies near me`, `local businesses near me`, `service businesses near me`.
Contact pages accumulate NAP and local-entity signal. It is not ranking on content; it is
ranking as the business's contact identity for a software engineering firm.

### What this makes precise

The mismatch is no longer a hypothesis, and it is sharper than "IT vs marketing":

```
The business (per the owner, still current)
   software/systems engineering — MBSE, embedded, DoDAF, cyber security, ANN
   + the six marketing services
        │
        ├── Google ranks: software development services #1, software engineering firm #1,
        │                 it companies near me #1, data center companies #4
        │                 …all attached to the retired Contact URL
        │
        └── The website sells: web design, video, marketing, SEO, automation, support
                               — software engineering appears NOWHERE
```

Two of the three historical lines — **software/systems engineering** and **cyber security** —
have no representation on the current site at all. The third, Artificial Neural Networks, is
partially adjacent to today's "Business Automation" (AI assistants), but not the same offer.

## 6. Comparison — which relationship does the evidence support?

| | Option | Verdict |
| --- | --- | --- |
| A | Homepage owns the meaningful intent; `?page_id=158` is residual | **Disproved.** Exactly inverted |
| B | Both receive meaningful visibility for different query sets | **Partly.** Both have 7 clicks, but the homepage's identifiable set is one noise row |
| C | The query URL is receiving visibility that should eventually be consolidated | **Supported** |
| D | Insufficient to determine | No — the decomposition is exact |

**Answer: C**, with two caveats that must travel with it. 88% of `?page_id=158`'s impressions
and 99.5% of the homepage's remain anonymised, so this is a 12% sample and a 0.5% sample. And
**no exposed row on either URL has a single click** — all 14 clicks are unattributed. "Should
eventually be consolidated" is a direction, not yet an instruction.

---

## 7. Impact on F5 — homepage H1

**Reclassified, not unblocked.** F5 was blocked on "which queries does `/` rank for." The
export answers: *we cannot know at this volume*. One noise row from Belize is not a basis for
a decision, and repeating the export will not change that while impressions stay under 200.

F5 therefore moves out of **C (blocked until post-F9 GSC)** and into **B (human decision on
guide + business grounds)**. What can now be said honestly:

- There is no identifiable non-brand query the homepage would risk losing.
- But 7 real clicks exist from queries we cannot see, so "nothing to lose" is *not* provable.
- The guide's Title Match argument (Part 2) stands on its own merits.

Recommendation unchanged in substance: still do not rewrite the H1 tonight. But stop waiting
for GSC to authorise it — GSC has given its answer.

## 8. Impact on F8 — `?page_id=158`

**Classified. The blocking condition is satisfied.** F8's rule was "do not touch until
`?page_id=158` is identified in the export." It is now identified, in detail.

The classification also makes the decision *harder*, and more interesting:

- It is **not** a dead artifact. It is the only URL on the property producing query evidence,
  it holds the highest CTR (5.00%), and it is still growing.
- It ranks position 1 for queries describing a service category the site does not sell.
- Its self-canonical to `/` is being ignored, so the split will not self-heal.

Three futures, and **the business answer in §10 determines which is correct** — this is not a
technical choice:

| If IT/software **is** a service Cozelos sells | If it is **not** |
| --- | --- |
| The visibility is an asset. Consolidating it into a page that actually addresses that intent is a genuine money-page opportunity — and the domain already ranks | The visibility is residue from a prior identity. A 301 to `/` consolidates the signal and ends the duplicate, accepting that some of it may not survive |

Either way: **still redirect nothing today.** The one thing now firmly ruled out is treating
these URLs as worthless.

## 9. Everything else — still blocked, and one item made larger

**Still blocked until post-F9:** F7 (the six-URL split). This evidence is orthogonal to it —
it says nothing about which of the six services deserves a URL. `/services/` remains frozen
with its 58 / 0 / 6.88 / zero-rows baseline intact.

**Made larger:** audit item **B13** asked "is branding a service?", because `site.description`
advertises branding and advertising while neither is among the six. The same class of question
is now much bigger and much more consequential: **is IT/software a service?** The NAICS codes,
the LinkedIn category, and Google's query associations all say one thing; the website says
another.

---

## 10. Single highest-value next action — answered, and superseded

The business question ("does Cozelos still sell these?") was **answered: yes, currently.**
Scenario A. So the next action moves on.

> **Inventory the current software/systems-engineering service lines the same way
> [site.ts](../../src/data/site.ts) already inventories the six marketing services.**

That inventory is the missing input for every downstream decision, and it is business
evidence — Level 1 — not search evidence. It does not wait for post-F9. For each line:
name, what it actually delivers, who buys it, and whether it is sold to local businesses,
to government/defence primes, or both.

The archived copy gives a starting draft to correct rather than a blank page: **Software
Engineering** (MBSE, real-time embedded, requirements engineering, architecture design,
DoDAF), **Cyber Security**, **Artificial Neural Networks**.

### What must not happen next

- **Do not redirect `?page_id=158`.** It is the retired Contact page carrying the domain's
  only demonstrated commercial identity. F8 stays open by choice now, not by ignorance.
- **Do not build `/software-development/` or similar yet.** The evidence supports the
  *existence* of the intent, not any particular URL for it. 17 exposed impressions is a lead.
- **Do not touch `/services/`.** F7 is unchanged and still post-F9. Note though that F7's
  framing is now questionable: "should the six services split?" may be the wrong question if
  the service inventory itself is incomplete.
- **Do not treat position 1 as demand.** Position 1 at 1–3 impressions means the domain is
  *associated*, not that volume exists. Keyword volume for these terms is still unmeasured.

### The strategic question this opens, for a later turn

The site currently markets **web design to local Vernal businesses** while carrying
**government-contracting credentials for systems engineering**. Both are apparently real. The
Master Guide's "one URL per intent" rule scales to "one architecture per audience" — and two
audiences this different (a Uintah Basin retailer vs a defence prime's contracting officer)
may not belong in one undifferentiated `/services/`. That is the real architecture question,
and it is much larger than the F7 six-way split that has been holding the project.

Do not decide it yet. Inventory first.

**Nothing was implemented.** Both ZIPs preserved intact as
[01-home-2026-08-12.zip](./gsc/01-home-2026-08-12.zip) and
[12-page-id-158-2026-08-12.zip](./gsc/12-page-id-158-2026-08-12.zip), with all members
extracted alongside. No production change was made.
