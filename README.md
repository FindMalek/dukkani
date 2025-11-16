# dukkani

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Self, ORPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Better-Auth
- **Biome** - Linting and formatting
- **PWA** - Progressive Web App support
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Environment Setup

This project uses [T3 Env](https://env.t3.gg) for type-safe environment variable management.

Create a `.env` file at the root of the project with your configuration:

**Base/Shared Variables:**

- `DATABASE_URL`: Your PostgreSQL connection string (required) - Used by db, auth, and all apps

Example for local Docker setup:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/dukkani"
```

**Auth Package Variables:**

- `NEXT_PUBLIC_CORS_ORIGIN`: CORS origin URL (optional) - Used by auth package

All environment variables are validated at runtime and provide type-safe access throughout the monorepo. Each package only includes the environment variables it needs:

- `@dukkani/env`: Base env with `DATABASE_URL` (shared by all)
- `@dukkani/auth/env`: Auth-specific env vars (extends base)
- `@dukkani/db/env`: Database env (extends base, lightweight)
- `apps/web/env`: Next.js app env (extends base + auth)

## Database Setup

This project uses PostgreSQL with Prisma. To set up the database with Docker and push the schema, run:

```bash
pnpm run db:setup
```

This command will:

- Start the PostgreSQL database container
- Push the Prisma schema to create all tables

**Note:** Make sure you have created a `.env` file with `DATABASE_URL` before running this command (see Environment Setup above).

**Other Database Commands:**

- `pnpm run db:studio` - Open Prisma Studio to view/edit data
- `pnpm run db:seed` - Seed the database with initial data
- `cd docker && docker compose down` - Stop the database container

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see your fullstack application.

## Project Structure

```text
dukkani/
├── apps/
│   └── web/         # Fullstack application (Next.js)
├── packages/
│   ├── api/         # API layer / business logic
│   ├── auth/        # Authentication configuration & logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open database studio UI
- `pnpm run check`: Run Biome formatting and linting
- `cd apps/web && pnpm run generate-pwa-assets`: Generate PWA assets
