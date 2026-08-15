# Step 1 — Federal Registration & Award-History Verification

**Date:** 2026-08-12
**Scope:** External research only. No source files modified, nothing committed, no pages created, `/services/` and all legacy URLs untouched.
**Companion to:** [business-inventory-2026-08-12.md](business-inventory-2026-08-12.md)

---

## 0. What was and wasn't verifiable

| Target | Source attempted | Result |
|---|---|---|
| Federal award history | USAspending API (authoritative, no opt-out) | ✅ **Verified — none exists** |
| SAM.gov entity record | SAM.gov public search API | ⚠️ **Not publicly discoverable** — see V2 |
| SAM.gov detail (UEI, NAICS list, PSC, expiry) | SAM.gov entity API v3 | ❌ Requires an API key / authenticated account |
| SBA DSBS profile | dsbs.sba.gov | ❌ No profile retrievable by CAGE |
| Third-party CAGE mirrors | usfcr, cage-codes, govcagecodes | ❌ No record in any mirror |
| Historical company identity | Google index of `?page_id=262` | ✅ **Recovered — this is the keystone finding** |

**Headline:** the SAM record could not be verified without Ellen's login — but the two things it was meant to establish were answered anyway, from sources that don't require one, and a third finding reframes the whole Side B question.

---

## V1 — No federal award history exists. Verified, authoritatively.

USAspending covers all federal prime awards and reported subawards. Unlike SAM entity data, **there is no opt-out** — award data is mandatorily public.

Searched `recipient_search_text = "cozelos"`, 2007-10-01 → 2026-09-30:

| Award class | Result |
|---|---|
| Contracts (BPA Call, Purchase Order, Delivery Order, Definitive Contract) | **0** |
| IDVs (GWAC, IDC, FSS, BOA, BPA) | **0** |
| Subawards | **0** |

Recipient autocomplete for "cozelos" returns only two individuals (`CHRISTOPHER COZELOS`, `CHRISTOPHER WESLEY COZELOS`) with no UEI or DUNS attached — assistance-side records, not Cozelos Data.

**This confirms tension T3 from the inventory with an authoritative source.** The proof asymmetry is not an artifact of what the website chooses to show: Cozelos Data has **no federal past performance in the public record at all**.

That is not a criticism — most WOSB registrants never win a prime award, and it says nothing about capability. But it settles an architecture question definitively:

> A "Government & Technology" hub cannot be supported with past performance, because there is none to cite. Any such section would rest entirely on the founder's résumé — exactly the founder-capability-vs-company-capability gap flagged in T5.

**Caveat, stated precisely:** this rules out federal *prime awards and reported subawards*. It does **not** rule out commercial technical work, state/local contracts, unreported lower-tier subcontracts, or W-2/1099 work Ellen performed for a prime under someone else's contract. Those are exactly what Group 1 of the owner interview must establish.

---

## V2 — The SAM registration is not publicly discoverable

SAM.gov's public entity search returns, for the query `cozelos`, exactly **one** record across the entire index:

```
_type:     exclusion
title:     CRYSTA RAY COZELOS
agency:    HHS  ·  Prohibition/Restriction  ·  activated 2021-08-19
address:   STONY CREEK, VA
CAGE:      none    UEI: none
```

Searching the CAGE code `897W0` directly returns **zero results**. No entity registration for Cozelos Data appears under any query.

**The exclusion record appears unrelated** — different first name, Virginia, individual classification, no CAGE or UEI. I am flagging it only because it is the single thing surfacing under the surname in a federal integrity system, and a contracting officer running the same search will see it. Ellen should be aware it exists; nothing suggests a connection.

**Three caveats that matter, in order of likelihood:**

1. **SAM entities can opt out of public display.** The API exposes a `noPublicDisplayFlag`. A registration marked private is invisible to public search but fully valid and visible to contracting officers. This is common and legitimate.
2. Expired or inactive registrations may be filtered from default search results.
3. The endpoint used is the undocumented one behind SAM's own UI; its behavior may differ from the authenticated view.

**So: "not publicly verifiable" ≠ "not registered."** I will not claim the registration is lapsed.

But note what this means practically — **it is the exact wall a contracting officer hits.** If a CO searches SAM for Cozelos Data and finds nothing, the credentials block on `/company/` cannot be independently confirmed by the person it was written for. Combined with the DUNS-without-UEI defect already flagged in the inventory (§2), the government-facing credibility layer currently has two verification gaps.

**Only Ellen can close this**, by logging into SAM.gov and reporting: registration status, expiry date, UEI, public-display setting, the complete NAICS list, and any PSC codes.

---

