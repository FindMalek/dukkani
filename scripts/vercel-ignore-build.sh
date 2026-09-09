#!/usr/bin/env bash
# Vercel Ignored Build Step for a given app in this monorepo.
# Exit 0 = skip the build, exit 1 = proceed (Vercel's own convention).
#
# Two independent reasons to skip:
#   1. The branch explicitly opts out (name contains "skip-vercel").
#   2. `turbo query affected` determines this app isn't affected by the
#      changes since VERCEL_GIT_PREVIOUS_SHA (the last successful deployment
#      for this project+branch, per Vercel's docs — only exposed because an
#      Ignored Build Step is configured).
#
# NOTE: uses `turbo query affected`, not the older `turbo-ignore` package —
# turbo-ignore is deprecated as of Turborepo 2.10
# (https://turborepo.dev/docs/reference/query#migrating-from-turbo-ignore).
#
# IMPORTANT: without an explicit --base, `turbo query affected` compares
# against the merge-base with the default branch. On a production build of
# main itself, that base IS main's tip — a no-op diff, always reporting zero
# affected packages, which would silently skip every production deploy
# forever. Confirmed by reproducing in a clean worktree at main's tip. Always
# pass --base explicitly. When VERCEL_GIT_PREVIOUS_SHA is unavailable (first
# deploy of a branch, or the known Vercel bug where it's sometimes empty —
# see community.vercel.com/t/vercel-git-previous-sha-is-always-empty), fail
# open (proceed with the build) rather than risk skipping incorrectly.
#
# Usage (from each app's vercel.json "ignoreCommand"):
#   bash $(git rev-parse --show-toplevel)/scripts/vercel-ignore-build.sh @dukkani/api
set -euo pipefail

APP="${1:?usage: vercel-ignore-build.sh <workspace-name>}"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

if [[ "${VERCEL_GIT_COMMIT_REF:-}" == *"skip-vercel"* ]]; then
  echo "Branch '$VERCEL_GIT_COMMIT_REF' requests skip-vercel — skipping build"
  exit 0
fi

if [[ -z "${VERCEL_GIT_PREVIOUS_SHA:-}" ]]; then
  echo "VERCEL_GIT_PREVIOUS_SHA is unavailable — can't safely determine affected status, proceeding with build"
  exit 1
fi

set +e
npx turbo query affected --packages "$APP" --exit-code --base "$VERCEL_GIT_PREVIOUS_SHA"
affected_status=$?
set -e

# turbo --exit-code: 0 = unaffected (skip), 1 = affected (build), 2 = query error.
# Vercel only documents 0/1 for Ignored Build Step. Map errors to "build".
if [[ "$affected_status" -eq 0 ]]; then
  echo "$APP is unaffected since $VERCEL_GIT_PREVIOUS_SHA — skipping build"
  exit 0
fi

if [[ "$affected_status" -eq 1 ]]; then
  echo "$APP is affected since $VERCEL_GIT_PREVIOUS_SHA — proceeding with build"
  exit 1
fi

echo "turbo query affected failed with exit $affected_status — proceeding with build"
exit 1
