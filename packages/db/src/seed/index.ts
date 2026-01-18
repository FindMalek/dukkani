import { logger } from "@dukkani/logger";
import { loadRootEnv } from "@dukkani/env/load-env";

// Load root .env BEFORE any imports that use env validation
// In ESM, imports are hoisted, so we need to load dotenv before any imports
loadRootEnv();

/**
 * Main seed function that orchestrates all seeders
 * Seeders are executed in order based on their `order` property
 * Uses dynamic imports to ensure .env is loaded before env validation
 */
export async function seed(): Promise<void> {
	// Use dynamic imports after dotenv is loaded to ensure env vars are available
	// when modules validate environment variables
	const { env } = await import("../env");
	const dbModule = await import("../index");
	const { getSeededData, seeders, setupSeederDependencies } = await import(
		"./seeders"
	);

	logger.info("Starting database seeding");

	// Initialize database before using it
	dbModule.initializeDatabase({
		DATABASE_URL: env.DATABASE_URL,
	});

	// Get a fresh reference to database after initialization
	// The database variable is updated by initializeDatabase, so we need to access it from the module
	const database = dbModule.database;

	try {
		// Set up dependencies between seeders
		setupSeederDependencies();

		// Sort seeders by order (lower numbers first)
		const sortedSeeders = [...seeders].sort((a, b) => {
			const orderA = a.order ?? 0;
			const orderB = b.order ?? 0;
			return orderA - orderB;
		});

		// Execute each seeder
		for (const seeder of sortedSeeders) {
			try {
				logger.info({ seeder: seeder.name }, "Running seeder");
				await seeder.seed(database);
				logger.info({ seeder: seeder.name }, "Seeder completed");
			} catch (error) {
				logger.error({ seeder: seeder.name, error }, "Seeder failed");
				throw error; // Re-throw to stop seeding on error
			}
		}

		// Display seeded data summary
		const seededData = getSeededData();
		logger.info(
			{
				users: seededData.users.length,
				stores: seededData.stores.length,
				products: seededData.products.length,
				customers: seededData.customers.length,
				orders: seededData.orders.length,
			},
			"Seeding summary",
		);

		logger.info("Database seeding completed successfully");
	} catch (error) {
		logger.error({ error }, "Database seeding failed");
		throw error;
	} finally {
		await database.$disconnect();
	}
}

// Run the seed function when this file is executed directly
seed().catch((error) => {
	logger.error({ error }, "Seed script error");
	process.exit(1);
});
