"use client";

import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="container mx-auto px-4 py-12 md:py-16">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="space-y-4">
						<div className="flex items-center gap-2 font-bold text-xl">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<Icons.storefront className="h-4 w-4" />
							</div>
							<span>Dukkani</span>
						</div>
						<p className="max-w-xs text-muted-foreground text-sm">
							The complete WhatsApp commerce solution for modern businesses.
							Sell more, chat less.
						</p>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-sm">Product</h3>
						<ul className="space-y-3 text-muted-foreground text-sm">
							<li>
								<Link href="#features" className="hover:text-foreground">
									Features
								</Link>
							</li>
							<li>
								<Link href="#pricing" className="hover:text-foreground">
									Pricing
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-foreground">
									Showcase
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-sm">Company</h3>
						<ul className="space-y-3 text-muted-foreground text-sm">
							<li>
								<Link href="#" className="hover:text-foreground">
									About
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-foreground">
									Blog
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-foreground">
									Careers
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold text-sm">Legal</h3>
						<ul className="space-y-3 text-muted-foreground text-sm">
							<li>
								<Link href="#" className="hover:text-foreground">
									Privacy
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-foreground">
									Terms
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
					<p>&copy; {new Date().getFullYear()} Dukkani. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
