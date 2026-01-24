/**
 * Rate limiter implementation with in-memory storage
 * Can be extended to use Redis or other storage backends
 */

interface RateLimitConfig {
	/**
	 * Maximum number of requests allowed in the window
	 */
	max: number;
	/**
	 * Time window in milliseconds
	 */
	windowMs: number;
	/**
	 * Optional key prefix for different rate limiters
	 */
	keyPrefix?: string;
}

interface RateLimitResult {
	success: boolean;
	remaining: number;
	reset: number;
	retryAfter?: number; // Seconds until the rate limit resets
}

/**
 * In-memory storage for rate limiting
 * In production, this should be replaced with Redis or similar
 */
class MemoryStore {
	private store = new Map<string, { count: number; resetTime: number }>();

	async get(key: string): Promise<{ count: number; resetTime: number } | null> {
		const entry = this.store.get(key);
		if (!entry) return null;

		// Clean up expired entries
		if (Date.now() > entry.resetTime) {
			this.store.delete(key);
			return null;
		}

		return entry;
	}

	async set(
		key: string,
		value: { count: number; resetTime: number },
	): Promise<void> {
		this.store.set(key, value);
	}

	async increment(key: string, resetTime: number): Promise<number> {
		const entry = await this.get(key);
		if (!entry) {
			await this.set(key, { count: 1, resetTime });
			return 1;
		}

		const newCount = entry.count + 1;
		await this.set(key, { count: newCount, resetTime });
		return newCount;
	}

	async delete(key: string): Promise<void> {
		this.store.delete(key);
	}

	/**
	 * Clean up expired entries (call periodically)
	 */
	cleanup(): void {
		const now = Date.now();
		for (const [key, entry] of this.store.entries()) {
			if (now > entry.resetTime) {
				this.store.delete(key);
			}
		}
	}
}

// Global memory store instance
const memoryStore = new MemoryStore();

// Cleanup expired entries every minute (improved from article recommendations)
if (typeof setInterval !== "undefined") {
	setInterval(
		() => {
			memoryStore.cleanup();
		},
		60 * 1000, // Every minute
	);
}

/**
 * Get identifier for rate limiting
 * Uses IP address or user ID if authenticated
 * Improved IP detection based on https://www.zero-locker.com/articles/building-bulletproof-apis-rate-limiting-orpc
 */
function getIdentifier(
	headers: Record<string, string | string[] | undefined>,
	userId?: string,
): string {
	// If user is authenticated, use their ID
	if (userId) {
		return `user:${userId}`;
	}

	// Otherwise, use IP address with improved detection
	// Priority: x-vercel-forwarded-for > x-forwarded-for > cf-connecting-ip > x-real-ip
	const vercelIp = headers["x-vercel-forwarded-for"];
	const forwardedFor = headers["x-forwarded-for"];
	const cfConnectingIp = headers["cf-connecting-ip"]; // Cloudflare
	const realIp = headers["x-real-ip"];

	let ip: string | undefined;

	if (typeof vercelIp === "string") {
		ip = vercelIp.split(",")[0]?.trim();
	} else if (typeof forwardedFor === "string") {
		ip = forwardedFor.split(",")[0]?.trim();
	} else if (typeof cfConnectingIp === "string") {
		ip = cfConnectingIp;
	} else if (typeof realIp === "string") {
		ip = realIp;
	}

	// Fallback to a default identifier if IP cannot be determined
	return ip ? `ip:${ip}` : "anonymous";
}

/**
 * Rate limiter class
 */
export class RateLimiter {
	private config: Required<RateLimitConfig>;
	private store: MemoryStore;

	constructor(config: RateLimitConfig) {
		this.config = {
			keyPrefix: "ratelimit",
			...config,
		};
		this.store = memoryStore;
	}

	/**
	 * Check if request should be rate limited
	 */
	async check(
		identifier: string,
		_headers: Record<string, string | string[] | undefined>,
	): Promise<RateLimitResult> {
		const key = `${this.config.keyPrefix}:${identifier}`;
		const now = Date.now();
		const resetTime = now + this.config.windowMs;

		const entry = await this.store.get(key);

		if (!entry) {
			// First request in window
			await this.store.set(key, { count: 1, resetTime });
			return {
				success: true,
				remaining: this.config.max - 1,
				reset: resetTime,
				retryAfter: undefined,
			};
		}

		// Check if window has expired
		if (now > entry.resetTime) {
			// Reset window
			await this.store.set(key, { count: 1, resetTime });
			return {
				success: true,
				remaining: this.config.max - 1,
				reset: resetTime,
				retryAfter: undefined,
			};
		}

		// Increment count
		const newCount = await this.store.increment(key, entry.resetTime);

		if (newCount > this.config.max) {
			const retryAfterSeconds = Math.ceil((entry.resetTime - now) / 1000);
			return {
				success: false,
				remaining: 0,
				reset: entry.resetTime,
				retryAfter: retryAfterSeconds,
			};
		}

		return {
			success: true,
			remaining: this.config.max - newCount,
			reset: entry.resetTime,
			retryAfter: undefined,
		};
	}

	/**
	 * Get rate limit identifier from headers and user
	 */
	getIdentifier(
		headers: Record<string, string | string[] | undefined>,
		userId?: string,
	): string {
		return getIdentifier(headers, userId);
	}
}

/**
 * Pre-configured rate limiters
 */
export const rateLimiters = {
	/**
	 * Strict rate limiter for unauthenticated requests
	 * 10 requests per minute
	 */
	strict: new RateLimiter({
		max: 10,
		windowMs: 60 * 1000, // 1 minute
		keyPrefix: "ratelimit:strict",
	}),

	/**
	 * Standard rate limiter for authenticated requests
	 * 30 requests per minute
	 */
	standard: new RateLimiter({
		max: 30,
		windowMs: 60 * 1000, // 1 minute
		keyPrefix: "ratelimit:standard",
	}),

	/**
	 * Generous rate limiter for authenticated requests
	 * 1000 requests per 15 minutes
	 */
	generous: new RateLimiter({
		max: 1000,
		windowMs: 15 * 60 * 1000, // 15 minutes
		keyPrefix: "ratelimit:generous",
	}),

	/**
	 * Very strict rate limiter for sensitive operations (e.g., login)
	 * 5 requests per 15 minutes
	 */
	veryStrict: new RateLimiter({
		max: 5,
		windowMs: 15 * 60 * 1000, // 15 minutes
		keyPrefix: "ratelimit:verystrict",
	}),

	/**
	 * Public rate limiter for unauthenticated requests
	 * 150 requests per minute
	 */
	public: new RateLimiter({
		max: 150,
		windowMs: 60 * 1000, // 1 minute
		keyPrefix: "ratelimit:public",
	}),
};
