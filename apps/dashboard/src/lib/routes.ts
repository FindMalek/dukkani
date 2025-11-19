/**
 * Type-safe routing utility for Next.js App Router
 * Provides full compatibility with Next.js's typedRoutes while maintaining custom structure
 */

import type { Route } from "next";

/**
 * Route path definitions with type safety
 * Uses `satisfies Route` to validate routes exist in Next.js typedRoutes
 * Routes that don't exist will show TypeScript errors
 */
export const RoutePaths = {
	AUTH: {
		LOGIN: "/login" satisfies Route,
	},

	DASHBOARD: "/dashboard" satisfies Route,

	// Note: Next.js typedRoutes may not recognize routes in route groups like (dashboard)
	// These routes exist but typedRoutes validation is limited
	PRODUCTS: {
		INDEX: "/dashboard/products" as Route,
		NEW: "/dashboard/products/new" as Route,
		DETAIL: (id: string) => `/dashboard/products/${id}` as Route,
	},

	ORDERS: {
		INDEX: "/dashboard/orders" as Route,
		NEW: "/dashboard/orders/new" as Route,
		DETAIL: (id: string) => `/dashboard/orders/${id}` as Route,
	},

	CUSTOMERS: {
		INDEX: "/dashboard/customers" as Route,
		NEW: "/dashboard/customers/new" as Route,
		DETAIL: (id: string) => `/dashboard/customers/${id}` as Route,
	},

	SETTINGS: {
		INDEX: "/dashboard/settings" as Route,
		PROFILE: "/dashboard/settings/profile" as Route,
		PAYMENTS: "/dashboard/settings/payments" as Route,
		STOREFRONT: "/dashboard/settings/storefront" as Route,
	},
} as const;

/**
 * Type for route groups (e.g., 'AUTH', 'PRODUCTS', 'ORDERS')
 */
type RouteGroup = keyof typeof RoutePaths;

/**
 * Type for route keys within a group
 */
type RouteKey<T extends RouteGroup> = T extends "SETTINGS"
	? keyof (typeof RoutePaths)[T] | "STORE"
	: keyof (typeof RoutePaths)[T];

/**
 * Get route path as string
 * Compatible with Next.js App Router's Link and useRouter
 */
export function getRoutePath<T extends RouteGroup>(
	group: T,
	key: RouteKey<T>,
	id?: string,
): string {
	const route = RoutePaths[group][key as keyof (typeof RoutePaths)[T]];

	if (typeof route === "function") {
		if (!id) {
			throw new Error(
				`Route ${String(group)}.${String(key)} requires an id parameter`,
			);
		}
		return route(id);
	}

	if (typeof route === "object" && route !== null && "INDEX" in route) {
		// Handle nested routes like SETTINGS.STORE
		return (route as { INDEX: Route }).INDEX;
	}

	return route as Route;
}

/**
 * Get route href compatible with Next.js Link component
 * Returns a typed Route for type safety
 */
export function getRouteHref<T extends RouteGroup>(
	group: T,
	key: RouteKey<T>,
	id?: string,
): Route {
	return getRoutePath(group, key, id) as Route;
}
