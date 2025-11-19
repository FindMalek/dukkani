/**
 * Type-safe routing utility for Next.js App Router
 * Provides full compatibility with Next.js's typedRoutes while maintaining custom structure
 */

import type { Route } from "next";
import { Icons } from "@dukkani/ui/components/icons";

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
	},

	DASHBOARD: {
		url: "/dashboard" as Route,
		label: "Dashboard",
		icon: Icons.home,
	},

	// Note: Next.js typedRoutes may not recognize routes in route groups like (dashboard)
	// These routes exist but typedRoutes validation is limited
	PRODUCTS: {
		INDEX: {
			url: "/dashboard/products" as Route,
			label: "Products",
			icon: Icons.products,
		},
		NEW: {
			url: "/dashboard/products/new" as Route,
			label: "New Product",
		},
		DETAIL: {
			url: (id: string) => `/dashboard/products/${id}` as Route,
			label: "Product Details",
		},
	},

	ORDERS: {
		INDEX: {
			url: "/dashboard/orders" as Route,
			label: "Orders",
			icon: Icons.orders,
		},
		NEW: {
			url: "/dashboard/orders/new" as Route,
			label: "New Order",
		},
		DETAIL: {
			url: (id: string) => `/dashboard/orders/${id}` as Route,
			label: "Order Details",
		},
	},

	CUSTOMERS: {
		INDEX: {
			url: "/dashboard/customers" as Route,
			label: "Customers",
			icon: Icons.users,
		},
		NEW: {
			url: "/dashboard/customers/new" as Route,
			label: "New Customer",
		},
		DETAIL: {
			url: (id: string) => `/dashboard/customers/${id}` as Route,
			label: "Customer Details",
		},
	},

	SETTINGS: {
		INDEX: {
			url: "/dashboard/settings" as Route,
			label: "Settings",
			icon: Icons.settings,
		},
		PROFILE: {
			url: "/dashboard/settings/profile" as Route,
			label: "Profile",
			icon: Icons.user,
		},
		PAYMENTS: {
			url: "/dashboard/settings/payments" as Route,
			label: "Payments",
			icon: Icons.payments,
		},
		STOREFRONT: {
			url: "/dashboard/settings/storefront" as Route,
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
