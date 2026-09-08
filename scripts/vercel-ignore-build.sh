#!/usr/bin/env bash
# Vercel Ignored Build Step for a given app in this monorepo.
# Exit 0 = skip the build, exit 1 = proceed (Vercel's own convention).
#
# Two independent reasons to skip:
#   1. The branch explicitly opts out (name contains "skip-vercel").
#   2. `turbo query affected` determines this app isn't affected by the
#      changes since the comparison base.
#
# NOTE: uses `turbo query affected`, not the older `turbo-ignore` package —
# turbo-ignore is deprecated as of Turborepo 2.10
# (https://turborepo.dev/docs/reference/query#migrating-from-turbo-ignore).
# `turbo query affected --exit-code` already matches Vercel's convention
# directly (exit 1 = affected = build, exit 0 = not affected = skip) — verify
# this against a real Vercel deployment once merged, since the base-ref
# comparison Vercel triggers this with (last deployed commit vs. HEAD) wasn't
# something we could fully confirm without a live deployment.
#
# Usage (from each app's vercel.json "ignoreCommand"):
#   bash $(git rev-parse --show-toplevel)/scripts/vercel-ignore-build.sh @dukkani/api
set -euo pipefail

APP="${1:?usage: vercel-ignore-build.sh <workspace-name>}"

if [[ "${VERCEL_GIT_COMMIT_REF:-}" == *"skip-vercel"* ]]; then
  echo "Branch '$VERCEL_GIT_COMMIT_REF' requests skip-vercel — skipping build"
  exit 0
fi

npx turbo query affected --packages "$APP" --exit-code
