import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

export type RootEnvResult = {
	rootDir: string;
	envPath: string;
	loaded: boolean;
};

function findRepoRoot(startDir: string): string {
	let currentDir = startDir;

	while (true) {
		if (fs.existsSync(path.join(currentDir, "pnpm-workspace.yaml"))) {
			return currentDir;
		}

		const parentDir = path.dirname(currentDir);
		if (parentDir === currentDir) return startDir;
		currentDir = parentDir;
	}
}

/**
 * Load the root .env file for local development scripts.
 * This keeps env handling centralized for packages that run outside Next.js.
 */
export function loadRootEnv(startDir = process.cwd()): RootEnvResult {
	const rootDir = findRepoRoot(startDir);
	const envPath = path.join(rootDir, ".env");
	const result = dotenv.config({ path: envPath });

	return {
		rootDir,
		envPath,
		loaded: !result.error,
	};
}
