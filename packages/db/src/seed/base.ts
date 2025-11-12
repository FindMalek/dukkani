import type { PrismaClient } from "../../prisma/generated/client";

/**
 * Base interface for all seeders
 * Each seeder should implement this interface to ensure consistency
 */
export interface Seeder {
	/**
	 * The name of the seeder (used for logging)
	 */
	name: string;

	/**
	 * The order in which this seeder should run (lower numbers run first)
	 * Use this to handle dependencies between seeders
	 */
	order?: number;

	/**
	 * Execute the seeding logic
	 * @param prisma - The Prisma client instance
	 */
	seed(prisma: PrismaClient): Promise<void>;
}

/**
 * Abstract base class for seeders with common functionality
 * Extend this class to create new seeders
 */
export abstract class BaseSeeder implements Seeder {
	abstract name: string;
	order: number = 0;

	abstract seed(prisma: PrismaClient): Promise<void>;

	/**
	 * Log a message with the seeder name prefix
	 */
	protected log(message: string): void {
		console.log(`[${this.name}] ${message}`);
	}

	/**
	 * Log an error with the seeder name prefix
	 */
	protected error(message: string, error?: unknown): void {
		console.error(`[${this.name}] ${message}`, error);
	}
}

