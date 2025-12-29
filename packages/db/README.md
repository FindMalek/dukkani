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
# Setup database (start Docker + push schema)
pnpm run db:setup

# Push schema changes to database
pnpm run db:push

# Generate Prisma client
pnpm run db:generate

# Create and apply migration
pnpm run db:migrate

# Open Prisma Studio (database GUI)
pnpm run db:studio

# Seed database
pnpm run db:seed

# Reset database and seed
pnpm run db:reset-and-seed

# Reset database (WARNING: deletes all data)
pnpm run db:reset
```

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

Three users are created with the following credentials:

1. **Ahmed Al-Mansoori** (Admin)
   - Email: `ahmed@dukkani.com`
   - Password: `Admin123!`

2. **Fatima Hassan** (Merchant)
   - Email: `fatima@dukkani.com`
   - Password: `Merchant123!`

3. **Omar Abdullah** (Store Owner)
   - Email: `omar@dukkani.com`
   - Password: `Store123!`

### Seeded Data

- **3 users** with email/password authentication
- **3 stores** (one per user) with different categories and plans
- **9 products** (3 per store) with images
- **6 customers** (2 per store)
- **9 orders** (3 per store) with order items

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