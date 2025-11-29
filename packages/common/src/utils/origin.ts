/**
 * Check if an origin matches the allowed origin pattern
 * Supports wildcard patterns like *.vercel.app or exact matches
 */
export function isOriginAllowed(
	origin: string | null,
	allowedOriginPattern: string | undefined,
): boolean {
	if (!origin || !allowedOriginPattern) return false;

	// Exact match
	if (origin === allowedOriginPattern) {
		return true;
	}

	// Wildcard pattern matching (e.g., *.vercel.app)
	if (allowedOriginPattern.includes("*")) {
		// Validate pattern safety: only allow simple wildcard patterns
		// Pattern must be: optional wildcard, followed by domain segments
		const safePatternRegex =
			/^\*?\.?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
		if (!safePatternRegex.test(allowedOriginPattern)) {
			return false;
		}

		// Convert wildcard pattern to regex
		// *.vercel.app -> ^.*\.vercel\.app$
		const regexPattern = allowedOriginPattern
			.replace(/\./g, "\\.")
			.replace(/\*/g, ".*");
		const regex = new RegExp(`^${regexPattern}$`);
		return regex.test(origin);
	}

	return false;
}

/**
 * Check if an origin is allowed based on base origins and optional pattern
 * Returns true if origin matches any base origin OR matches the pattern
 */
export function isOriginAllowedForRequest(
	origin: string | null,
	baseOrigins: string[],
	allowedOriginPattern?: string,
): boolean {
	if (!origin) return false;

	// Check exact match against base origins
	if (baseOrigins.includes(origin)) {
		return true;
	}

	// Check pattern match if pattern is provided
	if (allowedOriginPattern) {
		return isOriginAllowed(origin, allowedOriginPattern);
	}

	return false;
}
