"use client";

import { webEnv } from "@dukkani/env/presets/web";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { ModeToggle } from "@dukkani/ui/components/mode-toggle";
import { AnimatePresence, motion } from "framer-motion";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 ${
				isScrolled
					? "border-b bg-background/80 backdrop-blur-md"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link href="/" className="flex items-center gap-2 font-bold text-xl">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<Icons.storefront className="h-5 w-5" />
					</div>
					<span>Dukkani</span>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden items-center gap-8 md:flex">
					<Link
						href="#features"
						className="font-medium text-muted-foreground text-sm hover:text-foreground"
					>
						Features
					</Link>
					<Link
						href="#pricing"
						className="font-medium text-muted-foreground text-sm hover:text-foreground"
					>
						Pricing
					</Link>
					<Link
						href="#faq"
						className="font-medium text-muted-foreground text-sm hover:text-foreground"
					>
						FAQ
					</Link>
					<div className="flex items-center gap-4">
						<ModeToggle />
						<Link
							href={
								webEnv.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
							}
							className="font-medium text-muted-foreground text-sm hover:text-foreground"
						>
							Sign In
						</Link>
						<Button asChild size="sm">
							<Link
								href={
									webEnv.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
							>
								Get Started
							</Link>
						</Button>
					</div>
				</nav>

				{/* Mobile Menu Toggle */}
				<div className="flex items-center gap-4 md:hidden">
					<ModeToggle />
					<button
						type="button"
						className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<Icons.x className="h-6 w-6" />
						) : (
							<Icons.moreHorizontal className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="border-b bg-background md:hidden"
					>
						<div className="container mx-auto flex flex-col gap-4 p-4">
							<Link
								href="#features"
								className="font-medium text-lg"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Features
							</Link>
							<Link
								href="#pricing"
								className="font-medium text-lg"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Pricing
							</Link>
							<Link
								href="#faq"
								className="font-medium text-lg"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								FAQ
							</Link>
							<hr />
							<Link
								href={
									webEnv.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
								className="font-medium text-lg text-muted-foreground"
							>
								Sign In
							</Link>
							<Button asChild className="w-full">
								<Link
									href={
										webEnv.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									Get Started
								</Link>
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
