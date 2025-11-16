# Database Seeders

This directory contains all database seeders for the Dukkani project. Seeders are used to populate the database with initial data for development and testing.

## Overview

The seeder system is designed to be:

- **Scalable**: Easy to add new seeders and extend existing ones
- **Dependency-aware**: Seeders can depend on data from other seeders
- **Idempotent**: Running seeders multiple times won't create duplicates
- **Exportable**: Seeded data is exported for use in tests and other contexts

## Structure

```text
seed/
├── README.md           # This file
├── index.ts            # Main seed orchestrator
├── base.ts             # Base seeder class and interface
├── utils/
│   └── password.ts     # Password hashing utility
└── seeders/
    ├── index.ts        # Seeder registration and exports
    ├── user.seeder.ts  # User and account seeding
    ├── store.seeder.ts # Store and store plan seeding
    ├── product.seeder.ts # Product and image seeding
    ├── customer.seeder.ts # Customer seeding
    └── order.seeder.ts # Order and order item seeding
```

## Running Seeders

### Basic Usage

```bash
# From the root of the monorepo
pnpm db:seed

# Or from the db package directory
cd packages/db
pnpm db:seed
```

### Reset and Seed

To reset the database and run seeders:

```bash
pnpm db:reset-and-seed
```

This will:

1. Drop all tables
2. Recreate the schema
3. Run all seeders in order

## Seeder Execution Order

Seeders run in order based on their `order` property (lower numbers first):

1. **UserSeeder** (order: 1) - Creates users and accounts
2. **StoreSeeder** (order: 2) - Creates stores and store plans
3. **ProductSeeder** (order: 3) - Creates products and images
4. **CustomerSeeder** (order: 4) - Creates customers
5. **OrderSeeder** (order: 5) - Creates orders and order items

## Default Users

The seeder creates 3 default users that you can use to log in:

### 1. Ahmed Al-Mansoori (Admin)

- **Email**: `ahmed@dukkani.com`
- **Password**: `Admin123!`
- **Role**: Store owner with premium plan
- **Store**: Ahmed's Fashion Boutique

### 2. Fatima Hassan (Merchant)

- **Email**: `fatima@dukkani.com`
- **Password**: `Merchant123!`
- **Role**: Store owner with basic plan
- **Store**: Fatima's Electronics Hub

### 3. Omar Abdullah (Store Owner)

- **Email**: `omar@dukkani.com`
- **Password**: `Store123!`
- **Role**: Store owner with free plan
- **Store**: Omar's Home Essentials

## Seeded Data

### Users

- 3 users with email/password authentication
- All users have verified emails
- Each user has an associated account for login

### Stores

- 3 stores, one for each user
- Different categories: Fashion, Electronics, Home
- Different themes: Modern, Minimal, Classic
- Store plans: Premium, Basic, Free
- WhatsApp numbers for each store

### Products

- 9 products total (3 per store)
- Products include:
  - Fashion items (jackets, sunglasses, sneakers)
  - Electronics (earbuds, smartwatch, charger)
  - Home essentials (cookware, pillows, lamp)
- Each product has images and stock information
- All products are published

### Customers

- 6 customers total (2 per store)
- Each customer has a unique phone number per store
- Customers are linked to their respective stores

### Orders

- 9 orders total (3 per store)
- Different order statuses: PENDING, CONFIRMED, PROCESSING
- Orders include order items with quantities and prices
- Some orders are linked to customers, others are guest orders

## Using Seeded Data in Code

### Accessing Seeded Data

You can import and use the seeded data in your code:

```typescript
import { getSeededData } from "@dukkani/db/seed/seeders";

const seededData = getSeededData();

// Access users
console.log(seededData.users);
// [
//   { id: "user_admin_001", email: "ahmed@dukkani.com", name: "Ahmed Al-Mansoori", password: "Admin123!" },
//   ...
// ]

// Access stores
console.log(seededData.stores);
// [
//   { id: 1n, name: "Ahmed's Fashion Boutique", slug: "ahmed-fashion", ownerId: "user_admin_001" },
//   ...
// ]

// Access products
console.log(seededData.products);
// [
//   { id: 1n, name: "Premium Leather Jacket", storeId: 1n, price: Decimal("299.99") },
//   ...
// ]
```

### Linking Data

Seeders automatically link related data:

- Stores are linked to users (owners)
- Products are linked to stores
- Customers are linked to stores
- Orders are linked to stores, customers, and products

Example:

```typescript
import { getSeededData } from "@dukkani/db/seed/seeders";

const { users, stores, products } = getSeededData();

// Find all products for a specific store
const store = stores[0];
const storeProducts = products.filter(p => p.storeId === store.id);

// Find store owner
const owner = users.find(u => u.id === store.ownerId);
```

## Creating New Seeders

### 1. Create the Seeder File

Create a new file in `seeders/` directory:

```typescript
import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";

export class MySeeder extends BaseSeeder {
  name = "MySeeder";
  order = 10; // Set appropriate order

  async seed(prisma: PrismaClient): Promise<void> {
    this.log("Starting MySeeder...");

    // Check if data already exists
    const existing = await prisma.myModel.findMany();
    if (existing.length > 0) {
      this.log(`Skipping: ${existing.length} items already exist`);
      return;
    }

    // Create data
    await prisma.myModel.create({
      data: {
        // ... your data
      },
    });

    this.log("✅ Completed");
  }
}
```

### 2. Register the Seeder

Add it to `seeders/index.ts`:

```typescript
export { MySeeder } from "./my.seeder";

// In the seeders array
export const seeders: Seeder[] = [
  // ... existing seeders
  new MySeeder(),
];
```

### 3. Handle Dependencies

If your seeder depends on data from another seeder:

```typescript
export class MySeeder extends BaseSeeder {
  private otherSeeder?: OtherSeeder;

  setOtherSeeder(otherSeeder: OtherSeeder): void {
    this.otherSeeder = otherSeeder;
  }

  async seed(prisma: PrismaClient): Promise<void> {
    if (!this.otherSeeder) {
      throw new Error("OtherSeeder must be set");
    }

    const otherData = this.otherSeeder.seededData;
    // Use otherData...
  }
}
```

Then set up the dependency in `seeders/index.ts`:

```typescript
export function setupSeederDependencies(): void {
  // ... existing setup
  if (mySeeder && otherSeeder) {
    mySeeder.setOtherSeeder(otherSeeder);
  }
}
```

## Best Practices

1. **Idempotency**: Always check if data exists before creating
2. **Ordering**: Set appropriate `order` values to handle dependencies
3. **Logging**: Use `this.log()` for informative messages
4. **Error Handling**: Let errors bubble up to stop seeding on failure
5. **Exports**: Export seeded data for use in tests and other contexts
6. **Realistic Data**: Use realistic, meaningful data for development

## Troubleshooting

### Seeders Skip Execution

If seeders skip execution, it means data already exists. To reset:

```bash
pnpm db:reset-and-seed
```

### Dependency Errors

If you get dependency errors, ensure:

1. Seeders are registered in the correct order
2. Dependencies are set up in `setupSeederDependencies()`
3. The `order` property is set correctly

### Password Hashing Issues

If you need to create users with passwords, use the password utility:

```typescript
import { hashPassword } from "../utils/password";

const hashedPassword = await hashPassword("MyPassword123!");
```

## Environment Variables

Make sure your `.env` file has the correct `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dukkani"
```

## See Also

- [Prisma Documentation](https://www.prisma.io/docs)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- Project README for database setup instructions
