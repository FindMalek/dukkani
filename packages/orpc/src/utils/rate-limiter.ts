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

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
	setInterval(() => {
		memoryStore.cleanup();
	}, 5 * 60 * 1000);
}

/**
 * Get identifier for rate limiting
 * Uses IP address or user ID if authenticated
 */
function getIdentifier(
	headers: Record<string, string | string[] | undefined>,
	userId?: string,
): string {
	// If user is authenticated, use their ID
	if (userId) {
		return `user:${userId}`;
	}

	// Otherwise, use IP address
	const forwardedFor = headers["x-forwarded-for"];
	const realIp = headers["x-real-ip"];
	const cfConnectingIp = headers["cf-connecting-ip"]; // Cloudflare

	let ip: string | undefined;

	if (typeof forwardedFor === "string") {
		ip = forwardedFor.split(",")[0]?.trim();
	} else if (typeof realIp === "string") {
		ip = realIp;
	} else if (typeof cfConnectingIp === "string") {
		ip = cfConnectingIp;
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
			};
		}

		// Increment count
		const newCount = await this.store.increment(key, entry.resetTime);

		if (newCount > this.config.max) {
			return {
				success: false,
				remaining: 0,
				reset: entry.resetTime,
			};
		}

		return {
			success: true,
			remaining: this.config.max - newCount,
			reset: entry.resetTime,
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
	 * 100 requests per minute
	 */
	standard: new RateLimiter({
		max: 100,
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
};

