import path from "node:path";
import { env } from "@dukkani/env";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
});

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env.DATABASE_URL,
	},
});
