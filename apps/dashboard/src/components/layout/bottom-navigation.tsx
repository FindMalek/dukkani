"use client";

import { RoutePaths } from "@/lib/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@dukkani/ui/lib/utils";

const mainNavLinks = [
	RoutePaths.DASHBOARD,
	RoutePaths.PRODUCTS.INDEX,
	RoutePaths.ORDERS.INDEX,
	RoutePaths.CUSTOMERS.INDEX,
	RoutePaths.SETTINGS.INDEX,
];

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
				const isActive = isActiveRoute(pathname, item.url, true);
				return (
					<Link
						key={item.url}
						href={item.url}
						aria-label={item.label}
						className={cn(
							"flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors",
							{
								"text-primary bg-accent/20": isActive,
								"text-muted-foreground hover:text-foreground": !isActive,
							},
						)}
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
