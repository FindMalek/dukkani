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
		bgColor: "bg-green-100 dark:bg-green-900/20",
	},
	{
		title: "Instant Management",
		description:
			"Track orders, manage inventory, and handle customer inquiries from a single powerful dashboard.",
		icon: "layoutDashboard",
		color: "text-blue-600",
		bgColor: "bg-blue-100 dark:bg-blue-900/20",
	},
	{
		title: "Global Payments",
		description:
			"Accept payments via cards, digital wallets, or cash on delivery with automated receipt generation.",
		icon: "payments",
		color: "text-purple-600",
		bgColor: "bg-purple-100 dark:bg-purple-900/20",
	},
	{
		title: "Store Customization",
		description:
			"Build your brand with custom domains, themes, and product showcases that look great on any device.",
		icon: "storefront",
		color: "text-orange-600",
		bgColor: "bg-orange-100 dark:bg-orange-900/20",
	},
] as const;

export function Features() {
	return (
		<section id="features" className="bg-muted/30 py-16 md:py-24">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center md:mb-16">
					<h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
						Everything needed to scale
					</h2>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Powerful tools designed for modern commerce, simplified for WhatsApp
						businesses.
					</p>
				</div>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature) => {
						const Icon = Icons[feature.icon as keyof typeof Icons];
						return (
							<Card
								key={feature.title}
								className="border-none shadow-sm transition-shadow hover:shadow-md"
							>
								<CardHeader>
									<div
										className={`mb-4 w-fit rounded-xl p-3 ${feature.bgColor} ${feature.color}`}
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
