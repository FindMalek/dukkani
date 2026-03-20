import type { UserOnboardingStep } from "../schemas/enums";
import {
	parseEmail,
	parseOnboardingStep,
	parseStoreSlug,
} from "./query-parsers";

/**
 * Type-safe URL construction utilities
 * Works with nuqs parsers for consistent serialization
 */

export interface QueryParams {
	[key: string]: string | number | boolean | undefined | null;
}

/**
 * Build a URL with query parameters using nuqs-compatible serialization
 */
export function buildUrlWithQuery(
	baseUrl: string,
	params: QueryParams,
): string {
	const validParams = Object.entries(params)
		.filter(([_, value]) => value !== undefined && value !== null)
		.map(([key, value]) => [key, String(value)]);

	if (validParams.length === 0) {
		return baseUrl;
	}

	const queryString = new URLSearchParams(validParams).toString();
	return `${baseUrl}?${queryString}`;
}

/**
 * Build onboarding URL with type-safe parameters
 */
export function buildOnboardingUrl(
	baseUrl: string,
	params: {
		step?: UserOnboardingStep | null;
		email?: string | null;
	},
): string {
	const query: QueryParams = {};

	if (params.step) {
		query.step = params.step;
	}

	if (params.email) {
		query.email = params.email;
	}

	return buildUrlWithQuery(baseUrl, query);
}

/**
 * Build store selection URL
 */
export function buildStoreUrl(baseUrl: string, storeSlug: string): string {
	return buildUrlWithQuery(baseUrl, { store: storeSlug });
}

/**
 * Parse URL parameters using nuqs parsers (server-side utility)
 * Useful for API routes and middleware
 */
export function parseUrlParams(
	searchParams: URLSearchParams | Record<string, string>,
) {
	const params =
		searchParams instanceof URLSearchParams
			? searchParams
			: new URLSearchParams(searchParams);

	return {
		step: parseOnboardingStep.parse(params.get("step") ?? ""),
		email: parseEmail.parse(params.get("email") ?? ""),
		store: parseStoreSlug.parse(params.get("store") ?? ""),
	};
}
