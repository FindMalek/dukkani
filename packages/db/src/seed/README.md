# Database Seeder

A scalable and extensible database seeding system for the dukkani project.

## Overview

This seeder system provides a structured way to seed your database with initial data. It's designed to be easily extensible, allowing you to add new seeders for different models without modifying the core seeding logic.

## Structure

```
src/seed/
├── base.ts              # Base seeder interface and abstract class
├── index.ts             # Main seeder orchestrator
├── seeders/
│   ├── index.ts         # Seeder registry
│   ├── todo.seeder.ts   # Example: Todo seeder
│   └── user.seeder.ts   # Example: User seeder
└── README.md            # This file
```

## Usage

### Running the Seeder

From the root of the monorepo:

```bash
pnpm run db:seed
```

Or from the `packages/db` directory:

```bash
pnpm run db:seed
```

### How It Works

1. The main `seed()` function in `src/seed/index.ts` orchestrates all seeders
2. Seeders are automatically sorted by their `order` property (lower numbers run first)
3. Each seeder runs independently and can skip if data already exists
4. Errors in any seeder will stop the entire seeding process

## Creating a New Seeder

### Step 1: Create the Seeder File

Create a new file in `src/seed/seeders/` following the naming convention: `{model-name}.seeder.ts`

Example: `src/seed/seeders/product.seeder.ts`

```typescript
import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";

export class ProductSeeder extends BaseSeeder {
	name = "ProductSeeder";
	order = 20; // Run after UserSeeder (order: 5) and TodoSeeder (order: 10)

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Product seeding...");

		const productData = [
			{
				name: "Product 1",
				price: 99.99,
				// ... other fields
			},
			// ... more products
		];

		// Check if products already exist
		const existingProducts = await prisma.product.findMany();
		if (existingProducts.length > 0) {
			this.log(`Skipping: ${existingProducts.length} products already exist`);
			return;
		}

		// Create products
		for (const product of productData) {
			await prisma.product.create({ data: product });
		}

		this.log(`Created ${productData.length} products`);
	}
}
```

### Step 2: Register the Seeder

Add your seeder to `src/seed/seeders/index.ts`:

```typescript
import { ProductSeeder } from "./product.seeder";

export const seeders: Seeder[] = [
	new UserSeeder(),
	new TodoSeeder(),
	new ProductSeeder(), // Add your new seeder here
];
```

That's it! Your seeder will now run automatically when you execute `pnpm run db:seed`.

## Seeder Interface

All seeders must implement the `Seeder` interface:

```typescript
interface Seeder {
	name: string;        // Display name for logging
	order?: number;       // Execution order (default: 0)
	seed(prisma: PrismaClient): Promise<void>;
}
```

### Using BaseSeeder

The `BaseSeeder` abstract class provides helpful utilities:

- `this.log(message)` - Log a message with the seeder name prefix
- `this.error(message, error?)` - Log an error with the seeder name prefix

## Best Practices

1. **Idempotency**: Always check if data already exists before seeding to avoid duplicates
2. **Ordering**: Use the `order` property to handle dependencies (e.g., seed users before posts)
3. **Error Handling**: Let errors propagate - the main seeder will handle them
4. **Logging**: Use `this.log()` and `this.error()` for consistent logging
5. **Data Quality**: Use realistic, meaningful test data

## Example: Seeder with Dependencies

If your seeder depends on data from another seeder:

```typescript
export class PostSeeder extends BaseSeeder {
	name = "PostSeeder";
	order = 15; // Run after UserSeeder (order: 5)

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Post seeding...");

		// Get existing users (seeded by UserSeeder)
		const users = await prisma.user.findMany();
		if (users.length === 0) {
			this.log("No users found. Skipping post seeding.");
			return;
		}

		const postData = users.map((user) => ({
			title: `Post by ${user.name}`,
			authorId: user.id,
			// ... other fields
		}));

		// Create posts
		for (const post of postData) {
			await prisma.post.create({ data: post });
		}

		this.log(`Created ${postData.length} posts`);
	}
}
```

## Troubleshooting

### Seeder Not Running

- Check that your seeder is registered in `src/seed/seeders/index.ts`
- Verify the `order` property is set correctly
- Check for syntax errors in your seeder file

### Data Not Seeding

- Ensure your Prisma schema is up to date (`pnpm run db:push` or `pnpm run db:migrate`)
- Check that the database connection is configured correctly
- Review the logs for specific error messages

### Duplicate Data

- Make sure your seeder checks for existing data before creating new records
- Consider using unique constraints in your Prisma schema

