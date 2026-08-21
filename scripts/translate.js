#!/usr/bin/env node
/**
 * The translation engine (playbook §6.7).
 *
 * This is the ONLY place in the repository that is allowed to contact the AI
 * API. The Astro build never does — it reads committed JSON and nothing else
 * (src/i18n/content.ts), so `npm run build` stays deterministic, offline and
 * CI-safe with no API key present.
 *
 * Architecture
 *   src/i18n/content/en/<page>.json     master — hand-authored, never written here
 *   src/i18n/content/<loc>/<page>.json  target — generated/updated here
 *   scripts/.translation-cache.json     segment cache, keyed by
 *                                       sha256("<model>|<locale>|<sourceText>")
 *
 * Authority order for any one segment (highest first):
 *   1. the committed target file  — a human edited it; it is the truth
 *   2. the cache                  — a previous run produced it
 *   3. the API                    — only for segments neither 1 nor 2 covers
 *
 * That ordering is what makes the first run on an already-translated page cost
 * nothing: the committed Italian is seeded INTO the cache rather than being
 * retranslated over the top of it.
 *
 * Usage
 *   node scripts/translate.js --all
 *   node scripts/translate.js --locale it --page why-cozelos-data
 *   node scripts/translate.js --all --dry-run     (no API call, no key needed)
 *   node scripts/translate.js --check             (no API call, no key needed)
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";

/* ------------------------------------------------------------------ config */

/** Verified against the current Anthropic model list (claude-api skill, 2026-08). */
const MODEL = "claude-opus-5";
/** USD per 1M tokens for MODEL — used only by --dry-run's estimate. */
const PRICE = { input: 5.0, output: 25.0 };

const CONTENT_ROOT = "src/i18n/content";
const LOCALE_REGISTRY = "src/data/i18n.ts";
const GLOSSARY_PATH = "src/i18n/glossary.json";
const CACHE_PATH = "scripts/.translation-cache.json";
const CACHE_VERSION = 1;

/** Max source characters bundled into a single API request. */
const CHUNK_CHARS = 4000;
const MAX_TOKENS = 16000;

/* ------------------------------------------------------------------- utils */

const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));
const clone = (o) => JSON.parse(JSON.stringify(o));
const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

/** sha256("<model>|<locale>|<sourceText>") — the segment cache key. */
const segmentHash = (model, locale, source) =>
  createHash("sha256").update(`${model}|${locale}|${source}`).digest("hex");

/** ["hero","title"] -> "hero.title";  ["contrast",0,"asset"] -> "contrast[0].asset" */
const renderPath = (path) =>
  path.map((p, i) => (typeof p === "number" ? `[${p}]` : i === 0 ? p : `.${p}`)).join("");

const getAt = (obj, path) => path.reduce((n, k) => (n == null ? undefined : n[k]), obj);
const setAt = (obj, path, value) => {
  let n = obj;
  for (let i = 0; i < path.length - 1; i++) n = n[path[i]];
  n[path[path.length - 1]] = value;
};

/** Every leaf of a content object, in document order. */
function leaves(node, path = [], out = []) {
  if (Array.isArray(node)) node.forEach((v, i) => leaves(v, [...path, i], out));
  else if (node && typeof node === "object")
    for (const [k, v] of Object.entries(node)) leaves(v, [...path, k], out);
  else out.push({ path, key: renderPath(path), value: node });
  return out;
}

/* ------------------------------------------- non-translatable classification */

/** Keys whose value is data, not prose (mirrors scripts/i18n-check.mjs). */
const NON_TRANSLATABLE_KEYS = new Set(["n", "icon", "href", "url"]);
/**
 * Keys whose value is an identifier even when it is shaped like an English
 * word — the only place a hyphen-joined value is protected without carrying a
 * path separator. Genuine bare slugs must live under one of these.
 */
const IDENTIFIER_KEYS = new Set(["slug", "id", "key", "route", "path", "anchor", "ref"]);
const ASSET_RE = /\.(png|jpe?g|gif|svg|webp|avif|ico|mp4|webm|pdf|woff2?|css|js|json)$/i;
/** A whole value that is a bare slug or path: "/services/", "why-cozelos-data". */
const SLUG_RE = /^\/?[a-z0-9]+(?:[-_./][a-z0-9]+)*\/?$/;
/**
 * Punctuation that ordinary prose never contains inside a single unspaced word.
 * A hyphen is deliberately NOT here: English compounds freely — "one-time",
 * "end-to-end", "out-of-the-box" are copy, not identifiers.
 */
