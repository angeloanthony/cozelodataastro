// Structural validator (playbook §6.7 principle 4 / §7 step 9).
// No API, no network, no build. Fails loudly on structural drift.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
const ROOT = "src/i18n/content", MASTER = "en";
const paths = (o, p = "") =>
  Array.isArray(o) ? o.flatMap((v, i) => paths(v, `${p}[]`))
  : o && typeof o === "object" ? Object.entries(o).flatMap(([k, v]) => paths(v, `${p}.${k}`))
  : [p];
const NON_TRANSLATABLE = ["n", "icon", "href", "url"];
/**
 * Identifier protection — parity with IDENTIFIER_KEYS in scripts/translate.js.
 *
 * translate.js copies these keys verbatim and never shows them to the model, so
 * the engine cannot corrupt them. Nothing was checking the other direction: a
 * hand-edited locale file could translate an `id` or a `slug` and the engine
 * would never revisit it (the master segment is unchanged, so it stays cached)
 * while this validator saw only a string-vs-string difference and passed.
 *
 * That gap becomes load-bearing now that FAQ and category ids exist: an id is a
 * join key, and a translated join key drops content silently instead of
 * failing. So drift is a failure here, matching what translate.js protects.
 */
const IDENTIFIER_KEYS = ["slug", "id", "key", "route", "path", "anchor", "ref"];
/** Mirrors translate.js SLUG_RE: a whole value that is a bare slug or path. */
const SLUG_RE = /^\/?[a-z0-9]+(?:[-_./][a-z0-9]+)*\/?$/;
/**
 * translate.js protects an identifier key only when the value actually looks
 * like an identifier — `{ key: "Our promise" }` is copy and stays translatable.
 * Same predicate here, so the two files agree on every value, not just on the
 * key list.
 */
const isIdentifier = (k, v) =>
  IDENTIFIER_KEYS.includes(k) && typeof v === "string" && !/\s/.test(v) && SLUG_RE.test(v);
let fail = 0, checked = 0;
const locales = readdirSync(ROOT).filter((l) => l !== MASTER);
for (const page of readdirSync(join(ROOT, MASTER))) {
  const key = page.replace(/\.json$/, "");
  const m = JSON.parse(readFileSync(join(ROOT, MASTER, page), "utf8"));
  for (const loc of locales) {
    const f = join(ROOT, loc, page);
    if (!existsSync(f)) { console.log(`  – ${loc}/${key}: not translated (falls back to master)`); continue; }
    checked++;
    const t = JSON.parse(readFileSync(f, "utf8"));
    const a = paths(m).sort().join("\n"), b = paths(t).sort().join("\n");
    const problems = [];
    if (a !== b) problems.push("key-path mirror mismatch");
    const walk = (x, y, at = "") => {
      if (Array.isArray(x)) {
        if (!Array.isArray(y) || x.length !== y.length) problems.push(`array length ${at}`);
        else x.forEach((v, i) => walk(v, y[i], `${at}[${i}]`));
      } else if (x && typeof x === "object") {
        for (const k of Object.keys(x)) {
          if (NON_TRANSLATABLE.includes(k) && x[k] !== y?.[k]) problems.push(`non-translatable "${k}" drifted at ${at}`);
          if (isIdentifier(k, x[k]) && x[k] !== y?.[k]) problems.push(`identifier "${k}" drifted at ${at}: "${x[k]}" -> "${y?.[k]}"`);
          walk(x[k], y?.[k], `${at}.${k}`);
        }
      } else if (typeof x === "string" && at.endsWith("Html")) {
        const c = (s) => (s.match(/<a\b/g) || []).length;
        if (c(x) !== c(y ?? "")) problems.push(`HTML tag parity at ${at}`);
      }
    };
    walk(m, t);
    if (problems.length) { fail++; console.log(`  ✗ ${loc}/${key}: ${problems.join("; ")}`); }
    else console.log(`  ✓ ${loc}/${key}: structure mirrors master`);
  }
}
// ---------------------------------------------------------------------------
// Shared-content ownership (playbook section 2, domain 3).
//
// The en/it mirror above already covers shared.json - it is a file in the
// content directory like any other, so a missing or extra key fails as a
// key-path mismatch. What that check CANNOT see is drift against the module
// that owns the data: add a seventh service to src/data/site.ts and both
// locales stay internally consistent while the new service silently renders
// its untranslated English title everywhere.
//
// So the join itself is validated: every service slug in site.ts must have an
// entry in the master shared.json, and shared.json must not carry entries for
// services that no longer exist. Slugs are matched, never array indexes and
// never English strings.
const SITE = "src/data/site.ts";
const SHARED = join(ROOT, MASTER, "shared.json");
if (existsSync(SHARED) && existsSync(SITE)) {
  const src = readFileSync(SITE, "utf8");
  const start = src.indexOf("export const services");
  const block = src.slice(start, src.indexOf("export const", start + 10));
  const slugs = [...block.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  const keys = Object.keys(JSON.parse(readFileSync(SHARED, "utf8")).services ?? {});
  const missing = slugs.filter((x) => !keys.includes(x));
  const orphan = keys.filter((k) => !slugs.includes(k));
  if (!slugs.length) {
    fail++;
    console.log(`  x shared/services: could not parse services from ${SITE}`);
  } else if (missing.length || orphan.length) {
    fail++;
    console.log(
      `  x shared/services: ` +
        [
          missing.length ? `missing in shared.json: ${missing.join(", ")}` : "",
          orphan.length ? `not in ${SITE}: ${orphan.join(", ")}` : "",
        ].filter(Boolean).join("; "),
    );
  } else {
    console.log(`  \u2713 shared/services: ${slugs.length} slug(s) match ${SITE}`);
  }
}

console.log(`\n${fail ? "CHECK FAILED" : "CHECK PASSED"} — ${checked} translated file(s) validated`);
process.exit(fail ? 1 : 0);
