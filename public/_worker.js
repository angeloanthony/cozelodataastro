/**
 * Cozelos Data — server-side project-inquiry endpoint.  POST /api/contact
 * ---------------------------------------------------------------------------
 * WHY THIS FILE LIVES IN public/
 *
 * The site is a STATIC Astro build (astro.config.mjs: output "static") deployed
 * to Cloudflare Pages — verified at build time by the live origin: the apex
 * cozelosdata.com is served by the Pages project `cozelodataastro`
 * (cozelodataastro.pages.dev returns the identical build). A static site cannot
 * process a form submission itself, so the one piece of server code the
 * lead-capture path needs is this Pages "advanced mode" Worker.
 *
 * Pages reads `_worker.js` and `_routes.json` from the ROOT OF THE PUBLISHED
 * OUTPUT DIRECTORY (dist/). Astro copies public/ into dist/ verbatim, so
 * putting the two files here is what puts them where Pages looks — and it works
 * for every deployment method (Git integration, `wrangler pages deploy dist`,
 * or a dashboard upload of dist/). A root-level `functions/` directory would
 * only work for some of those, which is why it was not used.
 *
 * BLAST RADIUS: `_routes.json` (public/_routes.json) restricts this Worker to
 * `/api/*`. Every other request — every page, every asset — is served straight
 * from the Pages asset store and never enters this file. The `env.ASSETS.fetch`
 * fallback below exists purely as a safety net in case that routing file is
 * ever lost: the site keeps working instead of going dark.
 *
 * SECRETS: nothing sensitive is in this file. Everything comes from the Pages
 * project's environment (Settings > Variables and Secrets). See CONFIG below.
 *
 * NO DEPENDENCIES, NO BUILD STEP: plain ES-module JavaScript so it ships as-is.
 */

/* ------------------------------------------------------------------ config */

/**
 * Required Pages environment variables (Settings > Variables and Secrets):
 *
 *   TURNSTILE_SECRET_KEY   secret  — Turnstile widget secret (server-side only)
 *   CF_ACCOUNT_ID          plain   — Cloudflare account id (Email Sending API)
 *   CF_EMAIL_API_TOKEN     secret  — API token with the email-sending permission
 *   CONTACT_FROM_EMAIL     plain   — sender, on a domain onboarded to Email Sending
 *   CONTACT_TO_EMAIL       plain   — where inquiries are delivered
 *
 * Optional:
 *   TURNSTILE_HOSTNAMES    plain   — comma-separated allowlist of hostnames the
 *                                    Turnstile widget may be solved on. When
 *                                    unset it defaults to the hostname this
 *                                    request arrived on, which is already
 *                                    pinned to our own origin by the Origin
 *                                    check below. Set it to override.
 *   CONTACT_FROM_NAME      plain   — display name on the notification email.
 */

/** The endpoint this Worker owns. Everything else falls through to assets. */
const ENDPOINT = "/api/contact";

/** Must match `data-action` on the Turnstile widget in the form component. */
const TURNSTILE_ACTION = "contact-inquiry";

/**
 * Project types the form may submit.  Slug -> English label.
 *
 * The slugs mirror `services` in src/data/site.ts and the localized labels the
 * visitor actually sees come from src/i18n/content/<locale>/shared.json, joined
 * on the same slug. This map exists for two reasons the client cannot serve:
 * it is the server-side ALLOWLIST (an arbitrary project type is rejected), and
 * it renders the notification email in English no matter which locale
 * submitted, so the inbox reads consistently.
 *
 * A Worker in public/ cannot import from src/, so this is a deliberate,
 * documented duplicate of six identifiers. Adding a seventh service means
 * adding it here too.
 */
const PROJECT_TYPES = {
  "website-design": "Website Design & Development",
  "video-production": "Video Production",
  "online-marketing": "Online Marketing",
  seo: "SEO Optimization",
  "business-automation": "Business Automation",
  "ongoing-support": "Ongoing Support & Maintenance",
  other: "Other / not sure yet",
};

