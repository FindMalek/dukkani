import { scrypt } from "node:crypto";
import type { PrismaClient } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { apiEnv } from "@dukkani/env/presets/api";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import type { env } from "./env";

/**
 * Custom password verifier to match seeder format
 * Format: salt:hash (both base64 encoded)
 * BetterAuth expects: verify({ hash, password })
 */
async function verifyPassword({
	hash: hashedPassword,
	password,
}: {
	hash: string;
	password: string;
}): Promise<boolean> {
	const [saltBase64, hashBase64] = hashedPassword.split(":");
	if (!saltBase64 || !hashBase64) {
		return false;
	}

	const salt = Buffer.from(saltBase64, "base64");
	const hash = await new Promise<Buffer>((resolve, reject) => {
		scrypt(
			password,
			salt,
			64,
			{
				N: 16384,
				r: 8,
				p: 1,
			},
			(err, derivedKey) => {
				if (err) reject(err);
				else resolve(derivedKey);
			},
		);
	});

	return hash.toString("base64") === hashBase64;
}

/**
 * Factory function to create a Better Auth instance
 * Uses dependency injection to avoid circular dependencies
 *
 * @param database - Prisma database client instance
 * @param envConfig - Partial environment config (can omit NEXT_PUBLIC_DASHBOARD_URL)
 * @returns Better Auth instance
 */
export function createAuth(
	database: PrismaClient,
	envConfig: Pick<
		typeof env,
		| "BETTER_AUTH_SECRET"
		| "NEXT_PUBLIC_CORS_ORIGIN"
		| "GOOGLE_CLIENT_ID"
		| "GOOGLE_CLIENT_SECRET"
		| "FACEBOOK_CLIENT_ID"
		| "FACEBOOK_CLIENT_SECRET"
	> & {
		NEXT_PUBLIC_DASHBOARD_URL?: string; // Optional - if not provided, only CORS_ORIGIN is used
	},
): ReturnType<typeof betterAuth<BetterAuthOptions>> {
	// Build trusted origins array with Vercel support
	const trustedOrigins = [
		envConfig.NEXT_PUBLIC_CORS_ORIGIN,
		envConfig.NEXT_PUBLIC_DASHBOARD_URL || null,
		// Add Vercel URLs if available
		process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
		process.env.VERCEL_BRANCH_URL
			? `https://${process.env.VERCEL_BRANCH_URL}`
			: null,
		process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: null,
	].filter((url): url is string => url !== null);

	// Log trusted origins in development for debugging
	if (apiEnv.NEXT_PUBLIC_NODE_ENV === "local") {
		console.log("[Auth] Trusted origins:", trustedOrigins);
	}

	// Determine if we're in a local development environment
	// In Vercel (preview/production), we need cross-origin cookies
	const isLocal =
		apiEnv.NEXT_PUBLIC_NODE_ENV === "local" &&
		!process.env.VERCEL &&
		!envConfig.NEXT_PUBLIC_CORS_ORIGIN.startsWith("https://");

	// In Vercel (any environment) or HTTPS, we need SameSite=None and Secure
	// Only use lax in true localhost development
	// Priority: Vercel > HTTPS > NODE_ENV
	const isProduction =
		!!process.env.VERCEL ||
		envConfig.NEXT_PUBLIC_CORS_ORIGIN.startsWith("https://") ||
		apiEnv.NEXT_PUBLIC_NODE_ENV === "production";

	// Debug logging for cookie configuration - always log in Vercel or non-local
	// This helps diagnose cookie configuration issues
	console.log("[Auth] Cookie configuration:");
	console.log("  - NEXT_PUBLIC_NODE_ENV:", apiEnv.NEXT_PUBLIC_NODE_ENV);
	console.log("  - VERCEL:", !!process.env.VERCEL);
	console.log("  - VERCEL_ENV:", process.env.VERCEL_ENV);
	console.log("  - CORS_ORIGIN:", envConfig.NEXT_PUBLIC_CORS_ORIGIN);
	console.log("  - CORS_ORIGIN starts with https:", envConfig.NEXT_PUBLIC_CORS_ORIGIN.startsWith("https://"));
	console.log("  - isLocal:", isLocal);
	console.log("  - isProduction:", isProduction);
	console.log("  - Cookie SameSite:", isProduction ? "none" : "lax");
	console.log("  - Cookie Secure:", isProduction);

	return betterAuth<BetterAuthOptions>({
		database: prismaAdapter(database, {
			provider: "postgresql",
		}),
		secret: envConfig.BETTER_AUTH_SECRET,
		trustedOrigins,
		baseURL: envConfig.NEXT_PUBLIC_CORS_ORIGIN,
		advanced: {
			cookies: {
				sessionToken: {
					attributes: {
						sameSite: isProduction ? "none" : "lax",
						secure: isProduction,
						httpOnly: true,
					},
				},
			},
		},
		emailAndPassword: {
			enabled: true,
			password: {
				hash: hashPassword,
				verify: verifyPassword,
			},
		},
		socialProviders: {
			facebook: {
				clientId: envConfig.FACEBOOK_CLIENT_ID,
				clientSecret: envConfig.FACEBOOK_CLIENT_SECRET,
			},
			google: {
				clientId: envConfig.GOOGLE_CLIENT_ID,
				clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
			},
		},
		plugins: [nextCookies(), openAPI()],
	});
}

/**
 * Singleton auth instance
 * Must be initialized by calling initializeAuth() before use
 * This is initialized by the server package at app startup
 */
export let auth: ReturnType<typeof betterAuth<BetterAuthOptions>>;

/**
 * Initialize the auth singleton
 * Called by core initialization module
 * @internal
 */
export function initializeAuth(
	database: PrismaClient,
	envConfig: Parameters<typeof createAuth>[1],
): void {
	auth = createAuth(database, envConfig);
}
