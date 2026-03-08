import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { isStoreSelectorEnabled } from "@dukkani/env";
import { getStoreSlugFromHost } from "./utils";

/**
 * Resolve the store slug for the current request.
 * Production: uses subdomain only (getStoreSlugFromHost).
 * Preview/dev: uses cookie only (no subdomains available).
 */
export function getStoreSlug(
	host: string | null,
	cookies: { get: (name: string) => { value?: string } | undefined },
): string | null {
	if (!isStoreSelectorEnabled()) {
		return getStoreSlugFromHost(host);
	}

	const slug = cookies.get("storefront_store_slug")?.value ?? null;
	if (!slug || isReservedStoreSlug(slug)) {
		return null;
	}
	return slug;
}
