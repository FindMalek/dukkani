"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { Badge } from "@dukkani/ui/components/badge";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function PaymentSettingsPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={RoutePaths.SETTINGS.INDEX.url}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Payment Settings</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
							Configure payment methods for your store
						</p>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Payment Methods</CardTitle>
					<CardDescription>
						Enable payment methods for your customers (MVP: Cash on Delivery
						only)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 border rounded-lg">
							<div className="flex items-center gap-4">
								<div>
									<h3 className="font-medium">Cash on Delivery</h3>
									<p className="text-sm text-muted-foreground">
										Customers pay when they receive their order
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Badge variant="default">Enabled</Badge>
								<Button variant="outline" size="sm" disabled>
									Configure
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
							<div className="flex items-center gap-4">
								<div>
									<h3 className="font-medium">Credit/Debit Card</h3>
									<p className="text-sm text-muted-foreground">
										Online payment processing (Coming soon)
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Badge variant="secondary">Coming Soon</Badge>
								<Button variant="outline" size="sm" disabled>
									Configure
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
							<div className="flex items-center gap-4">
								<div>
									<h3 className="font-medium">Mobile Money</h3>
									<p className="text-sm text-muted-foreground">
										Mobile payment integration (Coming soon)
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Badge variant="secondary">Coming Soon</Badge>
								<Button variant="outline" size="sm" disabled>
									Configure
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Payment Instructions</CardTitle>
					<CardDescription>
						Customize the payment instructions shown to customers
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">
								Cash on Delivery Instructions
							</label>
							<p className="text-muted-foreground text-sm">
								Custom message for cash on delivery orders
							</p>
						</div>
						<Button disabled>Save Settings</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
