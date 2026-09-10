/**
 * Builds the Tunisia location index from the vendored `raw-source.json`
 * fixture (see `src/data/tunisia-locations/SOURCE.md` for where that
 * fixture came from and how to refresh it).
 *
 * Normalizes strings (trim / collapse whitespace), dedupes delegations and
 * municipalities, generates stable slug ids, and maps each governorate name
 * to the Prisma `Governorate` enum value it corresponds to.
 *
 * Output is split rather than one combined blob (the full dataset is ~2MB):
 *   - `governorates.json` — the 24 governorates only (no delegations), the
 *     always-loaded top level of the checkout combobox. Small enough
 *     (~8KB) to import statically from `@dukkani/common`.
 *   - `by-governorate/<code>.json` — one file per governorate holding its
 *     delegations and municipalities (largest file is ~150KB raw). These
 *     are also copied to `apps/storefront/public/tunisia-locations/` so the
 *     checkout combobox can `fetch()` a governorate's delegations/
 *     municipalities on demand instead of shipping the whole dataset in the
 *     JS bundle.
 *
 * Run with: `pnpm --filter @dukkani/common build:tunisia-locations`
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../src/data/tunisia-locations");
const RAW_PATH = join(DATA_DIR, "raw-source.json");
const GOVERNORATES_PATH = join(DATA_DIR, "governorates.json");
// `resolveJsonModule` + `composite` don't play well together in this repo's
// TypeScript toolchain (a JSON import inside a composite project fails with
// TS6307 no matter what `include` says), so the data `@dukkani/common`
// actually imports statically is generated as a plain `.ts` module instead.
// `governorates.json` still exists — it's just for the SOURCE.md-documented
// regeneration flow and isn't imported by any TS file.
const GOVERNORATES_TS_PATH = join(DATA_DIR, "governorates.data.ts");
const BY_GOVERNORATE_DIR = join(DATA_DIR, "by-governorate");
const STOREFRONT_PUBLIC_DIR = join(
  __dirname,
  "../../../apps/storefront/public/tunisia-locations",
);

interface RawMunicipality {
  Name: string;
  NameAr: string;
  Value: string;
  PostalCode: string;
  Latitude: number;
  Longitude: number;
}

interface RawGovernorate {
  Name: string;
  NameAr: string;
  Value: string;
  Delegations: RawMunicipality[];
}

/**
 * The 24 Prisma `Governorate` enum values, keyed by the dataset's
 * governorate `Value` field. Kept as a literal map (rather than importing
 * `@dukkani/db/prisma/generated/enums`) so this script has no dependency on
 * a generated Prisma client — it only needs the raw fixture on disk.
 *
 * Only `MANNOUBA` (dataset) vs `MANOUBA` (our enum, and the standard French
 * spelling) differs; every other value is identical.
 */
const GOVERNORATE_CODE_BY_NAME: Record<string, string> = {
  TUNIS: "TUNIS",
  ARIANA: "ARIANA",
  BEN_AROUS: "BEN_AROUS",
  MANNOUBA: "MANOUBA",
  NABEUL: "NABEUL",
  ZAGHOUAN: "ZAGHOUAN",
  BIZERTE: "BIZERTE",
  BEJA: "BEJA",
  JENDOUBA: "JENDOUBA",
  KEF: "KEF",
  SILIANA: "SILIANA",
  KAIROUAN: "KAIROUAN",
  KASSERINE: "KASSERINE",
  SIDI_BOUZID: "SIDI_BOUZID",
  SOUSSE: "SOUSSE",
  MONASTIR: "MONASTIR",
  MAHDIA: "MAHDIA",
  SFAX: "SFAX",
  GABES: "GABES",
  MEDENINE: "MEDENINE",
  TATAOUINE: "TATAOUINE",
  GAFSA: "GAFSA",
  TOZEUR: "TOZEUR",
  KEBILI: "KEBILI",
};

/**
 * The upstream raw dataset has a handful of verified encoding-corruption
 * bugs (not guesses -- confirmed by cross-referencing the correctly-spelled
 * form elsewhere in the same source file). Corrected here rather than by
 * guessing at better parsing, since better parsing can't fix bytes that
 * were already lost upstream. See PR #613 review.
 */
