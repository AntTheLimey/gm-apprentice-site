#!/usr/bin/env bash
# The site must never hard-code its own host: moving domains is a SITE_URL change.
# Builds with a stand-in host and fails if the real hosts appear anywhere in the output.
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL=https://example.test npm run build > /dev/null
# dist/_headers names the workers.dev hosts on purpose (to keep them out of search).
# The support email address (support@gmapprentice.com) is not a link to the site, so mail addresses are skipped.
hits=""
while IFS= read -r f; do
  if sed -E 's/[A-Za-z0-9._%+-]+@gmapprentice\.com//g' "$f" | grep -qE 'workers\.dev|gmapprentice\.com'; then
    hits+="$f"$'\n'
  fi
done < <(grep -rlE --exclude=_headers 'workers\.dev|gmapprentice\.com' dist/ || true)
if [[ -n "$hits" ]]; then
  echo "check-host: the site's own host is hard-coded in:" >&2
  printf "%s" "$hits" >&2
  exit 1
fi
echo "check-host: no hard-coded host"
