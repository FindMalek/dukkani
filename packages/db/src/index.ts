import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import ws from "ws";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaClientKnownRequestError } from "../prisma/generated/internal/prismaNamespace";
import { env } from "./env";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

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

export { database, PrismaClientKnownRequestError };
