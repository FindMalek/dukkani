"use client";

import { getMainNavLinks, isActiveRoute } from "@/utils/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";

export function BottomNavigation() {
	const links = getMainNavLinks();
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-around">
			{links.map((item) => {
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
