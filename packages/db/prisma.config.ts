import path from "node:path";
import { defineConfig } from "prisma/config";
import { env } from "@/env";

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env.DATABASE_URL,
	},
});