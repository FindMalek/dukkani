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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "@/utils/navigation";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
	const params = useParams();
	const orderId = params.id as string;

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.orders.index}>
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Order Details</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
							View and edit order information
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Order Information</CardTitle>
						<CardDescription>Order ID: {orderId}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Status
							</label>
							<div className="mt-1">
								<Badge variant="outline">PENDING</Badge>
							</div>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Customer
							</label>
							<p className="mt-1 text-sm">Customer name will appear here</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Phone
							</label>
							<p className="mt-1 text-sm">Customer phone will appear here</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Created
							</label>
							<p className="mt-1 text-sm">Order creation date will appear here</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
						<CardDescription>Items and totals</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Items
							</label>
							<p className="mt-1 text-sm">
								Order items list will appear here
							</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Subtotal
							</label>
							<p className="mt-1 text-sm">$0.00</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Total
							</label>
							<p className="mt-1 text-lg font-bold">$0.00</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Actions</CardTitle>
					<CardDescription>Manage this order</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<Button disabled>Update Status</Button>
					<Button disabled variant="outline">
						Resend WhatsApp
					</Button>
					<Button disabled variant="outline">
						Edit Order
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

