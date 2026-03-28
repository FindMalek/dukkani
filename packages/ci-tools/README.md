# @dukkani/ci-tools

CI and developer automation scripts (e.g. run from GitHub Actions or locally).

## CI Failure Analysis

When a workflow run fails, the bot fetches job logs and the PR diff, sends them to an AI (Groq via OpenAI-compatible API), and posts or updates a comment on the PR with root cause, affected area, suggested fix, and relevant files.

Environment variables are validated with `@dukkani/env` (preset `ci-tools`). Invalid or missing required vars will fail at startup with a clear error.

### Required env (when running `pnpm run analyze`)

- `GITHUB_TOKEN` – GitHub token with `actions: read`, `contents: read`, `pull-requests: write`, `issues: read`
- `GROQ_API_KEY` – Groq API key for the AI analysis
- `RUN_ID` – GitHub Actions run ID (e.g. `github.event.workflow_run.id`)
- `WORKFLOW_NAME` – Name of the failed workflow
- `RUN_URL` – HTML URL of the run
- `REPOSITORY` – `owner/repo`
- `HEAD_BRANCH` – Branch that triggered the run (used to find the open PR)

### Optional env

- `BOT_NAME` – Name shown in the comment footer (default: `CI Failure Analyst`)

### GitHub Actions: which to configure

In the workflow, most variables are set automatically from the run context. You only need to add **one secret**:

| Variable        | In CI | Where it comes from |
|----------------|-------|----------------------|
| `GITHUB_TOKEN` | Yes   | **Automatic** – provided by GitHub Actions (`secrets.GITHUB_TOKEN`) |
| `GROQ_API_KEY` | Yes   | **You add** – repo **Settings → Secrets and variables → Actions** → New repository secret |
| `RUN_ID`       | Yes   | **Automatic** – `github.event.workflow_run.id` |
| `WORKFLOW_NAME`| Yes   | **Automatic** – `github.event.workflow_run.name` |
| `RUN_URL`      | Yes   | **Automatic** – `github.event.workflow_run.html_url` |
| `REPOSITORY`   | Yes   | **Automatic** – `github.repository` |
| `HEAD_BRANCH`  | Yes   | **Automatic** – `github.event.workflow_run.head_branch` |
| `BOT_NAME`     | Optional | **Optional** – repo variable `vars.CI_FAILURE_BOT_NAME`; if unset, default is "CI Failure Analyst" |

So: add **`GROQ_API_KEY`** as a repository secret; the rest are either automatic or optional.

### Run locally

From repo root:

```bash
pnpm --filter @dukkani/ci-tools run analyze
```

Set the env vars above (e.g. from a failed run’s URL and branch).

## Preview cleanup (R2 on PR close)

When a pull request is closed, [`.github/workflows/cleanup-preview.yml`](../../.github/workflows/cleanup-preview.yml) runs `pnpm --filter @dukkani/ci-tools run cleanup-preview` to delete all objects under **`pr-{PR_NUMBER}/`** in your S3-compatible bucket (e.g. Cloudflare R2), matching preview uploads from [`StorageService`](../../packages/storage/src/service.ts) when `VERCEL_GIT_PULL_REQUEST_ID` is set.

**Neon** preview branches are deleted in the same workflow with [`neondatabase/delete-branch-action`](https://github.com/neondatabase/delete-branch-action), using branch name **`preview/{head.ref}`** (full Git branch name from the PR, not the PR number). R2 and Neon use different identifiers on purpose (e.g. PR #313 from branch `312-feature-…`).

### Required env (when running `pnpm run cleanup-preview`)

Validated by `@dukkani/env` preset `preview-cleanup`:

| Variable | Description |
|----------|-------------|
| `S3_ENDPOINT` | R2 / MinIO S3 API URL |
| `S3_ACCESS_KEY_ID` | Access key |
| `S3_SECRET_ACCESS_KEY` | Secret key |
| `S3_BUCKET` | Bucket name |
| `PREVIEW_CLEANUP_PR_NUMBER` | GitHub PR number (positive integer) |

Optional: `S3_REGION` (defaults to `auto` for R2).

### GitHub Actions secrets / variables

Configure in the repo:

- **Secrets:** `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `NEON_API_KEY`
- **Variables:** `NEON_PROJECT_ID` (Neon recommends a variable; see [Neon branch cleanup](https://neon.com/docs/guides/vercel-branch-cleanup))

The workflow skips **fork** PRs (`head.repo` must equal the base repo) so secrets are not exposed to untrusted code.

### Limitations

- If preview deployments set `STORAGE_PREVIEW_PREFIX`, objects may not live under `pr-{number}/`; this job only removes that standard prefix.
- Deletes are prefix-scoped; using a dedicated preview bucket is still safer than sharing a production bucket long term.
- Renaming the Git branch or Neon branch after creation can break name matching for Neon cleanup.

### Implementation note

The script imports `@dukkani/storage/s3-client-factory` and `@dukkani/storage/delete-by-prefix` so it does not load full app `storageEnv` (Next/Vercel client variables). The same delete logic backs [`StorageService.deleteFolderByPrefix`](../../packages/storage/src/service.ts).