const PATH_PUNCT_RE = /[_/.]/;

/**
 * Playbook §6.7: protected classes are copied from the master verbatim and are
 * never shown to the model. The reason is returned so --dry-run can show which
 * class caught a value — silent protection of real copy is the failure mode.
 */
function protectedReason(path, value) {
  if (typeof value !== "string") return "non-string";
  if (!value.trim()) return "empty";
  const last = path[path.length - 1];
  if (path.some((p) => typeof p === "string" && p.startsWith("__"))) return "__ key";
  if (typeof last === "string" && NON_TRANSLATABLE_KEYS.has(last)) return `key "${last}"`;
  if (ASSET_RE.test(value)) return "asset path";
  if (!/\s/.test(value) && SLUG_RE.test(value)) {
    // "/services/", "docs/pricing", "web_design", "v1.2": a path or programmatic
    // separator settles it — this is an identifier, whatever key it sits under.
    if (PATH_PUNCT_RE.test(value)) return "bare slug";
    // Hyphens alone do not. "one-time" is copy; "why-cozelos-data" is a slug,
    // and nothing in the value distinguishes them — so the key has to say so.
    if (typeof last === "string" && IDENTIFIER_KEYS.has(last)) return `identifier key "${last}"`;
  }
  return null;
}

/** Master segments the engine is allowed to translate. */
const translatableSegments = (master) =>
  leaves(master).filter((s) => protectedReason(s.path, s.value) === null);

/* ---------------------------------------------------------------- registry */

/** Locales come from src/data/i18n.ts — one source of truth, no second list. */
function loadLocales() {
  const src = readFileSync(LOCALE_REGISTRY, "utf8");
  const start = src.indexOf("export const LOCALES");
  const block = src.slice(start, src.indexOf("export const DEFAULT_LOCALE"));
  const locales = [...block.matchAll(/code:\s*"([^"]+)"[^}]*?name:\s*"([^"]+)"/g)].map((m) => ({
    code: m[1],
    name: m[2],
  }));
  const master = /DEFAULT_LOCALE\s*=\s*"([^"]+)"/.exec(src)?.[1] ?? "en";
  if (!locales.length) throw new Error(`Could not parse LOCALES from ${LOCALE_REGISTRY}`);
  return { locales, master };
}

const masterPages = (master) =>
  readdirSync(join(CONTENT_ROOT, master))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();

const targetPath = (locale, page) => join(CONTENT_ROOT, locale, `${page}.json`);

/* ------------------------------------------------------------------- cache */

function loadCache() {
  if (!existsSync(CACHE_PATH)) return { version: CACHE_VERSION, entries: {} };
  try {
    const raw = readJson(CACHE_PATH);
    if (raw.version !== CACHE_VERSION || typeof raw.entries !== "object")
      return { version: CACHE_VERSION, entries: {} };
    return raw;
  } catch {
    console.log(c.yellow(`  ! ${CACHE_PATH} unreadable — starting a fresh cache`));
    return { version: CACHE_VERSION, entries: {} };
  }
}

function saveCache(cache) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  const entries = Object.fromEntries(
    Object.entries(cache.entries).sort(([a], [b]) => (a < b ? -1 : 1)),
  );
  writeFileSync(CACHE_PATH, JSON.stringify({ ...cache, entries }, null, 2) + "\n", "utf8");
}

/**
 * First-run seeding (playbook §6.7). Binds every segment of an existing,
 * human-authored target file to sha256(model|locale|masterText) so an
 * already-translated page reports as translated instead of pending — WITHOUT
 * rewriting that file. A committed value always outranks a stale cache entry.
 */
