import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const ownerRepoSchema = z
	.string()
	.min(1, "REPOSITORY is required")
	.refine(
		(val) => {
			const parts = val.split("/");
			return parts.length === 2 && parts[0]!.length > 0 && parts[1]!.length > 0;
		},
		{ message: "REPOSITORY must be in owner/repo format" },
	);

/**
 * CI tools environment preset (e.g. CI failure analysis bot)
 * Server-only; used when running @dukkani/ci-tools in GitHub Actions or locally
 */
export const ciToolsEnv = createEnv({
	server: {
		GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),
		GROQ_API_KEY: z.string().min(1, "GROQ_API_KEY is required"),
		RUN_ID: z.string().min(1, "RUN_ID is required"),
		WORKFLOW_NAME: z.string().min(1, "WORKFLOW_NAME is required"),
		RUN_URL: z.string().url("RUN_URL must be a valid URL"),
		REPOSITORY: ownerRepoSchema,
		HEAD_BRANCH: z.string().min(1, "HEAD_BRANCH is required"),
		BOT_NAME: z.string().optional().default("CI Failure Analyst"),
	},
	client: {},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		process.env.SKIP_ENV_VALIDATION === "true" ||
		process.env.NODE_ENV === "test",
});
