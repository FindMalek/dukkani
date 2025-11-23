import path from "node:path";
import { env } from "@dukkani/env";
import { defineConfig } from "prisma/config";

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url:
			process.env.NEXT_PUBLIC_NODE_ENV === "production"
				? (process.env.DATABASE_URL ?? "")
				: env.DATABASE_URL,
	},
});
