import { baseEnv } from "@dukkani/env/base";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Migration environment variables
 * Includes both source (Supabase) and destination (R2) configurations
 */
export const migrationEnv = createEnv({
	extends: [baseEnv],
	server: {
		// Source (Supabase) - for migration only
		SUPABASE_URL: z.url().optional(),
		SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
		SUPABASE_STORAGE_BUCKET: z.string().default("production").optional(),

		// Migration configuration
		MIGRATION_BATCH_SIZE: z.coerce.number().int().min(1).max(10),
		MIGRATION_DRY_RUN: z
			.enum(["true", "false"])
			.transform((val) => val === "true"),
		MIGRATION_VALIDATE_AFTER: z
			.enum(["true", "false"])
			.transform((val) => val === "true"),
		MIGRATION_CLEANUP_SOURCE: z
			.enum(["true", "false"])
			.transform((val) => val === "true"),
		MIGRATION_SCOPE: z.enum(["db-referenced", "all-bucket", "configurable"]),
		MIGRATION_ROLLBACK_ENABLED: z
			.enum(["true", "false"])
			.transform((val) => val === "true"),
	},
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});

// Export the inferred type
export type MigrationEnv = ReturnType<typeof migrationEnv.parse>;
