import { z } from "zod";

/**
 * Vercel platform-specific environment variables
 * See: https://vercel.com/docs/environment-variables/system-environment-variables
 */
export const vercelModule = {
	server: {
		/**
		 * The environment the app is deployed and running on
		 * Values: production, preview, development
		 * Available at: Both build and runtime
		 */
		VERCEL_ENV: z.enum(["production", "preview", "development"]).optional(),

		/**
		 * The system or custom environment the app is deployed and running on
		 * Values: production, preview, development, or custom environment name
		 * Available at: Both build and runtime
		 */
		VERCEL_TARGET_ENV: z.string().optional(),

		/**
		 * The domain name of the generated deployment URL (e.g., *.vercel.app)
		 * Does not include the protocol scheme https://
		 * Available at: Both build and runtime
		 */
		VERCEL_URL: z.string().optional(),

		/**
		 * The domain name of the generated Git branch URL (e.g., *-git-*.vercel.app)
		 * Does not include the protocol scheme https://
		 * Available at: Both build and runtime
		 */
		VERCEL_BRANCH_URL: z.string().optional(),

		/**
		 * A production domain name of the project
		 * Always set, even in preview deployments
		 * Does not include the protocol scheme https://
		 * Available at: Both build and runtime
		 */
		VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),

		/**
		 * The ID of the Region where the app is running
		 * Available at: Runtime
		 */
		VERCEL_REGION: z.string().optional(),

		/**
		 * The unique identifier for the deployment
		 * Can be used to implement Skew Protection
		 * Available at: Both build and runtime
		 */
		VERCEL_DEPLOYMENT_ID: z.string().optional(),

		/**
		 * The unique identifier for the project
		 * Available at: Both build and runtime
		 */
		VERCEL_PROJECT_ID: z.string().optional(),

		/**
		 * When Skew Protection is enabled, this value is set to "1"
		 * Available at: Both build and runtime
		 */
		VERCEL_SKEW_PROTECTION_ENABLED: z.string().optional(),

		/**
		 * The Protection Bypass for Automation value, if generated
		 * Available at: Both build and runtime
		 */
		VERCEL_AUTOMATION_BYPASS_SECRET: z.string().optional(),

		/**
		 * Vercel-issued OIDC token when Secure Backend Access is enabled
		 * Available at: Build time
		 */
		VERCEL_OIDC_TOKEN: z.string().optional(),

		/**
		 * The Git Provider the deployment is triggered from
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_PROVIDER: z.string().optional(),

		/**
		 * The origin repository the deployment is triggered from
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_REPO_SLUG: z.string().optional(),

		/**
		 * The account that owns the repository the deployment is triggered from
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_REPO_OWNER: z.string().optional(),

		/**
		 * The ID of the repository the deployment is triggered from
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_REPO_ID: z.string().optional(),

		/**
		 * The git branch of the commit the deployment was triggered by
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_COMMIT_REF: z.string().optional(),

		/**
		 * The git SHA of the commit the deployment was triggered by
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_COMMIT_SHA: z.string().optional(),

		/**
		 * The message attached to the commit the deployment was triggered by
		 * Truncated if it exceeds 2048 bytes
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_COMMIT_MESSAGE: z.string().optional(),

		/**
		 * The username attached to the author of the commit that triggered the deployment
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_COMMIT_AUTHOR_LOGIN: z.string().optional(),

		/**
		 * The name attached to the author of the commit that triggered the deployment
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_COMMIT_AUTHOR_NAME: z.string().optional(),

		/**
		 * The git SHA of the last successful deployment for the project and branch
		 * Available at: Build time
		 */
		VERCEL_GIT_PREVIOUS_SHA: z.string().optional(),

		/**
		 * The pull request ID that triggered the deployment
		 * Empty string if deployment is on a branch before PR
		 * Available at: Both build and runtime
		 */
		VERCEL_GIT_PULL_REQUEST_ID: z.string().optional(),

		/**
		 * An indicator to show that system environment variables have been exposed
		 * Available at: Both build and runtime
		 */
		VERCEL: z
			.string()
			.optional()
			.transform((val) => val === "1"),
	},
	client: {},
};

/**
 * Helper functions for Vercel-specific logic
 */

/**
 * True when the storefront should use cookie-based store selection
 * Subdomains are NOT available in Vercel preview or local development
 */
export function isStoreSelectorEnabled(env: {
	VERCEL_ENV?: "production" | "preview" | "development";
	NODE_ENV?: "production" | "development" | "test";
}): boolean {
	return env.VERCEL_ENV === "preview" || env.NODE_ENV === "development";
}

/**
 * Check if current deployment is a Vercel preview environment
 */
export function isPreviewEnvironment(env: {
	VERCEL_ENV?: "production" | "preview" | "development";
}): boolean {
	return env.VERCEL_ENV === "preview";
}

/**
 * Check if current deployment is a Vercel production environment
 */
export function isProductionEnvironment(env: {
	VERCEL_ENV?: "production" | "preview" | "development";
}): boolean {
	return env.VERCEL_ENV === "production";
}

/**
 * Get the current deployment URL if available
 */
export function getDeploymentUrl(env: {
	VERCEL_URL?: string;
	VERCEL_BRANCH_URL?: string;
}): string | null {
	return env.VERCEL_URL || env.VERCEL_BRANCH_URL || null;
}
