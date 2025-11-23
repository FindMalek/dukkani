import "server-only";

import { env } from "@dukkani/env";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Validate DATABASE_URL exists at runtime
if (!env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required");
}

let database: PrismaClient;

if (env.NEXT_PUBLIC_NODE_ENV === "production") {
	// Production: Use Neon serverless adapter
	neonConfig.webSocketConstructor = ws;
	neonConfig.poolQueryViaFetch = true;
	const connectionString = env.DATABASE_URL;
	const adapter = new PrismaNeon({ connectionString });

	database = globalForPrisma.prisma || new PrismaClient({ adapter });
} else {
	// Development/Local: Use PostgreSQL adapter for standard PostgreSQL
	const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
	database = globalForPrisma.prisma || new PrismaClient({ adapter });
}

if (env.NEXT_PUBLIC_NODE_ENV === "local") {
	globalForPrisma.prisma = database;
}

export { database };
export * from "@prisma/client";
export * from "./client";
