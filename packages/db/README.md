# @dukkani/db

Database package containing Prisma schema, client, seeders, and database utilities for the Dukkani monorepo.

## Overview

This package provides:
- Prisma database schema and migrations
- Database client with environment-aware configuration (Neon for production, PostgreSQL for development)
- Database seeders for development and testing
- Database utilities (ID generation, password hashing, etc.)

## Usage

### Database Client

```typescript
import { database } from "@dukkani/db";

// Use in services
const stores = await database.store.findMany({
  where: { ownerId: userId },
});
```

### Prisma Types

```typescript
import type { Prisma } from "@dukkani/db/prisma/generated";

type StoreData = Prisma.StoreGetPayload<{
  include: { owner: true; products: true };
}>;
```

## Database Commands

All commands should be run from the root of the monorepo:

```bash
# Setup database and storage (start Docker: Postgres + MinIO, push schema)
pnpm run setup

# Push schema changes to database
pnpm run db:push

# Generate Prisma client
pnpm run db:generate

# Create and apply migration
pnpm run db:migrate

# Create migration SQL only (review before applying)
pnpm --filter @dukkani/db db:migrate:create-only

# Open Prisma Studio (database GUI)
pnpm run db:studio

# Seed database
pnpm run db:seed

# Reset database and seed
pnpm run db:reset-and-seed

# Reset database (WARNING: deletes all data)
pnpm run db:reset
```

### Migration CLI args (name, etc.)

From the repo root, extra arguments are forwarded to the underlying script if you pass them **after** `--` (pnpm → Turborepo → `@dukkani/db` script). Example:

```bash
pnpm run db:migrate -- --name add_product_version_uniques
```

If your shell or Turbo version strips one `--`, run from `packages/db` instead:

```bash
cd packages/db && pnpm exec prisma migrate dev --name add_product_version_uniques
```

**Unique indexes on version-scoped columns:** if a migration adds `@@unique([productVersionId, name])` or `@@unique([productVersionId, sku])`, deduplicate those pairs in the database **before** applying the migration, or PostgreSQL will reject the migration when it tries to build the index.

### Prisma Migrate warnings and “Are you sure?”

When Prisma detects **risky** changes (for example the unique-index warnings above), `prisma migrate dev` prints the warnings and asks **“Are you sure you want to create and apply this migration?”** The safe default is often **No**—pressing **Enter** alone may **cancel** the run (exit code 130). That is unrelated to Turbo dropping `--name`: your migration name is still applied; the run stopped at the confirmation step.

**Ways to proceed:**

1. **Fix data first** (recommended when duplicates exist): dedupe rows, then run migrate again and answer **yes** when prompted.
2. **Explicitly confirm**: type **yes** (or **y**) at the prompt when you accept the risk.
3. **Review SQL before apply**: run `pnpm --filter @dukkani/db db:migrate:create-only`, inspect the generated migration, fix data, then run `db:migrate` (or apply + resolve as your team prefers).

For non-interactive environments, piping `yes` is possible but dangerous if you have not resolved duplicate data—prefer fixing the database or using create-only first.

See [docs/storage.md](../../docs/storage.md) for MinIO and R2 storage setup.

## Seeders

Seeders populate the database with initial data for development and testing.

### Running Seeders


```bash
# Run seeders
pnpm run db:seed
```


```bash
# Reset database and run seeders
pnpm run db:reset-and-seed
```

### Default Users

Five Tunisian users are created. The three store owners also have a demo user:

| Name | Email | Password | Role |
|---|---|---|---|
| Amine Trabelsi | `amine@dukkani.co` | `Admin123!` | Store owner (amine-fashion), Telegram linked |
| Sana Ben Salah | `sana@dukkani.co` | `Merchant123!` | Store owner (sana-electronics) |
| Yassine Gharbi | `yassine@dukkani.co` | `Store123!` | Store owner (yassine-home) |
| Karim Mansouri | `karim@dukkani.co` | `Team123!` | Team MANAGER (amine-fashion) |
| Rania Hamdi | `rania@dukkani.co` | `Team123!` | Team STAFF (sana-electronics) |
| Demo User | `demo@dukkani.co` | `Demo123!` | Demo store (Lighthouse CI) |

> **Note:** All data is fictional and safe for public repos (no real PII).  
> Re-seeding requires a full DB reset: `pnpm run db:reset-and-seed`

### Seeded Data (Tunisia theme)

Sample data uses Tunisian names, +216 phone numbers, and cities (Tunis, Sfax, Sousse, Gabès, Monastir, Kairouan, Ariana, Nabeul).

| Model | Count | Notes |
|---|---|---|
| Users | 5 (+1 demo) | Tunisian names; Amine has Telegram linked |
| Stores | 3 (+1 demo) | All TND currency; Amine=PREMIUM, Sana=BASIC, Yassine=FREE |
| TeamMembers | 2 | Karim (MANAGER) + Rania (STAFF) |
| Categories | 21 (+3 demo) | French/Arabic category names |
| Products | 32 (+5 demo) | 18 with variants; 4 with addon groups |
| ProductVariants | ~250 | Multi-dimension SKUs |
| ProductAddonGroups | 4 | Personnalisation, Accessoires, Service, Broderie, Gravure |
| ProductCollections | 6 | 2 collections per store |
| Customers | 9 | 3 per store; Tunisian cities + 4-digit postal codes |
| Orders | 15 | 5 per store; CONFIRMED/PROCESSING/PENDING/DELIVERED/CANCELLED |
| WhatsApp Messages | ~12 | Created for `isWhatsApp=true` orders |
| OrderItemAddons | varies | Addon selections for products with addon groups |

### Using Seeded Data

```typescript
import { getSeededData } from "@dukkani/db/seed/seeders";

const { users, stores, products, customers, orders } = getSeededData();
```

### Creating New Seeders

1. Create a seeder file in `src/seed/seeders/`:

```typescript
// src/seed/seeders/custom.seeder.ts
import { BaseSeeder } from "../base";
import type { PrismaClient } from "@dukkani/db/prisma/generated";

export const customSeeder: Seeder = {
  name: "CustomSeeder",
  order: 5, // Execution order
  async seed(db: PrismaClient) {
    const items = await db.custom.createMany({
      data: [
        // ... your data
      ],
    });
    return items;
  },
};
```

2. Register in `src/seed/seeders/index.ts`:

```typescript
import { customSeeder } from "./custom.seeder";

export const seeders = [
  // ... other seeders
  customSeeder,
];
```

Seeders are executed in order (lowest `order` value first).