/** Locale -> (hreflang, contact page path). Mirrors src/data/i18n.ts LOCALES. */
const LOCALES = {
  en: { tag: "en-US", path: "/contact/" },
  it: { tag: "it-IT", path: "/it/contact/" },
  es: { tag: "es-US", path: "/es/contact/" },
};

/** Field length ceilings, enforced server-side regardless of the client. */
const MAX = { name: 100, email: 254, phone: 40, message: 4000, token: 2048 };
const MIN = { name: 2, message: 10 };

/** Hard cap on the request body. A legitimate inquiry is a few KB at most. */
const MAX_BODY_BYTES = 16 * 1024;

/** Best-effort per-IP throttle: this many submissions per window. */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

/* ------------------------------------------------------------------ router */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === ENDPOINT) return handleInquiry(request, env, url);

    // Any other /api/* path is ours by _routes.json but unimplemented.
    if (url.pathname.startsWith("/api/")) {
      return jsonResponse(404, { ok: false, error: "not_found" });
    }

    // Safety net only — _routes.json normally prevents us ever getting here.
    return env.ASSETS.fetch(request);
  },
};

/* --------------------------------------------------------------- handler */

async function handleInquiry(request, env, url) {
  // --- method -------------------------------------------------------------
  if (request.method !== "POST") {
    return jsonResponse(405, { ok: false, error: "method_not_allowed" }, { Allow: "POST" });
  }

  // --- same-origin only ---------------------------------------------------
  // fetch() always sends Origin on a POST, so a missing or foreign Origin is
  // not our form. This is the cheapest possible CSRF / off-site-abuse guard
  // and it needs no configuration.
  const origin = request.headers.get("Origin");
  if (origin !== url.origin) {
    return jsonResponse(403, { ok: false, error: "forbidden" });
  }

  // --- content type -------------------------------------------------------
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return jsonResponse(415, { ok: false, error: "unsupported_media_type" });
  }

  // --- request size -------------------------------------------------------
  const declared = Number(request.headers.get("Content-Length") || "0");
  if (declared > MAX_BODY_BYTES) {
    return jsonResponse(413, { ok: false, error: "too_large" });
  }

  // --- rate limit ---------------------------------------------------------
  const clientIp = request.headers.get("CF-Connecting-IP") || "";
  if (isRateLimited(clientIp)) {
    return jsonResponse(429, { ok: false, error: "rate_limited" });
  }

  // --- body ---------------------------------------------------------------
  let raw;
  try {
    raw = await request.text();
  } catch {
    return jsonResponse(400, { ok: false, error: "validation" });
  }
  if (byteLength(raw) > MAX_BODY_BYTES) {
    return jsonResponse(413, { ok: false, error: "too_large" });
  }

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonResponse(400, { ok: false, error: "validation" });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse(400, { ok: false, error: "validation" });
  }

  // --- honeypot -----------------------------------------------------------
  // A field no human ever sees. Anything in it is a bot, and a bot is told the
  // submission succeeded so it has no signal to adapt against. Nothing is sent.
  if (str(body.company_website).length > 0) {
    return jsonResponse(200, { ok: true });
  }

  // --- field validation ---------------------------------------------------
  const fields = {};
  const invalid = [];

  const name = str(body.name);
  if (name.length < MIN.name || name.length > MAX.name) invalid.push("name");
  else fields.name = name;

  const email = str(body.email);
  if (!isEmail(email)) invalid.push("email");
  else fields.email = email;

  // Phone is optional on purpose: the visitors this form exists for are the
  // ones who did not want to pick up the phone. Requiring it would cost
  // submissions. It is still validated when present.
  const phone = str(body.phone);
  if (phone && (phone.length > MAX.phone || !/^[0-9+()\-.\s]+$/.test(phone))) invalid.push("phone");
  else if (phone) fields.phone = phone;

  const projectType = str(body.projectType);
  if (!Object.prototype.hasOwnProperty.call(PROJECT_TYPES, projectType)) invalid.push("projectType");
  else fields.projectType = projectType;

  const message = str(body.message);
  if (message.length < MIN.message || message.length > MAX.message) invalid.push("message");
  else fields.message = message;

  const locale = Object.prototype.hasOwnProperty.call(LOCALES, str(body.locale))
    ? str(body.locale)
    : "en";

  if (invalid.length) {
    return jsonResponse(400, { ok: false, error: "validation", fields: invalid });
  }

  // --- spam protection ----------------------------------------------------
  const token = str(body.turnstileToken);
  if (!token || token.length > MAX.token) {
    return jsonResponse(403, { ok: false, error: "spam" });
  }
  const verified = await verifyTurnstile(token, clientIp, url.hostname, env);
  if (!verified) {
    return jsonResponse(403, { ok: false, error: "spam" });
  }

  // --- delivery -----------------------------------------------------------
  const sent = await sendNotification(fields, locale, env);
  if (!sent) {
    // Deliberately opaque: the visitor gets a friendly retry message and a
    // phone/email fallback. Provider errors never leave the Worker.
    return jsonResponse(502, { ok: false, error: "server" });
  }

  noteSubmission(clientIp);
  return jsonResponse(200, { ok: true });
}

