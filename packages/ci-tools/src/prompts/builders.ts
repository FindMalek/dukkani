import { llml } from "@zenbase/llml";
import type { LighthouseParseResult } from "../logs/index.js";
import { WORKFLOW_CONTEXT } from "./context.js";

const REPO_CONTEXT = "pnpm Turborepo monorepo (Next.js, Prisma, oRPC)";

const LIGHTHOUSE_OUTPUT_FORMAT = `Respond with this exact Markdown structure (no intro):
## Root cause
(1-3 sentences; which category, score vs threshold)

## Affected area
(Pages/URLs tested, config or file paths)

## Suggested fix
(Numbered steps; concrete a11y/performance fixes or config change; reference report links when helpful)

## Relevant files
(Bullet list of paths)

Under 500 words. Be direct and actionable.`;

const GENERIC_OUTPUT_FORMAT = `Respond with this exact Markdown structure (no intro):
## Root cause
(1-3 sentences; reference specific changes if applicable)

## Affected area
(Pipeline stage, package, or file paths from the diff)

## Suggested fix
(Numbered steps; include code snippets or file:line references when helpful)

## Relevant files
(Bullet list of paths from the diff or logs)

Under 500 words. Be direct and actionable. When suggesting code changes, quote the relevant lines from the diff.`;

export function buildLighthousePrompt(
	runUrl: string,
	jobNames: string,
	diff: string,
	logs: string,
	lighthouse: LighthouseParseResult,
): string {
	const context: Record<string, unknown> = {
		repo: REPO_CONTEXT,
		workflow: "Lighthouse CI",
		failedJobs: jobNames,
		runUrl,
	};
	if (lighthouse.assertionSummary.length > 0) {
		context.assertionFailure = lighthouse.assertionSummary;
	}
	if (lighthouse.reportUrls.length > 0) {
		context.lighthouseReportUrls = lighthouse.reportUrls;
	}

	const taskSteps = [
		"Root cause: State which category failed (e.g. accessibility) and the score vs threshold (e.g. 0.86 vs 0.9). If the assertion block is present, use it.",
		"Affected area: Which URLs/pages were tested and which config (e.g. .lighthouserc.cjs) or app code is relevant.",
		"Suggested fix: Give concrete, actionable steps—e.g. improve color contrast, increase tap target size, add alt text, fix ARIA, or temporarily lower the threshold in .lighthouserc.cjs. Prefer pointing the user to the report URLs above for the full list of failing audits.",
		"Relevant files: Paths from the diff or logs.",
	];

	return llml({
		role: "You are an expert CI/CD and web performance analyst. This is a Lighthouse CI assertion failure: the workflow runs Lighthouse (performance, accessibility, best-practices, SEO) and enforces minimum category scores defined in .lighthouserc.cjs. The run failed because one or more categories scored below the required threshold.",
		context,
		prDiff: diff || "(no diff - push to main or no PR)",
		logs,
		task: taskSteps,
		outputFormat: LIGHTHOUSE_OUTPUT_FORMAT,
	});
}

export function buildPrompt(
	workflowName: string,
	runUrl: string,
	jobNames: string,
	diff: string,
	logs: string,
	lighthouse?: LighthouseParseResult,
): string {
	if (
		workflowName === "Lighthouse CI" &&
		lighthouse &&
		(lighthouse.reportUrls.length > 0 || lighthouse.assertionSummary.length > 0)
	) {
		return buildLighthousePrompt(runUrl, jobNames, diff, logs, lighthouse);
	}

	const ctx = WORKFLOW_CONTEXT[workflowName] ?? "";
	const context: Record<string, unknown> = {
		repo: REPO_CONTEXT,
		workflow: workflowName,
		failedJobs: jobNames,
		runUrl,
	};
	if (ctx) {
		context.workflowContext = ctx;
	}

	return llml({
		role: "You are an expert CI/CD analyst. Analyze this GitHub Actions failure and correlate it with the PR changes.",
		context,
		prDiff: diff || "(no diff - push to main or no PR)",
		logs,
		task: "Correlate the failure with the code changes when diff is present. Identify which modified files/lines likely caused the issue. Provide targeted fixes for the changed code when possible.",
		outputFormat: GENERIC_OUTPUT_FORMAT,
	});
}
