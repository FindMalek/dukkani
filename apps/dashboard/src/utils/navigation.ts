/**
 * Centralized navigation utilities
 * Provides type-safe route generation for all dashboard pages
 */

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
			account: "/dashboard/settings/account",
			security: "/dashboard/settings/security",
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
};

/**
 * Get main navigation links for header
 */
export function getMainNavLinks(): NavLink[] {
	return [
		{ to: routes.dashboard.overview, label: "Overview", exact: true },
		{ to: routes.dashboard.products.index, label: "Products" },
		{ to: routes.dashboard.orders.index, label: "Orders" },
		{ to: routes.dashboard.settings.index, label: "Settings" },
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
	const breadcrumbs: NavLink[] = [{ to: routes.dashboard.overview, label: "Home" }];

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
export function isActiveRoute(currentPath: string, targetPath: string, exact = false): boolean {
	if (exact) {
		return currentPath === targetPath;
	}
	return currentPath.startsWith(targetPath);
}

