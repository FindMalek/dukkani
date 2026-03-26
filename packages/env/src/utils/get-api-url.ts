import { withRelatedProject } from "@vercel/related-projects";

/**
 * Resolve the API URL for the current deployment context.
 * Uses @vercel/related-projects to get the API preview URL when building
 * Dashboard/Storefront/Web in a Vercel preview deployment.
 * Falls back to defaultUrl for local dev or when related project data is unavailable.
 *
 * @param defaultUrl - The fallback API URL (e.g. env.NEXT_PUBLIC_API_URL from your app's env)
 */
export function getApiUrl(defaultUrl: string): string {
  const projectName = "dukkani-api";
  const defaultHost =
    defaultUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") ?? "";

  const host = withRelatedProject({
    projectName,
    defaultHost,
  });

  if (!host) return defaultUrl;

  // withRelatedProject returns full URL (https://...) for preview/production
  if (host.startsWith("http")) return host;

  // defaultHost was returned (local dev) - add protocol
  if (defaultHost.includes("localhost") || defaultHost.includes("127.0.0.1")) {
    return `http://${host}`;
  }
  return `https://${host}`;
}
