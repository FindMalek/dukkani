import type { StoreSimpleOutput } from "@dukkani/common/schemas/store/output";
import { env } from "@/env";

interface StoreDomains {
	default: string; // The URL we give them (slug.domain)
	custom?: string[]; // List of custom domains
}

/**
 * Extract store URL from store data
 * Returns the latest custom domain if available, otherwise the default URL
 */
export function getStoreUrl(store: StoreSimpleOutput): string {
	// For now, we only have the default URL
	// In the future, when custom domains are added:
	// const domains: StoreDomains = {
	//   default: `https://${store.slug}.${env.NEXT_PUBLIC_STORE_DOMAIN}`,
	//   custom: store.customDomains || [],
	// };
	//
	// if (domains.custom && domains.custom.length > 0) {
	//   // Return the latest (most recently added) custom domain
	//   return `https://${domains.custom[domains.custom.length - 1]}`;
	// }
	//
	// return domains.default;

	return `https://${store.slug}.${env.NEXT_PUBLIC_STORE_DOMAIN}`;
}
