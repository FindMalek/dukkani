import { auth as authSingleton, initializeAuth } from "@dukkani/auth";
import { database as dbSingleton, initializeDatabase } from "@dukkani/db";
import { dbEnv } from "@dukkani/env/db";

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
			DATABASE_URL: dbEnv.DATABASE_URL,
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
		getDatabase();

		initializeAuth(dbSingleton);
		authInitialized = true;
	}
	return authSingleton;
}

export const database = getDatabase();
export const auth = getAuth();
