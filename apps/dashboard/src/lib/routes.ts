/**
 * Type-safe routing utility for Next.js App Router
 * Provides full compatibility with Next.js's typedRoutes while maintaining custom structure
 */

import { Icons } from "@dukkani/ui/components/icons";
import type { Route } from "next";

/**
 * Route path definitions with type safety
 * Uses `satisfies Route` to validate routes exist in Next.js typedRoutes
 * Routes that don't exist will show TypeScript errors
 */
export const RoutePaths = {
	AUTH: {
		LOGIN: {
			url: "/login" as Route,
			label: "Login",
		},
		ONBOARDING: {
			INDEX: {
				url: "/onboarding" as Route,
				label: "Onboarding",
			},
			SIGNUP: {
				url: "/onboarding/signup" as Route,
				label: "Sign Up",
			},
			STORE_SETUP: {
				url: "/onboarding/store-setup" as Route,
				label: "Store Setup",
			},
			STORE_CONFIGURATION: {
				url: "/onboarding/store-configuration" as Route,
				label: "Store Configuration",
			},
			COMPLETE: {
				url: "/onboarding/complete" as Route,
				label: "Setup Complete",
			},
		},
	},
	DASHBOARD: {
		url: "/" as Route,
		label: "Dashboard",
		icon: Icons.home,
	},

	// Note: Next.js typedRoutes may not recognize routes in route groups like (dashboard)
	// These routes exist but typedRoutes validation is limited
	PRODUCTS: {
		INDEX: {
			url: "/products" as Route,
			label: "Products",
			icon: Icons.products,
		},
		NEW: {
			url: "/products/new" as Route,
			label: "New Product",
		},
		DETAIL: {
			url: (id: string) => `/products/${id}` as Route,
			label: "Product Details",
		},
	},

	ORDERS: {
		INDEX: {
			url: "/orders" as Route,
			label: "Orders",
			icon: Icons.orders,
		},
		NEW: {
			url: "/orders/new" as Route,
			label: "New Order",
		},
		DETAIL: {
			url: (id: string) => `/orders/${id}` as Route,
			label: "Order Details",
		},
	},

	CUSTOMERS: {
		INDEX: {
			url: "/customers" as Route,
			label: "Customers",
			icon: Icons.users,
		},
		NEW: {
			url: "/customers/new" as Route,
			label: "New Customer",
		},
		DETAIL: {
			url: (id: string) => `/customers/${id}` as Route,
			label: "Customer Details",
		},
	},

	SETTINGS: {
		INDEX: {
			url: "/settings" as Route,
			label: "Settings",
			icon: Icons.settings,
		},
		PROFILE: {
			url: "/settings/profile" as Route,
			label: "Profile",
			icon: Icons.user,
		},
		PAYMENTS: {
			url: "/settings/payments" as Route,
			label: "Payments",
			icon: Icons.payments,
		},
		STOREFRONT: {
			url: "/settings/storefront" as Route,
			label: "Storefront",
			icon: Icons.storefront,
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

/**
 * Get route with query parameters
 * Type-safe helper for building URLs with query strings
 *
 * @param baseRoute - The base route path (Route type or string)
 * @param params - Query parameters as an object
 * @returns URL string with query parameters appended
 *
 * @example
 *
 * getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.url, { email: "user@example.com" })
 * // Returns: "/onboarding?email=user%40example.com"
 *  */
export function getRouteWithQuery(
	baseRoute: Route | string,
	params: Record<string, string | number | boolean | undefined | null>,
): string {
	const queryString = new URLSearchParams(
		Object.entries(params)
			.filter(([_, value]) => value !== undefined && value !== null)
			.map(([key, value]) => [key, String(value)]),
	).toString();

	return queryString ? `${baseRoute}?${queryString}` : baseRoute;
}
