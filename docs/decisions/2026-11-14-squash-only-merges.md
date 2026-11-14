# Squash-only merges with conventional subjects

Status: accepted

## Context

`main` history is read through commit subjects, changelogs and PR links. Merge commits and rebase merges produced mixed subjects and bodies, and the PR link was lost when a custom subject omitted the PR number.

## Decision

- Merge PRs with squash only.
- Squash subject is `type(scope): subject (#n)`, using the PR title and the PR number.
- Squash body is empty.

## Consequences

- Every commit on `main` maps to one PR through the `(#n)` suffix.
- Commit bodies are not kept on `main`, so detail belongs in the PR description and linked issue.
