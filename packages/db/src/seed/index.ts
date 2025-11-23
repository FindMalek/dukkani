import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

// Load .env from monorepo root before importing Prisma
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
	path: path.resolve(__dirname, "../../../../.env"),
});

import prisma from "../index";
import { getSeededData, seeders, setupSeederDependencies } from "./seeders";

/**
 * Main seed function that orchestrates all seeders
 * Seeders are executed in order based on their `order` property
 */
export async function seed(): Promise<void> {
	console.log("🌱 Starting database seeding...\n");

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
				console.log(`\n📦 Running ${seeder.name}...`);
				await seeder.seed(prisma);
				console.log(`✅ ${seeder.name} completed`);
			} catch (error) {
				console.error(`❌ ${seeder.name} failed:`, error);
				throw error; // Re-throw to stop seeding on error
			}
		}

		// Display seeded data summary
		const seededData = getSeededData();
		console.log("\n📊 Seeding Summary:");
		console.log(`   Users: ${seededData.users.length}`);
		console.log(`   Stores: ${seededData.stores.length}`);
		console.log(`   Products: ${seededData.products.length}`);
		console.log(`   Customers: ${seededData.customers.length}`);
		console.log(`   Orders: ${seededData.orders.length}`);

		console.log("\n✨ Database seeding completed successfully!");
	} catch (error) {
		console.error("\n💥 Database seeding failed:", error);
		throw error;
	} finally {
		await database.$disconnect();
	}
}

// Run the seed function when this file is executed directly
seed().catch((error) => {
	console.error(error);
	process.exit(1);
});
