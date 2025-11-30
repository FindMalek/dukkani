"use client";

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
import Link from "next/link";
import { useParams } from "next/navigation";
import { RoutePaths } from "@/lib/routes";

export default function OrderDetailPage() {
	const params = useParams();
	const orderId = params.id as string;

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
						<h1 className="font-bold text-2xl md:text-3xl">Order Details</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
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
							<label className="font-medium text-muted-foreground text-sm">
								Status
							</label>
							<div className="mt-1">
								<Badge variant="outline">PENDING</Badge>
							</div>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Customer
							</label>
							<p className="mt-1 text-sm">Customer name will appear here</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Phone
							</label>
							<p className="mt-1 text-sm">Customer phone will appear here</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Created
							</label>
							<p className="mt-1 text-sm">
								Order creation date will appear here
							</p>
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
							<label className="font-medium text-muted-foreground text-sm">
								Items
							</label>
							<p className="mt-1 text-sm">Order items list will appear here</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Subtotal
							</label>
							<p className="mt-1 text-sm">$0.00</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Total
							</label>
							<p className="mt-1 font-bold text-lg">$0.00</p>
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
