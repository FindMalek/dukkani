# Onboarding UX audit (#649)

Scope: signup, store setup, store configuration, completion, first product, first storefront order.
Method: static audit of the components, locale files and schemas, read against origin/main (fac3bbf8). Browser pass not done (the dev stack needs the DB, auth and Infisical secrets, so it was not run in this worktree). Layout points below come from reading class names, not from rendering at 320/390/768/1280. Treat the width and RTL items as hypotheses to confirm in a browser before fixing.

Languages: dashboard and storefront ship `fr` and `ar` (`packages/common/src/locale/*`). Key parity between fr and ar looks close, with a small number of keys missing on one side (not yet counted). The French copy is the bigger problem.

Severity:
- P1: blocks or misleads a merchant at a key milestone (signup to first order), or shows wrong-language copy in a core flow.
- P2: friction a merchant will hit, workaround exists.
- P3: polish, a11y nits, copy.

Routes are dashboard unless marked storefront. File paths are under `apps/dashboard/src` unless marked.

---

## P1

### 1. French dashboard copy is largely English (#650)

- Where: `packages/common/src/locale/dashboard/fr.json`
- What breaks: a French-speaking merchant gets English in the onboarding store step and in other dashboard screens. Examples:
  - `onboarding.storeSetup.currency.label` = "Store Currency", placeholder "Select your store currency" (currency is on the first real form after signup)
  - `onboarding.errors.emailAlreadyInUse`, `onboarding.errors.storeLoadFailed` (English in fr; the code reads these keys)
  - `onboarding.steps.*` (step titles, defined in `packages/common/src/services/onboarding.service.ts`), `onboarding.actions.retry`
  - `settings.logout.*`, `customers.list.*`, `orders.detail.*` (for example "Order Items"), `products.create.form.*` (for example "Save changes", "Generate with AI")
- The scan was a crude English-word match and it flagged 46 keys. Treat that as a rough floor, not a verified count.
- Fix (one PR): translate the onboarding namespace and the products.create namespace, then add a check that fails when an fr value equals its en/ar counterpart or contains the English tokens above.

### 2. Checkout validation errors are English in Arabic and French (#651)

- Where: `packages/common/src/schemas/order/input.ts` (zod messages such as "Customer name is required", "Customer phone is required", "Please enter a valid phone number (at least 8 digits)", "Address line is required", "City is required", "At least one order item is required"). Rendered by `FieldErrors` in `packages/ui/src/components/field.tsx`, which prints `issue.message` directly. No error map is set anywhere (`grep errorMap|setErrorMap` finds only the signup field override).
- What breaks: an Arabic customer sees the first validation error in English on the storefront checkout (`apps/storefront/src/components/app/checkout-form.tsx`). This is the step where the first order is lost.
- Fix (one PR): map zod issue codes/keys to storefront `delivery.*` translations in the checkout form (or pass a locale-aware error map to the form), and keep the schema messages as fallback only.

### 3. Checkout has no governorate field (#652)

- Where: `apps/storefront/src/components/app/checkout-form.tsx` (address block: street, city, postal code, "use location" button). `apps/storefront/src/shared/lib/address-detection.hook.ts` (reverse geocoding through Nominatim fills city and postal code from coordinates).
- What breaks: checkout never collects a governorate (no field, and `addressInputSchema` has none), so every checkout order has a null governorate. Tunisian delivery and the dashboard's governorate views depend on it: `packages/common/src/services/order.service.ts` (around line 57) groups orders by `a.governorate` and drops nulls. So checkout orders silently disappear from the governorate chips and the customers governorate filter. The `governorateEnum` already exists in `packages/common/src/schemas/enums.ts`.
- Fix (one PR): add a governorate select (24 values from the enum, localized) to the checkout address, prefilled from detection and required.

### 4. Merchants who configure the store skip the completion step (#653)

- Where: `app/[lang]/(auth)/layout.tsx` (lines ~24-31) redirects any user with step `STORE_CONFIGURED` to `/dashboard`. `app/[lang]/(auth)/onboarding/page.tsx` has no branch for `STORE_CONFIGURED`, so the page may render nothing for it (not yet confirmed in a browser). The server sets `STORE_CONFIGURED` in `packages/orpc/src/routers/dashboard/store.ts` (line ~91) and only the `complete` call moves it to `STORE_LAUNCHED`.
- What breaks: if the merchant closes the tab or refreshes between "configure" and the completion screen, they land on the dashboard without seeing the storefront link or the Telegram step. Nothing calls `onboarding.complete` in that path, so onboarding stays unfinished. The `(dashboard)/layout.tsx` only redirects `STORE_SETUP`, so the dashboard does not send them back either.
- Fix (one PR): treat `STORE_CONFIGURED` as "show completion" in the auth layout and the onboarding page (or call complete on the configure success path), and add the missing branch.

