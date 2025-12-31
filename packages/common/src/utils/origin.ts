/**
 * Check if an origin matches the allowed origin pattern
 * Supports wildcard patterns like *.vercel.app or exact matches
 */
export function isOriginAllowed(
	origin: string | null,
	allowedOriginPattern: string | undefined,
): boolean {
	if (!origin || !allowedOriginPattern) return false;

	// Extract hostname from origin (remove protocol and port)
	// e.g., "https://omar-home.dukkani.malek.engineering" -> "omar-home.dukkani.malek.engineering"
	let hostname: string = origin;
	try {
		const url = new URL(origin);
		hostname = url.hostname || origin;
	} catch {
		// If origin is not a valid URL, use it as-is (fallback)
		// origin is guaranteed to be string here due to early return check
		hostname = origin.replace(/^https?:\/\//, "").split(":")[0] || origin;
	}

	// Exact match
	if (hostname === allowedOriginPattern || origin === allowedOriginPattern) {
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
		// *.dukkani.malek.engineering -> ^.*\.dukkani\.malek\.engineering$
		const regexPattern = allowedOriginPattern
			.replace(/\./g, "\\.")
			.replace(/\*/g, ".*");
		const regex = new RegExp(`^${regexPattern}$`);
		// Match against hostname (without protocol)
		return regex.test(hostname);
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
