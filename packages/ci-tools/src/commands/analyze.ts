#!/usr/bin/env node
/**
 * CI Failure Analysis Bot
 * Fetches failed workflow logs and PR diff, calls AI for analysis, and posts a comment.
 */

import { ciToolsEnv } from "@dukkani/env/presets/ci-tools";
import { generateAnalysis } from "../ai/index.js";
import {
	createComment,
	fetchJobLogs,
	fetchJobs,
	fetchPRFiles,
	findOpenPR,
	listComments,
	updateComment,
} from "../github/index.js";
import type { PullRequestFile } from "../github/types.js";
import type { LighthouseParseResult } from "../logs/index.js";
import {
	parseLighthouseFromLogs,
	sanitizeLogs,
	truncateDiff,
} from "../logs/index.js";
import { buildPrompt } from "../prompts/index.js";

async function main(): Promise<void> {
	const env = ciToolsEnv;
	const token = env.GITHUB_TOKEN;
	const runId = env.RUN_ID;
	const workflowName = env.WORKFLOW_NAME;
	const runUrl = env.RUN_URL;
	const parts = env.REPOSITORY.split("/");
	const owner = parts[0]!;
	const repo = parts[1]!;
	const headBranch = env.HEAD_BRANCH;
	const botName = env.BOT_NAME;

	const pr = await findOpenPR(token, owner, repo, headBranch);
	if (!pr) {
		console.log("No open PR for branch, skipping comment.");
		return;
	}

	const prNumber = pr.number;
	let jobNames = "unknown";
	let logs = "";
	let diff = "";

	let lighthouseData: LighthouseParseResult = {
		reportUrls: [],
		assertionSummary: "",
	};

	try {
		const jobsRes = await fetchJobs(token, owner, repo, runId);
		const failedJobs = (jobsRes.jobs ?? []).filter(
			(j) => j.conclusion === "failure",
		);
		jobNames = failedJobs.map((j) => j.name).join(", ") || "unknown";

		const rawLogs = await fetchJobLogs(token, owner, repo, runId);
		if (workflowName === "Lighthouse CI") {
			lighthouseData = parseLighthouseFromLogs(rawLogs);
		}
		logs = sanitizeLogs(rawLogs);
	} catch (e) {
		console.error(
			"Failed to fetch logs:",
			e instanceof Error ? e.message : String(e),
		);
	}

	try {
		const files = await fetchPRFiles(token, owner, repo, prNumber);
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
			workflowName === "Lighthouse CI" ? lighthouseData : undefined,
		);
		analysis = await generateAnalysis(prompt);
	} catch (e) {
		console.error(
			"AI analysis failed:",
			e instanceof Error ? e.message : String(e),
		);
	}

	const headerTableRows = [
		`| **Workflow** | ${workflowName} |`,
		`| **Run** | [View logs](${runUrl}) |`,
		`| **Failed jobs** | ${jobNames} |`,
	];
	if (
		workflowName === "Lighthouse CI" &&
		lighthouseData.assertionSummary.length > 0
	) {
		const oneLiner = lighthouseData.assertionSummary
			.split("\n")
			.filter(
				(l) =>
					l.includes("categories.") ||
					l.startsWith("expected:") ||
					l.startsWith("found:"),
			)
			.slice(0, 3)
			.join(" ");
		if (oneLiner) {
			headerTableRows.push(
				`| **Assertion** | ${oneLiner.replace(/\|/g, "\\|")} |`,
			);
		}
	}

	const reportsSection =
		workflowName === "Lighthouse CI" && lighthouseData.reportUrls.length > 0
			? `\n**Lighthouse reports:**\n${lighthouseData.reportUrls.map((url, i) => `- [Report ${i + 1}](${url})`).join("\n")}\n\n---\n\n`
			: "";

	const body = analysis
		? `## CI Failure Analysis: ${workflowName}

| | |
|---|---|
${headerTableRows.join("\n")}

---
${reportsSection}
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
