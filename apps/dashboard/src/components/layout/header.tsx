"use client";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@dukkani/ui/components/mode-toggle";
import { RoutePaths } from "@/lib/routes";
import { Icons } from "@dukkani/ui/components/icons";
import UserMenu from "./user-menu";

const mainNavLinks = [
	{
		to: RoutePaths.DASHBOARD,
		label: "Overview",
		exact: true,
		icon: Icons.layoutDashboard,
	},
	{
		to: RoutePaths.PRODUCTS.INDEX,
		label: "Products",
		icon: Icons.package,
	},
	{
		to: RoutePaths.ORDERS.INDEX,
		label: "Orders",
		icon: Icons.shoppingCart,
	},
	{
		to: RoutePaths.CUSTOMERS.INDEX,
		label: "Customers",
		icon: Icons.users,
	},
	{
		to: RoutePaths.SETTINGS.INDEX,
		label: "Settings",
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

export default function Header() {
	const pathname = usePathname();

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{mainNavLinks.map(({ to, label, exact, icon: Icon }) => {
						const isActive = isActiveRoute(pathname, to, exact);
						return (
							<Link
								key={to}
								href={to as Route}
								className={`flex items-center gap-2 ${
									isActive ? "font-semibold underline" : ""
								}`}
							>
								{Icon && <Icon className="h-4 w-4" />}
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
