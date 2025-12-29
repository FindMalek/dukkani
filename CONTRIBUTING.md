# Contributing to Dukkani

Thank you for your interest in contributing to Dukkani! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Git Workflow](#git-workflow)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Be kind, constructive, and professional in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
    git clone https://github.com/YOUR_USERNAME/dukkani.git
    cd dukkani
```

3. **Add the upstream remote**:

```bash
    git remote add upstream https://github.com/FindMalek/dukkani.git
```

4. **Create a branch** for your changes:

```bash
   git checkout -b feat/your-feature-name
```
   ## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 20+ 
- [pnpm](https://pnpm.io/) 10+
- [Docker](https://www.docker.com/) (for local database)
- Git

### Initial Setup

1. **Install dependencies**:

```bash
   pnpm install
```

2. **Set up environment variables**:
   Create a `.env` file at the root:

```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/dukkani"
   NEXT_PUBLIC_CORS_ORIGIN="http://localhost:3002"
```

   3. **Start the database**:

```bash
   pnpm run db:setup
```

   4. **Seed the database** (optional, for development):

```bash
   pnpm run db:seed
```

   5. **Start development servers**:

```bash
   pnpm run dev
```

### Development URLs

- **Web App**: http://localhost:3001
- **API Server**: http://localhost:3002
- **Dashboard**: http://localhost:3003
- **Prisma Studio**: Run `pnpm run db:studio`

## Git Workflow

### Branch Naming

Use descriptive branch names with prefixes:

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

**Examples:**
- `feat/add-payment-integration`
- `fix/order-status-bug`
- `docs/update-api-documentation`


### Formatting and Linting

We use [Biome](https://biomejs.dev/) for formatting and linting.

**Before committing, always run:**
pnpm run checkThis will:
- Format your code
- Lint your code
- Fix auto-fixable issues

### File Naming

- **kebab-case** for all file names
- **PascalCase** for component names (exported)
- **camelCase** for function and variable names

**Examples:**
- ✅ `orders-list.tsx`, `use-orders.ts`, `store-service.ts`
- ❌ `OrdersList.tsx`, `useOrders.ts`, `StoreService.ts`

### Import Conventions

Always use package-scoped imports:

```typescript
// ✅ Correct
import { database } from "@dukkani/db";
import { StoreService } from "@dukkani/common/services";
import { storeInputSchema } from "@dukkani/common/schemas/store/input";

// ❌ Incorrect
import { database } from "../../../packages/db"
```

### TypeScript

- Always use TypeScript types from schemas
- Avoid `any` types
- Use type inference when possible
- Export types alongside schemas

```typescript
// ✅ Correct
import type { StoreInput, StoreSimpleOutput } from "@dukkani/common/schemas/store/input";

// ❌ Incorrect
type StoreInput = { name: string; slug: string; };
```

### Code Patterns

Follow the established patterns in the codebase:

- **Entities**: Transform database data to output schemas
- **Services**: Contain business logic and database operations
- **Routers**: Define API endpoints using oRPC
- **Schemas**: Define input/output validation using Zod

See [.cursor/rules/02-code-patterns.mdc](.cursor/rules/02-code-patterns.mdc) for detailed patterns.
