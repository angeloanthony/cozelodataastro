/**
 * Central content source for Cozelos Data.
 * Editing copy, services, portfolio items, or contact details here updates the
 * entire site. Keeps pages declarative and makes the codebase easy to maintain.
 */

export const site = {
  name: "Cozelos Data",
  legalName: "Cozelos Data",
  tagline:
    "Everything Your Business Needs to Look Professional Online—and Be Found",
  description:
    "Premium digital agency in Vernal, Utah. Custom websites, SEO, video production, advertising, branding, and business automation built to grow local and government businesses.",
  url: "https://cozelosdata.com",
  phone: "(435) 219-5120",
  phoneHref: "tel:+14352195120",
  email: "ellen.cozelos@cozelosdata.com",
  emailHref: "mailto:ellen.cozelos@cozelosdata.com",
  smsHref: "sms:+14352195120",
  // Stripe-hosted Payment Link (Stripe Dashboard → Payments → Payment Links → Create).
  // Paste the full https://buy.stripe.com/... URL here. Leave "" to fall back to
  // the "request a link by email" button. Stripe account: acct_1FW1bTIMRuSrokBY.
  stripePaymentLink: "https://buy.stripe.com/6oU14ocQQ59M0RZ5HObQY03",
  address: {
    street: "431 East Main St. Suite 201",
    city: "Vernal",
    region: "UT",
    regionFull: "Utah",
    postal: "84078",
    country: "US",
  },
  geo: { latitude: 40.4555, longitude: -109.5287 },
  hours: "Mon–Fri · 9:00 AM – 5:00 PM MT",
  founder: "Ellen Cozelos",
  credentials: {
    wosb: "Woman-Owned Small Business (WOSB)",
    duns: "059220399",
    cage: "897W0",
    naics: ["513210", "541511", "541512", "541513"],
  },
  social: {
    // Placeholder handles — update when live profiles are created.
    facebook: "https://www.facebook.com/cozelosdata",
    instagram: "https://www.instagram.com/cozelosdata",
    linkedin: "https://www.linkedin.com/company/cozelosdata",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Why Us", href: "/why-cozelos-data/" },
  { label: "Investment", href: "/pricing/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Company", href: "/company/" },
  { label: "Contact", href: "/contact/" },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 40, suffix: "+", label: "Websites Built" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 35, suffix: "+", label: "Businesses Served" },
  { value: 120, suffix: "+", label: "Projects Completed" },
];

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  problem: string;
  why: string;
  results: string;
  value: string;
  benefits: string[];
  process: string[];
  deliverables: string[];
  icon: string; // key into the Icon component
  image?: string; // optional path under src/assets (falls back to icon tile)
  reelVideoId?: string; // optional YouTube ID — when set, a full-width video reel replaces the visible text (text stays in DOM for SEO)
  cta: string;
};

