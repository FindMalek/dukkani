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

**Route params:** Client pages under `[id]` (and similar) use `getDynamicRouteParam` from `shared/lib/route-params.util.ts` — see dashboard rule “Dynamic route params (client components)”.

## Product form

- **`productFormOptions`:** `components/app/products/product-form-options.ts` (TanStack `formOptions`, colocated with form UI). Re-exported from `product-form.tsx` for convenience; **`use-product-form`** imports the options file directly to avoid circular imports with the shell component.
- **`useProductStore`:** Zustand list/catalog state only — not form field values.
