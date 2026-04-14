import type { StoreSimpleOutput } from "@dukkani/common/schemas/store/output";
import { getStorefrontBaseUrl } from "@dukkani/env/get-storefront-base-url";
import { env } from "@/env";

/**
 * Extract store URL from store data.
 * In preview/dev (selector mode): returns storefront origin with ?store=<slug>
 * so the storefront middleware cookie-based selector flow kicks in.
 * In production: returns the standard subdomain URL.
 */
export function getStoreUrl(store: StoreSimpleOutput): string {
  const baseHost = getStorefrontBaseUrl(env.NEXT_PUBLIC_STORE_DOMAIN);

  // Selector mode: preview or local dev - no subdomain routing; use ?store= param
  // env.NEXT_PUBLIC_NODE_ENV is "development" in both preview and local dev
  if (env.NEXT_PUBLIC_NODE_ENV === "development") {
    const origin = baseHost.startsWith("http")
      ? baseHost
      : `https://${baseHost}`;
    return `${origin}/?store=${store.slug}`;
  }

  return `https://${store.slug}.${baseHost}`;
}
