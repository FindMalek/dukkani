---
name: dukkani-architecture
description: Monorepo architecture, app boundaries, package ownership, and cross-domain implementation guidance for Dukkani.
triggers:
  - monorepo architecture
  - app boundaries
  - package boundaries
  - turborepo structure
  - where should this code live
---

# Dukkani Architecture

Use this skill when deciding where code should live, how apps/packages should interact, or how to structure cross-cutting changes.

## High-level boundaries

- Apps in `apps/*` own product surfaces and route composition.
- Packages in `packages/*` own reusable logic and shared abstractions.
- Apps must not import from other apps.
- Shared contracts and schemas should come from package exports, especially `@dukkani/common`.

## App roles

- `apps/api`: API entrypoint for oRPC/OpenAPI/auth/webhooks.
- `apps/dashboard`: Merchant/admin product.
- `apps/storefront`: Customer storefront and checkout.
- `apps/web`: Marketing/public website.

## Package roles

Prioritize these packages when placing logic:

- `@dukkani/common`: schemas, entities, shared domain helpers.
- `@dukkani/orpc`: API routers and client contracts.
- `@dukkani/core`: server bootstrap composition (auth + db + env).
- `@dukkani/db`, `@dukkani/storage`, `@dukkani/logger`, `@dukkani/tracing`: infra concerns.

## Implementation defaults

- Prefer package-level abstractions over copying logic in apps.
- Use `@dukkani/env` for typed env access.
- Keep changes scoped; avoid cross-domain refactors unless required.
- Follow `.cursor/rules/00-project-overview.mdc` and per-domain `.mdc` files as canonical project rules.

## Dashboard app

For `apps/dashboard` folder structure, hooks (`api` vs `controllers`), stores, and product form patterns, use **`.cursor/rules/apps/dashboard.mdc`** or the **dukkani-dashboard** Windsurf skill.
