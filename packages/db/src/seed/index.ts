import "dotenv/config";
import prisma from "../index";
import { seeders } from "./seeders";

/**
 * Main seed function that orchestrates all seeders
 * Seeders are executed in order based on their `order` property
 */
export async function seed(): Promise<void> {
	console.log("🌱 Starting database seeding...\n");

	try {
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

		console.log("\n✨ Database seeding completed successfully!");
	} catch (error) {
		console.error("\n💥 Database seeding failed:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

// Run the seed function when this file is executed directly
seed()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

