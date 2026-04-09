# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (run from repo root)
pnpm run dev:ad        # API + dashboard (most common)
pnpm run dev:as        # API + storefront
pnpm run dev:all       # API + dashboard + storefront

# Type checking
pnpm run check-types        # Full TypeScript check
pnpm run check-types:fast   # Fast check via tsgo

# Linting & formatting
pnpm run check         # Biome check + fix
pnpm run lint          # Biome lint + fix
pnpm run fix:all       # Biome check with unsafe mode

# Build
pnpm run build                # Build all apps & packages
pnpm run build:packages       # Build only shared packages

# Database
pnpm run db:generate   # Regenerate Prisma client (required after schema changes)
pnpm run db:push       # Push schema changes (dev)
pnpm run db:migrate    # Create a new migration
pnpm run db:seed       # Seed demo data
pnpm run db:reset-and-seed  # Full reset + seed
pnpm run db:studio     # Open Prisma Studio

# First time setup
pnpm run bootstrap     # Start Docker + init DB
```

## Architecture

**Dukkani** is a multi-tenant e-commerce SaaS platform for Tunisian SMBs. It is a Turborepo monorepo with pnpm workspaces.

### Apps

| App | Port | Purpose |
|-----|------|---------|
| `apps/api` | 3002 | oRPC API server, Better Auth endpoints, webhooks |
| `apps/dashboard` | 3003 | Merchant admin UI |
| `apps/storefront` | 3004 | Customer-facing storefront |
| `apps/web` | 3001 | Public marketing site |

### Key Packages

- **`@dukkani/common`** — Domain layer: entities, queries, services, and Zod schemas
- **`@dukkani/orpc`** — API layer: oRPC routers and client utilities (React Query integration)
- **`@dukkani/db`** — Prisma ORM, schema (split by domain in `prisma/schema/`), migrations, seeders
- **`@dukkani/auth`** — Better Auth configuration, session management
- **`@dukkani/ui`** — shadcn/ui components + Tailwind 4 design system
- **`@dukkani/env`** — Centralized env validation via `@t3-oss/env-core`; never use `process.env` directly

### Data Flow

```
Request → apps/api (oRPC handler)
       → @dukkani/orpc (router + procedure)
       → @dukkani/common (service)
       → @dukkani/db (Prisma)
       → Entity.getRo() (transform DB → output schema)
       → Response
```

Client side (dashboard/storefront):
```
Component → hook (React Query + orpc.{domain}.{proc}.queryOptions())
          → @dukkani/orpc/client → apps/api
```

### Domain Layer Patterns (`@dukkani/common`)

**Entity** (`entities/{domain}/entity.ts`) — transforms Prisma DB types to output schemas:
```typescript
export class StoreEntity {
  static getSimpleRo(entity: StoreSimpleDbData): StoreSimpleOutput { ... }
  static getRo(entity: StoreIncludeDbData): StoreIncludeOutput { ... }
}
```

**Query** (`entities/{domain}/query.ts`) — Prisma include/where/order builders:
```typescript
export class StoreQuery {
  static getSimpleInclude(): Prisma.StoreInclude { ... }
  static getInclude(): Prisma.StoreInclude { ... }
  static getWhere(storeIds: string[], filters?): Prisma.StoreWhereInput { ... }
}
```

**Service** (`services/{domain}-service.ts`) — business logic; throws `AppError` subclasses:
```typescript
export class StoreService {
  static async getAllStores(userId: string): Promise<StoreSimpleOutput[]> { ... }
}
```

**Schema** (`schemas/{domain}/input.ts` + `output.ts`) — Zod validation; always import types from here.

### API Layer (`@dukkani/orpc`)

- `protectedProcedure` — requires auth + standard rate limiting
- `publicProcedure` — no auth + strict rate limiting
- Routers are in `packages/orpc/src/routers/{entity}.ts`, registered in `routers/index.ts`
- In router handlers, wrap service calls in try/catch and call `convertServiceError(error)` to map `AppError` → `ORPCError`
- Use `ORPCError` codes: `BAD_REQUEST`, `UNAUTHORIZED`, `NOT_FOUND`, `FORBIDDEN`, `CONFLICT`, `TOO_MANY_REQUESTS`

### Dashboard Frontend Patterns

- API hooks live in `apps/dashboard/src/hooks/api/` with naming `use-{domain}.hook.ts`
- Export names: `use{Domain}Query`, `create{Domain}MutationOptions`, etc.
- Server state: React Query via `orpc.{domain}.{proc}.queryOptions({ input })`
- Client/UI state: Zustand stores
- Components are feature-grouped under `src/components/dashboard/{feature}/`

### Naming Conventions

- Files: `kebab-case` everywhere
- Components: `PascalCase` function name, `kebab-case` filename
- Classes: `PascalCase` with suffix (`Entity`, `Service`, `Query`, `Router`)
- Schemas: `camelCase` variable (`storeInputSchema`), `PascalCase` type (`StoreInput`)
- Folders: feature-based, not type-based

### Package Dependency Rules

- Apps must not import from other apps
- `@dukkani/common` must not import from app packages
- Always use the catalog version for shared deps (`catalog:` in pnpm-workspace.yaml)
- After schema changes: run `pnpm run db:generate` before building

### Tech Stack

Next.js 16 · React 19 · TypeScript 6 · Prisma 7 (Neon serverless in prod) · oRPC · Better Auth · Tailwind 4 · shadcn/ui · TanStack Query 5 · TanStack Form · Zustand · Biome · Turborepo · next-intl (Arabic/French/English)
