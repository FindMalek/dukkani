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
