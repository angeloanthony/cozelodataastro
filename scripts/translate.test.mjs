#!/usr/bin/env node
/**
 * Protection-class tests for the translation engine (playbook §6.7).
 *
 * The classifier is the engine's only line of defence in both directions:
 *   - under-protection corrupts identifiers (a translated href breaks a route)
 *   - over-protection leaks English into a translated page — the Step 15 defect,
 *     where "one-time" was read as a bare slug and shipped verbatim to /it/.
 *
 * So every case below is paired: a thing that MUST be protected next to the
 * ordinary copy it must not swallow.
 *
 *   node scripts/translate.test.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { protectedReason } from "./translate.js";

const CONTENT_ROOT = "src/i18n/content";
let pass = 0;
const failures = [];

const check = (name, ok, detail) => {
  if (ok) pass++;
  else failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

/** The value at `path` must be handed to the translator. */
function translatable(path, value) {
  const r = protectedReason(path, value);
  check(`translatable ${path.join(".")} = ${JSON.stringify(value)}`, r === null, `protected as "${r}"`);
}

/** The value at `path` must be copied verbatim from the master. */
function protectedValue(path, value) {
  const r = protectedReason(path, value);
  check(`protected ${path.join(".")} = ${JSON.stringify(value)}`, r !== null, "was classified translatable");
}

/* ---- the Step 15 defect: ordinary hyphenated copy is not an identifier ---- */

translatable(["tiers", 0, "suffix"], "one-time");
translatable(["tiers", 0, "suffix"], "One-Time");
translatable(["hero", "lead"], "end-to-end");
translatable(["hero", "lead"], "out-of-the-box");
translatable(["hero", "lead"], "full-stack");
translatable(["hero", "lead"], "e-commerce");
translatable(["hero", "lead"], "state-of-the-art");
translatable(["hero", "lead"], "long-term");
translatable(["hero", "lead"], "data-driven");
translatable(["stat"], "24-7");

/* ---- Step 15's other fix: "/month" was punctuation, not a path ---- */

translatable(["perMonth"], "month");
translatable(["perMonth"], "mese");
// If the "/" ever comes back into the value it IS a path again, by design.
protectedValue(["perMonth"], "/month");

/* ---- genuine identifiers stay protected ---- */

protectedValue(["cta", "href"], "/pricing/");
protectedValue(["cta", "href"], "https://cozelosdata.com/contact/");
protectedValue(["cta", "href"], "mailto:hello@cozelosdata.com");
protectedValue(["items", 0, "url"], "/services/web-development/");
protectedValue(["items", 0, "icon"], "target");
protectedValue(["steps", 0, "n"], "01");
protectedValue(["__meta", "note"], "internal only");
protectedValue(["hero", "__source"], "site.ts");

// bare slugs and paths — settled by the separator, under any key
protectedValue(["hero", "eyebrow"], "/services/");
protectedValue(["hero", "eyebrow"], "why-cozelos-data/");
protectedValue(["hero", "eyebrow"], "docs/pricing");
protectedValue(["hero", "eyebrow"], "web_design");
protectedValue(["hero", "eyebrow"], "og.default.image");

// bare slugs with no separator — the key has to declare them
protectedValue(["services", 0, "slug"], "why-cozelos-data");
protectedValue(["services", 0, "slug"], "web-development");
protectedValue(["faqs", 0, "id"], "how-long-does-it-take");
protectedValue(["categories", 0, "key"], "one-time");
protectedValue(["nav", 0, "route"], "our-approach");
protectedValue(["section", "anchor"], "book-a-call");
protectedValue(["projects", 0, "ref"], "alta-medicare");

// assets stay protected wherever they sit
protectedValue(["hero", "image"], "/images/hero.webp");
protectedValue(["hero", "image"], "hero.png");
protectedValue(["og"], "og-image.jpg");

// non-strings and blanks are not the translator's business
protectedValue(["tiers", 0, "highlight"], true);
protectedValue(["tiers", 0, "rank"], 3);
protectedValue(["note"], "   ");

/* ---- regression: every value protected before the change, except the
       hyphen-only ones we deliberately released, is still protected ---- */

const PRE_FIX_KEYS = new Set(["n", "icon", "href", "url"]);
const PRE_FIX_ASSET = /\.(png|jpe?g|gif|svg|webp|avif|ico|mp4|webm|pdf|woff2?|css|js|json)$/i;
const PRE_FIX_SLUG = /^\/?[a-z0-9]+(?:[-_./][a-z0-9]+)*\/?$/;
const preFixReason = (path, value) => {
  if (typeof value !== "string") return "non-string";
  if (!value.trim()) return "empty";
  const last = path[path.length - 1];
  if (path.some((p) => typeof p === "string" && p.startsWith("__"))) return "__ key";
  if (typeof last === "string" && PRE_FIX_KEYS.has(last)) return `key "${last}"`;
  if (PRE_FIX_ASSET.test(value)) return "asset path";
  if (!/\s/.test(value) && /[-_./]/.test(value) && PRE_FIX_SLUG.test(value)) return "bare slug";
  return null;
};

function leaves(node, path = [], out = []) {
  if (Array.isArray(node)) node.forEach((v, i) => leaves(v, [...path, i], out));
  else if (node && typeof node === "object")
    for (const [k, v] of Object.entries(node)) leaves(v, [...path, k], out);
  else out.push({ path, value: node });
  return out;
}

const released = [];
for (const locale of readdirSync(CONTENT_ROOT)) {
  const dir = join(CONTENT_ROOT, locale);
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const doc = JSON.parse(readFileSync(join(dir, file), "utf8"));
    for (const { path, value } of leaves(doc)) {
      const before = preFixReason(path, value);
      const after = protectedReason(path, value);
      if (before && !after) released.push({ where: `${locale}/${file}`, path, value, before });
      check(
        `no new protection at ${locale}/${file}:${path.join(".")}`,
        !(after && !before),
        `newly protected as "${after}"`,
      );
    }
  }
}

// The ONLY values the fix is allowed to release are hyphen-only, key-unmarked words.
for (const r of released)
  check(
    `released ${r.where}:${r.path.join(".")} = ${JSON.stringify(r.value)}`,
    r.before === "bare slug" && !/[_/.]/.test(r.value) && /-/.test(r.value),
    `unexpected release (was "${r.before}")`,
  );

/* ------------------------------------------------------------------ report */

console.log(`\nreleased by the fix (${released.length}):`);
for (const r of released) console.log(`  ${r.where}  ${r.path.join(".")} = ${JSON.stringify(r.value)}`);

if (failures.length) {
  console.error(`\n\x1b[31mFAIL\x1b[0m — ${failures.length} of ${pass + failures.length} assertion(s)`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`\n\x1b[32mPASS\x1b[0m — ${pass} assertion(s)`);
