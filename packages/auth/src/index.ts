import { scrypt } from "node:crypto";
import type { PrismaClient } from "@dukkani/db";
import { hashPassword } from "@dukkani/db/utils/generate-id";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

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
 * Environment schema for auth initialization
 */
type AuthEnv = {
	BETTER_AUTH_SECRET: string;
	NEXT_PUBLIC_CORS_ORIGIN: string;
	NEXT_PUBLIC_DASHBOARD_URL?: string; // Optional - if not provided, only CORS_ORIGIN is used
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
	FACEBOOK_CLIENT_ID: string;
	FACEBOOK_CLIENT_SECRET: string;
};

/**
 * Factory function to create a Better Auth instance
 * Uses dependency injection to avoid circular dependencies
 *
 * @param database - Prisma database client instance
 * @param env - Environment object with auth configuration
 * @returns Better Auth instance
 */
export function createAuth(
	database: PrismaClient,
	env: AuthEnv,
): ReturnType<typeof betterAuth<BetterAuthOptions>> {
	// Build trusted origins array - always include CORS_ORIGIN, optionally include DASHBOARD_URL
	const trustedOrigins = env.NEXT_PUBLIC_DASHBOARD_URL
		? [env.NEXT_PUBLIC_CORS_ORIGIN, env.NEXT_PUBLIC_DASHBOARD_URL]
		: [env.NEXT_PUBLIC_CORS_ORIGIN];

	return betterAuth<BetterAuthOptions>({
		database: prismaAdapter(database, {
			provider: "postgresql",
		}),
		secret: env.BETTER_AUTH_SECRET,
		trustedOrigins,
		emailAndPassword: {
			enabled: true,
			password: {
				hash: hashPassword,
				verify: verifyPassword,
			},
		},
		socialProviders: {
			facebook: {
				clientId: env.FACEBOOK_CLIENT_ID,
				clientSecret: env.FACEBOOK_CLIENT_SECRET,
			},
			google: {
				clientId: env.GOOGLE_CLIENT_ID,
				clientSecret: env.GOOGLE_CLIENT_SECRET,
			},
		},
		plugins: [nextCookies()],
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
 * Called by server initialization module
 * @internal
 */
export function initializeAuth(database: PrismaClient, env: AuthEnv): void {
	auth = createAuth(database, env);
}
