import { ORPCError, os } from "@orpc/server";
import type { Context } from "../context";
import { type RateLimiter, rateLimiters } from "../utils/rate-limiter";

const o = os.$context<Context>();

export interface RateLimitOptions {
	/**
	 * Rate limiter to use
	 * @default "standard" for authenticated, "strict" for unauthenticated
	 */
	limiter?: "strict" | "standard" | "generous" | "veryStrict" | "public";
	/**
	 * Custom rate limit configuration
	 */
	custom?: {
		max: number;
		windowMs: number;
	};
}

/**
 * Create rate limiting middleware
 */
export function createRateLimitMiddleware(options: RateLimitOptions = {}) {
	return async ({
		context,
		next,
	}: Parameters<Parameters<typeof o.middleware>[0]>[0]) => {
		// Get headers from context
		const headers = context.headers ?? {};

		// Determine which rate limiter to use
		const isAuthenticated = !!context.session?.user;
		const limiterName =
			options.limiter ?? (isAuthenticated ? "standard" : "strict");

		// Import RateLimiter dynamically if custom config is provided
		let limiter: RateLimiter;
		if (options.custom) {
			const { RateLimiter } = await import("../utils/rate-limiter");
			limiter = new RateLimiter(options.custom);
		} else {
			limiter = rateLimiters[limiterName];
		}

		// Get identifier (user ID or IP address)
		const identifier = limiter.getIdentifier(
			headers,
			context.session?.user?.id,
		);

		// Check rate limit
		const result = await limiter.check(identifier, headers);

		if (!result.success) {
			const resetTime = new Date(result.reset).toISOString();
			const retryAfterMessage = result.retryAfter
				? ` Please try again in ${result.retryAfter} second${result.retryAfter !== 1 ? "s" : ""}.`
				: ` Please try again after ${resetTime}.`;
			throw new ORPCError("TOO_MANY_REQUESTS", {
				message: `Rate limit exceeded.${retryAfterMessage} Remaining: ${result.remaining}`,
			});
		}

		return next();
	};
}

/**
 * Rate limit middleware for public procedures
 * Uses strict rate limiting
 */
export const rateLimitPublic = createRateLimitMiddleware({
	limiter: "strict",
});

/**
 * Rate limit middleware for protected procedures
 * Uses standard rate limiting
 */
export const rateLimitProtected = createRateLimitMiddleware({
	limiter: "standard",
});

/**
 * Rate limit middleware for sensitive operations
 * Uses very strict rate limiting
 */
export const rateLimitSensitive = createRateLimitMiddleware({
	limiter: "veryStrict",
});

/**
 * Rate limit middleware for public procedures
 * Uses public rate limiting
 */
export const rateLimitPublicSafe = createRateLimitMiddleware({
	limiter: "public",
});
