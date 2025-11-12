import path from "node:path";
import type { PrismaConfig } from "prisma";
import { env } from "./src/env";

export default {
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env.DATABASE_URL,
	},
} satisfies PrismaConfig;
