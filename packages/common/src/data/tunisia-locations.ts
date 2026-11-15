/**
 * Tunisia's administrative divisions (Governorate → Delegation →
 * Municipality/sector), used to power the checkout location combobox.
 *
 * Source: https://github.com/mn-youssef/tn-municipality-api (see
 * `./tunisia-locations/SOURCE.md`). Normalized by
 * `packages/common/scripts/build-tunisia-locations.ts` into:
 *   - `tunisia-locations/governorates.data.ts` — the 24 governorates (no
 *     delegations), small enough to import statically here. (Generated
 *     alongside an equivalent `governorates.json` — see that file's header
 *     comment for why this package imports the `.ts` copy instead.)
 *   - `tunisia-locations/by-governorate/<code>.json` — one file per
 *     governorate holding its delegations and municipalities. These are
 *     *not* imported here — they're ~2MB combined — but mirrored as static
 *     assets under `apps/storefront/public/tunisia-locations/` for the
 *     storefront to `fetch()` on demand once a governorate is picked.
 */
import type { GovernorateInfer } from "../schemas/enums";
import governoratesFile from "./tunisia-locations/governorates.data";

export interface TunisiaGovernorateSummary {
  code: GovernorateInfer;
  nameFr: string;
  nameAr: string;
  searchKey: string;
  delegationCount: number;
  municipalityCount: number;
}

export interface TunisiaMunicipality {
  id: string;
  nameFr: string;
  nameAr: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  searchKey: string;
}

export interface TunisiaDelegation {
  id: string;
  nameFr: string;
  nameAr: string;
  searchKey: string;
  municipalities: TunisiaMunicipality[];
}

/** All 24 governorates, sorted alphabetically. Always safe to import statically (~8KB). */
export const TUNISIA_GOVERNORATES: readonly TunisiaGovernorateSummary[] =
  governoratesFile.governorates as readonly TunisiaGovernorateSummary[];

export const TUNISIA_LOCATIONS_DATASET_META = {
  generatedAt: governoratesFile.generatedAt,
  source: governoratesFile.source,
  counts: governoratesFile.counts,
};

export function getTunisiaGovernorateLabel(
  code: GovernorateInfer,
  locale: string,
): string {
  const governorate = TUNISIA_GOVERNORATES.find((g) => g.code === code);
  if (!governorate) return code;
  return locale === "ar" ? governorate.nameAr : governorate.nameFr;
}
