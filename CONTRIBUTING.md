# Contributing to Dukkani

Thanks for contributing. This guide explains how to get the repo running locally and how to work on issues efficiently.

## 1) Before You Start

Install these tools first:

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 10+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

Architecture and repo boundaries are documented in [`docs/architecture.md`](./docs/architecture.md).

## 2) Repository Setup

```bash
git clone https://github.com/FindMalek/dukkani.git
cd dukkani
pnpm install
```

Create a root `.env` file with at least:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/dukkani"
NEXT_PUBLIC_API_URL="http://localhost:3002"
```

Start local infra and initialize schema:

```bash
pnpm run bootstrap
```

What `bootstrap` does:

- Starts Docker services from `docker/docker-compose.yml`
- Pushes Prisma schema (`pnpm run db:push`)

## 3) Seeded Data

Seed data comes from [`packages/db/src/seed`](./packages/db/src/seed), especially:

- [`packages/db/src/seed/index.ts`](./packages/db/src/seed/index.ts)
- [`packages/db/src/seed/seeders`](./packages/db/src/seed/seeders)

Run seeders:

```bash
pnpm run db:seed
```

Reset + fresh seed:

```bash
pnpm run db:reset-and-seed
```

For demo credentials and seeded entities, see [`packages/db/README.md`](./packages/db/README.md).

## 4) Most-Used Scripts

### Development

```bash
pnpm run dev            # all apps
pnpm run dev:api
pnpm run dev:dashboard
pnpm run dev:web
pnpm run dev:storefront
pnpm run dev:ad         # api + dashboard
pnpm run dev:as         # api + storefront
pnpm run dev:all        # api + dashboard + storefront
```

### Quality checks

```bash
pnpm run lint
pnpm run check-types
pnpm run build
```

### Database utilities

```bash
pnpm run db:studio
pnpm run db:push
pnpm run db:generate
```

## 5) How to Navigate the Repo

- `apps/*` contains product surfaces (`api`, `dashboard`, `storefront`, `web`)
- `packages/*` contains shared logic (domain, infra, UI, tooling)
- Apps should not import from other apps
- Shared contracts should come from package exports (`@dukkani/*`)

Rules and assistant guidance:

- Cursor rules: [`.cursor/rules`](./.cursor/rules)
- Windsurf rules: [`.windsurfrules`](./.windsurfrules)
- Workspace skills: [`.windsurf/skills`](./.windsurf/skills)

## 6) How to Pick an Issue

Start from **GitHub Issues**:

- Go to [github.com/FindMalek/dukkani/issues](https://github.com/FindMalek/dukkani/issues)
- Prioritize `good first issue`, `help wanted`, and well-scoped bug tasks
- Comment on the issue before starting to avoid duplicate work
- Confirm acceptance criteria and impacted app/package before coding

## 7) Lightweight Contribution Workflow

1. Reproduce the issue locally
2. Keep the change scoped to the issue
3. Run checks (`lint`, `check-types`, `build`) before opening PR
4. Include a short test plan in the PR description

## 8) Pull Request Checklist

- [ ] Issue is linked in PR description
- [ ] Scope matches issue acceptance criteria
- [ ] `pnpm run lint` passes
- [ ] `pnpm run check-types` passes
- [ ] `pnpm run build` passes
- [ ] Test plan and verification steps are included
