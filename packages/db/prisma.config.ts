import path from "node:path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local from db package directory (local dev only)
// In Vercel/production, DATABASE_URL is injected directly
if (!process.env.VERCEL) {
	dotenv.config({
		path: path.resolve(__dirname, "../.env.local"),
	});
}

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url:
			process.env.NODE_ENV === "production"
				? process.env.DATABASE_URL || ""
				: process.env.DATABASE_URL || "",
	},
});
