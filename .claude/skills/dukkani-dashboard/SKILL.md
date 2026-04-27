---
name: dukkani-dashboard
description: apps/dashboard src layout — hooks (api vs controllers), stores, lib, product form.
triggers:
  - apps/dashboard
  - dashboard hooks
  - useProductForm
---

# Dukkani dashboard app

**Canonical rules:** `.cursor/rules/apps/dashboard.mdc`

## Order relative dates

- **Hook (next-intl):** `shared/lib/i18n/use-format-order-relative-datetime.ts` — `useFormatOrderRelativeDateTime(createdAt)` for the “Today, … / Yesterday, … / …” line. Use this for order detail and anywhere the copy should match the list and the active locale.
- **Pure grouping:** `shared/lib/order/order.util.ts` — `groupOrdersByDate` uses `@dukkani/common/lib` calendar-day helpers so section headers (today / yesterday / older) align with the same rules as the hook.
- **Do not** duplicate “is today” logic with `toDateString()` in feature code; import from `@dukkani/common/lib` or the hook above.

## Product form

- **`productFormOptions`:** `components/app/products/product-form-options.ts` (TanStack `formOptions`, colocated with form UI). Re-exported from `product-form.tsx` for convenience; **`use-product-form`** imports the options file directly to avoid circular imports with the shell component.
- **`useProductStore`:** Zustand list/catalog state only — not form field values.
