import path from "node:path";
import { dbEnv } from "@dukkani/env/db";
import { defineConfig } from "prisma/config";

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: dbEnv.DATABASE_URL,
	},
});
