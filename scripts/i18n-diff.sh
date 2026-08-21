#!/usr/bin/env bash
# 3-diff harness (playbook §7). Proves the MASTER language renders identically
# after an extraction/refactor. Byte-identity is not the bar — the glyph bar is:
#   1. tag structure identical (Astro scope hashes stripped)
#   2. visible text identical (whitespace-insensitive, entities decoded)
#   3. zero entity leaks (&amp;#x...;)
# Usage: scripts/i18n-diff.sh before.html after.html
set -u
B="$1"; A="$2"; fail=0
# Playbook §7 "expected-and-harmless deltas": strip the intended i18n head
# additions and the language switcher before comparing against a pre-i18n
# snapshot. Pass --strict to compare raw.
STRIP=1; [ "${3:-}" = "--strict" ] && STRIP=0
prep() {
  if [ "$STRIP" -eq 1 ]; then
    perl -0777 -pe 's{<link rel="alternate" hreflang=.*?>}{}gs;
                    s{<meta property="og:locale".*?>}{}gs;
                    s{<div class="fixed right-4 top-24[^>]*>.*?</div>}{}gs;' "$1"
  else cat "$1"; fi
}

flat() { prep "$1" | perl -0777 -pe 's{<script.*?</script>}{}gs; s{<style.*?</style>}{}gs; s/<[^>]+>//g;
         s/&#39;/\x27/g; s/&amp;/\&/g; s/&quot;/"/g; s/&lt;/</g; s/&gt;/>/g; s/&nbsp;/ /g;' \
         | perl -pe 's/\s+//g'; }
tags() { prep "$1" | grep -o '<[^>]*>' | perl -pe 's/ data-astro-cid-[\w-]+//g; s/data-astro-transition-persist="[^"]*"//g; s{/_astro/([\w-]+)\.[\w-]{8}\.}{/_astro/$1.HASH.}g'; }

echo "--- 1/3 tag structure"
if diff -q <(tags "$B") <(tags "$A") >/dev/null; then echo "    PASS  identical"; else
  echo "    DIFF  $(diff <(tags "$B") <(tags "$A") | grep -c '^[<>]') tag lines differ"
  diff <(tags "$B") <(tags "$A") | head -20; fail=1; fi

echo "--- 2/3 visible text (whitespace-insensitive)"
if diff -q <(flat "$B") <(flat "$A") >/dev/null; then echo "    PASS  identical"; else
  echo "    DIFF  visible text changed"
  cmp <(flat "$B") <(flat "$A") 2>&1 | head -3
  echo "    before len=$(flat "$B" | wc -c)  after len=$(flat "$A" | wc -c)"; fail=1; fi

echo "--- 3/3 entity-leak scan"
n=$(grep -o '&amp;#x\?[0-9A-Fa-f]\+;' "$A" | wc -l)
if [ "$n" -eq 0 ]; then echo "    PASS  0 leaks"; else echo "    FAIL  $n leaks"; fail=1; fi

echo; [ "$fail" -eq 0 ] && echo "3-DIFF: PASS" || echo "3-DIFF: FAIL"
exit $fail
