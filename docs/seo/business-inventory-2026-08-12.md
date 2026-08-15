# Cozelos Data — Level 1 Business Inventory

**Date:** 2026-08-12
**Scope:** Inventory only. No source files modified, no pages created, no redirects, no canonical or robots changes, no `/services/` changes.
**Purpose:** Establish what Cozelos Data actually sells, to whom, and with what evidence — before any URL architecture decision is made.

> **⚠️ Superseded in part by [sam-verification-2026-08-12.md](sam-verification-2026-08-12.md) (same day).**
> Three findings revise this document:
> - **Side B's label is wrong here.** The old Company page (`?page_id=262`, still indexed) shows the second identity is **data management / data systems**, not "generic IT" or "defense software engineering." All four NAICS codes map to it exactly. See V3.
> - **B5 (Software Publishers, 513210) is no longer UNSUPPORTED** — it has a coherent reading under the data-management identity.
> - **T3 (proof asymmetry) is confirmed authoritatively.** USAspending shows zero federal prime awards, IDVs, and subawards. See V1.
>
> Questions Q1–Q5 in §6 are replaced by the sharper set in that document.

---

## 0. Method and the honest headline

Three evidence classes were kept strictly separate:

| Class | Source | What it proves |
|---|---|---|
| **A — Current commercial expression** | This repository (`src/`, `public/llms.txt`) | What the business *sells today, in public* |
| **B — Business registration / credential** | Credentials published in the repo (WOSB, CAGE, DUNS, NAICS) | What the business is *registered to do* |
| **C — Historical expression** | Verified Internet Archive material (supplied) | What the business *marketed previously* |
| **D — Search association** | GSC exports in `docs/seo/gsc/` | What Google *associates with the domain* — deliberately excluded from status determination |

**The headline finding is not "Cozelos does IT."** It is this:

> **Class A and Class B describe two different companies.**
>
> The website (A) sells advertising, video, SEO, web design, automation, and maintenance.
> The federal registration (B) says Custom Computer Programming (541511, **primary**), Computer Systems Design (541512), Computer Facilities Management (541513), and Software Publishers (513210).
>
> **Not one of the six services the site actually sells is covered by a NAICS code the company publishes.** Advertising (541810), video production (512110), and marketing consulting (541613) are absent from the registration entirely. Web design is the only partial bridge, and only via 541511.

This is business evidence, independent of Google. Class D (GSC) then corroborates it: the domain ranks position 1 for `software development services`, `it companies near me`, `it services companies near me`, and `software engineering firm` — i.e. for **the registered NAICS codes**, not for what the site sells.

So the two-identity hypothesis is now supported by three independent sources that were not derived from each other: the registration, the archive, and the search index. That is enough to justify architecture work. It is **not** enough to specify the architecture, because Class A currently contains **zero** commercial expression of the technical side.

---

## 1. Complete business/service inventory

Status vocabulary (more precise than Current / Historical / Both, which conflates three different things):

- **SOLD** — has a current, public sales expression: named offer, description, price or CTA
- **CREDENTIALED** — the company's own published registration asserts the capability; no sales expression
- **CAPABILITY-CLAIMED** — asserted as founder/company skill in narrative copy; no purchasable offer
- **HISTORICAL** — marketed on the prior site; no current expression
- **UNSUPPORTED** — appears in one source only, with nothing corroborating it

### Side A — Local / commercial digital services

