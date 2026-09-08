# Tunisia location dataset

`raw-source.json` is a vendored, unmodified copy of the `data` array exported
from [`tn-municipality-api`](https://github.com/mn-youssef/tn-municipality-api)
(renamed from `youssef-of-web/tn-municipality-api`, the dataset named in
[issue #260](https://github.com/FindMalek/dukkani/issues/260)) — specifically
`data/data.ts` at the `main` branch, fetched 2026-09-08.

The upstream project ships this data as an internal fixture for its own
Next.js demo site rather than as an installable npm package (there is no
`tn-municipality-api` package on the npm registry), and the repository does
not carry an explicit LICENSE file. The dataset itself is factual government
data — Tunisia's governorate, delegation, and postal-locality names sourced
from La Poste Tunisienne's public postal code directory — so it's vendored
here as a static fixture per the guidance in issue #260 ("if nothing suitable
and lightweight exists, it's acceptable to vendor a static JSON dataset...
cite the source in a comment").

Do not hand-edit `raw-source.json` or `location-index.json`. To refresh the
dataset:

1. Replace `raw-source.json` with a fresh copy of upstream's `data/data.ts`
   (convert the `export const data = [...]` TS literal to JSON).
2. Regenerate the normalized index:
   ```
   pnpm --filter @dukkani/common build:tunisia-locations
   ```
3. Sanity-check the result:
   ```
   pnpm --filter @dukkani/common verify:tunisia-locations
   ```

## Shape

`raw-source.json` — array of 24 governorates:

```ts
type RawGovernorate = {
  Name: string; // French name, upper case (e.g. "ARIANA")
  NameAr: string;
  Value: string; // matches Name in this dataset
  Delegations: Array<{
    Name: string; // postal locality, e.g. "ARIANA VILLE (Residence Kortoba)"
    NameAr: string;
    Value: string; // the actual delegation name, e.g. "ARIANA VILLE"
    PostalCode: string;
    Latitude: number;
    Longitude: number;
  }>;
};
```

Despite the field name, upstream's `Delegations[].Name` is really the
postal-locality (municipality/sector) level — multiple entries share the same
`Delegations[].Value`, which is the real delegation name. The transform
script (`packages/common/scripts/build-tunisia-locations.ts`) splits this
into the three-level hierarchy the checkout UI needs:

`Governorate` (24, matches the Prisma `Governorate` enum) →
`Delegation` (~262, deduped by `Value` within a governorate) →
`Municipality` (~4,780, deduped by name + postal code within a delegation).

`location-index.json` is the generated output consumed by
`packages/common/src/data/tunisia-locations/index.ts`.
