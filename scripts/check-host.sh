#!/usr/bin/env bash
# The site must never hard-code its own host: moving domains is a SITE_URL change.
# Builds with a stand-in host and fails if the real hosts appear anywhere in the output.
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL=https://example.test npm run build > /dev/null
if hits="$(grep -rlE 'workers\.dev|gmapprentice\.com' dist/)"; then
  echo "check-host: the site's own host is hard-coded in:" >&2
  echo "$hits" >&2
  exit 1
fi
echo "check-host: no hard-coded host"
