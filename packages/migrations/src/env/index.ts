export type { InferType } from "zod";
export { type MigrationEnv, migrationEnv } from "./migration-env";

// Generate the type from the schema
type MigrationEnv = InferType<typeof import("./migration-env").migrationEnv>;
export type { MigrationEnv };
