# F10 Layer 2 — read-only diagnosis of the homepage-fallback behaviour

> ## ✅ RESOLVED 2026-08-11 — the §8 hypothesis was correct
>
> Commit `859c89c` deployed `dist/404.html`. **No Cloudflare configuration was changed.**
> Unknown paths now return **HTTP 404** with the real 404 document:
>
> | Request | Before | After |
> | --- | --- | --- |
> | `/definitely-not-a-real-page-xyz/` | 200, homepage, 158,942 B | **404**, `Page Not Found`, 38,738 B |
> | `/a/b/c/deeply/nested/nope/` | 200, homepage | **404** |
> | `/_astro/nope.js` | 200, homepage | **404** |
> | `/images/nope.png` | 200, homepage | **404** |
>
> The cause was exactly what §6 identified: the platform's not-found handling was already in
> **404-page mode**, and the deployment simply had no `404.html` to serve. The absent file
> *was* the bug. The SPA-fallback theory is disproved — the asset server never needed
> reconfiguring.
>
> No regressions: all ten real routes 200, `/services` still 308 → `/services/`, `www` still
> 301 → apex, F1's `/the-cozelos-method/` still 301 → `/our-approach/`, sitemap still 10 URLs.
>
> Two artefacts of the fix, both benign and both recorded in
> [master-map.md](./master-map.md) §3 F10: the document is directly addressable at `/404`
> with a **200** (harmless — it is `noindex, follow` and absent from the sitemap), and
> `/404.html` and `/404/` both **308** → `/404`.
>
> The F8 legacy URLs were untouched, as predicted: `/?page_id=158`, `262` and `866` still
> return the homepage at 200, because they resolve to the real `/` route and were never
> unmatched paths. That decoupling argument is now confirmed in production.
>
> The diagnosis below is preserved unchanged as the record of how this was determined.


**Date:** 2026-08-11 · **Type:** diagnosis only — nothing changed, nothing deployed
**Question:** why does `/definitely-not-a-real-page-xyz` return the homepage with HTTP 200,
and exactly where must that change so it returns HTTP 404?

Companion to [master-map.md](./master-map.md) §3 F10. Layer 1 (the repository-side 404
document) is complete: [src/pages/404.astro](../../src/pages/404.astro) exists and the build
emits `dist/404.html`.

---

## 1. Current serving architecture

```
DNS (Cloudflare nameservers: rick / dorthy.ns.cloudflare.com)
        ↓
Cloudflare edge — proxied (104.21.51.124, 172.67.180.69 + IPv6)
        ↓  zone features rewrite the body: Email Obfuscation, managed robots.txt
Cloudflare first-party static-asset server
        ↓
the Astro `dist/` output
```

There is **no third-party origin**. Every response carries `Server: cloudflare` and a
`CF-RAY`, and no response exposes any other server, `Via`, or `X-Powered-By` header. The
apex and `www` resolve to the same Cloudflare anycast addresses.

The repository contains **no deployment configuration at all** — no `wrangler.toml`,
`_redirects`, `_headers`, `_routes.json`, `netlify.toml`, `vercel.json`, no CI workflow, and
no host adapter in `package.json` (`build` is plain `astro check && astro build`). The
deployment is therefore configured **outside the repository**, in the Cloudflare dashboard.

## 2. Evidence for the origin type

| Observation | Command evidence | What it implies |
| --- | --- | --- |
| `/index.html` → **308** → `/`; `/services/index.html` → **308** → `/services/` | `curl -sI` | Cloudflare's asset router normalising index files — a first-party behaviour |
| `/nope/index.html` → **200** (no 308) | `curl -sI` | Normalisation applies only to assets that exist; unknown paths skip straight to not-found handling |
| `POST /definitely-not-a-real-page-xyz/` → **405** | `curl -X POST` | The asset handler itself rejects the method. A naive custom Worker fallback would have returned the HTML body |
| Real files carry `ETag` + `cf-cache-status: MISS/HIT/REVALIDATED` | `/favicon.svg`, `/robots.txt` | Genuine static objects behind the CDN |
| HTML carries **no `ETag`, no `Content-Length`**, `cf-cache-status: DYNAMIC` | `curl -sI /` | HTML is rewritten in flight at the edge (see §3.1) |
| `Access-Control-Allow-Origin: *`, `x-content-type-options: nosniff` on every response | `curl -sI` | Consistent with Cloudflare's managed asset server defaults |

### Retiring the 2026-08-08 "object storage" inference

The master map previously inferred an R2/S3-style origin from three headers. That inference
should be **withdrawn** — each one has a simpler explanation:

