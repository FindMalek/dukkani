import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import ws from "ws";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaClientKnownRequestError } from "../prisma/generated/internal/prismaNamespace";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Import env type for inference (lazy to avoid circular dependency)
import type { env as dbEnvType } from "./env";

/**
 * Type for database environment variables
 * Inferred from the db env schema - automatically stays in sync with env changes
 */
type DatabaseEnv = Pick<typeof dbEnvType, "DATABASE_URL">;

/**
 * Factory function to create a Prisma database client
 * Uses appropriate adapter based on environment (Neon for production, PostgreSQL for dev)
 *
 * @param env - Environment object with DATABASE_URL
 * @returns PrismaClient instance
 */
export function createDatabase(env: DatabaseEnv): PrismaClient {
	// Return existing instance if already created (singleton pattern)
	if (globalForPrisma.prisma) {
		return globalForPrisma.prisma;
	}

	// Check production environment
	// Use NODE_ENV directly (always available) and VERCEL_ENV for Vercel deployments
	// Note: We can't use env.NEXT_PUBLIC_NODE_ENV here because this function
	// is called before env validation, and NODE_ENV is a standard Node.js var
	const isProduction =
		process.env.NODE_ENV === "production" ||
		process.env.VERCEL_ENV === "production";
	const connectionString = env.DATABASE_URL;

	if (isProduction) {
		// Production: Use Neon serverless adapter
		neonConfig.webSocketConstructor = ws;
		neonConfig.poolQueryViaFetch = true;
		const adapter = new PrismaNeon({ connectionString });
		globalForPrisma.prisma = new PrismaClient({ adapter });
	} else {
		// Development/Local/Preview: Use PostgreSQL adapter
		const adapter = new PrismaPg({ connectionString });
		globalForPrisma.prisma = new PrismaClient({ adapter });
	}

	return globalForPrisma.prisma;
}

/**
 * Singleton database instance
 * Must be initialized by calling createDatabase() before use
 * This is initialized by the server package at app startup
 */
export let database: PrismaClient;

/**
 * Initialize the database singleton
 * Called by server initialization module
 * @internal
 */
export function initializeDatabase(env: DatabaseEnv): void {
	database = createDatabase(env);
}

export { PrismaClientKnownRequestError };
export type { PrismaClient } from "../prisma/generated/client";
