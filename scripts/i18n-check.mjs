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
console.log(`\n${fail ? "CHECK FAILED" : "CHECK PASSED"} — ${checked} translated file(s) validated`);
process.exit(fail ? 1 : 0);