## V3 — The keystone: the second identity is **data management**, not "IT"

The old **Company** page, `?page_id=262`, is still in Google's index under the title *"Company - Cozelos Data."* Its content:

> Cozelos Data (DUNS 059220399, CAGE Code 897W0) is a **Woman-Owned Small Business** based in Vernal, Utah dedicated to quality **Data Management Services**, competitive prices, and ethical business practices. Cozelos Data provides **data solutions and custom programming to organizations with a dependency on data to run their operations**, with services including **analysis, solution development, programming, installation, and maintenance of data systems**.

This is a third reading, and it is the one that makes everything else cohere. The inventory treated the four NAICS codes as a loose "software/systems" cluster with 513210 unsupported. They are not loose. **They are a precise description of a single business:**

| NAICS | Official title | Phrase it maps to in the old Company page |
|---|---|---|
| **541511** (primary) | Custom Computer Programming Services | "**custom programming**" |
| 541512 | Computer Systems Design Services | "analysis, **solution development**… data systems" |
| 541513 | Computer Facilities Management Services | "**installation, and maintenance of data systems**" |
| 513210 | Software Publishers | "solution development" |

All four. No gaps, no leftovers. **B5 (Software Publishers) is no longer "UNSUPPORTED"** — it now has a coherent reading as the product end of the same data-systems practice.

This also resolves three loose threads at once:

- **The company name.** "Cozelos **Data**" was never generic. It is the business line.
- **`data center companies` at position 4** and **`computer networks` at position 20** in the GSC export — previously the two oddest queries in the set. They are not noise. They are the data-systems identity ranking.
- **The relationship between the archived pages.** Software Engineering (MBSE, real-time embedded, requirements engineering, architecture, DoDAF), Cyber Security, and Artificial Neural Networks were not three separate businesses. They read as the *technical disciplines beneath a data-systems practice*.

### What this revises in the inventory

The Side A / Side B split stands, but **Side B's label was wrong**. It is not "generic IT" (which pointed confusingly at local `near me` queries) and it is not "defense software engineering" (which pointed at near-zero-demand MBSE/DoDAF terms). It is:

> **Data management and data systems** — analysis, custom programming, solution development, installation, and maintenance — for organizations that depend on data to operate.

That is a materially better-defined business than anything in the previous draft. It has a name a buyer would recognise, it matches the registration exactly, and it is neither purely federal nor purely local.

### And it sharpens I6 considerably

The inventory flagged two current services sitting on the seam. Under the data-management reading, the seam is much more specific than "some overlap":

| Current sold service | Contains | Old business equivalent |
|---|---|---|
| Business Automation (A5) | "CRM & data integrations", "custom internal tooling" | **analysis, custom programming, solution development** |
| Ongoing Support (A6) | hosting, monitoring, backups, uptime | **installation and maintenance of data systems** |

The data-management business did not vanish from the website. **It was re-labelled for a local buyer and repriced at $295/month.** Whether that was a deliberate repositioning or an accident of a rebrand is precisely what Group 1 of the interview must establish — and it is a much sharper question than "do you still sell IT?"

---

## V4 — There are at least three legacy URLs, not one

The sitewide GSC export ([00-pages.csv](gsc/00-pages.csv)) shows more legacy surface than the query-level analysis revealed:

| URL | Impressions | Avg position | Identified as |
|---|---|---|---|
| `/` | 178 | 2.12 | current homepage |
| `/?page_id=158` | 131 | 13.63 | old **Contact** page |
| **`/?page_id=262`** | **57** | **2.60** | old **Company** page — source of V3 |
| `/services/` | 53 | 7.13 | current |
| **`/?page_id=866`** | **46** | **2.74** | **unidentified** |
| `www.cozelosdata.com/services/` | 41 | 2.61 | **www host variant** |

Three observations:

1. **`?page_id=262` is the third-strongest page on the property and sits at position 2.6** — better average position than `?page_id=158`. It was invisible in the earlier analysis because query-level rows are thresholded and anonymized. The legacy footprint is larger than "one weird URL."
2. **`?page_id=866` is unidentified** and carries 46 impressions at position 2.74. Worth recovering — it may hold more of the historical identity.
3. **A `www.` host variant of `/services/` is being indexed separately** with 41 impressions.

### Current serving behaviour — verified, and already correct

All three legacy URLs were fetched live. Every one returns **HTTP 200 with a byte-identical copy of the current homepage** (158,942 bytes, same `<title>`), because the static host ignores the query string. Each emits a correct self-referential canonical:

```html
<link rel="canonical" href="https://cozelosdata.com/">
```

