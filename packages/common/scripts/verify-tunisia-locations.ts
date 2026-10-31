/**
 * Basic sanity checks for the generated Tunisia location dataset — counts
 * and a handful of sample lookups. The repo has no test runner configured
 * (no vitest/jest anywhere), so this is a small standalone script rather
 * than a proper test suite; it exits non-zero on failure so it can still be
 * wired into CI later.
 *
 * Run with: `pnpm --filter @dukkani/common verify:tunisia-locations`
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../src/data/tunisia-locations");
const BY_GOVERNORATE_DIR = join(DATA_DIR, "by-governorate");

interface Municipality {
  id: string;
  nameFr: string;
  nameAr: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  searchKey: string;
}

interface Delegation {
  id: string;
  nameFr: string;
  nameAr: string;
  searchKey: string;
  municipalities: Municipality[];
}

interface GovernorateSummary {
  code: string;
  nameFr: string;
  nameAr: string;
  searchKey: string;
  delegationCount: number;
  municipalityCount: number;
}

let failures = 0;

function check(description: string, condition: boolean) {
  if (condition) {
    console.log(`  ok — ${description}`);
  } else {
    failures++;
    console.error(`  FAIL — ${description}`);
  }
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8"));
}

function main() {
  const governoratesFile = readJson<{
    counts: {
      governorates: number;
      delegations: number;
      municipalities: number;
    };
    governorates: GovernorateSummary[];
  }>(join(DATA_DIR, "governorates.json"));

  console.log("Counts");
  check(
    "exactly 24 governorates",
    governoratesFile.governorates.length === 24,
  );
  check(
    "counts.governorates matches governorates.length",
    governoratesFile.counts.governorates ===
      governoratesFile.governorates.length,
  );
  check(
    "delegation total is in the ~264 ballpark issue #260 expects",
    governoratesFile.counts.delegations >= 250 &&
      governoratesFile.counts.delegations <= 280,
  );
  check(
    "every governorate has at least one delegation",
    governoratesFile.governorates.every((g) => g.delegationCount > 0),
  );

  const byGovernorateFiles = readdirSync(BY_GOVERNORATE_DIR);
  console.log("\nFile layout");
  check(
    "one by-governorate file per governorate",
    byGovernorateFiles.length === governoratesFile.governorates.length,
  );

  let recomputedDelegations = 0;
  let recomputedMunicipalities = 0;
  const seenDelegationIds = new Set<string>();
  const seenMunicipalityIds = new Set<string>();

  for (const gov of governoratesFile.governorates) {
    const { delegations } = readJson<{ code: string; delegations: Delegation[] }>(
      join(BY_GOVERNORATE_DIR, `${gov.code}.json`),
    );
    recomputedDelegations += delegations.length;
    for (const delegation of delegations) {
      seenDelegationIds.add(delegation.id);
      recomputedMunicipalities += delegation.municipalities.length;
      for (const m of delegation.municipalities) {
        seenMunicipalityIds.add(m.id);
      }
    }
  }

  console.log("\nCross-checks against governorates.json summary");
  check(
    "sum of per-file delegation counts matches the summary",
    recomputedDelegations === governoratesFile.counts.delegations,
  );
  check(
    "sum of per-file municipality counts matches the summary",
    recomputedMunicipalities === governoratesFile.counts.municipalities,
  );
  check("delegation ids are unique", seenDelegationIds.size === recomputedDelegations);
  check(
    "municipality ids are unique",
    seenMunicipalityIds.size === recomputedMunicipalities,
  );

  console.log("\nSample lookups");
  const tunis = readJson<{ delegations: Delegation[] }>(
    join(BY_GOVERNORATE_DIR, "TUNIS.json"),
  );
  const carthage = tunis.delegations.find((d) => d.nameFr === "CARTHAGE");
  check("Tunis governorate has a 'CARTHAGE' delegation", !!carthage);
  check(
    "'CARTHAGE' delegation has municipalities with postal codes",
    !!carthage?.municipalities.some((m) => /^\d{4}$/.test(m.postalCode)),
  );

  const sfax = readJson<{ delegations: Delegation[] }>(
    join(BY_GOVERNORATE_DIR, "SFAX.json"),
  );
  const sfaxVille = sfax.delegations.find((d) => d.nameFr === "SFAX VILLE");
  check("Sfax governorate has a 'SFAX VILLE' delegation", !!sfaxVille);

  const benArous = governoratesFile.governorates.find(
    (g) => g.code === "BEN_AROUS",
  );
  check(
    "the dataset's 'BEN_AROUS' governorate maps to the Prisma enum value BEN_AROUS",
    benArous?.code === "BEN_AROUS",
  );

  const manouba = governoratesFile.governorates.find(
    (g) => g.code === "MANOUBA",
  );
  check(
    "the dataset's 'MANNOUBA' spelling is normalized to the Prisma enum value MANOUBA",
    manouba?.nameFr === "Mannouba",
  );

  console.log(
    failures === 0
      ? `\nAll checks passed (${governoratesFile.counts.governorates} governorates, ${recomputedDelegations} delegations, ${recomputedMunicipalities} municipalities).`
      : `\n${failures} check(s) failed.`,
  );

  if (failures > 0) {
    process.exitCode = 1;
  }
}

main();
