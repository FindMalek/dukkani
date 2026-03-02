# Preview Environments

Each pull request gets isolated preview deployments for API, Dashboard, Storefront, and Web. Preview apps use the API from the same PR (no CORS errors) and an isolated database branch.

## How It Works

1. **Neon branch per PR** – A database branch is created when a PR opens. On each new commit, the branch is reset and seeded.
2. **Related projects** – Dashboard and Storefront use `getApiUrl()` from `@dukkani/env`, which resolves to the API preview URL from the same PR via `@vercel/related-projects`.
3. **CORS** – The API allows `*.vercel.app` origins in preview, so all preview apps can call the API.

## Setup

### 1. Vercel Projects

- Create four Vercel projects (api, dashboard, storefront, web) connected to the same repo.
- Set Root Directory for each: `apps/api`, `apps/dashboard`, `apps/storefront`, `apps/web`.
- Ensure your API project name in Vercel is `dukkani-api` (or update `getApiUrl` in `packages/env/src/utils/get-api-url.ts`).

### 2. Vercel Preview Configuration

**Related projects** – Each app has `vercel.json` with static `relatedProjects` (API project ID). Vercel injects `VERCEL_RELATED_PROJECTS` at build time so `getApiUrl()` resolves to the API preview URL from the same PR. No env vars needed for related projects.

**Dashboard, Storefront, Web** (Preview env):

| Variable              | Value                      |
| --------------------- | -------------------------- |
| `NEXT_PUBLIC_API_URL` | Fallback (e.g. production) |

**API** (Preview env):

| Variable                     | Value              |
| ---------------------------- | ------------------ |
| `NEXT_PUBLIC_ALLOWED_ORIGIN` | `*.vercel.app`     |
| `DATABASE_URL`               | From Neon (see below) |

### 3. Neon Database

**Option A: Neon Vercel Integration (recommended)**

1. Install the [Neon Vercel integration](https://neon.tech/docs/guides/vercel-previews-integration).
2. Connect your Neon project to the API Vercel project.
3. Neon auto-creates a branch per preview, injects `DATABASE_URL`, and cleans up on PR close.
4. Add to API build command: `prisma migrate deploy && pnpm db:seed && next build` (or use `prisma migrate reset --force` for full wipe).

**Option B: GitHub Action**

1. Add GitHub secrets: `NEON_API_KEY`, `NEON_PROJECT_ID`.
2. Add GitHub variable: `NEON_PROJECT_ID`.
3. The `.github/workflows/preview-deploy.yml` workflow creates a Neon branch per PR, runs `db:reset-and-seed` on each commit, and deletes the branch when the PR is closed.
4. To use the branch URL in Vercel, either use the Neon Vercel integration or deploy the API from the workflow with `DATABASE_URL` (see plan for details).

## Testing

1. Open a PR and wait for Vercel deploys.
2. Open the Dashboard preview URL from the PR.
3. Verify it loads and API calls succeed (no CORS errors).
4. Check the Network tab: requests should go to the API preview URL (e.g. `api-xxx-git-branch.vercel.app`), not production.

## Adding New Apps (e.g. Business)

1. Add `vercel.json` with `"relatedProjects": ["prj_YOUR_API_PROJECT_ID"]`.
2. Use `getApiUrl()` from `@dukkani/env` for API calls.
3. No API changes needed; CORS already allows `*.vercel.app`.

## Env Package

Use `baseEnv` and `apiEnv` from `@dukkani/env` everywhere. Avoid raw `process.env` for app configuration.
