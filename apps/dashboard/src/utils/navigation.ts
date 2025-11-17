/**
 * Centralized navigation utilities
 * Provides type-safe route generation for all dashboard pages
 */

import type { LucideIcon } from "lucide-react";
import {
	LayoutDashboard,
	Package,
	ShoppingCart,
	Settings,
	Users,
} from "lucide-react";

/**
 * Centralized route definitions
 * All routes should be defined here for type safety and maintainability
 */
export const routes = {
	// Auth routes
	auth: {
		login: "/login",
		signin: "/signin",
		signup: "/signup",
	},
	// Dashboard routes
	dashboard: {
		overview: "/dashboard",
		products: {
			index: "/dashboard/products",
			detail: (id: string) => `/dashboard/products/${id}`,
			create: "/dashboard/products/new",
			edit: (id: string) => `/dashboard/products/${id}/edit`,
		},
		orders: {
			index: "/dashboard/orders",
			detail: (id: string) => `/dashboard/orders/${id}`,
			create: "/dashboard/orders/new",
		},
		settings: {
			index: "/dashboard/settings",
			profile: "/dashboard/settings/profile",
			store: {
				index: "/dashboard/settings/store",
				detail: (id: string) => `/dashboard/settings/store/${id}`,
				create: "/dashboard/settings/store/new",
				edit: (id: string) => `/dashboard/settings/store/${id}/edit`,
			},
			payments: "/dashboard/settings/payments",
		},
		customers: {
			index: "/dashboard/customers",
			detail: (id: string) => `/dashboard/customers/${id}`,
			create: "/dashboard/customers/new",
			edit: (id: string) => `/dashboard/customers/${id}/edit`,
		},
	},
} as const;

/**
 * Navigation link type for header/menu components
 */
export type NavLink = {
	to: string;
	label: string;
	exact?: boolean;
	icon?: LucideIcon;
};

/**
 * Route icon mapping for main navigation titles
 * Maps route paths to their corresponding icons
 */
const routeIcons: Record<string, LucideIcon> = {
	[routes.dashboard.overview]: LayoutDashboard,
	[routes.dashboard.products.index]: Package,
	[routes.dashboard.orders.index]: ShoppingCart,
	[routes.dashboard.settings.index]: Settings,
	[routes.dashboard.customers.index]: Users,
};

/**
 * Get main navigation links for header
 */
export function getMainNavLinks(): NavLink[] {
	return [
		{
			to: routes.dashboard.overview,
			label: "Overview",
			exact: true,
			icon: routeIcons[routes.dashboard.overview],
		},
		{
			to: routes.dashboard.products.index,
			label: "Products",
			icon: routeIcons[routes.dashboard.products.index],
		},
		{
			to: routes.dashboard.orders.index,
			label: "Orders",
			icon: routeIcons[routes.dashboard.orders.index],
		},
		{
			to: routes.dashboard.customers.index,
			label: "Customers",
			icon: routeIcons[routes.dashboard.customers.index],
		},
		{
			to: routes.dashboard.settings.index,
			label: "Settings",
			icon: routeIcons[routes.dashboard.settings.index],
		},
	];
}

/**
 * Get product routes
 */
export function getProductRoutes() {
	return routes.dashboard.products;
}

/**
 * Get order routes
 */
export function getOrderRoutes() {
	return routes.dashboard.orders;
}

/**
 * Get settings routes
 */
export function getSettingsRoutes() {
	return routes.dashboard.settings;
}

/**
 * Get breadcrumb links for a given path
 */
export function getBreadcrumbs(pathname: string): NavLink[] {
	const segments = pathname.split("/").filter(Boolean);
	const breadcrumbs: NavLink[] = [
		{ to: routes.dashboard.overview, label: "Home" },
	];

	if (segments.length === 0) {
		return breadcrumbs;
	}

	// Build breadcrumbs from path segments
	let currentPath = "";
	for (const segment of segments) {
		currentPath += `/${segment}`;

		// Map segments to labels
		const label = segment
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");

		breadcrumbs.push({
			to: currentPath,
			label,
		});
	}

	return breadcrumbs;
}

/**
 * Check if a route is active
 */
export function isActiveRoute(
	currentPath: string,
	targetPath: string,
	exact = false,
): boolean {
	if (exact) {
		return currentPath === targetPath;
	}
	return currentPath.startsWith(targetPath);
}
