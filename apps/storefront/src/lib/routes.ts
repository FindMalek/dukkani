import { LOCALES } from "@dukkani/common/schemas/constants";
import type { Route } from "next";
import { createNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
	locales: LOCALES,
});

/**
 * Route path definitions with type safety
 * Uses `satisfies Route` to validate routes exist in Next.js typedRoutes
 */
export const RoutePaths = {
	HOME: {
		url: "/",
		label: "Home",
	},
	PRODUCTS: {
		DETAIL: {
			url: (id: string) => `/products/${id}` as Route,
			label: "Product Details",
		},
	},
	CHECKOUT: {
		url: "/checkout" as Route,
		label: "Checkout",
	},
} as const;

/**
 * Check if current pathname is a detail page (has dynamic segments)
 * Detail pages should show back button, others show store name/logo
 */
export function isDetailPage(pathname: string): boolean {
	// Detail pages have patterns like /[lang]/products/[id] or any route with dynamic segments
	// We check if the path has more than 2 segments (lang + at least one more)
	const segments = pathname.split("/").filter(Boolean);

	// Home page: /[lang] or /[lang]/ (1 segment after empty)
	if (segments.length <= 1) {
		return false;
	}

	// Detail pages: /[lang]/products/[id] or any nested route
	// We consider it a detail page if it's not the home page
	return segments.length > 1;
}

/**
 * Get route path as string
 */
export function getRoutePath(
	group: keyof typeof RoutePaths,
	key: string,
	...params: string[]
): string {
	const route =
		RoutePaths[group][key as keyof (typeof RoutePaths)[typeof group]];

	// All routes in our structure are objects with a url function
	if (typeof route === "object" && route !== null && "url" in route) {
		const urlFunc = (route as { url: (...args: string[]) => Route }).url;
		return urlFunc(...params);
	}

	// Fallback (should never happen with current structure)
	return route as Route;
}

/**
 * Get route href compatible with Next.js Link component
 */
export function getRouteHref(
	group: keyof typeof RoutePaths,
	key: string,
	...params: string[]
): Route {
	return getRoutePath(group, key, ...params) as Route;
}