**No robots meta, no noindex.** So the consolidation signal is already in place and correct — these should collapse into `/` over time on their own. **This confirms no action is needed on F8/F10, and reinforces the decision to leave them frozen.**

One consequence worth stating: Google is currently serving a **stale snippet** for `?page_id=262` — the Data Management description — for a URL that has served the marketing homepage for some time. That is how the V3 content was recoverable at all. **It will not stay recoverable.** Once Google recrawls and honours the canonical, the last live trace of the data-management identity disappears from the index.

---

## V5 — The marketing identity is already overwriting the technical one

Third-party business databases have re-indexed Cozelos Data under the *current* positioning. ZoomInfo now describes it as providing "digital solutions for local businesses, including custom website design, video content creation, and online marketing services… tailored to small service companies and professional offices." No mention of data management, programming, or systems.

So the two identities are not in stable equilibrium. **The technical identity is decaying in the broker ecosystem while persisting, for now, in Google's index.** Whatever is decided, the window for recovering the data-management association at zero cost is finite.

**Minor discrepancy:** Facebook lists the entity as **"Cozelos Data LLC"**; [site.ts:9](../../src/data/site.ts#L9) sets `legalName: "Cozelos Data"`. For a government-facing page, legal name should match the registration exactly.

---

## What this changes for the owner interview

Group 1 of the inventory asked a blunt question — "do you still sell software development?" V3 lets us ask far better ones. **These replace Q1–Q5:**

1. The old Company page described Cozelos Data as a **Data Management Services** business — "analysis, solution development, programming, installation, and maintenance of data systems." **Is that still an accurate description of a business you sell today?**
2. If yes: who were/are the customers — federal, state/local, commercial enterprise, or local business?
3. **Are "Business Automation" and "Ongoing Support" the same data-management practice re-labelled for a local buyer, or genuinely different, smaller work?** (This is the pivotal question — it determines whether Side B is a *new* section or a *renaming* of what already exists.)
4. Was the shift to marketing services a deliberate repositioning, or did the data business continue quietly while the website changed?
5. USAspending shows **no federal awards of any kind**. Has technical work ever been delivered under a federal contract — including as a subcontractor or through a prime as staff? If not, is federal work an aspiration rather than a current line?
6. Is NAICS **513210 Software Publishers** tied to an actual or planned product?
7. What is the SAM registration's status, expiry, UEI, and **public-display setting**? (It is currently not publicly discoverable.)
8. Is the legal entity "Cozelos Data LLC"?

Groups 2 (capacity), 3 (past performance), and 4 (historical services) from the inventory stand unchanged. **Group 2 remains the most important**, and V1 raises its stakes: with no award history, capacity claims would be the *only* thing a federal buyer could evaluate.

---

## Revised recommendation

**Step 1 is complete to the limit of public data.** The two things it was meant to settle are settled:

- ✅ **Federal past performance: none exists.** Authoritative.
- ⚠️ **Registration status: only Ellen can confirm it.** It is not publicly discoverable, which is itself a finding.

**Step 2 — the owner interview — is now the sole blocking step**, and it should carry the SAM login items (Q7) with it, since that is the only way the registration detail can be retrieved.

Unchanged and still frozen: `/services/`, `/?page_id=158`, `?page_id=262`, `?page_id=866`, canonical logic, robots/F11, favicon, and every architecture decision including F7.

Two things worth adding to the backlog now, neither requiring a decision:

- **Identify `?page_id=866`** — 46 impressions at position 2.74, currently unknown. It may carry more of the historical identity, and like `?page_id=262` its indexed content is on a decay clock.
- **Capture the `?page_id=262` snippet as evidence before it is recrawled** — it is currently the only public record of the data-management positioning.

---

## Summary

The SAM record could not be read without a login. It mattered less than expected, because two better sources answered the underlying questions:

**USAspending settles the proof question authoritatively — there is no federal past performance.** That does not diminish the capability, but it does mean a government-facing section would have nothing to stand on except a résumé.

**And the old Company page settles the identity question.** The second business is not "IT" and not "defense software engineering." It is **data management and data systems** — a description that accounts for all four NAICS codes exactly, explains the company's name, explains the two strangest queries in the GSC export, and reframes the archived Software Engineering, Cyber Security, and ANN pages as disciplines beneath a single practice rather than three separate offerings.

The most consequential possibility this opens is not that Cozelos has a hidden second business. It is that **the data-management business may still be running inside the current website under consumer-friendly labels** — as "Business Automation" and "Ongoing Support," priced at $295/month. If that is true, the architecture question is not "should we add a technical division?" but "have we been under-selling the technical business by calling it maintenance?"

That is a question only Ellen can answer, and it is now the first one to ask.
