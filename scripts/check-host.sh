#!/usr/bin/env bash
# The site must never hard-code its workers.dev host: a custom domain is a SITE_URL change.
# Builds with a stand-in host and fails if workers.dev appears anywhere in the output.
set -euo pipefail
cd "$(dirname "$0")/.."

SITE_URL=https://example.test npm run build > /dev/null
if hits="$(grep -rl 'workers\.dev' dist/)"; then
  echo "check-host: workers.dev is hard-coded in:" >&2
  echo "$hits" >&2
  exit 1
fi
echo "check-host: no hard-coded host"
