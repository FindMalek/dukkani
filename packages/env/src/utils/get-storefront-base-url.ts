import { withRelatedProject } from "@vercel/related-projects";

/**
 * Resolve the storefront base host for building store URLs (e.g., slug.domain).
 * Uses @vercel/related-projects to get the storefront preview URL when the
 * Dashboard is in a Vercel preview deployment.
 * Falls back to defaultHost for local dev or when related project data is unavailable.
 *
 * Ensure the storefront project name in Vercel is "dukkani-storefront" and that
 * the dashboard's vercel.json includes the storefront project ID in relatedProjects.
 */
export function getStorefrontBaseUrl(defaultHost: string): string {
	const projectName = "dukkani-storefront";
	const host = withRelatedProject({
		projectName,
		defaultHost,
	});

	if (!host) return defaultHost;

	// withRelatedProject returns full URL (https://...) for preview/production
	if (host.startsWith("http")) {
		try {
			return new URL(host).host;
		} catch {
			return defaultHost;
		}
	}

	return host;
}
