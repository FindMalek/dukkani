# Dukkani Architecture Guide

This document is the human-readable map of the monorepo.
Agent-focused implementation rules are maintained in `.cursor/rules`.

## Monorepo model

- Package manager: `pnpm` workspaces.
- Task orchestration: `turbo`.
- Source layout: `apps/*` for products, `packages/*` for shared capabilities.

## Applications

- `apps/api` (`@dukkani/api`): centralized API surface (oRPC/OpenAPI/auth/webhooks).
- `apps/dashboard` (`@dukkani/dashboard`): merchant admin app.
- `apps/storefront` (`@dukkani/storefront`): customer-facing storefront and checkout.
- `apps/web` (`@dukkani/web`): marketing/public website.

## Shared packages

- Platform/domain: `auth`, `common`, `core`, `env`, `orpc`.
- Infra/runtime: `db`, `storage`, `logger`, `tracing`, `migrations`.
- Frontend/shared UX: `ui`.
- Internal automation: `ci-tools`.

## Architecture boundaries

- Apps never import from other apps.
- Cross-app reuse must go through `packages/*`.
- Keep infra concerns in infra packages and presentation concerns in apps/UI.
- Prefer typed contracts from `@dukkani/common` and API contracts from `@dukkani/orpc`.

## Canonical rules and conventions

- Project overview: `.cursor/rules/00-project-overview.mdc`
- Naming conventions: `.cursor/rules/01-naming-conventions.mdc`
- Code patterns: `.cursor/rules/02-code-patterns.mdc`
- App/package-specific rules: `.cursor/rules/apps/*.mdc`, `.cursor/rules/packages/*.mdc`
- Windsurf parity entrypoint: `.windsurfrules`
