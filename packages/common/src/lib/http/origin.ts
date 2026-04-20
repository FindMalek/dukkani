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

  // Wildcard pattern matching (e.g., *.vercel.app or *-findmalek-team.vercel.app)
  if (allowedOriginPattern.includes("*")) {
    // Validate pattern safety: only allow simple wildcard patterns
    // Supports: *.domain.tld (subdomain) or *-suffix.domain.tld (e.g. *-findmalek-team.vercel.app)
    const domainLabel = "[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";
    const domainSuffix = "(\\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*";
    const safePatternRegex = new RegExp(
      `^(\\*?\\.?${domainLabel}${domainSuffix}|\\*-${domainLabel}${domainSuffix})$`,
    );
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

/**
 * Check if origin matches any of the allowed patterns (comma-separated or array)
 */
export function isOriginAllowedByPatterns(
  origin: string | null,
  patterns: string | string[] | undefined,
): boolean {
  if (!origin || !patterns) return false;
  const list =
    typeof patterns === "string"
      ? patterns
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : patterns;
  return list.some((pattern) => isOriginAllowed(origin, pattern));
}
