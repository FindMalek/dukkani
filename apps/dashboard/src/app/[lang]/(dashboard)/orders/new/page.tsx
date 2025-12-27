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
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function NewOrderPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="mb-4 flex items-center gap-4">
					<Link href={RoutePaths.ORDERS.INDEX.url}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="font-bold text-2xl md:text-3xl">Create New Order</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							Manually create an order for a customer
						</p>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Order Form</CardTitle>
					<CardDescription>
						Fill in the details to create a new order manually
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="space-y-2">
							<label className="font-medium text-sm">Customer</label>
							<p className="text-muted-foreground text-sm">
								Select or search for a customer
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Order Items</label>
							<p className="text-muted-foreground text-sm">
								Add products to the order with quantities
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Notes</label>
							<p className="text-muted-foreground text-sm">
								Add any special instructions or notes for this order
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Create Order</Button>
							<Link href={RoutePaths.ORDERS.INDEX.url}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
