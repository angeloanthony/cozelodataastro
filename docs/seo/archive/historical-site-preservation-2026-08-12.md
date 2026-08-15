# Historical Site Preservation — Cozelos Data

**Captured:** 2026-08-12 · **Method:** Wayback Machine (`web.archive.org`), raw `id_` captures
**Raw HTML preserved in:** [docs/seo/archive/](.) — 14 files, source of every quotation below
**Status:** Read-only research. No source files modified, no redirects, nothing committed.

This was commissioned as evidence preservation for `?page_id=262` before Google recrawls it. It found far more: **three prior generations of the business**, a live-then-discontinued software product, and a staffed company in another state.

---

## 0. The four eras

| Era | Dates | Location | What the company was |
|---|---|---|---|
| **1** | ≤2019 | **Huntsville, AL** — 3322 S. Memorial Pkwy SW, Ste 640 · (256) 650-3999 | Data Management & Analytics firm, **with employees**. Three services: Data Management, Managed IT Services, IT Staff |
| **2** | 2020–2021 | Huntsville, AL — Ste 621 | WordPress rebuild. Services narrowed to Data Management + **App Development**. **Perseus** promoted to top-level nav |
| **3** | 2022–mid-2025 | **Vernal, UT** — 431 E Main St Ste 201 (current address) | H1: *"Needing Expert Software Engineers?"* Software Engineering · Cyber Security · Artificial Neuron Networks. Nav: Home, 1908 Living, PerseusDB, Contact (`158`), Company (`262`) |
| **4** | mid-2025 → now | Vernal, UT | Astro marketing site. Six local digital services |

