import { readFileSync } from "node:fs";
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

function extractPinnedValue(workspaceYaml: string, name: string): string[] {
  const matches: string[] = [];
  const pattern = new RegExp(`^\\s*(?:'${name}'|"${name}"|${name}):\\s*(\\S+)\\s*$`, "gm");
  for (const match of workspaceYaml.matchAll(pattern)) {
    const value = match[1];
    if (value && SEMVER_RANGE.test(value)) matches.push(value);
  }
  return matches;
}

function main() {
  const workspacePath = join(process.cwd(), "../../pnpm-workspace.yaml");
  const workspaceYaml = readFileSync(workspacePath, "utf-8");

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
