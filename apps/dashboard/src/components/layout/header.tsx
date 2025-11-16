"use client";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@dukkani/ui/components/mode-toggle";
import { getMainNavLinks, isActiveRoute } from "@/utils/navigation";
import UserMenu from "./user-menu";

export default function Header() {
	const pathname = usePathname();
	const links = getMainNavLinks();

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 py-1">
				<nav className="flex gap-4 text-lg">
					{links.map(({ to, label, exact }) => {
						const isActive = isActiveRoute(pathname, to, exact);
						return (
							<Link
								key={to}
								href={to as Route}
								className={isActive ? "font-semibold underline" : ""}
							>
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
