import { auth as authSingleton, initializeAuth } from "@dukkani/auth";
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

		// Use apiEnv for base vars and process.env for auth-specific vars
		// NEXT_PUBLIC_DASHBOARD_URL is optional - if not set, only CORS_ORIGIN is used for trusted origins
		const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;

		// Get required env vars with fallbacks (warnings will be shown by Better Auth if missing)
		const betterAuthSecret = process.env.BETTER_AUTH_SECRET ?? "";
		const googleClientId = process.env.GOOGLE_CLIENT_ID ?? "";
		const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
		const facebookClientId = process.env.FACEBOOK_CLIENT_ID ?? "";
		const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET ?? "";

		initializeAuth(dbSingleton, {
			BETTER_AUTH_SECRET: betterAuthSecret,
			NEXT_PUBLIC_CORS_ORIGIN: apiEnv.NEXT_PUBLIC_CORS_ORIGIN,
			NEXT_PUBLIC_DASHBOARD_URL: dashboardUrl,
			GOOGLE_CLIENT_ID: googleClientId,
			GOOGLE_CLIENT_SECRET: googleClientSecret,
			FACEBOOK_CLIENT_ID: facebookClientId,
			FACEBOOK_CLIENT_SECRET: facebookClientSecret,
		});
		authInitialized = true;
	}
	return authSingleton;
}

// Export initialized singletons
// These initialize automatically when imported (lazy on first access)
export const database = getDatabase();
export const auth = getAuth();
