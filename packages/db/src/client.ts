import type { PrismaClient } from "@prisma/client";

import { database } from "./index";

// Type for Prisma transaction client
export type PrismaTransactionClient = Omit<
	PrismaClient,
	"$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// Union type for database client (either full client or transaction client)
export type DatabaseClient = PrismaClient | PrismaTransactionClient;

/**
 * Get the appropriate database client
 * @param tx Optional transaction client
 * @returns Database client (transaction if provided, otherwise global client)
 */
export function getDatabaseClient(
	tx?: PrismaTransactionClient,
): DatabaseClient {
	return tx || database;
}
