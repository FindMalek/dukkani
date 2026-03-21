import {
	createLoader,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
} from "nuqs/server";

/**
 * Server-side search params schema for type-safe parsing
 * Use these in API routes, middleware, and server components
 */

/**
 * Onboarding page search params schema
 */
export const onboardingSearchParams = {
	step: parseAsString, // Basic string parsing for server-side
	email: parseAsString,
};

/**
 * Store selection search params schema
 */
export const storeSearchParams = {
	store: parseAsString,
};

/**
 * Order filtering search params schema
 */
export const orderSearchParams = {
	search: parseAsString,
	status: parseAsString, // Basic string parsing for server-side
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(50),
};

/**
 * Product filtering search params schema
 */
export const productSearchParams = {
	search: parseAsString,
	published: parseAsBoolean,
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(50),
};

/**
 * Server-side loader functions
 * These provide type-safe parsing of search params in server environments
 */

/**
 * Load onboarding search params
 * @param searchParams - URLSearchParams or request object
 * @returns Parsed onboarding search params
 */
export const loadOnboardingParams = createLoader(onboardingSearchParams);

/**
 * Load store selection search params
 * @param searchParams - URLSearchParams or request object
 * @returns Parsed store search params
 */
export const loadStoreParams = createLoader(storeSearchParams);

/**
 * Load order filtering search params
 * @param searchParams - URLSearchParams or request object
 * @returns Parsed order search params
 */
export const loadOrderParams = createLoader(orderSearchParams);

/**
 * Load product filtering search params
 * @param searchParams - URLSearchParams or request object
 * @returns Parsed product search params
 */
export const loadProductParams = createLoader(productSearchParams);

// Re-export types for convenience
export type OnboardingSearchParams = ReturnType<typeof loadOnboardingParams>;
export type StoreSearchParams = ReturnType<typeof loadStoreParams>;
export type OrderSearchParams = ReturnType<typeof loadOrderParams>;
export type ProductSearchParams = ReturnType<typeof loadProductParams>;
