#!/usr/bin/env node
/**
 * CI Failure Analysis Bot
 * Fetches failed workflow logs and PR diff, calls Groq AI for analysis, and posts a comment.
 */

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

const API = "https://api.github.com";
const GROQ_API = "https://api.groq.com/openai/v1/chat/completions";
const DIFF_MAX_CHARS = 6000;
const LOG_MAX_CHARS = 4000;
const LOG_CONTEXT_LINES = 15;

const WORKFLOW_CONTEXT: Record<string, string> = {
	"Lighthouse CI":
		"Next.js, .lighthouserc thresholds, performance/accessibility; env vars often cause failures.",
	"Prisma Migrate Deploy":
		"packages/db, schema, migrations; DATABASE_URL, migration conflicts.",
	"Languine Translation": "packages/common/src/locale, API key, project ID.",
};

interface GitHubJob {
	id: number;
	name: string;
	conclusion: string | null;
	status: string;
}

interface GitHubJobsResponse {
	jobs: GitHubJob[];
}

interface PullRequestFile {
	filename: string;
	patch?: string;
	changes?: number;
}

interface GitHubComment {
	id: number;
	body: string | null;
}

interface GroqChatResponse {
	choices?: Array<{ message?: { content?: string } }>;
}

interface FetchOptions extends RequestInit {
	headers?: Record<string, string>;
}

function required(name: string): string {
	const v = process.env[name];
	if (!v) {
		console.error(`Missing required env: ${name}`);
		process.exit(1);
	}
	return v;
}

function optional(name: string, def: string): string {
	return process.env[name] ?? def;
}

function sanitizeLogs(text: string | undefined | null): string {
	if (!text || typeof text !== "string") return "";
	let s = text
		.replace(/\*\*\*/g, "[REDACTED]")
		.replace(/\$\{\{\s*secrets\.\w+\s*\}\}/g, "[REDACTED]")
		.replace(
			/(Bearer|api[_-]?key|token|password|secret)\s*[:=]\s*['"]?[^\s'"]+/gi,
			"$1: [REDACTED]",
		)
		.replace(/https?:\/\/[^:]+:[^@]+@/g, "https://[REDACTED]@")
		.replace(/[^\x20-\x7E\n\r\t]/g, "");
	const errorIdx = s.search(/\b(Error|FAIL|failed|FATAL)\b/i);
	if (errorIdx >= 0) {
		const start = Math.max(0, errorIdx - LOG_CONTEXT_LINES * 80);
		s = s.slice(start);
	}
	if (s.length > LOG_MAX_CHARS) {
		s = s.slice(-LOG_MAX_CHARS);
	}
	return s;
}

function truncateDiff(text: string | undefined | null): string {
	if (!text || typeof text !== "string") return "";
	let s = text.replace(/[^\x20-\x7E\n\r\t]/g, "");
	if (s.length > DIFF_MAX_CHARS) {
		s = s.slice(-DIFF_MAX_CHARS);
		s = "(diff truncated from start)\n" + s;
	}
	return s;
}

async function fetchJSON<T>(
	url: string,
	token: string,
	opts: FetchOptions = {},
): Promise<T> {
	const res = await fetch(url, {
		...opts,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			...opts.headers,
		},
	});
	if (!res.ok) {
		const t = await res.text();
		throw new Error(`GitHub API ${res.status}: ${t.slice(0, 200)}`);
	}
	return res.json() as Promise<T>;
}

interface GitHubPullRequest {
	number: number;
}

async function findPR(
	token: string,
	owner: string,
	repo: string,
	headBranch: string,
): Promise<GitHubPullRequest | null> {
	const res = await fetchJSON<GitHubPullRequest[]>(
		`${API}/repos/${owner}/${repo}/pulls?head=${owner}:${headBranch}&state=open`,
		token,
	);
	return Array.isArray(res) && res.length > 0 ? (res[0] ?? null) : null;
}

async function fetchPullsFiles(
	token: string,
	owner: string,
	repo: string,
	prNumber: number,
): Promise<PullRequestFile[]> {
	const files = await fetchJSON<PullRequestFile[]>(
		`${API}/repos/${owner}/${repo}/pulls/${prNumber}/files`,
		token,
	);
	return files;
}

async function fetchJobLogs(
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
			// fallback: try gh run view
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

async function callGroq(
	key: string,
	prompt: string,
	retries = 2,
): Promise<string> {
	const body = {
		model: "openai/gpt-oss-120b",
		messages: [{ role: "user" as const, content: prompt }],
		max_tokens: 1024,
		temperature: 0.3,
	};
	for (let i = 0; i <= retries; i++) {
		try {
			const res = await fetch(GROQ_API, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${key}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
				signal: AbortSignal.timeout(30000),
			});
			if (res.status === 429 || res.status >= 500) {
				if (i < retries) {
					await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
					continue;
				}
			}
			if (!res.ok) {
				const t = await res.text();
				throw new Error(`Groq API ${res.status}: ${t.slice(0, 200)}`);
			}
			const data = (await res.json()) as GroqChatResponse;
			const content =
				data.choices?.[0]?.message?.content?.trim() ||
				"Unable to generate analysis.";
			return content;
		} catch (e) {
			if (i === retries) throw e;
			await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
		}
	}
	return "Automated analysis unavailable.";
}

