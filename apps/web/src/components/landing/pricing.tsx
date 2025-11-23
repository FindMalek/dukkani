"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { env } from "@dukkani/env";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { Badge } from "@dukkani/ui/components/badge";

export function Pricing() {
	return (
		<section id="pricing" className="py-24">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
						Transparent Pricing
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Start for free. Scale as you grow. No hidden fees.
					</p>
				</div>
				<div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
					{/* Basic Plan */}
					<Card className="relative flex flex-col overflow-hidden border-muted">
						<CardHeader>
							<CardTitle className="text-2xl">Starter</CardTitle>
							<CardDescription>Perfect for side hustles</CardDescription>
							<div className="mt-4">
								<span className="text-4xl font-bold">$0</span>
								<span className="text-muted-foreground">/mo</span>
							</div>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<ul className="mb-6 flex-1 space-y-3 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Unlimited
									Orders
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> 20 Products
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Basic
									Analytics
								</li>
							</ul>
							<Button variant="outline" className="w-full" asChild>
								<Link
									href={
										env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									Start Free
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Pro Plan */}
					<Card className="relative flex flex-col overflow-hidden border-primary shadow-lg">
						<div className="absolute right-0 top-0 rounded-bl-xl bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
							Most Popular
						</div>
						<CardHeader>
							<CardTitle className="text-2xl">Pro</CardTitle>
							<CardDescription>For growing businesses</CardDescription>
							<div className="mt-4">
								<span className="text-4xl font-bold">$14</span>
								<span className="text-muted-foreground">/mo</span>
							</div>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<ul className="mb-6 flex-1 space-y-3 text-sm">
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Everything in
									Starter
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Unlimited
									Products
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Custom Domain
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Remove
									Branding
								</li>
							</ul>
							<Button className="w-full" asChild>
								<Link
									href={
										env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									Get Started
								</Link>
							</Button>
						</CardContent>
					</Card>

					{/* Business Plan */}
					<Card className="relative flex flex-col overflow-hidden border-muted">
						<CardHeader>
							<CardTitle className="text-2xl">Business</CardTitle>
							<CardDescription>For teams & agencies</CardDescription>
							<div className="mt-4">
								<span className="text-4xl font-bold">$38</span>
								<span className="text-muted-foreground">/mo</span>
							</div>
						</CardHeader>
						<CardContent className="flex flex-1 flex-col">
							<ul className="mb-6 flex-1 space-y-3 text-sm text-muted-foreground">
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Everything in
									Pro
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> 5 Staff
									Accounts
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> API Access
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-4 w-4 text-primary" /> Priority
									Support
								</li>
							</ul>
							<Button variant="outline" className="w-full" asChild>
								<Link
									href={
										env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									Contact Sales
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
