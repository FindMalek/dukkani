import { auth as authSingleton, initializeAuth } from "@dukkani/auth";
import { env as authEnv } from "@dukkani/auth/env";
import { database as dbSingleton, initializeDatabase } from "@dukkani/db";
import { apiEnv } from "@dukkani/env/presets/api";

/**
 * Core initialization module
 *
 * This module initializes all server-side dependencies (database, auth)
 * and exports them as singletons. This is the single source of truth
 * for server initialization, ensuring proper dependency order and
 * eliminating circular dependencies.
 *
 * Initialization happens automatically when the module is imported.
 * The exports are initialized lazily on first access.
 *
 * Usage:
 * ```ts
 * import { database, auth } from "@dukkani/core";
 * // Both are automatically initialized and ready to use
 * ```
 */

let databaseInitialized = false;
let authInitialized = false;

/**
 * Get the database instance, initializing it if needed
 */
export function getDatabase() {
	if (!databaseInitialized) {
		initializeDatabase({
			DATABASE_URL: apiEnv.DATABASE_URL,
		});
		databaseInitialized = true;
	}
	return dbSingleton;
}

/**
 * Get the auth instance, initializing it if needed
 */
export function getAuth() {
	if (!authInitialized) {
		getDatabase(); // Ensure database is initialized first

		// Use validated env schemas - all env vars are type-safe and validated
		initializeAuth(dbSingleton, {
			BETTER_AUTH_SECRET: authEnv.BETTER_AUTH_SECRET,
			NEXT_PUBLIC_CORS_ORIGIN: apiEnv.NEXT_PUBLIC_CORS_ORIGIN,
			NEXT_PUBLIC_DASHBOARD_URL: authEnv.NEXT_PUBLIC_DASHBOARD_URL,
			GOOGLE_CLIENT_ID: authEnv.GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET: authEnv.GOOGLE_CLIENT_SECRET,
			FACEBOOK_CLIENT_ID: authEnv.FACEBOOK_CLIENT_ID,
			FACEBOOK_CLIENT_SECRET: authEnv.FACEBOOK_CLIENT_SECRET,
		});
		authInitialized = true;
	}
	return authSingleton;
}

export const database = getDatabase();
export const auth = getAuth();