**The company did not begin in Vernal.** It relocated. The "Huntsville to Eastern Utah" line on [company.astro:171](../../src/pages/company.astro#L171) describes a *corporate* move, not just a personal one.

---

## 1. `?page_id=262` — preserved

**Confirmed identity:** the WordPress **Company Profile** page. Era-1 original below; the Era-3 version was the same text with "Huntsville, Alabama" swapped for "Vernal, Utah" — which is the version still in Google's index.

> **Company Profile**
>
> Cozelos Data (DUNS 059220399, CAGE Code 897W0) is a Woman-Owned Small Business (WOSB) based in Huntsville, Alabama and dedicated to quality Data Management Services, competitive prices, and ethical business practices.
>
> **Expertise** — We specialize in making data work for you.
>
> Cozelos Data provides data solutions and custom programming to organizations with a dependency on data to run their operations. Our services include Data Management covering analysis, solution development, programming, installation, and maintenance of data systems. We deliver an array of creative solutions to address our client's information management challenges.
>
> Our **Data Management Services** include developing, implementing and maintaining data solutions to streamline processes, improve data availability, and accelerate the time to information… Our unique solution set, called **MASTERMIND**, is our application of this approach.
>
> Our **Managed IT Services** provides varying levels of support to a customer's IT infrastructure and/or end-user systems on a proactive basis…
>
> **Core Attributes:** Integrity, Excellence, Responsiveness, Service, Reliability
> **Mission:** To improve our client's data systems and processes while reducing administrative burdens for the purpose of increasing their opportunity for success.

Preserved: [raw_profile.html](raw_profile.html)

## 2. `?page_id=866` — NOT identified

Not recoverable. It appears in **no** archived navigation (checked 2022, 2024-06, 2024-09, 2025-01 snapshots — every one lists only `158` and `262`), has no Wayback capture, and returns nothing in Google.

It was an **unlinked WordPress page**, which is why it never appeared in any crawl. Yet it holds **46 impressions at position 2.74** in GSC.

**Two ways to recover it, both requiring access we don't have here:**
1. **GSC URL Inspection** on `https://cozelosdata.com/?page_id=866` — shows Google's last crawl and may reveal the indexed title.
2. **The old WordPress install** — if a database backup or the Bluehost account still exists, `wp_posts` ID 866 gives the answer immediately.

Recommend adding to the backlog. It is the last unidentified piece of the legacy footprint.

---

## 3. Era 1 (2019) — the business in full

### Data Management
> Data management is the practice of organizing and maintaining data systems and processes to meet ongoing information lifecycle needs… **We deliver high value custom software development projects that help your organization run better.**
>
> From **database design** to **web application development** or **software product development**, we have the expertise to build your next data solution.

Six specialisms: **Data Capture · Data Integration · Data Quality · Data Security · Master Data Management · Data Governance & Compliance**

A five-phase delivery lifecycle with client sign-off gates — **Assess → Design → Build → Install → Maintain** — with "Maintain" sold explicitly as **a subscription**: system audit, patches and updates, backup and recovery, security maintenance, continuity of operations. Payment terms stated: remaining 50% due on acceptance.

### Managed IT Services
> We manage our clients' IT services for a **flat-rate fee**… Our goal is 100% up time… we are available **24/7**… **We are local** so you know you can reach us any time and our experts can get to your location quickly when a physical presence is required.

Eighteen line items: 24/7 Help Desk · Unplanned fixes · Desktop and Laptop Support · Server Support · Remote or On-site Support · Remote Monitoring · Network Support · **Cybersecurity** · As Needed Support · Software License Management · Backup and Recovery · Business Virus Removal and Prevention · Microsoft Windows Management · Mobility Solutions · **IT Staffing Services** · IT Consulting · **Disaster Recovery & Business Continuity** · Infrastructure Assessments

### IT Staff
> We deliver expertise when you need it! You may need help expanding your network, verifying cybersecurity practices, ensuring compliance, implementing patch management, or any other IT related task. **We have the people who can help.**

Staff augmentation for short-term technical needs.

### The 2019 homepage
> **Making Businesses Stronger & Life Better**
>
> We are the **database and data analytics company** that takes the word "custom" to the highest echelon. **From 5 to 500 employees**, Cozelos Data sets the standard for performance, reliability and R.O.I. No other company designs custom databases and IT solutions like we do.
>
> …Once you see how we can help your business, you will be **Zealous for Co-zelos**

**The current site's philosophy line — "Making Businesses Stronger. Making Life Better." — is the 2019 tagline, unchanged.** It is the single thread running through all four eras.

Preserved: [raw_data-management.html](raw_data-management.html) · [raw_it-services.html](raw_it-services.html) · [raw_it-staff.html](raw_it-staff.html) · [raw_services2019.html](raw_services2019.html) · [raw_home2019.html](raw_home2019.html)

---

## 4. Era 1 had employees — the capacity question, answered historically

This is the most decision-relevant find, because Group 2 of the inventory asked "who delivers it?"

The 2019 **Careers** page was recruiting for:

- SQL-Server Database Developers
- SQL-Server Database Administrators
- Visual Basic and C# Programmers
- Microsoft Certified Technicians
- **Cyber Security Technicians**
- *(and, in a joke that confirms a real page rather than a stub, "Pilots who can Make the Kessel Run in 12 Parsecs")*

With a full benefits package: **Paid Time Off · Holidays · Medical · Dental · Vision · 401(k) · Life · Disability**, plus flexible schedules and remote work.

The site header carried an **employee portal**: *Time and Expense · Intranet · Web Mail · Retirement*.

> Cozelos is a **locally owned and operated Data Management and Analytics company** committed to the success of our clients, **our employees** and our community.

A 401(k), a retirement portal, and a time-and-expense system are not solo-operator infrastructure. **In 2019 this was a staffed firm.** Whether it still is, is exactly what Ellen must answer — but "who delivers it?" has a documented historical answer: *a team, on a Microsoft/SQL Server data stack.*

Preserved: [raw_careers.html](raw_careers.html)

---

## 5. The founder's documented credentials — and a discrepancy to resolve

The 2019 **Leaders** page:

> Cozelos Data is founded by President and CEO, **Ellen Cozelos**, a 20-year veteran of supporting and leading the development of **large, complex data systems as a contractor to the federal government including the U.S. Army, NASA, and Army Corps of Engineers**. She contributed as a **Database Developer, Software Engineer, Task Lead, and Project Lead**. She has a **Bachelor of Science degree in Computer Science from Columbia University** and a **Bachelor of Science degree in Economics from the University of Alabama in Huntsville**.

### ⚠️ Two items needing confirmation before any further use

**1. Degree level.** The 2019 page says **Bachelor of Science** from Columbia. The current site says **Master's degree** — on [company.astro:61](../../src/pages/company.astro#L61), [ellen-cozelos.astro:180](../../src/pages/ellen-cozelos.astro#L180), the meta description, and in `Person` schema `alumniOf` ([ellen-cozelos.astro:97](../../src/pages/ellen-cozelos.astro#L97)).

Seven years separate the two, so a Master's earned since 2019 is entirely plausible. **This is not a claim that the current site is wrong** — it is a flag that a credential is asserted in machine-readable structured data on pages aimed at government buyers, and the only prior public record says something different. It needs a yes/no from Ellen, and the UAH Economics degree is currently unmentioned anywhere.

**2. The story has drifted from its stronger version.** The current site says "NASA and Department of Defense… aerospace." The documented record says **U.S. Army, NASA, and Army Corps of Engineers — federal data systems**, in named roles.

The documented version is *more specific, more verifiable, and better matched to the NAICS codes* than the current generic aerospace framing. The rebrand traded a defensible, checkable claim for a vaguer, grander one.

Preserved: [raw_leaders.html](raw_leaders.html)

---

## 6. NAICS 513210 was real — and the product is now dead

The nav item **PerseusDB** pointed off-domain to `www.iamastermind.com`. Archived, it is a genuine commercial SaaS product:

> **PerseusDB — The Virtual Assistant to Independent Insurance Agents**
> EVERYTHING You Need to Better Run Your Business · **The Next Evolution of I.A. MASTERMIND**
> Track Projected Residual Income · Automatic Alerts · Information of All Your Policies at your Fingertips
> Sign up NOW for a FREE 14-day trial!
> **Monthly $29.95 · Yearly $359.99** — "You will be redirected to **Stripe**, our secure third party vendor."

With three named customer testimonials (Sandra G., 30 years in industry; Matthew A., 10 years of management; Ted H., 7 years in industry).

The archived asset manifest shows `amazon-cognito-auth.min.js` and `amazon-cognito-identity.min.js` — **AWS Cognito authentication**. This was a real multi-tenant application with accounts and subscription billing, not a brochure page.

**So the lineage is: MASTERMIND (2019 solution set) → PerseusDB (productised SaaS for insurance agents).** That is NAICS **513210 Software Publishers**, and it resolves the last "UNSUPPORTED" row in the business inventory.

**It is now gone.** `iamastermind.com` no longer resolves (DNS failure). Wayback captures from **2025-07-11/12** show the domain serving parking-page assets (`def-promo-domains.png`, `def-promo-hosting.png`, `def-promo-ssl.png`) — the domain lapsed and went to a reseller parking page around **July 2025**, roughly when the marketing rebrand landed.

Preserved: [mastermind2020.html](mastermind2020.html)

### Also found on the Era-3 homepage
An outbound link to **`https://www.oracle.com/partner/`** — an Oracle partner affiliation. Not mentioned anywhere on the current site. Worth confirming whether it is current.

### `1908 Living`
`1908living.com` is live and returns *"1908 Living — Coming Soon… Because Grandma's Recipes Didn't Need Labels—Just Love."* A separate food/lifestyle venture, unrelated to either identity. Noted only so it isn't mistaken for a business line.

---

## 7. Era 3 (2022–mid-2025) — full service text, preserved

> **Needing Expert Software Engineers?**
>
> Cozelos Data offers customized web and app development solutions **for enterprises** and also provides Cyber Security services. Our team excels in analytical problem-solving…

**Software Engineering** — Model-Based Systems and Software Engineering (MBSE) · Real-Time Embedded Software Development · Requirements Engineering · System and Software Architecture Design, Development, Integration, and Deployment · **DoDAF/UPDM** Architecture Development and Modeling · Information Technology (IT) Engineering · Custom Digital Design · Integrated Logistics Support and Asset Management · Database Design and Implementation · Multicore Processor Applications · Agile

**Cyber Security** — "a wide range of Cyber Security/Information Assurance **services and products**" · design, architecture, development, implementation and upgrade support for **large databases** · data integrity, data collection, data cleansing, migration of Enterprise data across multiple domains. Named products/offers:
- **Cyber Range-in-the-Box (RIB) Products**
- Cyber Security Risk Management for **DoD Tactical and Enterprise IT Systems**
- Enterprise IT Systems **Risk Management Framework (RMF) / Cybersecurity Maturity Model Certification (CMMC)**

**Artificial Neuron Networks** — "Cozelos excels in developing, training, and building Artificial Neural Networks (ANNs)…"

Note that **RMF and CMMC are specific, credentialed DoD compliance practices**, and **Cyber Range-in-the-Box is a named product**. This is a materially more concrete cybersecurity offering than the inventory's B6 row assumed.

Preserved: [raw_home2025.html](raw_home2025.html)

---

## 8. What this settles

### The pivotal question is answered — with a correction

The hypothesis was: *are Business Automation and Ongoing Support the data-management practice re-labelled for a local buyer?*

**Yes — with lineage now traceable.** But the honest finding is stronger than "re-labelled":

| Era 1–3 offering | What survives today | Verdict |
|---|---|---|
| Managed IT Services — 18 line items, 24/7 helpdesk, DR/BC, network, on-site | **Ongoing Support** — 5 items, website-scoped, $295/mo | **Reduced ~4:1**, not renamed |
| Data Management — custom software, database design, web app development, MDM, governance | **Business Automation** — CRM integrations, "custom internal tooling" | **Reduced**, and de-skilled in the copy |
| IT Staff — staff augmentation | *nothing* | **Dropped** |
| MASTERMIND → PerseusDB (SaaS, Stripe, Cognito) | *nothing — domain dead* | **Discontinued ~July 2025** |
| Software Engineering (MBSE, DoDAF, RMF/CMMC, embedded) | *nothing* | **Dropped** |
| Cyber Range-in-the-Box, RMF/CMMC | *nothing* | **Dropped** |

So the site did not merely compress a sophisticated practice into consumer labels. **It discontinued most of it and kept the maintenance tail.** Whether that reflects a deliberate strategic exit or an incomplete rebrand is the single question that determines everything downstream — and only Ellen can answer it.

### Revisions to the business inventory

- **B5 (Software Publishers, 513210)** — was "UNSUPPORTED". Now **HISTORICAL, with a real named product** (MASTERMIND → PerseusDB), discontinued ~July 2025.
- **B4 (IT services / facilities management, 541513)** — was "CREDENTIALED, weakly". Now **strongly HISTORICAL**: a fully-specified 18-item managed-IT offering, sold flat-rate, explicitly *local*. This substantially supports the "seventh local service" reading — the `it companies near me` queries have a real, local, previously-sold business behind them.
- **B6 (Cybersecurity)** — was "HISTORICAL + CAPABILITY-CLAIMED", scope unknown. Now **specified**: RMF, CMMC, Information Assurance, Cyber Range-in-the-Box, DoD tactical/enterprise risk management.
- **B2/B3 (MBSE, DoDAF, embedded)** — confirmed as marketed offerings in Era 3, not merely career provenance.
- **Capacity** — historically a staffed firm with a Microsoft/SQL Server team, benefits, and an employee portal.

### And it sharpens the identity finding once more

The second identity is not "IT," not "defense software engineering," and not only "data management." Across all three prior eras it was consistently:

> **A federal-heritage data-systems firm that sold custom data/software development, managed IT, technical staffing, and its own SaaS product — first in Huntsville, then in Vernal.**

Every NAICS code maps. The company name maps. The GSC queries map — including `data center companies` and `computer networks`, which were never noise.

---

## 9. Open items

| Item | Status |
|---|---|
| `?page_id=866` | **Unidentified.** Recover via GSC URL Inspection or the old WordPress database |
| Columbia degree level (BS vs MS) | **Needs Ellen's confirmation** — asserted in `Person` schema |
| Oracle Partner status | Linked in Era 3; **unverified today** |
| PerseusDB | Domain dead since ~July 2025 — **was it sold, sunset, or abandoned?** |
| UAH Economics degree | Documented in 2019, absent from current site |
| Current employee/contractor count | Unknown — historically a staffed firm |

All frozen as before: `/services/`, `?page_id=158`, `?page_id=262`, `?page_id=866`, canonicals, robots, favicon, and every architecture decision including F7.