const KNOWN_STRING_CORRECTIONS: Record<string, string> = {
  "بجا��ة": "بجاوة", // ARIANA: two replacement chars in "Bejaoua" (correct spelling appears elsewhere in raw-source.json)
  "Ferme NÂ¦7": "Ferme N°7", // MANOUBA: mojibake degree sign
};

/**
 * The upstream raw dataset mislabels every entry under Monastir's MOKNINE
 * delegation with the governorate's own Arabic name ("المنستير") instead of
 * the delegation's ("المكنين") -- confirmed against every municipality
 * under that delegation in raw-source.json, not a one-off typo. Keyed by
 * delegation id (`${governorateSlug}--${delegationSlug}`).
 */
const KNOWN_DELEGATION_NAME_AR_CORRECTIONS: Record<string, string> = {
  "monastir--moknine": "المكنين",
};

function normalizeWhitespace(value: string): string {
  let result = value.trim().replace(/\s+/g, " ");
  for (const [bad, good] of Object.entries(KNOWN_STRING_CORRECTIONS)) {
    result = result.split(bad).join(good);
  }
  return result;
}

/** Lowercased, diacritic-stripped key used for fast fuzzy matching. */
function toSearchKey(...values: string[]): string {
  return normalizeWhitespace(values.join(" "))
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function slugify(value: string): string {
  return toSearchKey(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function main() {
  const raw: RawGovernorate[] = JSON.parse(readFileSync(RAW_PATH, "utf8"));

  const governorates = raw.map((govRaw) => {
    const govName = normalizeWhitespace(govRaw.Value);
    const code = GOVERNORATE_CODE_BY_NAME[govName];
    if (!code) {
      throw new Error(
        `Unmapped governorate name "${govName}" — add it to GOVERNORATE_CODE_BY_NAME.`,
      );
    }
    const govSlug = slugify(govName);

    // Group the dataset's flat `Delegations[]` (really postal localities) by
    // their `Value`, which is the actual delegation name.
    const delegationsByName = new Map<string, RawMunicipality[]>();
    for (const entry of govRaw.Delegations) {
      const delegationName = normalizeWhitespace(entry.Value);
      const bucket = delegationsByName.get(delegationName) ?? [];
      bucket.push(entry);
      delegationsByName.set(delegationName, bucket);
    }

    const delegations = [...delegationsByName.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([delegationName, entries]) => {
        const delegationSlug = slugify(delegationName);
        const delegationId = `${govSlug}--${delegationSlug}`;

        const nameArCorrection =
          KNOWN_DELEGATION_NAME_AR_CORRECTIONS[delegationId];

        const seen = new Set<string>();
        const municipalities = entries
          .map((entry) => {
            const nameFr = normalizeWhitespace(entry.Name);
            const rawNameAr = normalizeWhitespace(entry.NameAr);
            // Municipality NameAr in the raw source is
            // "{delegation Arabic name} ({municipality suffix})" -- when the
            // delegation-level name is a known correction, apply the same
            // fix to every municipality that inherited the wrong prefix.
            const nameAr = nameArCorrection
              ? rawNameAr.replace(/^[^(]+/, `${nameArCorrection} `)
              : rawNameAr;
            const postalCode = normalizeWhitespace(entry.PostalCode);
            const dedupeKey = `${nameFr}|${postalCode}`;
            return { entry, nameFr, nameAr, postalCode, dedupeKey };
          })
          .filter(({ dedupeKey }) => {
            if (seen.has(dedupeKey)) return false;
            seen.add(dedupeKey);
            return true;
          })
          .map(({ entry, nameFr, nameAr, postalCode }) => {
            const municipalitySlug = slugify(nameFr);
            return {
              id: `${delegationId}--${municipalitySlug}--${postalCode}`,
              nameFr,
              nameAr,
              postalCode,
              latitude: entry.Latitude,
              longitude: entry.Longitude,
              searchKey: toSearchKey(nameFr, nameAr, postalCode),
            };
          })
          .sort((a, b) => a.nameFr.localeCompare(b.nameFr));

        const nameAr =
          nameArCorrection ??
          normalizeWhitespace(entries[0]?.NameAr.split("(")[0] ?? "");

        return {
          id: delegationId,
          nameFr: delegationName,
          nameAr: nameAr || delegationName,
          searchKey: toSearchKey(delegationName, nameAr),
          municipalities,
        };
      });

    const nameFr = govName
      .replace(/_/g, " ")
      .split(" ")
      .map((w) => w[0] + w.slice(1).toLowerCase())
      .join(" ");
    const nameAr = normalizeWhitespace(govRaw.NameAr);

    return {
      code,
      nameFr,
      nameAr,
      searchKey: toSearchKey(nameFr, nameAr),
      delegations,
    };
  });

  governorates.sort((a, b) => a.nameFr.localeCompare(b.nameFr));

  const delegationCount = governorates.reduce(
    (sum, g) => sum + g.delegations.length,
    0,
  );
  const municipalityCount = governorates.reduce(
    (sum, g) =>
      sum + g.delegations.reduce((s, d) => s + d.municipalities.length, 0),
    0,
  );

  if (!existsSync(BY_GOVERNORATE_DIR)) {
    mkdirSync(BY_GOVERNORATE_DIR, { recursive: true });
  }

  const governorateList = governorates.map(({ delegations, ...rest }) => ({
    ...rest,
    delegationCount: delegations.length,
    municipalityCount: delegations.reduce(
      (s, d) => s + d.municipalities.length,
      0,
    ),
  }));

  const governoratesFile = {
    generatedAt: new Date().toISOString(),
    source: "https://github.com/mn-youssef/tn-municipality-api",
    counts: {
      governorates: governorates.length,
      delegations: delegationCount,
      municipalities: municipalityCount,
    },
    governorates: governorateList,
  };

  writeFileSync(
    GOVERNORATES_PATH,
    `${JSON.stringify(governoratesFile, null, 2)}\n`,
  );

  writeFileSync(
    GOVERNORATES_TS_PATH,
    "// Generated by scripts/build-tunisia-locations.ts — do not hand-edit.\n" +
      "// Same content as governorates.json, as a .ts module: this repo's TypeScript\n" +
      "// toolchain (composite projects + resolveJsonModule) can't statically import\n" +
      "// a JSON file from within @dukkani/common's own compilation (TS6307).\n" +
      `export default ${JSON.stringify(governoratesFile, null, 2)} as const;\n`,
  );

  for (const gov of governorates) {
    const filePath = join(BY_GOVERNORATE_DIR, `${gov.code}.json`);
    writeFileSync(
      filePath,
      `${JSON.stringify(
        { code: gov.code, delegations: gov.delegations },
        null,
        2,
      )}\n`,
    );
  }

  // Mirror the per-governorate files into the storefront's public folder so
  // the checkout combobox can fetch them as plain static assets (no bundler
  // code-splitting tricks needed for a variable-path JSON import).
  if (existsSync(STOREFRONT_PUBLIC_DIR)) {
    rmSync(STOREFRONT_PUBLIC_DIR, { recursive: true, force: true });
  }
  mkdirSync(join(STOREFRONT_PUBLIC_DIR, "by-governorate"), {
    recursive: true,
  });
  cpSync(GOVERNORATES_PATH, join(STOREFRONT_PUBLIC_DIR, "governorates.json"));
  cpSync(BY_GOVERNORATE_DIR, join(STOREFRONT_PUBLIC_DIR, "by-governorate"), {
    recursive: true,
  });

  console.log(
    `Wrote ${GOVERNORATES_PATH} and ${governorates.length} file(s) in ${BY_GOVERNORATE_DIR}\n` +
      `Mirrored to ${STOREFRONT_PUBLIC_DIR}\n` +
      `  governorates: ${governorates.length}\n` +
      `  delegations: ${delegationCount}\n` +
      `  municipalities: ${municipalityCount}`,
  );
}

main();
