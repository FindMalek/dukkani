"use client";

import { Button } from "@dukkani/ui/components/button";
import Link from "next/link";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝
`;

export default function Home() {
	return (
		<div className="container mx-auto max-w-6xl px-4 py-12 md:py-24">
			<div className="text-center">
				<pre className="mx-auto mb-8 overflow-x-auto font-mono text-sm md:text-base">
					{TITLE_TEXT}
				</pre>
				<h1 className="mb-4 text-4xl font-bold md:text-6xl">
					Welcome to Dukkani
				</h1>
				<p className="text-muted-foreground mb-8 text-lg md:text-xl">
					Your all-in-one business management solution
				</p>
				<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
					<Button asChild size="lg">
						<Link href="http://localhost:3003">Get Started</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="#features">Learn More</Link>
					</Button>
				</div>
			</div>

			<div id="features" className="mt-24 grid gap-8 md:grid-cols-3">
				<div className="rounded-lg border p-6">
					<h2 className="mb-2 text-xl font-semibold">Easy to Use</h2>
					<p className="text-muted-foreground text-sm">
						Intuitive interface designed for businesses of all sizes
					</p>
				</div>
				<div className="rounded-lg border p-6">
					<h2 className="mb-2 text-xl font-semibold">Powerful Features</h2>
					<p className="text-muted-foreground text-sm">
						Manage products, orders, and more from one dashboard
					</p>
				</div>
				<div className="rounded-lg border p-6">
					<h2 className="mb-2 text-xl font-semibold">Secure & Reliable</h2>
					<p className="text-muted-foreground text-sm">
						Your data is safe with enterprise-grade security
					</p>
				</div>
			</div>
		</div>
	);
}