function seedFromCommitted(cache, { master, locales, pages }) {
  const report = [];
  for (const { code: locale } of locales.filter((l) => l.code !== master)) {
    for (const page of pages) {
      const tf = targetPath(locale, page);
      if (!existsSync(tf)) continue;
      const src = readJson(join(CONTENT_ROOT, master, `${page}.json`));
      const tgt = readJson(tf);
      const row = { locale, page, seeded: 0, corrected: 0, confirmed: 0, missing: 0, total: 0 };
      for (const seg of translatableSegments(src)) {
        row.total++;
        const committed = getAt(tgt, seg.path);
        if (typeof committed !== "string" || !committed.trim()) {
          row.missing++;
          continue;
        }
        const h = segmentHash(MODEL, locale, seg.value);
        const prev = cache.entries[h];
        if (!prev) row.seeded++;
        // Committed text outranks a stale cache entry, and outranks an entry of
        // equal text that was only ever attributed to the API.
        else if (prev.target !== committed || prev.origin !== "committed") row.corrected++;
        else {
          row.confirmed++;
          continue;
        }
        cache.entries[h] = {
          model: MODEL,
          locale,
          source: seg.value,
          target: committed,
          origin: "committed",
          at: new Date().toISOString(),
        };
      }
      report.push(row);
    }
  }
  return report;
}

/* -------------------------------------------------------------- validation */

const PLACEHOLDER_RE = /\{\{?[a-zA-Z0-9_.]+\}?\}/g;
const TAG_RE = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
const SIGNIFICANT_ATTRS = ["href", "src", "class", "id", "target", "rel", "aria-label"];

/**
 * The full tag sequence, in order, with significant attributes — not an <a>
 * count. Catches a reordered link, a dropped </strong>, a rewritten class and
 * a translated href, all of which a count-based check waves through.
 */
function tagSequence(s) {
  return [...String(s).matchAll(TAG_RE)].map((m) => {
    if (m[0].startsWith("</")) return `</${m[1]}>`;
    const attrs = [...m[2].matchAll(/([a-zA-Z-]+)="([^"]*)"/g)]
      .filter((a) => SIGNIFICANT_ATTRS.includes(a[1]))
      .map((a) => `${a[1]}="${a[2]}"`)
      .sort();
    return `<${m[1]}${attrs.length ? " " + attrs.join(" ") : ""}>`;
  });
}

const placeholders = (s) => (String(s).match(PLACEHOLDER_RE) ?? []).sort();

