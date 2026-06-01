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
  email: "info@cozelosdata.com",
  emailHref: "mailto:info@cozelosdata.com",
  smsHref: "sms:+14352195120",
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
  founder: "Rocco DeLuca",
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
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Company", href: "/company/" },
  { label: "Contact", href: "/contact/" },
  { label: "Pay", href: "/payment/" },
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
  benefits: string[];
  process: string[];
  deliverables: string[];
  icon: string; // key into the Icon component
  image?: string; // optional path under src/assets (falls back to icon tile)
  cta: string;
};

export const services: Service[] = [
  {
    slug: "website-design",
    index: "01",
    title: "Website Design & Development",
    short: "Custom, cinematic websites engineered to convert.",
    problem:
      "Your website is the front door, sales rep, and brand experience all at once — and a slow, generic template loses customers before they ever read a word.",
    why: "A custom, mobile-first build loads in under a second, ranks on search, and is engineered around the exact moment a visitor decides to call.",
    results:
      "Faster load times, higher conversion rates, and a digital presence that finally matches the quality of your work.",
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
    cta: "Start at $1,000",
  },
  {
    slug: "video-production",
    index: "02",
    title: "Video Production",
    short: "Cinematic video that elevates your brand on every platform.",
    problem:
      "Static photos can't communicate energy, scale, or trust the way motion can — and most businesses have none of it.",
    why: "From 4K aerial drone footage of your location to vertical reels built for Instagram and TikTok, professional video makes a brand feel established and premium.",
    results:
      "Higher engagement, stronger brand recall, and content that works across your website, ads, and social channels.",
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
      "Most ad accounts quietly leak money on the wrong audiences with no tracking and no landing page strategy.",
    why: "We design the creative, configure pixel tracking, build the landing page, and tune campaigns until cost-per-lead drops — then scale only what works.",
    results:
      "Lower cost per lead, predictable pipeline, and marketing spend you can actually measure.",
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
      "A beautiful website is only worth what it ranks for — and most never get indexed properly or structured for AI search.",
    why: "We architect content with a pillar-and-spoke strategy, structured data graphs, and llms.txt so Google, ChatGPT, and Claude all know exactly what you offer.",
    results:
      "Meaningful ranking improvement within 60–90 days, more qualified organic traffic, and citations in AI search results.",
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
      "Manual scheduling, follow-ups, and data entry quietly drain the hours you should be spending on the business.",
    why: "We connect your tools, add AI assistants, and automate the repetitive work so leads get answered instantly and nothing falls through the cracks.",
    results:
      "Faster response times, fewer missed leads, and a team freed from busywork.",
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
      "Most websites are built once and maintained by nobody — slowly breaking, slowing down, and falling out of search.",
    why: "Our maintenance plan keeps your site updated, backed up, monitored, and optimized so it gets faster every quarter, not slower.",
    results:
      "Reliable uptime, compounding SEO, and a site that stays modern without surprise invoices.",
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
  overview: string;
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
    overview:
      "A bilingual (English / Italian) research firm specializing in Italian jure sanguinis citizenship and vital record retrieval. We built a 30+ page pillar-and-spoke site mapping geographic and regional service areas, with structured data and AI search optimization throughout.",
    services: ["Website Design", "SEO", "Content Architecture", "Maintenance"],
    stack: ["Hand-built HTML/CSS", "JSON-LD Schema", "Hub & Spoke SEO", "llms.txt"],
    results: [
      { metric: "30+", label: "Indexed Pages" },
      { metric: "EN/IT", label: "Bilingual Build" },
      { metric: "<1s", label: "Load Time" },
    ],
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
    overview:
      "A parking management platform designed to streamline reservations, customer communications, and parking operations. Built with a modern user experience, responsive design, and SEO-focused architecture.",
    services: ["Website Design", "SEO", "Business Automation"],
    stack: ["Responsive Design", "Booking System", "Automation"],
    results: [
      { metric: "24/7", label: "Online Access" },
      { metric: "Mobile", label: "Optimized" },
      { metric: "SEO", label: "Ready" },
    ],
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
    accent: "#B45309",
    image: "portfolio/adventuretour.webp",        // ← Added
    liveUrl: "https://adventuretoursvernal.com",
  },
  {
    slug: "best-western-vernal-inn",
    name: "Best Western Vernal Inn",
    category: "Hospitality",
    summary: "Cinematic Ken Burns hero · canonical SEO rebuild.",
    overview:
      "A hospitality rebuild featuring a cinematic Ken Burns hero, a clean canonical SEO structure, and a rates presentation engineered for direct bookings.",
    services: ["Website Design", "SEO", "Maintenance"],
    stack: ["Cinematic Hero", "Canonical SEO", "Rates Table"],
    results: [
      { metric: "Cinematic", label: "Hero" },
      { metric: "Canonical", label: "SEO Rebuild" },
      { metric: "Direct", label: "Bookings" },
    ],
    accent: "#1D4ED8",
    image: "portfolio/best-western.webp",
    liveUrl: "https://bestwesternvernalinn.com",
  },
  {
    slug: "vernal-medicare",
    name: "Vernal Medicare",
    category: "Healthcare",
    summary: "27 SEO pages · 5-phase rollout · CMS compliance.",
    overview:
      "A licensed Medicare insurance practice built on a split-sitemap architecture across 27+ SEO pages, with CMS compliance baked into every page and an AEP anchor calendar.",
    services: ["Website Design", "SEO", "Compliance"],
    stack: ["Split Sitemap", "CMS Compliance", "27+ SEO Pages"],
    results: [
      { metric: "27+", label: "SEO Pages" },
      { metric: "CMS", label: "Compliant" },
      { metric: "5-Phase", label: "Rollout" },
    ],
    accent: "#0E7490",
    image: "portfolio/vernalmedicare.webp",        // ← Added
    liveUrl: "https://vernalmedicare.com",
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
    accent: "#15803D",
    image: "portfolio/wernexpestcontrol.webp",
    liveUrl: "https://wernexpestcontrol.com",
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

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How much does a website actually cost?",
    a: "Our professional website starts at $1,000 and includes custom design, mobile optimization, SEO-ready architecture, contact forms, and analytics. Larger sites with more pages or complex functionality are quoted individually after a discovery call.",
  },
  {
    q: "What's included in the $50/month maintenance plan?",
    a: "Monthly content updates, security monitoring, daily backups, performance optimization, uptime monitoring, and priority technical support. Hosting and domain are included for most clients.",
  },
  {
    q: "Are there hidden fees or surprise invoices?",
    a: "No. Your initial quote is fixed and approved in writing before any work begins. The only ongoing cost is the optional maintenance plan, and that price is locked.",
  },
  {
    q: "How long does it take to launch a new website?",
    a: "Most professional websites launch in 4–6 weeks from kickoff. Larger projects or sites needing significant content writing can take 8–10 weeks. You get a clear schedule on day one.",
  },
  {
    q: "Do I own my website?",
    a: "Completely. The domain, the hosting account, the source code, and the content are all yours. We can transfer everything at any time, no questions asked.",
  },
  {
    q: "Will my new site actually rank on Google?",
    a: "Every site we build has SEO architecture baked in — schema graphs, sitemaps, llms.txt for AI search, and hub-and-spoke content. Most clients see meaningful ranking improvement within 60–90 days.",
  },
  {
    q: "Do you work with government agencies?",
    a: "Yes. Cozelos Data is a Woman-Owned Small Business (WOSB) with an active DUNS and CAGE code, contracting under NAICS codes 513210, 541511, 541512, and 541513. A capability statement is available on request.",
  },
  {
    q: "Are you based in Utah? Do you work with out-of-state clients?",
    a: "We're headquartered in Vernal, Utah, and work with clients anywhere. Most projects run remotely with occasional on-site visits for video work or strategy sessions.",
  },
];

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
    body: "$1,000 to launch. $50/month to maintain. No surprise invoices, no \u201cstarting from\u201d footnotes.",
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
