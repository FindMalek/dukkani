"use client";

import { Button } from "@dukkani/ui/components/button";
import type { LinkProps } from "next/link";
import Link from "next/link";
import { env } from "@/env";

export function CTA() {
	return (
		<section className="bg-primary py-24 text-primary-foreground">
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl">
					Ready to transform your business?
				</h2>
				<p className="mx-auto mb-10 max-w-2xl text-lg opacity-90 sm:text-xl">
					Join thousands of merchants who are selling smarter with Dukkani. Set
					up your store in minutes.
				</p>
				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<Button
						size="lg"
						variant="secondary"
						className="h-14 px-8 font-semibold text-lg"
						asChild
					>
						<Link
							href={env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]}
						>
							Get Started for Free
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
