import path from "node:path";
import type { PrismaConfig } from "prisma";
import dotenv from "dotenv";

dotenv.config({
	path: path.resolve(__dirname, "../../.env"),
});

const config: PrismaConfig = {
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
};

export default config;
