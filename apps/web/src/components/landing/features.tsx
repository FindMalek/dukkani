"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";

const features = [
	{
		title: "Smart Order Form",
		description:
			"Let customers order directly through a beautiful, mobile-optimized form that syncs with WhatsApp.",
		icon: "orders",
		color: "text-green-600",
	},
	{
		title: "Instant Management",
		description:
			"Track orders, manage inventory, and handle customer inquiries from a single powerful dashboard.",
		icon: "layoutDashboard",
		color: "text-blue-600",
	},
	{
		title: "Global Payments",
		description:
			"Accept payments via cards, digital wallets, or cash on delivery with automated receipt generation.",
		icon: "payments",
		color: "text-purple-600",
	},
	{
		title: "Store Customization",
		description:
			"Build your brand with custom domains, themes, and product showcases that look great on any device.",
		icon: "storefront",
		color: "text-orange-600",
	},
] as const;

export function Features() {
	return (
		<section id="features" className="bg-muted/30 py-24">
			<div className="container mx-auto px-4">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
						Everything needed to scale
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Powerful tools designed for modern commerce, simplified for WhatsApp
						businesses.
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{features.map((feature) => {
						const Icon = Icons[feature.icon as keyof typeof Icons];
						return (
							<Card
								key={feature.title}
								className="border-none shadow-sm transition-shadow hover:shadow-md"
							>
								<CardHeader>
									<div
										className={`mb-4 w-fit rounded-lg p-3 bg-background shadow-sm ${feature.color}`}
									>
										<Icon className="h-6 w-6" />
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
									<CardDescription>{feature.description}</CardDescription>
								</CardHeader>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
