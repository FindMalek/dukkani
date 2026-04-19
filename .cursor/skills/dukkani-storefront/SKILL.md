---
name: dukkani-storefront
description: Storefront app guidance for product browsing, cart, checkout, localization, and oRPC integration in apps/storefront.
triggers:
  - storefront
  - checkout flow
  - cart behavior
  - storefront i18n
  - apps/storefront
---

# Dukkani Storefront

Use this skill for changes in `apps/storefront`.

## Scope

- Product listing and product detail flows.
- Cart state and checkout flow.
- Localized storefront routes under `app/[lang]`.
- Storefront-specific API route handling in `app/api/storefront/[[...rest]]/route.ts`.

## Architecture rules

- Keep storefront business logic in `apps/storefront` unless truly shared across apps.
- Put shared domain contracts in `@dukkani/common`.
- Reuse API contracts from `@dukkani/orpc`.
- Reuse shared UI primitives from `@dukkani/ui`.

## State and data

- Keep cart/filter client state in `stores/*`.
- Use hooks in `hooks/*` for composable behavior.
- Centralize ORPC client wiring in `lib/orpc.ts`.

## Localization

- Keep customer-facing pages under `app/[lang]/*`.
- Keep locale logic in `lib/i18n.ts`.
- Preserve locale across navigation and checkout steps.

## Quality guardrails

- Use server components by default.
- Add `"use client"` only where interaction requires it.
- Keep errors mapped through shared helpers (`lib/error.ts`) and avoid scattered message handling.