### 5. Product form has no draft save (#654)

- Where: `components/app/products/product-form-actions.tsx` renders one button, "save and publish" (`published` is forced to `true`). `product-form.tsx` exposes only `submit` through the same path.
- What breaks: a merchant who stops halfway through the first product (photos are the slow part) cannot save a draft. They either publish an unfinished product or lose the work. I did not find a draft option in `product-form-essentials.tsx` or `product-form-images.tsx`. Confirm in a browser before the fix.
- Fix (one PR): add a "save draft" action next to publish that submits with `published: false`, and make the draft state visible in the products list.

---

## P2

### 6. Telegram card shows even when Telegram was not chosen (already tracked in #625)

- Where: `components/app/auth/onboarding-completion.tsx` lines 76-115. The card renders on `!telegramStatus?.linked && botLinkData`. The choice is already captured in store setup as `notificationMethod` (`components/app/auth/onboarding-store-setup-form.tsx`, options email / telegram / both).
- Covered by #625. No new issue. Reference #625 when the fix lands.

### 7. Completion step has no error state

- Where: `onboarding-completion.tsx` lines 24-26 and 35-37, 59. Only `isPending` is handled. If `onboarding.complete` fails, `completionMutation.data` stays undefined, the store link is blank, the copy button copies "" and there is no retry.
- Fix: render an error with a retry button and hide the copy button when there is no URL.

### 8. Onboarding has no way back

- Where: `shared/lib/onboarding/controller.hook.ts` exposes `getPreviousStep` but no screen uses it. `components/app/onboarding/onboarding-stepper.tsx` is decorative bars only.
- What breaks: a merchant who mistypes the store name or picks the wrong currency cannot fix it until settings. Currency in particular is hard to change later.
- Fix: a "back" link on the store setup and configuration steps (store setup only, since configuration already created the store), or an explicit "you can change this in settings" line next to currency.

### 9. Stepper has no labels and no step count

- Where: `components/app/onboarding/onboarding-stepper.tsx`. Four unlabeled bars. Step titles already exist (`onboarding.steps.*` in `packages/common/src/services/onboarding.service.ts`) and they are not shown. `STORE_CONFIGURED` is not in the stepper's list, so the bars go blank if the state lands there (see #4).
- Fix: show "step X of 4" plus the current step title (translated), and map `STORE_CONFIGURED` to the completion bar.

### 10. Store link on completion is not clickable

- Where: `onboarding-completion.tsx` lines 53-74. The URL is shown in a truncated mono span and only a copy icon exists. The merchant cannot open their store to check it.
- Fix: add an "open store" link (new tab) next to copy. Give the copy icon button an `aria-label` (also line 61).

### 11. Sign-up errors other than "email exists" are silent

- Where: `app/[lang]/(auth)/onboarding/page.tsx` lines 64-79. `onError` only handles `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL`. Any other error (network, weak password from the server, rate limit) does nothing visible.
- Fix: show a toast with the server message or a generic translated error for other codes.

### 12. Legal links point at routes that do not exist

