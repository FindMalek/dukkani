import { execSync } from "node:child_process";
import {
	createWriteStream,
	mkdtempSync,
	readdirSync,
	readFileSync,
	rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { API, fetchJSON } from "./client.js";
import type { GitHubJobsResponse } from "./types.js";

export async function fetchJobs(
	token: string,
	owner: string,
	repo: string,
	runId: string,
): Promise<GitHubJobsResponse> {
	return fetchJSON<GitHubJobsResponse>(
		`${API}/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
		token,
	);
}

export async function fetchJobLogs(
	token: string,
	owner: string,
	repo: string,
	runId: string,
): Promise<string> {
	const jobs = await fetchJSON<GitHubJobsResponse>(
		`${API}/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
		token,
	);
	const failed = (jobs.jobs ?? []).filter(
		(j) => j.conclusion === "failure" || j.status === "completed",
	);
	if (failed.length === 0) return "";

	const chunks: string[] = [];
	for (const job of failed) {
		try {
			const logRes = await fetch(
				`${API}/repos/${owner}/${repo}/actions/jobs/${job.id}/logs`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/vnd.github+json",
					},
					redirect: "follow",
				},
			);
			if (!logRes.ok) continue;
			const buf = await logRes.arrayBuffer();
			const dir = mkdtempSync(join(tmpdir(), "gh-logs-"));
			const zipPath = join(dir, "logs.zip");
			await pipeline(
				Readable.from(Buffer.from(buf)),
				createWriteStream(zipPath),
			);
			try {
				execSync(`unzip -o -q "${zipPath}" -d "${dir}"`, {
					stdio: "pipe",
					maxBuffer: 5 * 1024 * 1024,
				});
				const walk = (p: string): void => {
					const entries = readdirSync(p, { withFileTypes: true });
					for (const e of entries) {
						const fp = join(p, e.name);
						if (e.isDirectory()) walk(fp);
						else if (e.name.endsWith(".txt")) {
							chunks.push(readFileSync(fp, "utf-8"));
						}
					}
				};
				walk(dir);
			} finally {
				rmSync(dir, { recursive: true, force: true });
			}
		} catch {
			try {
				const out = execSync(`gh run view ${runId} --log 2>/dev/null || true`, {
					encoding: "utf-8",
					maxBuffer: 2 * 1024 * 1024,
					env: { ...process.env, GH_TOKEN: token },
				});
				if (out) chunks.push(out);
				break;
			} catch {
				/* ignore */
			}
		}
	}
	return chunks.join("\n\n");
}
