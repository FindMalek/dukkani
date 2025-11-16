# Database Seeders

Seeders populate the database with initial data for development and testing.

## Usage

```bash
# Run seeders
pnpm db:seed

# Reset database and run seeders
pnpm db:reset-and-seed
```

## Default Users

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

## Seeded Data

- **3 users** with email/password authentication
- **3 stores** (one per user) with different categories and plans
- **9 products** (3 per store) with images
- **6 customers** (2 per store)
- **9 orders** (3 per store) with order items

## Using Seeded Data

```typescript
import { getSeededData } from "@dukkani/db/seed/seeders";

const { users, stores, products, customers, orders } = getSeededData();
```

## Creating New Seeders

1. Create a seeder class extending `BaseSeeder`
2. Set the `order` property for execution order
3. Register in `seeders/index.ts`
4. Use `createMany` for optimal performance when possible
