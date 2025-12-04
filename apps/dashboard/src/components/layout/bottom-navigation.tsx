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
		<nav className="fixed right-0 bottom-0 left-0 flex items-center justify-around border-border border-t bg-card px-4 py-3">
			{mainNavLinks.map((item) => {
				const Icon = item.icon;
				const isActive = isActiveRoute(pathname, item.url, true);
				return (
					<Link
						key={item.url}
						href={item.url}
						aria-label={item.label}
						className={cn(
							"flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors",
							{
								"bg-accent/20 text-primary": isActive,
								"text-muted-foreground hover:text-foreground": !isActive,
							},
						)}
					>
						{Icon && <Icon className="h-5 w-5" />}
						<span className="hidden font-medium text-xs sm:inline">
							{item.label}
						</span>
					</Link>
				);
			})}
		</nav>
	);
}
