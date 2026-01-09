import path from "node:path";
import { defineConfig } from "prisma/config";

/**
 * Prisma configuration file
 *
 * NOTE: This file uses process.env directly (not t3-oss env validation) because:
 * 1. It runs in Prisma CLI context, not application context
 * 2. It needs to work before the app is built (during `prisma generate`, `prisma migrate`, etc.)
 * 3. Prisma CLI doesn't have access to the full application environment
 *
 * The DATABASE_URL is validated by @dukkani/env when used in application code.
 * This file only needs the raw value for Prisma CLI operations.
 */
export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: process.env.DATABASE_URL || "",
	},
});
