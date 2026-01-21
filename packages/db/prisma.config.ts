import path from "node:path";
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load root .env file for local development
// In Vercel/production, DATABASE_URL is injected directly via environment variables
if (!process.env.VERCEL) {
	const rootEnvPath = path.resolve(__dirname, "../../");
	config({ path: path.resolve(rootEnvPath, ".env") });
}

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