/* ------------------------------------------------------------- turnstile */

/**
 * Canonical server-side siteverify. The client token is never trusted on its
 * own: Cloudflare must confirm it, it must carry the action this form issues,
 * and it must have been solved on a hostname we accept. Fails closed on any
 * network error, non-2xx, or non-JSON body.
 */
async function verifyTurnstile(token, clientIp, requestHostname, env) {
  const secret = str(env.TURNSTILE_SECRET_KEY);
  if (!secret) return false;

  const configured = str(env.TURNSTILE_HOSTNAMES)
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  // Default to this request's own hostname. The Origin check above already
  // pinned the request to our origin, so this cannot be widened by a caller.
  const expectedHostnames = new Set(configured.length ? configured : [requestHostname]);

  const params = new URLSearchParams({ secret, response: token });
  if (clientIp) params.set("remoteip", clientIp);

  let result;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return false;
    result = await res.json();
  } catch {
    return false;
  }

  const ok =
    !!result &&
    result.success === true &&
    result.action === TURNSTILE_ACTION &&
    expectedHostnames.has(result.hostname);

  // Private diagnostics only — Cloudflare dashboard logs, never the response.
  // Deliberately carries no personal data: verdict metadata and nothing else.
  // This is what makes a rejected challenge diagnosable after deployment,
  // since the visitor is only ever shown a generic message.
  if (!ok) {
    console.warn(
      "turnstile rejected:",
      JSON.stringify({
        success: result?.success ?? null,
        action: result?.action ?? null,
        hostname: result?.hostname ?? null,
        expected: [...expectedHostnames],
        codes: result?.["error-codes"] ?? null,
      }),
    );
  }
  return ok;
}

/* ----------------------------------------------------------------- email */

/**
 * Deliver the inquiry through Cloudflare Email Sending's REST API.
 *
 * REST rather than the Workers `send_email` binding because Pages Functions do
 * not support that binding — the REST endpoint is the supported path on Pages.
 *
 * The body is PLAIN TEXT. The visitor's message is reproduced verbatim with
 * only control characters stripped: no HTML is constructed from user input, so
 * there is nothing to escape and nothing to get wrong. `reply_to` is the
 * visitor, so replying from the inbox reaches them directly.
 */