All six are **SOLD**. All six are defined in [site.ts:90-314](src/data/site.ts#L90-L314) and rendered by [services.astro](src/pages/services.astro).

| # | Name | Status | What it delivers | Who buys it | Primary audience | Actively marketed? | Evidence | Current page | Historical page | Should it have a page? |
|---|---|---|---|---|---|---|---|---|---|---|
| A1 | Website Design & Development | SOLD | Custom hand-built site, mobile-first, sub-second, WCAG 2.1 AA, source code owned by client. From $2,500 | Local business owner; also the Enterprise/government buyer | Local commercial (+ government via Enterprise tier) | Yes — lead offer, priced, in hero, llms.txt, schema | A | `/services/#website-design` | Unknown — not confirmed in archive material supplied | Undecided (this is F7) |
| A2 | Video Production | SOLD | Brand films, 4K aerial drone, vertical social cuts, color grade, sound design | Local business owner, marketing lead | Local commercial | Yes — own reel slot, FAQ pair | A | `/services/#video-production` | Not confirmed | Undecided (F7) |
| A3 | Online Marketing | SOLD | Google Ads + Meta management, landing pages, pixel/conversion tracking, A/B, monthly reports | Local business owner | Local commercial | Yes — 3 FAQs, monthly plan tier | A | `/services/#online-marketing` | Not confirmed | Undecided (F7) |
| A4 | SEO Optimization | SOLD | Pillar-and-spoke architecture, JSON-LD, local SEO, GBP tuning, `llms.txt`, monthly ranking reports | Local business owner | Local commercial | Yes — 3 FAQs, $495 plan tier | A | `/services/#seo` | Not confirmed | Undecided (F7) |
| A5 | Business Automation | SOLD | AI chat/lead capture, scheduling, CRM + data integrations, invoice workflows, "custom internal tooling" | Local business owner; **overlaps technical buyer** | Local commercial, drifting technical | Yes — 2 FAQs | A | `/services/#business-automation` | Partial ancestor: archived **Artificial Neural Networks** (different product, same word) | Undecided — **highest-ambiguity item** |
| A6 | Ongoing Support & Maintenance | SOLD | Hosting, SSL, security monitoring, daily backups, uptime monitoring, perf tuning, content edits. $295/mo | Existing client, post-launch | Local commercial | Yes — 2 FAQs, 4 plan tiers | A | `/services/#ongoing-support` | Not confirmed | Undecided (F7) |

**Note on A5 and A6:** these are the two services that touch NAICS 541511 and 541513 respectively. A6's "hosting, security monitoring, backups, uptime monitoring" is a small-scale, website-scoped version of **Computer Facilities Management (541513)**. A5's "custom internal tooling" and "CRM & data integrations" is a small-scale version of **Custom Computer Programming (541511)**. The technical side is not entirely absent from Class A — it is present, unlabeled, and priced at $295/month.

### Side B — Software / technology / government business lines

**None of these are SOLD.** Every row is CREDENTIALED, CAPABILITY-CLAIMED, HISTORICAL, or UNSUPPORTED.

| # | Name | Status | What it would deliver | Who buys it | Primary audience | Actively marketed? | Evidence | Current page | Historical page | Should it have a page? |
|---|---|---|---|---|---|---|---|---|---|---|
| B1 | Custom software development / programming | **CREDENTIALED + HISTORICAL** | Unknown — never described in Class A | Agency, prime contractor, technical org | Government / defense / technical | **No** | B: NAICS 541511 **primary** ([site.ts:841](src/data/site.ts#L841)); C: archived "Software Engineering"; D: `software development services` pos 1 | **None** | Old Software Engineering page | Undecided — strongest candidate, but scope unknown |
| B2 | Systems / software architecture, MBSE | **HISTORICAL + CAPABILITY-CLAIMED** | Model-based systems & software engineering, requirements engineering, architecture design, DoDAF | Prime contractor, program office | Defense / technical | **No** | B: NAICS 541512; C: archived MBSE, requirements engineering, architecture, DoDAF; A: founder bio only | **None** (only Ellen's bio) | Old Software Engineering page | Undecided — likely near-zero search demand; may belong in a capability statement, not a page |
| B3 | Real-time embedded software development | **HISTORICAL** | Embedded / real-time systems | Aerospace, defense prime | Defense / technical | **No** | C only; A: implied by "NASA and DoD mission-critical software" | **None** | Old Software Engineering page | Undecided — needs owner confirmation it is still offered at all |
| B4 | IT services / computer facilities management | **CREDENTIALED**, weakly | Managed IT, infrastructure, facilities management | Local business (IT support), agency | Unclear — could be local commercial *or* government | **No** | B: NAICS 541513; D: `it companies near me`, `it services companies near me`, `data center companies`; A: only the $295 maintenance plan | Partial: `/services/#ongoing-support` | Not confirmed in archive | Undecided — **the query demand here is local, not federal** |
| B5 | Software publishing / product | **UNSUPPORTED** | A software product | Unknown | Unknown | **No** | B: NAICS 513210 only. **No archive evidence, no site evidence, no query evidence** | None | None | Likely no page — probably a registration artifact |
| B6 | Cybersecurity | **HISTORICAL + CAPABILITY-CLAIMED** | Unknown as a service. Currently expressed only as *build hardening* | Government, technical org, or local business | Unclear | **No** | C: archived "Cyber Security"; A: [ellen-cozelos.astro:26-30](src/pages/ellen-cozelos.astro#L26-L30), "Secure by design", A6 monitoring | **None** as a service | Old Cyber Security page | Undecided — the gap between "we harden your site" and "we sell security services" is enormous |
| B7 | Artificial intelligence / neural networks | **HISTORICAL, redefined as SOLD** | *Then:* artificial neural networks. *Now:* chatbots, lead capture, `llms.txt`, workflow automation | *Then:* technical. *Now:* local business owner | **Both — but two different products** | Yes, in its current meaning only | C: archived ANN; A: A5, 2 FAQs, founder bio | `/services/#business-automation` | Old ANN page | Undecided — **the word survived, the product did not** |
| B8 | Government contracting as a channel | **SOLD (channel) — but selling Side A** | WOSB set-aside eligibility, capability statement on request, solicitation response | Contracting officer, prime seeking a sub | Government | Yes, in one section | A: [company.astro:207-226](src/pages/company.astro#L207-L226), footer, FAQ, llms.txt, Enterprise tier | `/company/#government` | Unknown | Undecided — currently a section, not a hub |
| B9 | Section 508 / WCAG accessibility compliance | **SOLD, subordinate** | Accessible builds to WCAG 2.1 AA / Section 508 | Government agency, regulated org | Government (+ healthcare) | Weakly — one FAQ line, one bullet | A: FAQ [site.ts:757](src/data/site.ts#L757), A1 benefits, Enterprise tier | Subordinate to A1 | Not confirmed | Undecided — the only genuinely government-specific *deliverable* currently offered |

---

## 2. Evidence table — where each claim actually lives

| Evidence artifact | Location | Class | What it supports |
|---|---|---|---|
| Six service definitions | [site.ts:90-314](src/data/site.ts#L90-L314) | A | A1–A6 as current sold offers |
| NAICS table (513210, **541511 primary**, 541512, 541513) | [site.ts:839-844](src/data/site.ts#L839-L844) | B | B1, B4, B5; systems design |
| WOSB / DUNS 059220399 / CAGE 897W0 | [site.ts:35-40](src/data/site.ts#L35-L40) | B | B8 |
| Credentials block (WOSB Eligible, SAM Ready, DUNS/UEI Active) | [Credentials.astro](src/components/Credentials.astro) | B | B8 |
| Government section — scope statement | [company.astro:212](src/pages/company.astro#L212) | A | **Scopes government work to "web development, SEO, video documentation, and AI tooling"** — i.e. Side A only |
| Capability statement offer, SOL response | [company.astro:216-225](src/pages/company.astro#L216-L225) | A | B8 conversion path |
| Enterprise tier, $10,000–$30,000+, "For government, multi-location, and complex builds" | [pricing.astro:68-85](src/pages/pricing.astro#L68-L85) | A | B8 — but every listed feature is a website build |
| Government FAQ | [site.ts:755-758](src/data/site.ts#L755-L758) | A + B | B8, B9 |
| Founder expertise: Software Engineering, Cyber Security, AI, Digital Marketing, Strategy | [ellen-cozelos.astro:20-46](src/pages/ellen-cozelos.astro#L20-L46) | A | B1, B6, B7 — **as personal capability, not company offer** |
| `knowsAbout` Person schema | [ellen-cozelos.astro:98-104](src/pages/ellen-cozelos.astro#L98-L104) | A | Same — the technical identity is published in schema attached to a **Person**, not the Organization |
| "NASA and Department of Defense mission-critical software", Huntsville, Columbia M.S. | [ellen-cozelos.astro:167-182](src/pages/ellen-cozelos.astro#L167-L182), [company.astro:52-59](src/pages/company.astro#L52-L59) | A | B2, B3 provenance |
| "Cozelos Data isn't a web design company. It's a strategic technology partner" | [ellen-cozelos.astro:300-303](src/pages/ellen-cozelos.astro#L300-L303) | A | **The site already contains the two-identity tension in a single sentence** |
| Timeline "Today: Government-ready" | [site.ts:799-803](src/data/site.ts#L799-L803) | A | B8 — frames government as *new*, not historical |
| "Government" as an industry served | [WhoWeWorkWith.astro:13](src/components/WhoWeWorkWith.astro#L13), [Marquee.astro:9](src/components/Marquee.astro#L9) | A | B8 |
| Organization schema `identifier`: DUNS + CAGE | [Seo.astro:92-95](src/components/Seo.astro#L92-L95) | A + B | B8 |
| `llms.txt` Government Contracting block | [public/llms.txt](public/llms.txt) | A + B | B8 |
| Legacy URL queries (`software development services` p1, `it companies near me` p1, `software engineering firm` p1, `data center companies` p4) | [12-page-id-158-queries.csv](docs/seo/gsc/12-page-id-158-queries.csv) | D | **Corroborating only** — not used to determine status |
| Archived Software Engineering / Cyber Security / ANN pages; MBSE, real-time embedded, requirements engineering, architecture, DoDAF | Internet Archive (supplied, verified) | C | B1, B2, B3, B6, B7 |
| Portfolio — 8 projects, all local commercial web builds | [site.ts:339-582](src/data/site.ts#L339-L582) | A | **Absence of evidence for every Side B line** |

### Evidence-quality defects found (flagged, not fixed)

1. **DUNS is published; UEI is not.** [Credentials.astro:12](src/components/Credentials.astro#L12) advertises "DUNS / UEI Active — Universal Entity Identifier active and current for FAR-compliant contracting," but `site.credentials` has no `uei` field and the rendered tile shows a DUNS only. DUNS was retired for federal award purposes in April 2022. To a contracting officer, publishing a DUNS in 2026 without a UEI reads as a stale registration. Same gap in the Organization schema `identifier` array.
2. **Experience figures conflict.** `stats` says "8+ Years Experience" and "40+ Websites Built" ([site.ts:65-70](src/data/site.ts#L65-L70)); the founder and company pages say "20+ years." Both are probably true of different subjects (company vs. founder), but the site never distinguishes them.
3. **The timeline erases the historical business.** [site.ts:783-804](src/data/site.ts#L783-L804) runs Origin → Playbook → Growth → "Today: Government-ready," presenting government as a *new* development. Class C shows the technical/government identity is the *older* one. Whatever the truth, the current narrative inverts it.
4. **No `serviceType`/`hasOfferCatalog` for Side B.** The Organization schema publishes zero technical services. The only machine-readable technical claim on the site is `knowsAbout` on the **Person** node.

---

## 3. Current vs. historical — the distinction that matters

The requested Current / Historical / Both split turns out to be the wrong axis, because it hides the actual break. The real axis is **capability vs. commercial expression**:

|  | **Has commercial expression** | **No commercial expression** |
|---|---|---|
| **Credential/capability exists** | A1–A6, B8, B9 | **B1, B2, B3, B4, B6** ← the entire gap |
| **No credential/capability shown** | — | B5 (registration artifact) |

Everything on Side B that Google ranks for sits in the bottom-right of the top row: **the company is credentialed for it, has done it, claims it in the founder's biography — and does not sell it anywhere on the site.**

There is exactly one item that is genuinely "Both": **B7 (AI)**. And it is both only lexically. The archive sold *artificial neural networks*; the site sells *chatbots and workflow automation*. Same word, different discipline, different buyer, different price point. Treating those as one continuous service would be a mistake.

Scenario A ("Cozelos currently sells IT / software development / computer systems services") is confirmed by the owner and corroborated by the registration. **But this repository contains no evidence of how, at what scope, or to whom.** That is the gap the owner questions in §6 must close — it cannot be closed from the repo or the archive.

---

## 4. Audience segmentation

| | **Audience 1 — Local commercial** | **Audience 2 — Government / technical** |
|---|---|---|
| Buyer | Owner-operator, office manager | Contracting officer, prime's capture/subcontract manager, program technical lead |
| Trigger | "Our website is embarrassing / we're not showing up" | Solicitation, set-aside requirement, sub-teaming need, staffing gap |
| Discovery | Google local pack, referral, `near me` queries | SAM.gov, agency vendor lists, prime's vendor database, capability searches |
| Decision cycle | Days to weeks | Weeks to months, sometimes years of relationship first |
| Evaluates on | Portfolio look, price, speed, trust in a person | Past performance, credentials, NAICS/PSC fit, compliance, capacity, key personnel |
| Proof required | Beautiful sites, testimonials, local names | Contract history, CPARS, cleared/qualified personnel, capability statement, DCAA-adjacent posture |
| Price anchor | $2,500 – $30,000 | Labor rates, CLINs, ceiling values |
| Conversion path | Contact form → $500 Discovery Session → fixed quote | Capability statement → capability briefing → teaming agreement or bid |
| Objections | "Can I afford it? Will I own it?" | "Have you performed at this scale? Who's your PM? What's your capacity?" |
| **Currently served by the site?** | **Fully** | **One section, one FAQ, one price tier, one email CTA — all selling Audience 1's services** |

**Where they genuinely overlap:** a government agency buying a website, video documentation, or an accessible public-facing site. That overlap is real and is exactly what `/company/#government` currently addresses. It is *not* the overlap the search data points at.

**Where they don't overlap at all:** MBSE, DoDAF, real-time embedded, requirements engineering, systems architecture, and security services. Nothing on the current site serves that buyer, and the local-commercial framing actively works against it — a $2,500 price floor, "Main Street businesses," "family shops," and a $295/month maintenance plan are disqualifying signals to a program office.

---

## 5. Major business-model conflicts and tensions

**T1 — Registration/offer inversion (the core conflict).**
The company is registered as a software and systems firm and sells as a marketing agency. A contracting officer searching SAM by 541511/541512/541513 finds Cozelos Data and lands on a site selling drone video and Google Ads. A local business searching "web design Vernal" finds a company whose federal codes say custom programming. **Both audiences currently receive a mismatched signal**, and the registration is the more authoritative artifact of the two.

**T2 — Price-anchor collision.**
"$2,500" appears in the hero, the services page, the FAQ, `llms.txt`, and the AI summary. It is the single most repeated number on the site. It is also the number that tells a technical/federal buyer this is not a firm operating at their scale. The Enterprise tier ($10k–$30k+) does not fix this: its feature list is still websites.

**T3 — Proof asymmetry.**
Eight portfolio projects, all local commercial web builds, all Utah/Italy small business. **Zero** past-performance evidence for anything on Side B. Every technical claim rests on founder biography. Audience 2 does not buy on biography alone.

**T4 — Conversion-path collision.**
Both audiences funnel into one `/contact/` and one `$500 Discovery Session, credited toward your build`. That construct is meaningless — arguably disqualifying — to someone responding to a solicitation. `/company/#government` does offer a capability statement, but it is buried mid-page on an About page and the CTA is a `mailto:`.

**T5 — Founder capability vs. company capability.**
Every Side B claim is Ellen's personal résumé. In acquisition these are different things. If Ellen is the only technical resource, then a standalone "Government & Technology" division advertises capacity the company may not be able to staff — and over-claiming capacity to a federal buyer is a materially worse failure mode than under-claiming.

**T6 — "AI" carries two incompatible meanings.**
Archived: artificial neural networks. Current: chatbots and `llms.txt`. It is simultaneously the cheapest word on the site (bundled into a $295–$795/month plan) and the most credentialed capability on the founder's résumé. It is the natural bridge between the identities and the easiest thing to get wrong.

**T7 — The company tells two incompatible age stories.**
"8+ Years Experience" (stat) vs. "20+ years" (narrative) vs. an archive showing an earlier, differently-positioned company. Audience 2 will check.

**T8 — Name/brand signal.**
"Cozelos **Data**" reads technical. `data center companies` and `computer networks` appear in the query data. The name is pulling toward Audience 2 while the copy pushes toward Audience 1.

**T9 — Services that should not share a commercial page.**
Cybersecurity, embedded/real-time development, and MBSE/systems engineering cannot sit on the same page as drone video and Meta ads without damaging both. The trust registers are incompatible: one sells reassurance and taste, the other sells rigor and risk reduction.

**T10 — Undecided-by-default is itself a decision.**
The current site does not present two identities poorly; it presents one identity and hides the other. Whichever way this resolves, "leave it as is" means continuing to withhold the credentialed half of the company from both search engines and Audience 2.

---

## 6. Questions only the business owner can answer

These block architecture. They cannot be answered from the repository, the archive, or GSC.

### Group 1 — What is actually sold today (blocking)
1. In the last 24 months, has Cozelos Data been **paid** for: custom software development? systems engineering / MBSE? embedded work? cybersecurity services? managed IT / facilities management? For each: yes/no, roughly how many engagements, and roughly what contract size.
2. For each "yes" — was it **direct prime**, **subcontract to a prime**, **commercial B2B**, or **staff augmentation**?
3. Is there any software **product** behind NAICS 513210, or is that code aspirational?
4. Is NAICS 541511 listed as **primary** deliberately, or is it a legacy from the earlier company positioning?
5. Are advertising (541810), video (512110), or marketing consulting (541613) registered in SAM and simply not published on the site?

### Group 2 — Intent and capacity (blocking)
6. Do you **want** government/technical work, or are the credentials maintained as an option?
7. If yes: is the target **federal**, **state/local**, **prime subcontracting**, or all three?
8. **Who delivers it?** Ellen only, a bench, named subcontractors, or a teaming partner? This determines whether a division can be honestly claimed.
9. What is the realistic annual capacity for technical work alongside the current client load?
10. Are there security clearances, facility clearances, or certifications (CMMC, ISO, FedRAMP-adjacent) held or in progress?

### Group 3 — Past performance and proof (blocking for Audience 2)
11. What technical past performance can be **named publicly**? Any prime/agency references usable on a website?
12. Is there a current capability statement? Does its service list match the site, the archive, or neither?
13. Any CAGE-linked award history, even small, that can be cited?

### Group 4 — Historical services (blocking for B2, B3, B6)
14. MBSE, DoDAF, requirements engineering, real-time embedded — **still offered, or career provenance only?** Answer per discipline.
15. Cybersecurity — a sellable service, or a build standard applied to A1–A6?
16. Why did the earlier positioning stop? Deliberate pivot, market response, or capacity?

### Group 5 — Commercial framing
17. Is the local-commercial side still the primary revenue engine, and should it stay the site's dominant story?
18. Should the two audiences see the **same brand**, or does the technical side warrant a distinct section, subdomain, or separate entity?
19. Is the $2,500 floor acceptable to publish if technical/government buyers also read the site?
20. Is "software development" the label you'd use commercially, or would "systems engineering," "custom software," or "technical services" fit better?

### Group 6 — Registration hygiene
21. What is the current **UEI**, and is the SAM registration active with a current expiry?
22. Should the site continue publishing a DUNS?

---

## 7. Architecture implications — *not* an architecture decision

What the inventory constrains, without choosing:

**I1 — F7 was under-scoped, and it is still blocked.** "Should `/services/` split into six URLs?" assumed one audience. The inventory shows that question sits inside a larger one: how many *commercial surfaces* does this company need? F7 remains blocked — now on the §6 owner answers as well as on `/services/` GSC intent data.

**I2 — Any Side B architecture is gated on Group 2, not on Google.** Search evidence establishes that the subject exists and that the domain has residual authority for it. It says nothing about capacity, delivery, or intent. Building a Government & Technology hub the company cannot staff is worse than building nothing.

**I3 — The realistic shapes, with their triggering conditions:**

| Shape | Trigger condition | Cost of being wrong |
|---|---|---|
| **Status quo + honest credential section** — keep six services, strengthen `/company/#government` | Technical work is opportunistic/rare; Ellen is the only resource | Continues to withhold half the company from search; low downside |
| **Second commercial surface** — a Technology/Government hub as a sibling to `/services/` | Technical work is actively sold, has delivery capacity, and has nameable past performance | Over-claims capacity; splits an already-thin site; two half-built stories |
| **Two-audience site architecture** — explicit audience fork above the service layer | Both lines are material revenue with distinct buyers and proof | Largest build; dilutes the local brand if the technical side is thin |
| **Separate entity/domain** | The technical side is genuinely a different business with different buyers and different compliance posture | Abandons the existing domain authority Google is already granting for exactly these queries |

**I4 — The proof layer is the real constraint, not the URL layer.** A Government & Technology hub with no past performance is a page that *reduces* trust with Audience 2. Sequence is: capability statement → nameable past performance → conversion path → *then* URLs.

**I5 — The legacy URL becomes more valuable, not less.** `/?page_id=158` is currently the only asset on the domain with position-1 visibility for the technical identity. **Nothing should be done to it** — no redirect, no canonical change, no removal — until the destination it would eventually point at is decided. Confirming F8/F10 stay frozen.

**I6 — Two items sit on the seam and must be resolved before any split.** A5 (Business Automation, containing "custom internal tooling" and integrations — 541511 territory) and A6 (Ongoing Support, containing hosting/monitoring/backups — 541513 territory). Whatever architecture is chosen, these two either bridge the sides or get split across them.

**I7 — B4 (IT services) points at the *local* market, not the federal one.** `it companies near me` and `it services companies near me` are local-intent queries. If B4 is real, its natural home is Audience 1, not a government hub. That would make it a **seventh local service**, not part of Side B — a materially different conclusion from the one the two-identity framing suggests.

**I8 — Registration hygiene is a prerequisite, not a follow-up.** The DUNS/UEI gap and the missing marketing NAICS codes undercut Audience 2 credibility regardless of which architecture is chosen, and they are cheap to fix.

---

## 8. Recommended next research step

**Do not proceed to architecture. Two evidence gathering steps, in this order.**

### Step 1 (highest value, fastest, independent of both prior sources) — pull the authoritative SAM.gov entity record

Retrieve the live registration for CAGE 897W0 and capture: UEI, registration status and expiry, **the complete NAICS list** (including any not published on the site), PSC codes, socio-economic certifications, and any award history.

This is the only Class B source that is authoritative rather than self-reported, and it answers Q3, Q4, Q5, Q13, Q21, and Q22 without an interview. It will show directly whether 541511-primary is a deliberate current position or a legacy artifact — which is the hinge of the whole question.

### Step 2 (blocking, cannot be substituted) — a structured owner interview against §6

Groups 1, 2, and 4 are the blocking ones: **what is actually sold, who can deliver it, and which historical disciplines are still live.** Roughly 30–45 minutes. Nothing in Side B architecture can be responsibly decided without Group 2 in particular.

### Explicitly deferred until both steps are complete
- All architecture decisions, including F7
- Any new page, hub, or section
- Any change to `/services/`
- Any change to `/?page_id=158` (F8/F10) — **still frozen, and now more clearly worth preserving**
- Keyword/demand research for Side B — premature until the service list is real. (Worth flagging now: MBSE, DoDAF, and requirements-engineering demand is likely near-zero in organic search; those disciplines are won through SAM, teaming, and capability statements, not SEO. B4 is the opposite case.)
- Robots/F11, favicon, and all other open backlog items — unaffected by this inventory

---

## 9. Summary

Cozelos Data is registered, credentialed, and historically positioned as a software and systems engineering firm, and is currently sold as a local digital marketing agency. Both are real. Google is ranking the older identity, at position 1, on a URL that no longer resolves to a page about it.

The site does not present two identities badly — **it presents one and withholds the other.** The withheld half is the half the federal registration names as primary.

What is missing is not analysis. It is three facts only the owner holds: **what is actually sold today, who can deliver it, and what past performance can be named.** Until those exist, any URL architecture would be built on the search index rather than on the business — which is precisely the failure mode this inventory was commissioned to avoid.
