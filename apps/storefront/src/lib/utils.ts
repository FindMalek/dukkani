import { storefrontEnv } from "@dukkani/env/storefront";

export function getStoreSlugFromHost(host: string | null): string | null {
	if (!host) return null;

	// Remove port if present (e.g., "localhost:3000" -> "localhost")
	const hostname = host.split(":")[0];

	// Check for localhost or IP address
	if (
		hostname.includes("localhost") ||
		/^\d+\.\d+\.\d+\.\d+$/.test(hostname) ||
		hostname === "127.0.0.1"
	) {
		return null;
	}

	const parts = hostname.split(".");

	// Need at least 3 parts for a subdomain (e.g., "slug.dukkani.com")
	// 2 parts = base domain (e.g., "dukkani.com") - no subdomain
	if (parts.length < 3) {
		return null;
	}

	// Get the base domain from environment (e.g., "dukkani.malek.engineering" or "dukkani.com")
	const baseDomain = storefrontEnv.NEXT_PUBLIC_STORE_DOMAIN;
	const baseDomainParts = baseDomain.split(".");
	const baseDomainLength = baseDomainParts.length;

	// Check if the hostname ends with the base domain
	// For "maleks-bakery.dukkani.malek.engineering" with base "dukkani.malek.engineering"
	// We need to check if the last N parts match
	const hostnameEndsWithBase =
		parts.slice(-baseDomainLength).join(".") === baseDomain;

	if (!hostnameEndsWithBase) {
		// Not a storefront subdomain, might be a custom domain later
		return null;
	}

	// Extract subdomain (everything before the base domain)
	// For "maleks-bakery.dukkani.malek.engineering" with base "dukkani.malek.engineering"
	// parts = ["maleks-bakery", "dukkani", "malek", "engineering"]
	// baseDomainParts = ["dukkani", "malek", "engineering"]
	// subdomain = parts[0] = "maleks-bakery"
	const subdomain = parts.slice(0, -baseDomainLength).join(".");

	// Skip "www" subdomain
	if (subdomain === "www" || !subdomain) {
		return null;
	}

	return subdomain;
}
