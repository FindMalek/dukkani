import "server-only";

import { cache } from "react";
import { makeQueryClient } from "./orpc";

/**
 * Returns a QueryClient scoped to the current server render tree.
 *
 * React's `cache()` ensures a single instance per request — multiple calls
 * within the same RSC render return the same client, so prefetched data is
 * shared across layouts and pages without re-fetching.
 *
 * @example
 * ```ts
 * // In a server layout or page
 * import { getServerQueryClient } from "@/shared/api/query-client.server"
 * import { appQueries } from "@/shared/api/queries"
 * import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
 *
 * const queryClient = getServerQueryClient()
 * await queryClient.prefetchQuery(appQueries.store.all())
 *
 * return (
 *   <HydrationBoundary state={dehydrate(queryClient)}>
 *     {children}
 *   </HydrationBoundary>
 * )
 * ```
 */
export const getServerQueryClient = cache(makeQueryClient);
