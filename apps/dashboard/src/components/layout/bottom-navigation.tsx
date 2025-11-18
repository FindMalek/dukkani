"use client";

import { RoutePaths } from "@/lib/routes";
import { Icons } from "@dukkani/ui/components/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";

const mainNavLinks = [
	{
		to: RoutePaths.DASHBOARD,
		label: "Overview",
		exact: true as const,
		icon: Icons.layoutDashboard,
	},
	{
		to: RoutePaths.PRODUCTS.INDEX,
		label: "Products",
		exact: false as const,
		icon: Icons.package,
	},
	{
		to: RoutePaths.ORDERS.INDEX,
		label: "Orders",
		exact: false as const,
		icon: Icons.shoppingCart,
	},
	{
		to: RoutePaths.CUSTOMERS.INDEX,
		label: "Customers",
		exact: false as const,
		icon: Icons.users,
	},
	{
		to: RoutePaths.SETTINGS.INDEX,
		label: "Settings",
		exact: false as const,
		icon: Icons.settings,
	},
] as const;

function isActiveRoute(
	currentPath: string,
	targetPath: string,
	exact = false,
): boolean {
	if (exact) {
		return currentPath === targetPath;
	}
	return currentPath.startsWith(targetPath);
}

export function BottomNavigation() {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-around">
			{mainNavLinks.map((item) => {
				const Icon = item.icon;
				const isActive = isActiveRoute(pathname, item.to, item.exact);
				return (
					<Link
						key={item.to}
						href={item.to as Route}
						className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
							isActive
								? "text-primary bg-accent/20"
								: "text-muted-foreground hover:text-foreground"
						}`}
						aria-label={item.label}
					>
						{Icon && <Icon className="w-5 h-5" />}
						<span className="text-xs font-medium hidden sm:inline">
							{item.label}
						</span>
					</Link>
				);
			})}
		</nav>
	);
}
