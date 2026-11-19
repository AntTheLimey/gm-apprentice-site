#!/usr/bin/env bash
# Upload a preview of the current branch to the gm-apprentice Worker and print its URL.
# Production is untouched: only `npx wrangler deploy` (after a merge) changes the live site.
set -euo pipefail
cd "$(dirname "$0")/.."

branch="$(git branch --show-current)"
alias="$(printf '%s' "$branch" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9-]+/-/g' | cut -c1-40 | sed -E 's/^-+//; s/-+$//')"
if [ -z "$alias" ]; then
  echo "preview.sh: no usable branch name (detached HEAD?)" >&2
  exit 1
fi

PREVIEW=1 npm run build
npx wrangler versions upload --preview-alias "$alias"
echo
echo "Preview: https://${alias}-gm-apprentice.antthelimey.workers.dev"