export const services: Service[] = [
  {
    slug: "website-design",
    index: "01",
    title: "Website Design & Development",
    short: "Custom, cinematic websites engineered to convert.",
    problem:
      "Your website is your hardest-working employee — the first impression, the sales pitch, and the storefront all at once. A slow, generic template quietly turns away the customers you paid to attract, costing you leads you never even knew you had.",
    why: "We design and build custom websites in Vernal, Utah — engineered by hand, mobile-first, and optimized for search from the first line of code. Every page loads in under a second and is built around the exact moment a visitor decides to call, fill out a form, or buy.",
    results:
      "More qualified leads, higher conversion rates, and a professional online presence that finally reflects the quality of your work — so the businesses that find you take you seriously.",
    value:
      "A fast, custom website is an appreciating asset. It keeps ranking, converting, and earning trust for years — needing fewer rebuilds and less maintenance than the cheap template it replaced.",
    benefits: [
      "Fully custom design — never a template",
      "Mobile-first, responsive on every screen",
      "Sub-second load times",
      "Conversion-optimized copy and layout",
      "Hosting, domain, and launch support included",
      "Accessible to WCAG 2.1 AA standards",
    ],
    process: [
      "Discovery call & goals",
      "Wireframe & design approval",
      "Hand-built development",
      "Review & content polish",
      "Launch & analytics setup",
    ],
    deliverables: [
      "Production website",
      "Source code (you own it)",
      "Analytics dashboard",
      "Launch + handoff documentation",
    ],
    icon: "browser",
    image: "services/web-development.webp",
    reelVideoId: "ApGH3skklec",
    cta: "Starting at $2,500",
  },
  {
    slug: "video-production",
    index: "02",
    title: "Video Production",
    short: "Cinematic video that elevates your brand on every platform.",
    problem:
      "Photos can't capture the energy, scale, and credibility of your business — and in a feed full of competitors, static images get scrolled past in under a second.",
    why: "Our video production team in Vernal, Utah films cinematic brand films, 4K aerial drone footage, and vertical reels built for Instagram, TikTok, and YouTube — color-graded, sound-designed, and optimized for the web.",
    results:
      "Higher engagement, stronger brand recall, and content that makes a local business look established and premium across your website, ads, and social channels.",
    value:
      "Professional video is a library of assets you own and reuse for years — fueling ads, landing pages, and social content long after the shoot, compounding your brand's authority every time it's seen.",
    benefits: [
      "4K aerial drone footage",
      "On-location filming",
      "Cinematic color grading",
      "Vertical & horizontal cuts",
      "Sound design and licensed music",
      "Web-optimized exports",
    ],
    process: [
      "Creative brief",
      "Shot list & scheduling",
      "Filming day",
      "Edit & color grade",
      "Delivery in every format",
    ],
    deliverables: [
      "Hero brand film",
      "Social-ready vertical cuts",
      "Raw + graded footage",
      "Platform-optimized exports",
    ],
    icon: "video",
    image: "services/video-production.webp",
    cta: "Get a Video Quote",
  },
  {
    slug: "online-marketing",
    index: "03",
    title: "Online Marketing",
    short: "Paid traffic and social content that actually converts.",
    problem:
      "Most ad budgets quietly leak money — wrong audiences, no tracking, and a homepage that was never built to convert clicks into customers.",
    why: "We build the full funnel: Google Ads and Meta (Facebook & Instagram) campaigns, conversion-focused landing pages, pixel tracking, and relentless A/B testing — then scale only the campaigns that actually produce leads.",
    results:
      "A lower cost per lead, a predictable pipeline of new customers, and marketing spend you can finally measure to the dollar.",
    value:
      "Over time, a tuned acquisition system becomes a growth engine you can turn up on demand — turning advertising from a gamble into a reliable, repeatable source of revenue.",
    benefits: [
      "Meta & Google Ads management",
      "YouTube ad campaigns",
      "Conversion pixel setup",
      "A/B creative testing",
      "Audience targeting & retargeting",
      "Monthly performance reports",
    ],
    process: [
      "Account & goals audit",
      "Creative & landing page build",
      "Pixel & tracking setup",
      "Launch & A/B testing",
      "Scale the winners",
    ],
    deliverables: [
      "Campaign creative",
      "Conversion landing page",
      "Tracking configuration",
      "Monthly reporting",
    ],
    icon: "target",
    image: "services/marketing.webp",
    cta: "Request Strategy Call",
  },
  {
    slug: "seo",
    index: "04",
    title: "SEO Optimization",
    short: "Be found by the customers already searching for you.",
    problem:
      "A beautiful website is invisible if it doesn't rank. Most sites are never indexed properly, never structured for AI search, and never appear when local customers in the Uintah Basin search for what you sell.",
    why: "We engineer search engine optimization from the ground up — pillar-and-spoke content architecture, JSON-LD schema, local SEO, Google Business Profile tuning, and llms.txt so Google, ChatGPT, and Claude all understand exactly what you offer.",
    results:
      "Meaningful ranking improvement within 60–90 days, more qualified organic traffic, and a steady stream of customers who were already searching for you — at no cost per click.",
    value:
      "Unlike paid ads, SEO compounds. Every page and citation you earn keeps working for years, building a durable moat of organic visibility that competitors can't simply outspend.",
    benefits: [
      "Pillar & spoke content architecture",
      "JSON-LD schema graphs",
      "AI search optimization (llms.txt)",
      "Google Business Profile tuning",
      "Split sitemap indexes",
      "Monthly ranking reports",
    ],
    process: [
      "Technical & content audit",
      "Keyword & topic mapping",
      "On-page & schema buildout",
      "Local & AI search setup",
      "Ongoing reporting",
    ],
    deliverables: [
      "Technical SEO fixes",
      "Schema & sitemap implementation",
      "Content architecture plan",
      "Monthly ranking report",
    ],
    icon: "search",
    image: "services/seo.webp",
    cta: "Request SEO Audit",
  },
  {
    slug: "business-automation",
    index: "05",
    title: "Business Automation",
    short: "AI and automation that give you hours back every week.",
    problem:
      "Manual scheduling, follow-ups, and data entry quietly drain the hours you should spend growing the business — and every slow reply is a lead that goes cold.",
    why: "We connect your tools, add AI assistants and chatbots, and automate the repetitive work — instant lead responses, automated scheduling and reminders, CRM integrations, and invoice workflows tailored to how your business actually runs.",
    results:
      "Faster response times, fewer missed leads, and a team freed from busywork to focus on customers and revenue.",
    value:
      "Automation is leverage that compounds: as you grow, the systems scale with you — handling more volume without more overhead, so profit isn't eaten up by headcount.",
    benefits: [
      "AI chat & lead capture",
      "Automated scheduling & reminders",
      "CRM & data integrations",
      "Document & invoice automation",
      "Workflow connectors",
      "Custom internal tooling",
    ],
    process: [
      "Workflow mapping",
      "Tool & data audit",
      "Automation build",
      "Testing & training",
      "Handoff & support",
    ],
    deliverables: [
      "Automated workflows",
      "AI assistant setup",
      "Integration documentation",
      "Team training session",
    ],
    icon: "bolt",
    image: "services/automation.webp",
    cta: "Explore Automation",
  },
  {
    slug: "ongoing-support",
    index: "06",
    title: "Ongoing Support & Maintenance",
    short: "We keep your site fast, secure, and improving every quarter.",
    problem:
      "Most websites are built once and maintained by no one — slowly breaking, slowing down, and quietly falling out of Google's rankings until they need an expensive rebuild.",
    why: "Our website maintenance plan keeps your site fast, secure, and improving — security monitoring, daily backups, performance tuning, content updates, and uptime monitoring handled for you, every month.",
    results:
      "Reliable uptime, compounding SEO, and the peace of mind that your digital asset keeps getting better — without surprise invoices or technical headaches.",
    value:
      "A maintained website appreciates instead of decaying. Quarter over quarter it gets faster, ranks higher, and outlasts the competitors who let theirs rot — protecting the investment you made.",
    benefits: [
      "Monthly content updates",
      "Security monitoring",
      "Daily backups",
      "Performance optimization",
      "Uptime monitoring",
      "Priority technical support",
    ],
    process: [
      "Onboarding & access",
      "Baseline performance audit",
      "Monthly update cadence",
      "Quarterly optimization",
      "Priority support",
    ],
    deliverables: [
      "Monthly maintenance",
      "Backup & security monitoring",
      "Quarterly performance report",
      "Priority support channel",
    ],
    icon: "shield",
    image: "services/ongoing-support.webp",
    cta: "View Maintenance Plan",
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  /** Short, plain-English subtitle for homepage teaser cards. Falls back to `summary`. */
  tagline?: string;
  overview: string;
  /** Business-transformation case-study fields (Technologies = `stack`). */
  challenge: string;
  strategy: string;
  solution: string;
  outcome: string;
  businessImpact: string;
  services: string[];
  stack: string[];
  results: { metric: string; label: string }[];
  accent: string; // hex used for the card's glow / gradient
  image?: string; // optional path under src/assets (falls back to gradient mock)
  liveUrl?: string; // live client website the case-study button links to
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "forebear-find",
    name: "Forebear Find",
    category: "Genealogy",
    summary: "Italian genealogy & dual citizenship research service.",
    tagline: "Italian Genealogy & Dual Citizenship",
    overview:
      "A bilingual (English / Italian) research firm specializing in Italian jure sanguinis citizenship and vital record retrieval. We built a 30+ page pillar-and-spoke site mapping geographic and regional service areas, with structured data and AI search optimization throughout.",
    services: ["Website Design", "SEO", "Content Architecture", "Maintenance"],
    stack: ["Hand-built HTML/CSS", "JSON-LD Schema", "Hub & Spoke SEO", "llms.txt"],
    results: [
      { metric: "30+", label: "Indexed Pages" },
      { metric: "EN/IT", label: "Bilingual Build" },
      { metric: "<1s", label: "Load Time" },
    ],
    challenge:
      "A specialized Italian genealogy and dual-citizenship firm had deep expertise but almost no online visibility — and needed to look credible to clients across two languages and two countries.",
    strategy:
      "Position the firm as the authority on Italian jure sanguinis citizenship by mapping every region and service into a pillar-and-spoke content architecture that ranks in both English and Italian.",
    solution:
      "A hand-built, 30+ page bilingual site with structured data, regional service pages, and AI-search optimization throughout — fast, polished, and effortless to navigate in either language.",
    outcome:
      "30+ pages indexed across two languages, sub-second load times, and a presence that finally matches the firm's expertise.",
    businessImpact:
      "Forebear Find now attracts qualified, ready-to-hire clients from organic search in both markets — turning a word-of-mouth practice into a discoverable, trusted brand.",
    accent: "#B91C1C",
    image: "portfolio/forebear-find.webp",
    liveUrl: "https://forebearfind.com",
    featured: true,
  },
  {
    slug: "parkingway-it",
    name: "ParkingWay.it",
    category: "Parking Management",
    summary: "Modern parking management platform and business website.",
    tagline: "Parking Management Platform",
    overview:
      "A parking management platform designed to streamline reservations, customer communications, and parking operations. Built with a modern user experience, responsive design, and SEO-focused architecture.",
    services: ["Website Design", "SEO", "Business Automation"],
    stack: ["Responsive Design", "Booking System", "Automation"],
    results: [
      { metric: "24/7", label: "Online Access" },
      { metric: "Mobile", label: "Optimized" },
      { metric: "SEO", label: "Ready" },
    ],
    challenge:
      "A growing parking operation was managing reservations and customer communication by hand, with no central platform and a website that couldn't scale.",
    strategy:
      "Replace the manual workflow with a streamlined booking-and-management platform, wrapped in a modern, SEO-ready site that earns trust at first glance.",
    solution:
      "A responsive parking-management platform with online reservations, automated customer communications, and a clean, conversion-focused interface.",
    outcome:
      "24/7 online booking, a fully mobile-optimized experience, and an SEO-ready foundation built to grow.",
    businessImpact:
      "Customers now reserve and manage parking around the clock without a phone call — cutting manual work and capturing the bookings the old site quietly lost.",
    accent: "#0F766E",
    image: "portfolio/parkingway.webp",
    liveUrl: "https://parkingway.it",
    featured: true,
  },
  {
    slug: "adventure-tours-vernal",
    name: "Adventure Tours Vernal",
    category: "Local Business",
    summary: "Pillar architecture · 30+ pages · UTV tour booking system.",
    overview:
      "A guided UTV tour operator running on a 30+ page pillar architecture with an online booking flow built around their fleet, pricing, and trail experiences.",
    services: ["Website Design", "SEO", "Booking System"],
    stack: ["Pillar Architecture", "Booking Flow", "Local SEO"],
    results: [
      { metric: "30+", label: "Pages" },
      { metric: "Booking", label: "System" },
      { metric: "Local #1", label: "Search Goal" },
    ],
    challenge:
      "A guided UTV tour operator relied on phone calls and walk-ins, with a thin website that didn't rank for the high-intent searches travelers were making.",
    strategy:
      "Own local search for UTV and off-road tours around Vernal by building deep, trail-by-trail content and a frictionless path to booking.",
    solution:
      "A 30+ page pillar-architecture site organized around the fleet, pricing, and trail experiences, with an online booking flow and full local SEO.",
    outcome:
      "30+ pages targeting local search, an integrated booking system, and a build aimed squarely at the #1 local ranking.",
    businessImpact:
      "More tours booked online instead of over the phone, and a discoverable brand that captures travelers the moment they search — before they find a competitor.",
    accent: "#B45309",
    image: "portfolio/adventuretour.webp",        // ← Added
    liveUrl: "https://adventuretoursvernal.com",
  },
  {
    slug: "best-western-vernal-inn",
    name: "Best Western Vernal Inn",
    category: "Hospitality",
    summary: "Cinematic Ken Burns hero · canonical SEO rebuild.",
    tagline: "Hotel Website & Direct Bookings",
    overview:
      "A hospitality rebuild featuring a cinematic Ken Burns hero, a clean canonical SEO structure, and a rates presentation engineered for direct bookings.",
    services: ["Website Design", "SEO", "Maintenance"],
    stack: ["Cinematic Hero", "Canonical SEO", "Rates Table"],
    results: [
      { metric: "Cinematic", label: "Hero" },
      { metric: "Canonical", label: "SEO Rebuild" },
      { metric: "Direct", label: "Bookings" },
    ],
    challenge:
      "A hotel was losing direct bookings to online travel agencies and running on a dated site that didn't reflect the quality of the property.",
    strategy:
      "Win back direct bookings with a cinematic first impression and a clean, canonical SEO structure that ranks the hotel for its own name and market.",
    solution:
      "A hospitality rebuild featuring a cinematic Ken Burns hero, a canonical SEO architecture, and a rates presentation engineered to drive direct reservations.",
    outcome:
      "A cinematic, high-trust presence, a clean canonical SEO rebuild, and a direct-booking-focused rates experience.",
    businessImpact:
      "Guests booking direct means higher margins per stay and less dependence on third-party commissions — value that compounds every season.",
    accent: "#1D4ED8",
    image: "portfolio/best-western.webp",
    liveUrl: "https://bestwesternvernalinn.com",
    featured: true,
  },
  {
    slug: "vernal-medicare",
    name: "Vernal Medicare",
    category: "Healthcare",
    summary: "27 SEO pages · 5-phase rollout · CMS compliance.",
    tagline: "Medicare Insurance Practice",
    overview:
      "A licensed Medicare insurance practice built on a split-sitemap architecture across 27+ SEO pages, with CMS compliance baked into every page and an AEP anchor calendar.",
    services: ["Website Design", "SEO", "Compliance"],
    stack: ["Split Sitemap", "CMS Compliance", "27+ SEO Pages"],
    results: [
      { metric: "27+", label: "SEO Pages" },
      { metric: "CMS", label: "Compliant" },
      { metric: "5-Phase", label: "Rollout" },
    ],
    challenge:
      "A licensed Medicare practice operates under strict CMS marketing rules and needed to rank for dozens of plan- and location-specific searches without risking compliance.",
    strategy:
      "Build broad, compliant search coverage through a split-sitemap architecture and an enrollment-aligned content calendar that captures seasonal demand.",
    solution:
      "A 27+ page site on a split-sitemap structure with CMS compliance baked into every page and an Annual Enrollment Period anchor calendar.",
    outcome:
      "27+ compliant SEO pages, a clean split-sitemap index, and a disciplined five-phase rollout.",
    businessImpact:
      "The practice now reaches Medicare-eligible clients across more searches and seasons — safely, compliantly, and without the risk of a costly violation.",
    accent: "#0E7490",
    image: "portfolio/vernalmedicare.webp",        // ← Added
    liveUrl: "https://vernalmedicare.com",
    featured: true,
  },
  {
    slug: "high-class-limousine",
    name: "High Class Limousine",
    category: "Luxury",
    summary: "14-page cinematic build · interactive price calculator.",
    overview:
      "A luxury transportation brand on a 14-page cinematic site with interactive widgets — a price calculator, prom planning timeline, venue map, and itinerary builder.",
    services: ["Website Design", "Branding", "Interactive Tools"],
    stack: ["Hybrid Theme", "Price Calculator", "Leaflet Map"],
    results: [
      { metric: "14", label: "Pages" },
      { metric: "4", label: "Interactive Tools" },
      { metric: "Cinematic", label: "Aesthetic" },
    ],
    challenge:
      "A luxury transportation brand needed to feel unmistakably premium and make quoting and planning effortless for high-end events like proms and weddings.",
    strategy:
      "Translate 'luxury' into the experience itself — cinematic design paired with interactive tools that let clients price, plan, and book with confidence.",
    solution:
      "A 14-page cinematic site with four interactive tools: a price calculator, a prom-planning timeline, a venue map, and an itinerary builder.",
    outcome:
      "14 polished pages, 4 custom interactive tools, and a cinematic aesthetic that signals premium at every touch.",
    businessImpact:
      "Self-service quoting and planning capture leads after hours and qualify them before the first call — fewer tire-kickers, more booked events.",
    accent: "#6D28D9",
    image: "portfolio/highclasslimousine.webp",    // ← Added
    liveUrl: "https://highclasslimousineservices.com",
  },
    {
    slug: "wernex-pest-control",
    name: "Wernex Pest Control",
    category: "Pest Control",
    summary: "Professional pest control services with online booking and local SEO.",
    overview:
      "A complete digital transformation for a local pest control company featuring service area mapping, online booking, and strong local SEO optimization across the Uintah Basin.",
    services: ["Website Design", "SEO", "Booking System"],
    stack: ["Local SEO", "Service Area Pages", "Online Booking"],
    results: [
      { metric: "Local", label: "#1 Rankings" },
      { metric: "Booking", label: "System" },
      { metric: "<2s", label: "Load Time" },
    ],
    challenge:
      "A local pest-control company was invisible in search across its service area and had no way for customers to book without calling during business hours.",
    strategy:
      "Dominate local SEO across the Uintah Basin with dedicated service-area pages, and remove every barrier between an anxious customer and a booking.",
    solution:
      "A complete digital build with service-area mapping, online booking, and strong local SEO optimization across the region.",
    outcome:
      "#1 local rankings as the goal, an online booking system, and load times under two seconds.",
    businessImpact:
      "Customers find Wernex first and book on the spot — converting urgent, high-intent searches into scheduled jobs around the clock.",
    accent: "#15803D",
    image: "portfolio/wernexpestcontrol.webp",
    liveUrl: "https://wernexpestcontrol.com",
  },
  {
    slug: "alta-medicare",
    name: "Alta Medicare",
    category: "Healthcare",
    summary: "CMS-compliant Medicare site with SEO-driven plan & location pages.",
    tagline: "Medicare Insurance Practice",
    overview:
      "A licensed Medicare insurance practice built on a clean, CMS-compliant architecture with SEO-focused plan and location pages, structured data, and an enrollment-aligned content calendar.",
    services: ["Website Design", "SEO", "Compliance"],
    stack: ["CMS Compliance", "Local SEO", "Structured Data"],
    results: [
      { metric: "CMS", label: "Compliant" },
      { metric: "Local", label: "SEO" },
      { metric: "<1s", label: "Load Time" },
    ],
    challenge:
      "A licensed Medicare practice operates under strict CMS marketing rules and needed to rank for plan- and location-specific searches without risking compliance.",
    strategy:
      "Build broad, compliant search coverage with dedicated plan and location pages and an enrollment-aligned content calendar that captures seasonal demand.",
    solution:
      "A clean, fast site with CMS compliance baked into every page, structured data throughout, and SEO-driven plan and location coverage.",
    outcome:
      "Compliant SEO coverage across plans and locations, sub-second load times, and a presence built to capture Annual Enrollment Period demand.",
    businessImpact:
      "The practice now reaches Medicare-eligible clients across more searches and seasons — safely, compliantly, and without the risk of a costly violation.",
    accent: "#4338CA",
    image: "portfolio/altamedicare.webp",
    liveUrl: "https://altamedicare.com",
  },
];



