"use client";

import { env } from "@dukkani/env";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import type { LinkProps } from "next/link";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Navbar */}
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2 font-bold text-xl">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
							D
						</div>
						<span>Dukkani</span>
					</div>
					<nav className="hidden items-center gap-6 font-medium text-muted-foreground text-sm md:flex">
						<Link
							href="#features"
							className="transition-colors hover:text-foreground"
						>
							Features
						</Link>
						<Link
							href="#pricing"
							className="transition-colors hover:text-foreground"
						>
							Pricing
						</Link>
						<Link
							href="#faq"
							className="transition-colors hover:text-foreground"
						>
							FAQ
						</Link>
					</nav>
					<div className="flex items-center gap-4">
						<Link
							href={env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]}
							className="hidden font-medium text-muted-foreground text-sm hover:text-foreground sm:block"
						>
							Log in
						</Link>
						<Button asChild size="sm">
							<Link
								href={
									env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
							>
								Start for free
							</Link>
						</Button>
					</div>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section className="container mx-auto px-4 py-24 md:py-32">
					<div className="mx-auto flex max-w-4xl flex-col items-center space-y-8 text-center">
						<Badge variant="secondary" className="rounded-full px-4 py-1">
							WhatsApp Official Partner
						</Badge>
						<h1 className="font-extrabold text-4xl tracking-tight md:text-5xl lg:text-6xl">
							Create Ecommerce for{" "}
							<span className="text-green-600">WhatsApp</span>
						</h1>
						<p className="max-w-[700px] text-muted-foreground text-xl">
							Simplify WhatsApp ordering. Boost sales with better customer
							service. Built for local businesses.
						</p>
						<div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
							<Button size="lg" className="h-12 px-8 text-base" asChild>
								<Link
									href={
										env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
									}
								>
									Start for free
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="h-12 px-8 text-base"
							>
								View Demo
							</Button>
						</div>

						{/* Hero Visual / Mockup */}
						<div className="relative mx-auto mt-16 h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-gray-800 bg-gray-900 shadow-xl dark:border-gray-800">
							<div className="-start-[17px] absolute top-[72px] h-[32px] w-[3px] rounded-s-lg bg-gray-800" />
							<div className="-start-[17px] absolute top-[124px] h-[46px] w-[3px] rounded-s-lg bg-gray-800" />
							<div className="-start-[17px] absolute top-[178px] h-[46px] w-[3px] rounded-s-lg bg-gray-800" />
							<div className="-end-[17px] absolute top-[142px] h-[64px] w-[3px] rounded-e-lg bg-gray-800" />
							<div className="relative h-[572px] w-[272px] overflow-hidden rounded-[2rem] bg-white dark:bg-gray-800">
								{/* Mock App UI */}
								<div className="flex h-16 w-full items-center bg-green-600 px-4 text-white">
									<div className="mr-3 h-8 w-8 rounded-full bg-white/20" />
									<div className="font-semibold">My Store</div>
								</div>
								<div className="space-y-4 p-4">
									<div className="h-32 w-full rounded-lg bg-gray-100 dark:bg-gray-700" />
									<div className="space-y-2">
										<div className="h-4 w-3/4 rounded bg-gray-100 dark:bg-gray-700" />
										<div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-700" />
									</div>
									<div className="mt-4 grid grid-cols-2 gap-2">
										<div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-700" />
										<div className="h-24 rounded-lg bg-gray-100 dark:bg-gray-700" />
									</div>
									<div className="absolute right-4 bottom-4">
										<div className="rounded-full bg-green-500 p-3 text-white shadow-lg">
											<Icons.orders className="h-6 w-6" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Grid */}
				<section
					id="features"
					className="container mx-auto bg-muted/30 px-4 py-24"
				>
					<div className="mb-16 text-center">
						<h2 className="mb-4 font-bold text-3xl tracking-tight">
							Everything you need to run your business
						</h2>
						<p className="text-lg text-muted-foreground">
							From order management to payments, we've got you covered.
						</p>
					</div>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader>
								<Icons.orders className="mb-4 h-10 w-10 text-green-600" />
								<CardTitle>Order Form</CardTitle>
								<CardDescription>
									Customers place orders independently through WhatsApp.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Icons.layoutDashboard className="mb-4 h-10 w-10 text-blue-600" />
								<CardTitle>Order Management</CardTitle>
								<CardDescription>
									Track status, invoices, and notifications in one place.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Icons.payments className="mb-4 h-10 w-10 text-purple-600" />
								<CardTitle>Local Payments</CardTitle>
								<CardDescription>
									Accept QR payments, cards, and cash on delivery.
								</CardDescription>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<Icons.storefront className="mb-4 h-10 w-10 text-orange-600" />
								<CardTitle>Flexible Store</CardTitle>
								<CardDescription>
									Perfect for ecommerce, bookings, and digital products.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</section>

				{/* Detailed Features */}
				<section className="container mx-auto space-y-32 px-4 py-24">
					<div className="flex flex-col items-center gap-12 md:flex-row">
						<div className="flex-1 space-y-6">
							<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
								WhatsApp First
							</Badge>
							<h2 className="font-bold text-3xl tracking-tight">
								Simplify WhatsApp Ordering
							</h2>
							<p className="text-lg text-muted-foreground">
								Stop the back-and-forth messages. Let customers choose their
								items, payment method, and delivery details through a beautiful
								form. Receive the complete order directly in your WhatsApp.
							</p>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-green-600" />
									<span>Automated order confirmation</span>
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-green-600" />
									<span>Instant notifications</span>
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-green-600" />
									<span>No app download required for customers</span>
								</li>
							</ul>
						</div>
						<div className="flex h-[400px] w-full flex-1 items-center justify-center rounded-2xl bg-muted">
							<div className="text-muted-foreground">Feature Illustration</div>
						</div>
					</div>

					<div className="flex flex-col items-center gap-12 md:flex-row-reverse">
						<div className="flex-1 space-y-6">
							<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
								Management
							</Badge>
							<h2 className="font-bold text-3xl tracking-tight">
								Complete Business Dashboard
							</h2>
							<p className="text-lg text-muted-foreground">
								Manage your inventory, customers, and sales from a powerful
								dashboard. Get insights into your business performance and grow
								faster.
							</p>
							<ul className="space-y-3">
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-blue-600" />
									<span>Real-time analytics</span>
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-blue-600" />
									<span>Customer relationship management (CRM)</span>
								</li>
								<li className="flex items-center gap-2">
									<Icons.check className="h-5 w-5 text-blue-600" />
									<span>Inventory tracking</span>
								</li>
							</ul>
						</div>
						<div className="flex h-[400px] w-full flex-1 items-center justify-center rounded-2xl bg-muted">
							<div className="text-muted-foreground">
								Dashboard Illustration
							</div>
						</div>
					</div>
				</section>

				{/* Pricing */}
				<section id="pricing" className="container mx-auto px-4 py-24">
					<div className="mb-16 text-center">
						<h2 className="mb-4 font-bold text-3xl tracking-tight">
							Simple, Transparent Pricing
						</h2>
						<p className="text-lg text-muted-foreground">
							Start for free, upgrade as you grow.
						</p>
					</div>
					<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
						{/* Basic Plan */}
						<Card className="relative overflow-hidden">
							<CardHeader>
								<CardTitle className="text-xl">Basic</CardTitle>
								<CardDescription>For hobbyists</CardDescription>
								<div className="mt-4">
									<span className="font-bold text-4xl">$0</span>
									<span className="text-muted-foreground">/month</span>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<ul className="space-y-3 text-sm">
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Unlimited
										WhatsApp orders
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> No
										commissions
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Manual
										payments
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Up to 20
										products
									</li>
								</ul>
								<Button className="mt-6 w-full" variant="outline" asChild>
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

						{/* Premium Plan */}
						<Card className="relative overflow-hidden border-primary shadow-lg">
							<div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 text-primary-foreground text-xs">
								Popular
							</div>
							<CardHeader>
								<CardTitle className="text-xl">Premium</CardTitle>
								<CardDescription>For solo entrepreneurs</CardDescription>
								<div className="mt-4">
									<span className="font-bold text-4xl">$14</span>
									<span className="text-muted-foreground">/month</span>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<ul className="space-y-3 text-sm">
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> All Basic
										features
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Unlimited
										products
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Custom
										domain
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Card
										payments
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Analytics &
										SEO
									</li>
								</ul>
								<Button className="mt-6 w-full" asChild>
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
						<Card>
							<CardHeader>
								<CardTitle className="text-xl">Business</CardTitle>
								<CardDescription>For teams</CardDescription>
								<div className="mt-4">
									<span className="font-bold text-4xl">$38</span>
									<span className="text-muted-foreground">/month</span>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<ul className="space-y-3 text-sm">
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> All Premium
										features
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Logo
										removal
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Staff
										accounts
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Wholesale
										pricing
									</li>
									<li className="flex items-center gap-2">
										<Icons.check className="h-4 w-4 text-primary" /> Priority
										support
									</li>
								</ul>
								<Button className="mt-6 w-full" variant="outline" asChild>
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
				</section>

				{/* FAQ */}
				<section id="faq" className="container mx-auto max-w-3xl px-4 py-24">
					<h2 className="mb-12 text-center font-bold text-3xl tracking-tight">
						Frequently Asked Questions
					</h2>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>What is Dukkani?</AccordionTrigger>
							<AccordionContent>
								Dukkani is a WhatsApp-first ecommerce platform that helps you
								create an online store, manage orders, and accept payments, all
								integrated with WhatsApp.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Do I need technical skills?</AccordionTrigger>
							<AccordionContent>
								No! Dukkani is designed to be user-friendly. You can set up your
								store in minutes without any coding knowledge.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Can I use my own domain?</AccordionTrigger>
							<AccordionContent>
								Yes, Premium and Business plans allow you to connect your own
								custom domain name to your store.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>Is there a free plan?</AccordionTrigger>
							<AccordionContent>
								Yes, our Basic plan is completely free and includes unlimited
								WhatsApp orders and up to 20 products.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</section>

				{/* CTA */}
				<section className="bg-primary py-24 text-primary-foreground">
					<div className="container mx-auto px-4 text-center">
						<h2 className="mb-6 font-bold text-3xl tracking-tight">
							Ready to grow your business?
						</h2>
						<p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
							Join thousands of businesses using Dukkani to sell more on
							WhatsApp.
						</p>
						<Button
							size="lg"
							variant="secondary"
							className="h-12 px-8 text-base"
							asChild
						>
							<Link
								href={
									env.NEXT_PUBLIC_DASHBOARD_URL as LinkProps<unknown>["href"]
								}
							>
								Start for free
							</Link>
						</Button>
					</div>
				</section>
			</main>

			<footer className="bg-muted py-12">
				<div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
					<div className="mb-8">
						<span className="mb-2 block font-bold text-foreground text-lg">
							Dukkani
						</span>
						<p>WhatsApp-first Ecommerce Solution</p>
					</div>
					<div className="mb-8 flex justify-center gap-6">
						<Link href="#" className="hover:text-foreground">
							About
						</Link>
						<Link href="#" className="hover:text-foreground">
							Privacy
						</Link>
						<Link href="#" className="hover:text-foreground">
							Terms
						</Link>
						<Link href="#" className="hover:text-foreground">
							Contact
						</Link>
					</div>
					<p>&copy; {new Date().getFullYear()} Dukkani. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