- Where: `components/app/auth/onboarding-sign-up-form.tsx` lines 104 and 108 link to `/terms` and `/policy`. They have no locale prefix and no matching route exists in `apps/dashboard/src/app`, `apps/storefront/src`, or `apps/web` (search by name finds nothing). Arabic users get a 404 on the page they are agreeing to.
- Fix: point to real localized pages (or the marketing site's terms page) and confirm the URLs load in both locales.

### 13. Mobile: tiny text in the Telegram instructions and category labels

- Where: `onboarding-completion.tsx` line 108 (`text-[10px]`, holds the `/link {code}` instruction the merchant must type). `components/app/onboarding/category-selector.tsx` line 62 (`text-[11px]` category names). The Telegram page (`app/[lang]/(dashboard)/settings/telegram/page.tsx` line 174) has the same 10px pattern.
- Fix: 14px minimum for instructions and labels. Keep 10px only for pure decoration.

### 14. Mobile: product save button is at the bottom of a long form

- Where: `product-form.tsx` (form `pb-24`, action inside the form at the end). On 320 and 390 widths the merchant scrolls through photos, variants and description to reach "save and publish", with no sticky footer.
- Fix: sticky bottom action bar below `md`, with the same button.

### 15. Icon-only buttons without accessible names

- Where: `product-form.tsx` line 160 (category add, `size="icon"`), `onboarding-completion.tsx` line 61 (copy). Storefront `components/app/cart-item.tsx` line 116 and `product-card.tsx` line 52 use the same pattern.
- Fix: `aria-label` from the locale file.

---

## P3

### 16. Sign-up has no social sign-in

- Where: `onboarding-sign-up-form.tsx`. The login page has Google, Apple and Facebook (`components/app/auth/*-sign-in.tsx`); onboarding does not. A merchant who signed in with Google elsewhere must create a password here. Product call; confirm before changing.

### 17. Store setup copy does not explain the notification choice

- Where: `components/app/auth/onboarding-store-setup-form.tsx`. Telegram is offered with no note that a bot link comes next, on the completion screen. Default is email.
- Fix: one line under the Telegram option ("you will link the bot after setup").

### 18. Currency select shows flags and country names with no explanation

- Where: `components/app/auth/onboarding-store-setup-form.tsx` `CurrencySelectOption`. TND is already the default. The gap is the explanation: nothing says what the currency changes (prices, checkout display). Add a one-line hint under the select.

### 19. Radio cards have invisible keyboard focus

- Where: `components/app/auth/onboarding-store-configuration-form.tsx` lines 108-113. The radio input is `sr-only` on the theme cards, so focus is on an invisible element. Add `focus-within:ring` on the label.

### 20. Product preview is desktop-only (1280 and up)

- Where: `product-form.tsx` (`xl:` classes for the preview aside). At 768 and below there is no preview before publish. Acceptable for now, mention only.

### 21. Phone field gives no format hint

- Where: `packages/common/src/schemas/order/input.ts` (phone rule: 8 or more digits). Storefront checkout does not show a `+216` hint or example. Add a placeholder with the expected format.

### 22. Completion loader uses `min-h-screen`

- Where: `onboarding-completion.tsx` line 37. Full-screen spinner on a page that is already inside the layout. Use `min-h-[40vh]` like the other onboarding skeletons.

### 23. Dead locale keys

- Where: `packages/common/src/locale/dashboard/fr.json` has `onboarding.complete.errors.*` and `onboarding.signup.email.existsError`, `missingWarning`, `readonlyHint`, `validating` in some paths that the code does not read. Remove or wire them while fixing #1.

---

## Ranked summary

| # | Sev | Where | Issue |
|---|-----|-------|-------|
| 1 | P1 | `packages/common/src/locale/dashboard/fr.json` | French dashboard copy is English |
| 2 | P1 | `packages/common/src/schemas/order/input.ts`, `packages/ui/src/components/field.tsx` | Checkout errors English in ar/fr |
| 3 | P1 | `apps/storefront/src/components/app/checkout-form.tsx` | No governorate field at checkout |
| 4 | P1 | `app/[lang]/(auth)/layout.tsx`, `onboarding/page.tsx` | Configured merchants skip completion |
| 5 | P1 | `components/app/products/product-form-actions.tsx` | No draft save on product form |
| 6 | P2 | `onboarding-completion.tsx` | Telegram card ignores choice (#625) |
| 7 | P2 | `onboarding-completion.tsx` | No error state on completion |
| 8 | P2 | `controller.hook.ts`, `components/app/auth/onboarding-store-setup-form.tsx` | No way back |
| 9 | P2 | `onboarding-stepper.tsx` | Unlabeled stepper |
| 10 | P2 | `onboarding-completion.tsx` | Store link not clickable |
| 11 | P2 | `onboarding/page.tsx` | Sign-up errors silent |
| 12 | P2 | `onboarding-sign-up-form.tsx` | `/terms` and `/policy` 404 |
| 13 | P2 | `onboarding-completion.tsx`, `category-selector.tsx` | 10 to 11px text on mobile |
| 14 | P2 | `product-form.tsx` | Save button not sticky on mobile |
| 15 | P2 | `product-form.tsx`, `onboarding-completion.tsx` | Icon buttons without labels |
| 16 | P3 | `onboarding-sign-up-form.tsx` | No social sign-up |
| 17 | P3 | `components/app/auth/onboarding-store-setup-form.tsx` | Telegram choice unexplained |
| 18 | P3 | `components/app/auth/onboarding-store-setup-form.tsx` | Currency select unexplained |
| 19 | P3 | `components/app/auth/onboarding-store-configuration-form.tsx` | Invisible focus on theme cards |
| 20 | P3 | `product-form.tsx` | Preview only at 1280+ |
| 21 | P3 | `order/input.ts` | Phone format hint |
| 22 | P3 | `onboarding-completion.tsx` | `min-h-screen` loader |
| 23 | P3 | `fr.json` | Dead locale keys |

Findings: 23 total (5 P1, 10 P2, 8 P3). Each P1 has its own issue.

## Not checked

- Browser rendering at 320, 390, 768, 1280 in fr and ar. Needs `pnpm dev:ad` with a seeded DB.
- Storefront product detail, cart drawer and order success page copy beyond the checkout form.
- Dashboard orders list and order detail for a first order (only the governorate query was read).
- Telegram linking backend (out of scope per #625).
