import type { TunisiaDelegation } from "@dukkani/common/data/tunisia-locations";
import type { GovernorateInfer } from "@dukkani/common/schemas/enums";
import { queryOptions, useQuery } from "@tanstack/react-query";

/**
 * Delegations (and their municipalities) for one governorate, lazily
 * `fetch()`ed from a static asset — see
 * `packages/common/scripts/build-tunisia-locations.ts`, which mirrors these
 * files into `public/tunisia-locations/` at build time. Keeps the ~2MB full
 * dataset out of the checkout page's JS bundle: only the governorate the
 * customer actually picks gets downloaded (largest file is ~150KB).
 */
async function fetchTunisiaDelegations(
  governorate: GovernorateInfer,
): Promise<TunisiaDelegation[]> {
  const response = await fetch(
    `/tunisia-locations/by-governorate/${governorate}.json`,
  );
  if (!response.ok) {
    throw new Error(
      `Failed to load delegations for governorate "${governorate}" (${response.status})`,
    );
  }
  const data: { code: GovernorateInfer; delegations: TunisiaDelegation[] } =
    await response.json();
  return data.delegations;
}

function tunisiaDelegationsQueryOptions(
  governorate: GovernorateInfer | undefined,
) {
  return queryOptions({
    queryKey: ["tunisia-locations", "delegations", governorate],
    queryFn: () => fetchTunisiaDelegations(governorate as GovernorateInfer),
    enabled: !!governorate,
    // Static dataset shipped with the app build — never goes stale.
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });
}

/** Delegations (with their municipalities) for the given governorate, or `undefined` until one is picked. */
export function useTunisiaDelegations(governorate: GovernorateInfer | undefined) {
  return useQuery(tunisiaDelegationsQueryOptions(governorate));
}
