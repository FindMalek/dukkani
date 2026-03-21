import type { z } from "zod";
export type InferType<T> = z.infer<T>;
export { type MigrationEnv, migrationEnv } from "./migration-env";
