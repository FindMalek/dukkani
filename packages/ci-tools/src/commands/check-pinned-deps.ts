import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards against a specific class of regression: a dependency pinned to an
 * exact range for a documented reason (a Turbopack/native-binary crash, a
 * breaking change, etc.) getting silently widened by an automated bump
 * (Dependabot, Renovate, `pnpm update`) that doesn't know why the pin exists.
 *
 * sharp was pinned to ^0.34.4 after #570 (ERR_DLOPEN_FAILED on Vercel), then
 * Dependabot bumped it back to ^0.35.0 in #582 — reintroducing the crash for
 * ~3 weeks before anyone noticed (#593). This check would have caught that
 * bump in CI before merge.
 *
 * Only guards the pnpm-workspace.yaml catalog/overrides entry and any
 * package.json that pins the dependency directly instead of via `catalog:`.
 * It does not currently catch a package.json specifying an unrelated valid
 * range that happens to resolve outside the guarded value through some other
 * mechanism (e.g. a transitive override) — this is a lightweight drift guard
 * for the specific "someone bumped the declared pin" failure mode, not a full
 * resolved-version auditor.
 */
interface PinnedDependency {
  name: string;
  expected: string;
  reason: string;
}

const PINNED_DEPENDENCIES: PinnedDependency[] = [
  {
    name: "sharp",
    expected: "^0.34.4",
    reason:
      "0.35.x breaks with Turbopack on Vercel (ERR_DLOPEN_FAILED). See #570, #593.",
  },
];

const SEMVER_RANGE = /^[\^~]?\d|^[><=]/;
const REPO_ROOT = join(process.cwd(), "../..");

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractPinnedValue(workspaceYaml: string, name: string): string[] {
  const matches: string[] = [];
  const escapedName = escapeRegExp(name);
  const pattern = new RegExp(
    `^\\s*(?:'${escapedName}'|"${escapedName}"|${escapedName}):\\s*['"]?(\\S+?)['"]?\\s*$`,
    "gm",
  );
  for (const match of workspaceYaml.matchAll(pattern)) {
    const value = match[1];
    if (value && SEMVER_RANGE.test(value)) matches.push(value);
  }
  return matches;
}

function findWorkspacePackageJsonPaths(): string[] {
  const paths: string[] = [];
  for (const group of ["apps", "packages"]) {
    const groupPath = join(REPO_ROOT, group);
    let entries: string[] = [];
    try {
      entries = readdirSync(groupPath, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name);
    } catch {
      continue;
    }
    for (const entry of entries) {
      paths.push(join(groupPath, entry, "package.json"));
    }
  }
  return paths;
}

function checkDirectPackageJsonPins(dep: PinnedDependency): string[] {
  const problems: string[] = [];
  for (const pkgPath of findWorkspacePackageJsonPaths()) {
    let pkg: {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    try {
      pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    } catch {
      continue;
    }
    const value =
      pkg.dependencies?.[dep.name] ?? pkg.devDependencies?.[dep.name];
    if (value && value !== "catalog:" && value !== dep.expected) {
      problems.push(
        `${pkgPath} pins "${dep.name}" directly to "${value}" (expected "${dep.expected}" or "catalog:"). ${dep.reason}`,
      );
    }
  }
  return problems;
}

function main() {
  const workspacePath = join(REPO_ROOT, "pnpm-workspace.yaml");
  let workspaceYaml: string;
  try {
    workspaceYaml = readFileSync(workspacePath, "utf-8");
  } catch (error) {
    console.error(
      `::error::check-pinned-deps: couldn't read pnpm-workspace.yaml at ${workspacePath}: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
  }

  let failed = false;

  for (const dep of PINNED_DEPENDENCIES) {
    const found = extractPinnedValue(workspaceYaml, dep.name);

    if (found.length === 0) {
      console.error(
        `::error::check-pinned-deps: "${dep.name}" not found in pnpm-workspace.yaml, but is registered as a guarded pin. Update PINNED_DEPENDENCIES in packages/ci-tools/src/commands/check-pinned-deps.ts if it was intentionally removed.`,
      );
      failed = true;
      continue;
    }

    for (const value of found) {
      if (value !== dep.expected) {
        console.error(
          `::error::check-pinned-deps: "${dep.name}" is pinned to "${value}" but must stay at "${dep.expected}". ${dep.reason}`,
        );
        failed = true;
      }
    }

    for (const problem of checkDirectPackageJsonPins(dep)) {
      console.error(`::error::check-pinned-deps: ${problem}`);
      failed = true;
    }
  }

  if (failed) {
    console.error(
      "\nA pinned dependency drifted from its guarded value. If the underlying issue is actually resolved upstream, update both pnpm-workspace.yaml and PINNED_DEPENDENCIES together with a note on why the pin is safe to relax.",
    );
    process.exit(1);
  }

  console.log("check-pinned-deps: all guarded pins match.");
}

main();
