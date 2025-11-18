"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { routes } from "@/utils/navigation";

export default function NewOrderPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.orders.index}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Create New Order</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
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
							<label className="text-sm font-medium">Customer</label>
							<p className="text-muted-foreground text-sm">
								Select or search for a customer
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Order Items</label>
							<p className="text-muted-foreground text-sm">
								Add products to the order with quantities
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Notes</label>
							<p className="text-muted-foreground text-sm">
								Add any special instructions or notes for this order
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Create Order</Button>
							<Link href={routes.dashboard.orders.index}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
