/**
 * Type-safe routing utility for Next.js App Router
 * Provides full compatibility with Next.js's typedRoutes while maintaining custom structure
 */

import type { Route } from "next";

/**
 * Route path definitions with type safety
 */
export const RoutePaths = {
	AUTH: {
		LOGIN: "/login" as const,
		SIGNIN: "/signin" as const,
		SIGNUP: "/signup" as const,
	},

	DASHBOARD: "/dashboard" as const,

	PRODUCTS: {
		INDEX: "/dashboard/products" as const,
		NEW: "/dashboard/products/new" as const,
		DETAIL: (id: string) => `/dashboard/products/${id}` as const,
		EDIT: (id: string) => `/dashboard/products/${id}/edit` as const,
	},

	ORDERS: {
		INDEX: "/dashboard/orders" as const,
		NEW: "/dashboard/orders/new" as const,
		DETAIL: (id: string) => `/dashboard/orders/${id}` as const,
	},

	CUSTOMERS: {
		INDEX: "/dashboard/customers" as const,
		NEW: "/dashboard/customers/new" as const,
		DETAIL: (id: string) => `/dashboard/customers/${id}` as const,
		EDIT: (id: string) => `/dashboard/customers/${id}/edit` as const,
	},

	SETTINGS: {
		INDEX: "/dashboard/settings" as const,
		PROFILE: "/dashboard/settings/profile" as const,
		STOREFRONT: "/dashboard/settings/storefront" as const,
		PAYMENTS: "/dashboard/settings/payments" as const,
		STORE: {
			INDEX: "/dashboard/settings/store" as const,
			DETAIL: (id: string) => `/dashboard/settings/store/${id}` as const,
			CREATE: "/dashboard/settings/store/new" as const,
			EDIT: (id: string) => `/dashboard/settings/store/${id}/edit` as const,
		},
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
		return (route as { INDEX: string }).INDEX;
	}

	return route as string;
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