| Header | Previous reading | Better-supported reading |
| --- | --- | --- |
| `/_astro/*` at `max-age=14400, must-revalidate` | a bucket's 4-hour TTL | **Cloudflare's default Browser Cache TTL is 4 hours.** These responses are CDN-cached (`cf-cache-status: MISS`/`EXPIRED`), so the zone setting rewrites their `Cache-Control`. HTML is `DYNAMIC`, escapes the override, and keeps `max-age=0, must-revalidate` |
| `Access-Control-Allow-Origin: *` on HTML | bucket CORS | Cloudflare's asset server sets this by default |
| plain MD5-style `ETag` | bucket object hash | The same format Cloudflare's asset server emits |

A publicly-exposed R2 or S3 bucket also would not answer a missing key with the site's
homepage — it returns an XML `NoSuchKey` error. The observed behaviour is not bucket
behaviour.

## 3. The exact mechanism producing the homepage fallback

**Every unmatched request is served the site's `index.html` object with HTTP 200.**

Six differently-shaped unmatched requests were fetched in full and compared byte-for-byte
against `/`:

| Request | Result |
| --- | --- |
| `/404.html` | identical to homepage |
| `/404/` | identical to homepage |
| `/definitely-not-a-real-page-xyz/` | identical to homepage |
| `/a/b/c/deeply/nested/nope/` | identical to homepage |
| `/_astro/nope.js` | identical to homepage |
| `/images/nope.png` | identical to homepage |

All are 158,942 bytes, all emit `<title>Web Design & SEO in Vernal, Utah …</title>` and
`<link rel="canonical" href="https://cozelosdata.com/">`. This is **not** a redirect and not
a rewrite to a distinct error document — the homepage asset itself is returned under the
requested URL. It is textbook SPA-style not-found handling.

Note the file-extension cases. `/_astro/nope.js` and `/images/nope.png` are caught by the
same rule, which is why a missing script comes back as `Content-Type: text/html`. There is
no separate asset-specific behaviour to diagnose; it is one rule.

### 3.1 Two edge rewrites sit on top, and neither causes F10

Worth recording so they are not mistaken for the fallback mechanism later:

**Email Address Obfuscation.** The six bodies above are byte-identical *after* normalising
one token. Raw, they differ in exactly 240 bytes — the `data-cfemail="…"` value and the
matching `/cdn-cgi/l/email-protection#…` href, which Cloudflare re-keys per response. This
in-flight rewrite is why HTML responses carry no `ETag` and no `Content-Length`.

**Managed `robots.txt` injection (F11).** Direct proof of edge body rewriting:

```
HEAD /robots.txt  →  Content-Length: 75    ETag: "429808f7…"
GET  /robots.txt  →  1,911 bytes actually received
public/robots.txt →  75 bytes
```

`HEAD` reveals the true origin object — byte-for-byte the repository's file. `GET` returns
the version with Cloudflare's managed AI-crawler block injected. Related to F11, unrelated
to F10.

## 4. Is Cloudflare Worker logic involved?

**No evidence of a custom Worker, and evidence against one.** `POST` to an unmatched path
returns `405 Method Not Allowed` with an empty body rather than the fallback HTML — a
hand-written Worker fallback would normally serve HTML regardless of method. `/_worker.js`
is not exposed (it returns the fallback like any other unknown path, which proves nothing
either way, since Pages excludes that file from the served asset set by design).

What **cannot** be determined from outside: whether the asset server is a **Cloudflare Pages
project** or a **Worker using the Static Assets binding**. Both produce every signature
observed here — the 308 normalisation, the 405, the header set. They are externally
indistinguishable, and guessing between them is not necessary to proceed (§8).

## 5. Is object storage involved?

No. See §2 — the inference is withdrawn.

## 6. Is `404.html` deployed at the origin?

**No.** `GET /404.html` returns the homepage, which means no object exists at that key.

This is expected rather than surprising: [src/pages/404.astro](../../src/pages/404.astro) is
**uncommitted**, and the most recent commit (`857dd5f`, 2026-08-10) predates it. The live
deployment was built from a tree with no 404 route, so `dist/404.html` has never reached the
origin.

**This matters more than it looks** — see below.

## 7. The configuration layer that must change

The **not-found handling of the Cloudflare static-asset server**. Nothing else.

Not DNS, not the proxy status, not the zone's cache settings, not a Worker script, not the
Astro build, and not this repository's source.

Concretely, the behaviour is one of:

| If the project is… | Setting | Current value implied | Target |
| --- | --- | --- | --- |
| Workers + Static Assets | `assets.not_found_handling` in the Worker's config | `single-page-application` | `404-page` |
| Cloudflare Pages | presence of `404.html` in the deployment, or a `/* /index.html 200` SPA rule in `_redirects` | no `404.html` deployed | deploy `404.html`; remove any SPA `/*` rewrite |

