# Vercel is production only

Status: accepted

## Context

Vercel's preview deployments overlapped with the Dokploy preview setup, which meant two places to debug for every PR and two sets of env vars to keep in sync.

## Decision

Vercel hosts production deployments only. Preview deployments run on Dokploy (see the preview decision record).

## Consequences

- Vercel is the only place production builds and deploys are checked.
- Preview issues are debugged on Dokploy, not Vercel.
