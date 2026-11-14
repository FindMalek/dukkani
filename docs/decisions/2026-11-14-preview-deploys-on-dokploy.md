# Preview deploys run on Dokploy at the-keep

Status: accepted

## Context

PR previews need a running copy of the changed apps. Previews should not depend on Neon, should be cleaned up when a PR ends, and should not rebuild apps a PR does not touch.

## Decision

- Preview environments run on Dokploy at `the-keep`, not on Neon.
- A preview is deleted when its PR is closed or merged.
- Only apps affected by the PR are rebuilt on push.
- Apps the PR did not change reuse the deployment from `main`.

## Consequences

- Previews are removed when the PR closes or merges.
- Unchanged apps reuse the `main` deployment. Whether a change to a shared package counts as "changed" for this rule needs to be settled in the CI config.
- If affected-app detection misses an app, its preview shows `main` code and looks like the PR is not working.
