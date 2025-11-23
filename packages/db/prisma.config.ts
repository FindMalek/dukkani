import path from "node:path";
import { env } from "@dukkani/env";
import { defineConfig } from "prisma/config";

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: (() => {
			// In production (Vercel), use direct process.env access
			if (process.env.NODE_ENV === "production") {
				return process.env.DATABASE_URL || "";
			}
			// In development/local, try validated env first, fallback to process.env
			try {
				return env.DATABASE_URL;
			} catch {
				return process.env.DATABASE_URL || "";
			}
		})(),
	},
});
