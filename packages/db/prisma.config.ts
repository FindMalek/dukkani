import path from "node:path";
import type { PrismaConfig } from "prisma";
import { env } from "./src/env";

const config: PrismaConfig = {
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env.DATABASE_URL,
	},
};

export default config;