export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Our old site took eight seconds to load and ranked nowhere. The new build loads instantly and we're finally getting calls from people who found us on Google.",
    author: "Tour Operator",
    role: "Adventure Tours, Vernal UT",
  },
  {
    quote:
      "They didn't just hand us a website — they built a system. Booking, SEO, and the brand all work together. It looks like a company ten times our size.",
    author: "Hospitality Owner",
    role: "Vernal, UT",
  },
  {
    quote:
      "Honest pricing, clear milestones, and they actually answer the phone. We own everything, which mattered to us. Best agency decision we've made.",
    author: "Healthcare Practice",
    role: "Uintah Basin, UT",
  },
  {
    quote:
      "The bilingual genealogy site they built ranks in two languages and reads beautifully. Clients constantly tell us how professional it feels.",
    author: "Research Director",
    role: "Forebear Find",
  },
];

export type Faq = { q: string; a: string; category: string };

// Answers are written for Google featured snippets and AI Overviews: the first
// sentence is a direct, self-contained answer, followed by 1–2 supporting lines.
// The `category` field groups them on the dedicated /faq/ page.
export const faqs: Faq[] = [
  // — Homepage shows the first five (a deliberate cross-section) —
  {
    category: "Pricing",
    q: "How much does a custom website cost?",
    a: "Custom website projects from Cozelos Data start at $2,500 for Essential Presence, $4,500 for Professional Growth, and $7,500 for Market Leader, with Enterprise builds scoped individually. Every project begins with a $500 Discovery Session that's credited toward your build, and you receive a fixed quote in writing before any work starts.",
  },
  {
    category: "Timeline",
    q: "How long does it take to build a website?",
    a: "Most custom websites launch in 4–6 weeks from kickoff. Larger sites with many pages or heavy content writing take 8–10 weeks, and simple landing pages can go live in 2–3 weeks. You receive a clear schedule with milestones on day one.",
  },
  {
    category: "Ownership",
    q: "Do I own my website?",
    a: "Yes — completely. You own the domain, the hosting account, the source code, and all content. There are no proprietary builders or lock-ins, and we can transfer everything to you at any time. With Cozelos Data, your website is an asset you own outright.",
  },
  {
    category: "SEO",
    q: "Will my new website actually rank on Google?",
    a: "Every website we build has SEO engineered in from day one — structured data, clean architecture, fast load times, sitemaps, and local optimization. Most clients see meaningful ranking improvement within 60–90 days, and the gains compound as content and authority grow.",
  },
  {
    category: "Pricing",
    q: "Are there any hidden fees or surprise invoices?",
    a: "No. Your project quote is fixed and approved in writing before any work begins, so the price never changes mid-build. The only ongoing cost is an optional monthly plan, and that rate is locked too — no 'starting from' footnotes and no surprises.",
  },

  // — Pricing —
  {
    category: "Pricing",
    q: "Why does a custom website cost more than a template?",
    a: "A custom website costs more because it's engineered, not assembled. Instead of a generic theme loaded with plugins, you get hand-built code that loads in under a second, ranks better, carries far less security risk, and needs less maintenance — so it returns more than its price over time.",
  },

  // — Timeline —
  {
    category: "Timeline",
    q: "How quickly can you start my project?",
    a: "We can usually begin within one to two weeks of your Discovery Session. Once we agree on scope and you approve the fixed quote, we schedule a kickoff and start immediately — most clients move from first call to active design inside two weeks.",
  },

  // — Ownership —
  {
    category: "Ownership",
    q: "What happens if I want to leave or switch providers?",
    a: "You take everything with you. Because you own the domain, code, hosting, and content, leaving is simple: we hand over full access and files whenever you ask. We keep your business through results, not by holding your website hostage.",
  },

  // — SEO —
  {
    category: "SEO",
    q: "How long does SEO take to work?",
    a: "SEO typically shows meaningful movement within 60–90 days, with stronger results building over 6–12 months. Technical fixes and local optimization can lift rankings within weeks, while competitive keywords take longer. Unlike paid ads, the visibility you earn keeps working without ongoing cost-per-click.",
  },
  {
    category: "SEO",
    q: "What is local SEO and do I need it?",
    a: "Local SEO helps your business appear when nearby customers search for what you offer — in Google Maps, the local pack, and 'near me' results. If you serve a specific area, you need it. We optimize your Google Business Profile, local citations, and location pages to capture that demand.",
  },

  // — Hosting —
  {
    category: "Hosting",
    q: "Do you provide website hosting?",
    a: "Yes. We host on fast, secure, enterprise-grade infrastructure with SSL, daily backups, and uptime monitoring included in our monthly plans. Because our sites are built as lightweight static pages, they load almost instantly and stay online reliably — and you always own the hosting account.",
  },
  {
    category: "Hosting",
    q: "Is my website secure from hackers?",
    a: "Yes. We build static, hardened websites with a very small attack surface — no sprawling admin panels or vulnerable plugins to exploit. Every site ships with SSL encryption, security monitoring, and daily backups, so it stays safe, online, and protected.",
  },

  // — Maintenance —
  {
    category: "Maintenance",
    q: "Do I need a monthly maintenance plan?",
    a: "A maintenance plan is optional but strongly recommended. For $295/month, Maintenance keeps your site fast, secure, and backed up — with hosting, SSL, monitoring, performance tuning, and minor edits handled for you. Without upkeep, any website gradually slows down and slips out of search.",
  },
  {
    category: "Maintenance",
    q: "What is included in ongoing website maintenance?",
    a: "Maintenance includes hosting, SSL, security monitoring, daily backups, uptime monitoring, performance optimization, minor content edits, and priority support. Higher tiers add SEO, content, and marketing. The goal is simple: your site gets faster and ranks higher every quarter, not slower.",
  },

  // — AI —
  {
    category: "AI",
    q: "Can you add AI to my website or business?",
    a: "Yes. We build AI assistants and chatbots that capture leads and answer customer questions 24/7, plus automations that handle scheduling, follow-ups, and data entry. AI lets a small team respond instantly and never miss a lead, giving you back hours every week.",
  },
  {
    category: "AI",
    q: "What is AI search optimization and why does it matter?",
    a: "AI search optimization makes your business easy for tools like ChatGPT, Claude, and Google's AI Overviews to understand and recommend. We structure your content with schema and an llms.txt file so AI engines cite you accurately — capturing customers who now ask AI instead of searching.",
  },

  // — Video —
  {
    category: "Video",
    q: "Do you offer video production?",
    a: "Yes. We produce cinematic brand films, 4K aerial drone footage, and vertical reels for Instagram, TikTok, and YouTube — fully filmed, color-graded, and sound-designed. Professional video makes your business look established and premium across your website, ads, and social channels.",
  },
  {
    category: "Video",
    q: "Why does my business need video?",
    a: "Video communicates energy, scale, and trust that photos can't, and it consistently earns higher engagement across websites, ads, and social media. It also gives you a reusable library of branded content. In a crowded feed, professional video is what makes a business stop the scroll.",
  },

  // — Marketing —
  {
    category: "Marketing",
    q: "Do you manage Google and Facebook ads?",
    a: "Yes. We build and manage Google Ads and Meta (Facebook & Instagram) campaigns end to end — creative, conversion-focused landing pages, pixel tracking, and A/B testing. We tune until cost-per-lead drops, then scale only the campaigns that produce measurable results.",
  },
  {
    category: "Marketing",
    q: "How do you measure marketing results?",
    a: "We measure the metrics that matter to your business: leads, bookings, cost per lead, and revenue — not vanity numbers like impressions. With proper conversion tracking in place, you get monthly reports showing exactly what your marketing spend produced and where it can improve.",
  },
  {
    category: "Marketing",
    q: "What's the difference between SEO and paid ads?",
    a: "Paid ads buy immediate traffic that stops the moment you stop paying. SEO earns traffic that compounds and keeps working for free over time. The best strategy uses both: ads for fast results today, and SEO for durable, lower-cost growth tomorrow.",
  },

  // — Support —
  {
    category: "Support",
    q: "Will I be able to reach a real person for support?",
    a: "Yes. You work directly with our team — not a ticket queue or a call center. Clients on a monthly plan get priority support, and we actually answer the phone. Clear communication and real responsiveness are part of how we work, before and after launch.",
  },
  {
    category: "Support",
    q: "What happens after my website launches?",
    a: "Launch is the beginning, not the end. We set up analytics, submit your site for indexing, and — on a monthly plan — keep it updated, secure, and improving. As your business grows, we evolve the site with it, so your digital asset keeps getting better over time.",
  },

  // — General —
  {
    category: "General",
    q: "Do you work with government agencies?",
    a: "Yes. Cozelos Data is a Woman-Owned Small Business (WOSB) with an active DUNS (059220399) and CAGE code (897W0), contracting under NAICS 541511, 541512, 541513, and 513210. We build Section 508 / WCAG 2.1 AA accessible sites and provide a capability statement on request.",
  },
  {
    category: "General",
    q: "Are you based in Utah? Do you work with clients in other states?",
    a: "We're headquartered in Vernal, Utah, and work with clients anywhere in the country. Most projects run smoothly online, with occasional on-site visits for video shoots or strategy sessions. Wherever you are, you get the same fast, custom, search-optimized digital asset.",
  },
];

