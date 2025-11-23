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
				? env.DATABASE_URL
				: (process.env.DATABASE_URL ?? ""),
	},
});