## 8. Minimal recommended fix — deploy first, then re-measure

**Deploy the current build and re-probe before changing any Cloudflare setting.**

The reasoning: `404.html` has never existed at the origin, so the platform has never had the
opportunity to use it. Cloudflare's asset servers serve a deployed `404.html` with a real
HTTP 404 when not-found handling is set to the 404-page mode. If this project is in that
mode, **the deploy alone resolves F10 with zero Cloudflare configuration** — and the missing
`404.html` was the whole cause.

Two outcomes, and the test distinguishes them definitively:

```
deploy the build containing dist/404.html
        ↓
GET /definitely-not-a-real-page-xyz/
        ↓
   ┌────┴────┐
 404          200
   │            │
 DONE      not-found handling is explicitly SPA →
 no CF     change it to 404-page mode in the
 change    Cloudflare dashboard / Worker config
```

Ten-second dashboard check that resolves §4's ambiguity in advance: **Workers & Pages** —
whether this project is listed as a Pages project or as a Worker. If a Worker, its config
carries `assets.not_found_handling`. If Pages, check Settings and the deployed file list for
a `_redirects` containing a `/*` rewrite.

## 9. What must NOT be changed

- **No redirect for unknown paths.** A 301/302 to `/` would replace a soft 404 with a
  different wrong answer. The goal is a genuine 404 status.
- **No `public/_redirects` added for this purpose.** Whether it is even read depends on
  which product this is — Pages reads it, Workers Static Assets does not — and either way it
  is the wrong tool for producing a 404.
- **No change to `Seo.astro` canonical logic.** The 404 document self-canonicalising to
  `/404/` is documented, neutralised by `noindex, follow`, and out of scope.
- **No change to [404.astro](../../src/pages/404.astro).** Layer 1 is complete.
- **No change to the F11 managed `robots.txt`.** Separate decision, separate phase.
- **No change to DNS, proxy status, or zone cache settings.** None of them cause F10.

## 10. Repository or Cloudflare access?

**Possibly repository-only.** The single required artefact — `dist/404.html` — is already
produced by the build; it just needs to be committed and deployed. Whether that is
*sufficient* is exactly what §8's test answers.

If the deploy test still returns 200, the remaining change needs Cloudflare/origin access
and cannot be made from this repository.

## 11. Verification procedure after the fix

Run after deploying. Expected results are stated so a partial fix cannot read as success.

```bash
# 1. The 404 document reached the origin
curl -sI https://cozelosdata.com/404.html          # expect 200, and NOT 158,942 bytes

# 2. The core F10 assertion — a real status code
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/definitely-not-a-real-page-xyz/
                                                    # expect 404

# 3. Nested unknown paths
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/a/b/c/nope/          # expect 404

# 4. Unknown assets — same rule, must also change
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/_astro/nope.js       # expect 404
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/images/nope.png      # expect 404

# 5. The served body is the 404 document, not the homepage
curl -s https://cozelosdata.com/definitely-not-a-real-page-xyz/ | grep -o "<title>[^<]*</title>"
                                                    # expect "Page Not Found | Cozelos Data"

# 6. NO REGRESSION — every real route must be untouched
for u in / /services/ /pricing/ /portfolio/ /company/ /contact/ /faq/ \
         /ellen-cozelos/ /our-approach/ /why-cozelos-data/; do
  printf "%-24s " "$u"
  curl -s -o /dev/null -w "%{http_code}\n" "https://cozelosdata.com$u"   # expect 200 for all ten
done

# 7. Trailing-slash normalisation must survive
curl -sI https://cozelosdata.com/services | grep -iE "^(HTTP|location)"  # expect 308 → /services/

# 8. www → apex must survive (F9)
curl -sI https://www.cozelosdata.com/services/ | grep -iE "^(HTTP|location)"
                                                    # expect 301 → https://cozelosdata.com/services/

# 9. Real static assets must still serve
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/robots.txt           # expect 200
curl -s -o /dev/null -w "%{http_code}\n" https://cozelosdata.com/favicon.svg          # expect 200
```

Then, in Search Console, watch **Pages → Not found (404)** over the following weeks. A rise
there is the intended outcome, not a regression: it is the previously-invisible soft-404
surface becoming correctly classified.

---

## Incidental observation, outside F10

`/favicon.svg` is **1,921,301 bytes** — a 1.9 MB SVG, confirmed identical in the repo, so it
is not an edge artefact. It is referenced from every page's `<head>`. Recorded here only
because the header sweep surfaced it; it is a performance question, not an F10 question, and
nothing was changed.
