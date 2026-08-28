import { StoreService } from "@dukkani/common/services";
import { unstable_cache } from "next/cache";

// Backs the storefront's Edge Middleware host-validation check (see
// apps/storefront/src/proxy.ts). Cached server-side so the middleware can
// poll this cheaply on its own short TTL without hitting the DB per request.
const STORE_SLUGS_CACHE_REVALIDATE_SECONDS = 300;

const getCachedPublicSlugs = unstable_cache(
  () => StoreService.listPublicSlugs(),
  ["public-store-slugs"],
  { revalidate: STORE_SLUGS_CACHE_REVALIDATE_SECONDS },
);

export async function GET() {
  const slugs = await getCachedPublicSlugs();
  return Response.json(
    { slugs },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