async function sendNotification(fields, locale, env) {
  const accountId = str(env.CF_ACCOUNT_ID);
  const apiToken = str(env.CF_EMAIL_API_TOKEN);
  const from = str(env.CONTACT_FROM_EMAIL);
  const to = str(env.CONTACT_TO_EMAIL);
  if (!accountId || !apiToken || !isEmail(from) || !isEmail(to)) {
    // Names only — never the values. Tells the operator which variable is
    // missing without putting a credential anywhere near a log line.
    console.error(
      "email not configured:",
      [
        !accountId && "CF_ACCOUNT_ID",
        !apiToken && "CF_EMAIL_API_TOKEN",
        !isEmail(from) && "CONTACT_FROM_EMAIL",
        !isEmail(to) && "CONTACT_TO_EMAIL",
      ]
        .filter(Boolean)
        .join(", "),
    );
    return false;
  }

  const meta = LOCALES[locale] || LOCALES.en;
  const label = PROJECT_TYPES[fields.projectType];

  const lines = [
    "New Cozelos Data project inquiry",
    "",
    `Name:         ${fields.name}`,
    `Email:        ${fields.email}`,
    `Phone:        ${fields.phone || "(not provided)"}`,
    `Project type: ${label}`,
    `Locale:       ${meta.tag}`,
    `Source page:  https://cozelosdata.com${meta.path}`,
    `Timestamp:    ${new Date().toISOString()}`,
    "",
    "Message",
    "-".repeat(60),
    clean(fields.message, MAX.message),
    "-".repeat(60),
    "",
    "Reply to this email to answer the sender directly.",
  ];

  const subject = header(`New project inquiry — ${label} — ${fields.name}`, 160);

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({
          to,
          from: { address: from, name: header(str(env.CONTACT_FROM_NAME) || "Cozelos Data Website", 78) },
          reply_to: { address: fields.email, name: header(fields.name, 78) },
          subject,
          text: lines.join("\n"),
        }),
      },
    );
    const payload = await res.json().catch(() => null);
    // The API can answer 200 with success:false on a rejected send.
    const ok = res.ok && (!payload || payload.success !== false);
    if (!ok) {
      console.error(
        "email send failed:",
        JSON.stringify({ status: res.status, errors: payload?.errors ?? null }),
      );
    }
    return ok;
  } catch (err) {
    console.error("email send threw:", err instanceof Error ? err.message : "unknown");
    return false;
  }
}

/* ------------------------------------------------------------ rate limit */

/**
 * Best-effort in-isolate throttle. It is intentionally NOT a database: §27 of
 * the brief rules that out, and Turnstile plus the single-use token are the
 * real bot control. This only blunts a naive flood that happens to land on one
 * isolate; it resets when the isolate does, which is acceptable for that job.
 * A zone-level Cloudflare WAF rate-limiting rule on /api/contact is the durable
 * control and is listed in the deployment notes.
 */
const recent = new Map();

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (!hits.length) recent.delete(ip);
  else recent.set(ip, hits);
  if (recent.size > 5000) recent.clear(); // bound the map, never grow unbounded
  return hits.length >= RATE_LIMIT.max;
}

function noteSubmission(ip) {
  if (!ip) return;
  const hits = recent.get(ip) || [];
  hits.push(Date.now());
  recent.set(ip, hits);
}

/* ---------------------------------------------------------------- helpers */

/** Coerce anything to a trimmed string. Non-strings become "". */
function str(v) {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Practical email validation: one @, no whitespace, no characters that could
 * be used to smuggle a header, a dotted domain, and within RFC length limits.
 */
function isEmail(v) {
  return (
    typeof v === "string" &&
    v.length > 0 &&
    v.length <= MAX.email &&
    /^[^\s@,;:<>"'\\()[\]]+@[^\s@,;:<>"'\\()[\]]+\.[^\s@,;:<>"'\\()[\]]{2,}$/.test(v)
  );
}

/** Strip control characters from free text, keeping newlines and tabs. */
function clean(v, max) {
  return String(v)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, max);
}

/** Single-line, newline-free value safe to place in a subject or display name. */
function header(v, max) {
  return String(v)
    .replace(/[\r\n\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function byteLength(s) {
  return new TextEncoder().encode(s).length;
}

function jsonResponse(status, payload, extraHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(extraHeaders || {}),
    },
  });
}