/** Verbatim terms (string values) and pinned per-locale terms (object values). */
function loadGlossary(locale) {
  const g = readJson(GLOSSARY_PATH);
  const verbatim = [];
  const pinned = [];
  for (const [term, value] of Object.entries(g)) {
    if (term.startsWith("__")) continue;
    if (typeof value === "string") verbatim.push(term);
    else if (value && typeof value === "object" && value[locale]) pinned.push([term, value[locale]]);
  }
  verbatim.sort((a, b) => b.length - a.length);
  pinned.sort((a, b) => b[0].length - a[0].length);
  return { verbatim, pinned };
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const containsTerm = (haystack, term, { caseSensitive = true } = {}) =>
  new RegExp(
    `(^|[^\\p{L}\\p{N}])${esc(term)}([^\\p{L}\\p{N}]|$)`,
    caseSensitive ? "u" : "iu",
  ).test(haystack);

/**
 * Validate one target object against the master. Hard problems block the write;
 * soft problems are advisory.
 *
 * Pinned-term drift is SOFT on purpose: English homographs make it unreliable
 * as a gate ("we lead with strategy" is the verb, not the noun "lead"), so it
 * is enforced in the prompt and surfaced here for a human to judge. Verbatim
 * compliance and brand terms ARE hard — they are legal identifiers, not prose.
 */
function validate(masterObj, targetObj, locale) {
  const hard = [];
  const soft = [];
  const { verbatim, pinned } = loadGlossary(locale);

  const mPaths = leaves(masterObj).map((l) => l.key).sort();
  const tPaths = leaves(targetObj).map((l) => l.key).sort();
  if (mPaths.join("\n") !== tPaths.join("\n")) {
    const missing = mPaths.filter((p) => !tPaths.includes(p));
    const extra = tPaths.filter((p) => !mPaths.includes(p));
    hard.push(
      "key-path mirror mismatch" +
        (missing.length ? ` — missing: ${missing.slice(0, 5).join(", ")}` : "") +
        (extra.length ? ` — unexpected: ${extra.slice(0, 5).join(", ")}` : ""),
    );
  }

  for (const seg of leaves(masterObj)) {
    const t = getAt(targetObj, seg.path);
    const reason = protectedReason(seg.path, seg.value);
    if (reason) {
      if (t !== seg.value)
        hard.push(`non-translatable drift at ${seg.key} (${reason}): ${JSON.stringify(t)}`);
      continue;
    }
    if (typeof t !== "string" || !t.trim()) {
      hard.push(`empty translation at ${seg.key}`);
      continue;
    }

    const ps = placeholders(seg.value);
    const pt = placeholders(t);
    if (ps.join("|") !== pt.join("|"))
      hard.push(`placeholder parity at ${seg.key}: ${ps.join(" ") || "—"} vs ${pt.join(" ") || "—"}`);

    const ts = tagSequence(seg.value);
    const tt = tagSequence(t);
    if (ts.join("|") !== tt.join("|"))
      hard.push(`HTML tag-sequence at ${seg.key}: ${ts.join(" ")} vs ${tt.join(" ")}`);

    for (const term of verbatim)
      if (containsTerm(seg.value, term) && !containsTerm(t, term))
        hard.push(`glossary (verbatim) "${term}" lost at ${seg.key}`);

    for (const [term, want] of pinned)
      if (
        containsTerm(seg.value, term, { caseSensitive: false }) &&
        !containsTerm(t, want, { caseSensitive: false })
      )
        soft.push(`glossary (pinned) "${term}" -> "${want}" not found at ${seg.key}`);
  }
  return { hard, soft };
}

/* ------------------------------------------------------------------ status */

/** Per-segment authority: committed > cache > pending. */
function planPage({ master, locale, page, cache }) {
  const src = readJson(join(CONTENT_ROOT, master, `${page}.json`));
  const tf = targetPath(locale, page);
  const tgt = existsSync(tf) ? readJson(tf) : null;
  const committed = [];
  const cached = [];
  const pending = [];
  for (const seg of translatableSegments(src)) {
    const have = tgt ? getAt(tgt, seg.path) : undefined;
    if (typeof have === "string" && have.trim()) {
      committed.push({ ...seg, target: have });
      continue;
    }
    const hit = cache.entries[segmentHash(MODEL, locale, seg.value)];
    if (hit) cached.push({ ...seg, target: hit.target });
    else pending.push(seg);
  }
  const prot = leaves(src).filter((s) => protectedReason(s.path, s.value) !== null);
  return { src, tgt, tf, committed, cached, pending, protected: prot };
}

/** Assemble the target from master + resolved segments. Protected values are copied. */
function assemble(src, resolved) {
  const out = clone(src);
  for (const seg of translatableSegments(src)) {
    if (resolved.has(seg.key)) setAt(out, seg.path, resolved.get(seg.key));
  }
  return out;
}

/* --------------------------------------------------------------------- API */

const estimateTokens = (chars) => Math.ceil(chars / 3.5);

function systemPrompt(localeName, locale) {
  const { verbatim, pinned } = loadGlossary(locale);
  return [
    `You are a professional marketing translator localizing website copy from English (the master language) into ${localeName}.`,
    "",
    `You receive a JSON object mapping opaque segment ids to English strings. Return a JSON object with EXACTLY the same ids, each mapped to the ${localeName} translation. No commentary, no extra keys, no missing keys.`,
    "",
    "Rules:",
    "1. Translate meaning and persuasive register, not words. This is premium agency copy — it must read as if written natively, not translated.",
    "2. Preserve every HTML tag, attribute and URL EXACTLY as written, in the same order. Never translate an href, a class name or a URL.",
    "3. Preserve every {placeholder} token exactly.",
    `4. Use the typographic conventions of ${localeName} for quotes and dashes.`,
    "5. Never translate these terms — reproduce them verbatim, in English:",
    verbatim.map((t) => `   - ${t}`).join("\n"),
    "6. Use these pinned translations wherever the English term appears in its terminology sense (inflect naturally for grammar):",
    pinned.map(([en, tr]) => `   - "${en}" -> "${tr}"`).join("\n"),
    "7. Keep string length in the same neighbourhood as the source — this copy sits in a fixed layout.",
  ].join("\n");
}

function chunk(segments) {
  const out = [];
  let cur = [];
  let size = 0;
  for (const s of segments) {
    if (cur.length && size + s.value.length > CHUNK_CHARS) {
      out.push(cur);
      cur = [];
      size = 0;
    }
    cur.push(s);
    size += s.value.length;
  }
  if (cur.length) out.push(cur);
  return out;
}

/**
 * One API request per chunk. Structured output pins the response schema to the
 * source segment ids, so a malformed shape can't reach the validator.
 * The SDK is imported lazily by the caller: nothing else in this file (and
 * nothing in the Astro build) loads it, so --check and --dry-run never need a key.
 */
async function translateChunk(client, segs, localeName, locale, usage) {
  const payload = Object.fromEntries(segs.map((s) => [s.key, s.value]));
  const schema = {
    type: "object",
    properties: Object.fromEntries(segs.map((s) => [s.key, { type: "string" }])),
    required: segs.map((s) => s.key),
    additionalProperties: false,
  };
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: systemPrompt(localeName, locale),
    messages: [{ role: "user", content: JSON.stringify(payload, null, 2) }],
    output_config: { effort: "high", format: { type: "json_schema", schema } },
  });
  usage.input += res.usage?.input_tokens ?? 0;
  usage.output += res.usage?.output_tokens ?? 0;
  if (res.stop_reason === "refusal")
    throw new Error(`API refused the request (${res.stop_details?.category ?? "unknown"})`);
  const text = res.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("");
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Model returned non-JSON output:\n${text.slice(0, 400)}`);
  }
  for (const s of segs)
    if (typeof parsed[s.key] !== "string" || !parsed[s.key].trim())
      throw new Error(`Structured output missing segment "${s.key}"`);
  return parsed;
}

/* --------------------------------------------------------------- commands */

function cmdCheck({ master, locales, pages }) {
  console.log(c.bold("\ntranslate --check  ") + c.dim("(no API, no key required)\n"));
  let hardTotal = 0;
  let softTotal = 0;
  let checked = 0;
  for (const { code: locale } of locales.filter((l) => l.code !== master)) {
    for (const page of pages) {
      const tf = targetPath(locale, page);
      if (!existsSync(tf)) {
        console.log(c.dim(`  – ${locale}/${page}: not translated (falls back to master)`));
        continue;
      }
      checked++;
      const { hard, soft } = validate(
        readJson(join(CONTENT_ROOT, master, `${page}.json`)),
        readJson(tf),
        locale,
      );
      hardTotal += hard.length;
      softTotal += soft.length;
      if (hard.length) {
        console.log(c.red(`  ✗ ${locale}/${page}`));
        hard.forEach((p) => console.log(`      ${c.red("hard")} ${p}`));
      } else {
        console.log(
          c.green(`  ✓ ${locale}/${page}`) +
            c.dim(" — structure, placeholders, HTML and glossary OK"),
        );
      }
      soft.forEach((p) => console.log(`      ${c.yellow("warn")} ${p}`));
    }
  }
  console.log(
    `\n${hardTotal ? c.red("CHECK FAILED") : c.green("CHECK PASSED")} — ${checked} translated file(s), ` +
      `${hardTotal} hard problem(s), ${softTotal} advisory.`,
  );
  return hardTotal ? 1 : 0;
}

function cmdDryRun(jobs, { master, cache }) {
  console.log(c.bold("\ntranslate --dry-run  ") + c.dim("(no API call, no key required)\n"));
  let pendingTotal = 0;
  let chars = 0;
  for (const { locale, page } of jobs) {
    const p = planPage({ master, locale, page, cache });
    pendingTotal += p.pending.length;
    chars += p.pending.reduce((n, s) => n + s.value.length, 0);
    const total = p.committed.length + p.cached.length + p.pending.length;
    const state = p.pending.length ? c.yellow(`${p.pending.length} pending`) : c.green("up to date");
    console.log(
      `  ${locale}/${page}: ${state} ${c.dim(
        `— ${total} translatable segment(s): ${p.committed.length} committed, ${p.cached.length} cached, ` +
          `${p.pending.length} pending; ${p.protected.length} protected`,
      )}`,
    );
    p.pending
      .slice(0, 12)
      .forEach((s) =>
        console.log(
          c.dim(`      · ${s.key}  "${s.value.slice(0, 60)}${s.value.length > 60 ? "…" : ""}"`),
        ),
      );
    if (p.pending.length > 12) console.log(c.dim(`      · … ${p.pending.length - 12} more`));
  }
  if (!pendingTotal) {
    console.log(c.green("\nNothing to translate. Estimated cost: $0.00 — no API call would be made."));
    return 0;
  }
  const nChunks = Math.max(1, Math.ceil(chars / CHUNK_CHARS));
  const inTok = estimateTokens(chars) + estimateTokens(systemPrompt("target", "it").length) * nChunks;
  const outTok = Math.ceil(estimateTokens(chars) * 1.15);
  const cost = (inTok / 1e6) * PRICE.input + (outTok / 1e6) * PRICE.output;
  console.log(
    `\n${pendingTotal} pending segment(s), ~${chars} source characters, ${nChunks} request(s) to ${MODEL}.` +
      `\nEstimated cost: ${c.bold("$" + cost.toFixed(4))} ${c.dim(
        `(~${inTok} in / ~${outTok} out tokens, character heuristic — no API call was made)`,
      )}`,
  );
  return 0;
}

async function cmdTranslate(jobs, { master, locales, cache }) {
  const planned = jobs.map(({ locale, page }) => ({
    locale,
    page,
    plan: planPage({ master, locale, page, cache }),
  }));
  const needsApi = planned.some((j) => j.plan.pending.length);
  let client = null;
  if (needsApi) {
    // Lazy — never loaded by --check or --dry-run, and never by the Astro build.
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    try {
      client = new Anthropic();
    } catch (e) {
      console.error(
        c.red(`\nNo API credentials. Set ANTHROPIC_API_KEY (or run \`ant auth login\`).\n${e.message}`),
      );
      return 1;
    }
  }

  const usage = { input: 0, output: 0 };
  let failed = 0;
  let written = 0;
  let unchanged = 0;
  for (const { locale, page, plan } of planned) {
    const localeName = locales.find((l) => l.code === locale)?.name ?? locale;
    console.log(c.bold(`\n${locale}/${page}`));
    console.log(
      c.dim(
        `  ${plan.committed.length} committed · ${plan.cached.length} cached · ` +
          `${plan.pending.length} pending · ${plan.protected.length} protected`,
      ),
    );

    const resolved = new Map([...plan.committed, ...plan.cached].map((s) => [s.key, s.target]));
    let broke = false;
    try {
      for (const [i, group] of chunk(plan.pending).entries()) {
        console.log(c.dim(`  → request ${i + 1}: ${group.length} segment(s)`));
        const out = await translateChunk(client, group, localeName, locale, usage);
        for (const s of group) {
          resolved.set(s.key, out[s.key]);
          cache.entries[segmentHash(MODEL, locale, s.value)] = {
            model: MODEL,
            locale,
            source: s.value,
            target: out[s.key],
            origin: "api",
            at: new Date().toISOString(),
          };
        }
      }
    } catch (e) {
      console.log(c.red(`  ✗ translation failed: ${e.message}`));
      failed++;
      broke = true;
    }
    if (broke) continue;

    const next = assemble(plan.src, resolved);
    const { hard, soft } = validate(plan.src, next, locale);
    soft.forEach((p) => console.log(`      ${c.yellow("warn")} ${p}`));
    if (hard.length) {
      console.log(c.red("  ✗ validation failed — target NOT written"));
      hard.forEach((p) => console.log(`      ${c.red("hard")} ${p}`));
      failed++;
      continue;
    }
    if (plan.tgt && JSON.stringify(plan.tgt) === JSON.stringify(next)) {
      console.log(c.green("  ✓ already up to date — file untouched"));
      unchanged++;
    } else {
      mkdirSync(dirname(plan.tf), { recursive: true });
      writeFileSync(plan.tf, JSON.stringify(next, null, 2) + "\n", "utf8");
      console.log(c.green(`  ✓ wrote ${plan.tf}`));
      written++;
    }
  }

  saveCache(cache);
  const cost = (usage.input / 1e6) * PRICE.input + (usage.output / 1e6) * PRICE.output;
  console.log(
    `\n${failed ? c.red("TRANSLATE FAILED") : c.green("TRANSLATE OK")} — ` +
      `${written} written, ${unchanged} unchanged, ${failed} failed.` +
      (usage.input || usage.output
        ? `\nAPI usage: ${usage.input} in / ${usage.output} out tokens — $${cost.toFixed(4)}`
        : "\nNo API call was made (everything resolved from committed files and the cache)."),
  );
  return failed ? 1 : 0;
}

