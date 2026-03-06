# Preview Environments

Each pull request gets isolated preview deployments for API, Dashboard, Storefront, and Web. Preview apps use the API from the same PR (no CORS errors) and an isolated database branch.

## How It Works

1. **Neon branch per PR** – The Neon Vercel integration creates a database branch when a PR opens, injects `DATABASE_URL`, and cleans up on PR close.
2. **Related projects** – Dashboard and Storefront use `getApiUrl()` from `@dukkani/env`, which resolves to the API preview URL from the same PR via `@vercel/related-projects`. Dashboard uses `getStorefrontBaseUrl()` for "Visit store" links.
3. **CORS** – The API allows `*.vercel.app` origins in preview, so all preview apps can call the API.
4. **Store slug** – The storefront extracts the store slug from the host subdomain (`store.dukkani-storefront-git-xxx.vercel.app`). In preview, it uses `VERCEL_URL` as the base domain.

## Setup

### 1. Vercel Projects

- Create four Vercel projects (api, dashboard, storefront, web) connected to the same repo.
- Set Root Directory for each: `apps/api`, `apps/dashboard`, `apps/storefront`, `apps/web`.
- Ensure project names in Vercel: `dukkani-api` (for `getApiUrl`), `dukkani-storefront` (for `getStorefrontBaseUrl`).

### 2. Vercel Preview Configuration

**Related projects** – Each app has `vercel.json` with `relatedProjects` (project IDs). Vercel injects `VERCEL_RELATED_PROJECTS` at build time.

- **Dashboard** – Include both API and Storefront project IDs so `getApiUrl()` and `getStorefrontBaseUrl()` resolve correctly:
  ```json
  { "relatedProjects": ["prj_API_ID", "prj_STOREFRONT_ID"] }
  ```
- **Storefront, Web** – Include API project ID for `getApiUrl()`.

**Dashboard, Storefront, Web** (Preview env):

| Variable              | Value                      |
| --------------------- | -------------------------- |
| `NEXT_PUBLIC_API_URL` | Fallback (e.g. production) |

**API** (Preview env):

| Variable                     | Value          |
| ---------------------------- | -------------- |
| `NEXT_PUBLIC_ALLOWED_ORIGIN` | `*.vercel.app` |
| `DATABASE_URL`               | From Neon (do not override) |

### 3. Neon Database (Neon Vercel Integration)

1. Install the [Neon Vercel integration](https://neon.tech/docs/guides/vercel-previews-integration).
2. Connect your Neon project to the API Vercel project.
3. Enable **"Resource must be active before deployment"** so Vercel waits for the branch to be ready.
4. Neon auto-creates a branch per preview, injects `DATABASE_URL`, and cleans up on PR close.
5. The API build script (in `apps/api/package.json`) runs migrations and seed before the Next.js build:
   - `pnpm --filter @dukkani/db run db:migrate:deploy && (test "$VERCEL_ENV" = "preview" && pnpm --filter @dukkani/db run db:seed || true) && pnpm exec turbo run build --filter=@dukkani/api`

Do **not** set `DATABASE_URL` for Preview in the API project; let the Neon integration inject it.

## Testing

1. Open a PR and wait for Vercel deploys.
2. Open the Dashboard preview URL from the PR.
3. Verify it loads and API calls succeed (no CORS errors).
4. Check the Network tab: requests should go to the API preview URL (e.g. `api-xxx-git-branch.vercel.app`), not production.
5. Click "Visit store" – it should open the storefront preview URL (e.g. `store-slug.dukkani-storefront-git-xxx.vercel.app`).
6. Visit `https://STORE_SLUG.dukkani-storefront-git-XXX.vercel.app/en` directly – the store should load.

## Adding New Apps (e.g. Business)

1. Add `vercel.json` with `"relatedProjects": ["prj_YOUR_API_PROJECT_ID"]`.
2. Use `getApiUrl()` from `@dukkani/env` for API calls.
3. No API changes needed; CORS already allows `*.vercel.app`.

## Env Package

Use `baseEnv` and `apiEnv` from `@dukkani/env` everywhere. Avoid raw `process.env` for app configuration.