async function listComments(
	token: string,
	owner: string,
	repo: string,
	issueNumber: number,
): Promise<GitHubComment[]> {
	const res = await fetchJSON<GitHubComment[]>(
		`${API}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
		token,
	);
	return Array.isArray(res) ? res : [];
}

async function createComment(
	token: string,
	owner: string,
	repo: string,
	issueNumber: number,
	body: string,
): Promise<void> {
	const res = await fetch(
		`${API}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) throw new Error(`Create comment failed: ${res.status}`);
}

async function updateComment(
	token: string,
	owner: string,
	repo: string,
	commentId: number,
	body: string,
): Promise<void> {
	const res = await fetch(
		`${API}/repos/${owner}/${repo}/issues/comments/${commentId}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) throw new Error(`Update comment failed: ${res.status}`);
}

function buildPrompt(
	workflowName: string,
	runUrl: string,
	jobNames: string,
	diff: string,
	logs: string,
): string {
	const ctx = WORKFLOW_CONTEXT[workflowName] ?? "";
	return `You are an expert CI/CD analyst. Analyze this GitHub Actions failure and correlate it with the PR changes.

CONTEXT:
- Repo: pnpm Turborepo monorepo (Next.js, Prisma, oRPC)
- Workflow: ${workflowName}
- Failed jobs: ${jobNames}
- Run URL: ${runUrl}
${ctx ? `- ${workflowName} context: ${ctx}` : ""}

PR DIFF (changed files, truncated if large):
\`\`\`
${diff || "(no diff - push to main or no PR)"}
\`\`\`

LOGS (sanitized, last portion):
\`\`\`
${logs}
\`\`\`

TASK: Correlate the failure with the code changes when diff is present. Identify which modified files/lines likely caused the issue. Provide targeted fixes for the changed code when possible.

Respond with this exact Markdown structure (no intro):
## Root cause
(1-3 sentences; reference specific changes if applicable)

## Affected area
(Pipeline stage, package, or file paths from the diff)

## Suggested fix
(Numbered steps; include code snippets or file:line references when helpful)

## Relevant files
(Bullet list of paths from the diff or logs)

Under 500 words. Be direct and actionable. When suggesting code changes, quote the relevant lines from the diff.`;
}

async function main(): Promise<void> {
	const token = required("GITHUB_TOKEN");
	const groqKey = required("GROQ_API_KEY");
	const runId = required("RUN_ID");
	const workflowName = required("WORKFLOW_NAME");
	const runUrl = required("RUN_URL");
	const repoParts = required("REPOSITORY").split("/");
	const owner = repoParts[0];
	const repo = repoParts[1];
	if (!owner || !repo) {
		console.error("REPOSITORY must be in owner/repo format");
		process.exit(1);
	}
	const headBranch = required("HEAD_BRANCH");
	const botName = optional("BOT_NAME", "CI Failure Analyst");

	const pr = await findPR(token, owner, repo, headBranch);
	if (!pr) {
		console.log("No open PR for branch, skipping comment.");
		return;
	}

	const prNumber = pr.number;
	let jobNames = "unknown";
	let logs = "";
	let diff = "";

	try {
		const jobsRes = await fetchJSON<GitHubJobsResponse>(
			`${API}/repos/${owner}/${repo}/actions/runs/${runId}/jobs`,
			token,
		);
		const failedJobs = (jobsRes.jobs ?? []).filter(
			(j) => j.conclusion === "failure",
		);
		jobNames = failedJobs.map((j) => j.name).join(", ") || "unknown";

		logs = await fetchJobLogs(token, owner, repo, runId);
		logs = sanitizeLogs(logs);
	} catch (e) {
		console.error(
			"Failed to fetch logs:",
			e instanceof Error ? e.message : String(e),
		);
	}

	try {
		const files = await fetchPullsFiles(token, owner, repo, prNumber);
		const patches = (files ?? [])
			.filter((f): f is PullRequestFile & { patch: string } => Boolean(f.patch))
			.sort((a, b) => (b.changes ?? 0) - (a.changes ?? 0))
			.slice(0, 8);
		const diffText = patches
			.map((f) => `--- ${f.filename}\n${f.patch}`)
			.join("\n\n");
		diff = truncateDiff(diffText);
	} catch (e) {
		console.error(
			"Failed to fetch diff:",
			e instanceof Error ? e.message : String(e),
		);
	}

	let analysis = "";
	try {
		const prompt = buildPrompt(
			workflowName,
			runUrl,
			jobNames,
			diff,
			logs || "(no logs captured)",
		);
		analysis = await callGroq(groqKey, prompt);
	} catch (e) {
		console.error(
			"Groq analysis failed:",
			e instanceof Error ? e.message : String(e),
		);
	}

	const body = analysis
		? `## CI Failure Analysis: ${workflowName}

| | |
|---|---|
| **Workflow** | ${workflowName} |
| **Run** | [View logs](${runUrl}) |
| **Failed jobs** | ${jobNames} |

---

${analysis}

---

— **${botName}** | Powered by Groq AI
<!-- ci-failure-bot -->`
		: `## CI Failure Analysis (Limited)

The automated analysis could not be completed. Please review the logs:

- [View workflow run](${runUrl})

— **${botName}**
<!-- ci-failure-bot -->`;

	const comments = await listComments(token, owner, repo, prNumber);
	const existing = comments.find((c) =>
		(c.body ?? "").includes("<!-- ci-failure-bot -->"),
	);

	if (existing) {
		await updateComment(token, owner, repo, existing.id, body);
		console.log("Updated existing comment.");
	} else {
		await createComment(token, owner, repo, prNumber, body);
		console.log("Posted new comment.");
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
