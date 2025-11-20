import "server-only";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

import { env } from "@/env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let database: PrismaClient;

if (env.NEXT_PUBLIC_NODE_ENV === "production") {
	// Production: Use Neon serverless adapter
	neonConfig.webSocketConstructor = ws;
	neonConfig.poolQueryViaFetch = true;
	const connectionString = env.DATABASE_URL;
	const adapter = new PrismaNeon({ connectionString });

	database = globalForPrisma.prisma || new PrismaClient({ adapter });
} else {
	// Development: Use standard Prisma client
	database = globalForPrisma.prisma || new PrismaClient();
}

if (env.NEXT_PUBLIC_NODE_ENV === "local") {
	globalForPrisma.prisma = database;
}

export { database };
export * from "@prisma/client";
export * from "./client";
