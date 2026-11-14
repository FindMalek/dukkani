# One agent per issue, gated by CI and review

Status: accepted

## Context

Several agent sessions run at once. Sharing a checkout led to clobbered edits, and PRs were merged before CI or an end-to-end run had passed.

## Decision

- One agent works one GitHub issue, in its own git worktree.
- The reviewer runs after each push, and only once CI is green.
- A PR is merged only when review passes, CI is green, and e2e is verified.

## Consequences

- Review does not run on red builds, so reviewer time is spent only on code that compiles and passes checks.
- Each push after a review round triggers another review once CI is green again.
- Merges wait on e2e verification, which adds time to small fixes.