// Display order for the grouped /faq/ page.
export const faqCategories = [
  "Pricing",
  "Timeline",
  "Ownership",
  "SEO",
  "Hosting",
  "Maintenance",
  "AI",
  "Video",
  "Marketing",
  "Support",
  "General",
] as const;

export type TimelineEvent = { year: string; title: string; body: string };

export const timeline: TimelineEvent[] = [
  {
    year: "Origin",
    title: "Built in Vernal",
    body: "Founded on a single conviction: too many great Utah businesses run on websites that don't match the quality of their work.",
  },
  {
    year: "The Playbook",
    title: "A repeatable system",
    body: "We developed our own approach — pillar-and-spoke architecture, hand-written code, cinematic motion, structured data, and AI integration.",
  },
  {
    year: "Growth",
    title: "Across the Basin & beyond",
    body: "Our work now powers tour operators, hotels, healthcare practices, storage facilities, pest control, luxury services, and genealogy researchers.",
  },
  {
    year: "Today",
    title: "Government-ready",
    body: "Now a WOSB-eligible, credentialed agency ready to support federal, state, and local government work alongside our local business clients.",
  },
];

export const values = [
  {
    n: "01",
    title: "Custom over template",
    body: "Templates make every business look the same. Custom design makes you look like you mean it.",
  },
  {
    n: "02",
    title: "Speed is a feature",
    body: "If your site takes six seconds to load, half your traffic left before they saw it. We obsess over performance.",
  },
  {
    n: "03",
    title: "SEO from day one",
    body: "We don't bolt on SEO at the end. Schema, sitemaps, llms.txt, and hub-and-spoke architecture are baked in.",
  },
  {
    n: "04",
    title: "You own everything",
    body: "Your domain, your hosting, your code, your content. No proprietary lock-ins, no retainer hostage situations.",
  },
  {
    n: "05",
    title: "Honest pricing",
    body: "A fixed quote in writing before we start, and plans that scale with you. No surprise invoices, no \u201cstarting from\u201d footnotes.",
  },
  {
    n: "06",
    title: "Clear communication",
    body: "Every milestone documented, every decision logged, every change approved. No mysteries, no surprises.",
  },
];

export const naicsTable = [
  { code: "513210", desc: "Software Publishers", primary: false },
  { code: "541511", desc: "Custom Computer Programming Services", primary: true },
  { code: "541512", desc: "Computer Systems Design Services", primary: false },
  { code: "541513", desc: "Computer Facilities Management Services", primary: false },
];