/* -------------------------------------------------------------------- main */

function parseArgs(argv) {
  const a = { all: false, locale: null, page: null, dryRun: false, check: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === "--all") a.all = true;
    else if (v === "--locale") a.locale = argv[++i];
    else if (v === "--page") a.page = argv[++i];
    else if (v === "--dry-run") a.dryRun = true;
    else if (v === "--check") a.check = true;
    else if (v === "--help" || v === "-h") a.help = true;
    else if (v.startsWith("--locale=")) a.locale = v.slice("--locale=".length);
    else if (v.startsWith("--page=")) a.page = v.slice("--page=".length);
    else throw new Error(`Unknown argument: ${v}`);
  }
  return a;
}

const HELP = `
translate — the ONLY place that contacts the AI API (playbook §6.7)

  --all                translate every page into every non-master locale
  --locale <locale>    restrict to one target locale
  --page <page>        restrict to one page key
  --dry-run            report pending segments + estimated cost, no API call
  --check              validate committed translations, no API call, no key

Authority order per segment: committed target > cache > API.
Cache: ${CACHE_PATH} (sha256 of "model|locale|sourceText").
`;

async function main() {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(c.red(e.message) + HELP);
    process.exit(2);
  }
  if (args.help || process.argv.length === 2) {
    console.log(HELP);
    process.exit(0);
  }

  const { locales, master } = loadLocales();
  const pages = masterPages(master);
  const targets = locales.filter((l) => l.code !== master).map((l) => l.code);

  if (args.locale && !targets.includes(args.locale)) {
    console.error(c.red(`Unknown target locale "${args.locale}". Known: ${targets.join(", ")}`));
    process.exit(2);
  }
  if (args.page && !pages.includes(args.page)) {
    console.error(c.red(`Unknown page "${args.page}". Known: ${pages.join(", ")}`));
    process.exit(2);
  }

  // Seeding runs before every command, in memory, so the very first --dry-run
  // already sees committed translations as translated.
  const cache = loadCache();
  const before = Object.keys(cache.entries).length;
  const seeded = seedFromCommitted(cache, { master, locales, pages });
  const after = Object.keys(cache.entries).length;
  if (seeded.length) {
    console.log(c.bold("\ncache seeding from committed translations"));
    for (const r of seeded)
      console.log(
        c.dim(
          `  ${r.locale}/${r.page}: ${r.total} translatable · ${r.seeded} newly seeded · ` +
            `${r.corrected} corrected (committed outranks cache) · ${r.confirmed} already bound` +
            (r.missing ? ` · ${r.missing} missing in target` : ""),
        ),
      );
    console.log(c.dim(`  cache: ${before} -> ${after} entr(ies)`));
  }

  if (args.check) {
    const code = cmdCheck({ master, locales, pages });
    saveCache(cache);
    process.exit(code);
  }

  if (!args.all && !args.locale && !args.page) {
    console.error(c.red("\nNothing selected. Pass --all, or --locale/--page. See --help."));
    process.exit(2);
  }
  const jobs = [];
  for (const locale of args.locale ? [args.locale] : targets)
    for (const page of args.page ? [args.page] : pages) jobs.push({ locale, page });

  // --dry-run is deliberately read-only: it does not persist the seeded cache.
  if (args.dryRun) process.exit(cmdDryRun(jobs, { master, cache }));
  process.exit(await cmdTranslate(jobs, { master, locales, cache }));
}

/** Exported for scripts/translate.test.mjs — importing must not run the CLI. */
export { protectedReason, translatableSegments };

const isEntrypoint =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isEntrypoint)
  main().catch((e) => {
    console.error(c.red(e.stack ?? String(e)));
    process.exit(1);
  });
