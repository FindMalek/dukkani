"use client";
import Link, { type LinkProps } from "next/link";
import { ModeToggle } from "@dukkani/ui/components/mode-toggle";
import { Button } from "@dukkani/ui/components/button";
import { env } from "@dukkani/env";

export default function Header() {
	return (
		<div>
			<div className="flex flex-row items-center justify-between px-4 py-3 md:px-6">
				<Link href="/" className="text-xl font-bold">
					Dukkani
				</Link>
				<nav className="hidden gap-6 md:flex">
					<Link href="#features" className="text-sm hover:underline">
						Features
					</Link>
					<Link href="#pricing" className="text-sm hover:underline">
						Pricing
					</Link>
					<Link href="#about" className="text-sm hover:underline">
						About
					</Link>
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<Button asChild variant="default" size="sm">
						<Link href={String(env.NEXT_PUBLIC_DASHBOARD_URL)}>Sign In</Link>
					</Button>
				</div>
			</div>
			<hr />
		</div>
	);
}
