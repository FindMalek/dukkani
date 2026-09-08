#!/usr/bin/env bash

# Fails if any commit in the given range credits an AI coding agent as a
# co-author. Squash-merging re-collects every Co-authored-by trailer in a PR,
# so one leftover trailer is enough to put "Claude" or "Cursor Agent" in the
# repo's contributor list.
#
# Usage: ./scripts/check-ai-coauthors.sh [range]   (default: origin/main..HEAD)

set -euo pipefail

RANGE="${1:-origin/main..HEAD}"

# Matched against the trailer value only, so subjects like
# "perf: cursor-based pagination" are untouched. Emails are the reliable
# signal; the name patterns catch agents that use a different address.
DENY_EMAILS='noreply@anthropic\.com|cursoragent@cursor\.com'
DENY_NAMES='^(claude|cursor)\b'

violations=""

for sha in $(git rev-list "$RANGE"); do
  trailers=$(git show -s --format='%B' "$sha" \
    | grep -iE '^[[:space:]]*Co-authored-by:' || true)

  [ -z "$trailers" ] && continue

  while IFS= read -r trailer; do
    value=$(printf '%s' "$trailer" | sed -E 's/^[[:space:]]*[Cc]o-[Aa]uthored-[Bb]y:[[:space:]]*//')
    name=$(printf '%s' "$value" | sed -E 's/[[:space:]]*<.*//')
    email=$(printf '%s' "$value" | sed -nE 's/.*<([^>]*)>.*/\1/p')

    if printf '%s' "$email" | grep -qiE "$DENY_EMAILS" ||
      printf '%s' "$name" | grep -qiE "$DENY_NAMES"; then
      violations="${violations}  $(git show -s --format='%h' "$sha")  ${value}"$'\n'
    fi
  done <<<"$trailers"
done

if [ -n "$violations" ]; then
  echo "AI co-author trailers found in $RANGE:"
  echo ""
  printf '%s' "$violations" | sort -u
  echo ""
  echo "Remove the Co-authored-by lines and push again:"
  echo "  git rebase -i \$(git merge-base HEAD origin/main)   # reword the commits"
  echo "  git commit --amend                                  # if it's only the last one"
  exit 1
fi

echo "No AI co-author trailers in $RANGE."
