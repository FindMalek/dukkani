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
import { routes } from "@/lib/routes";
import { useParams } from "next/navigation";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@dukkani/ui/components/table";

export default function CustomerDetailPage() {
	const params = useParams();
	const customerId = params.id as string;

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.customers.index}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Customer Details</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
							View and edit customer information
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
						<CardDescription>Customer ID: {customerId}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Name
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
								Email
							</label>
							<p className="mt-1 text-sm">Customer email will appear here</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Notes
							</label>
							<p className="mt-1 text-sm">Customer notes will appear here</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Customer Statistics</CardTitle>
						<CardDescription>Order history and totals</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Total Orders
							</label>
							<p className="mt-1 text-2xl font-bold">0</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Total Spent
							</label>
							<p className="mt-1 text-2xl font-bold">$0.00</p>
						</div>
						<div>
							<label className="text-sm font-medium text-muted-foreground">
								Last Order
							</label>
							<p className="mt-1 text-sm">No orders yet</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Order History</CardTitle>
					<CardDescription>All orders placed by this customer</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell colSpan={4} className="text-center py-8">
									<p className="text-muted-foreground text-sm">
										No orders found for this customer
									</p>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Actions</CardTitle>
					<CardDescription>Manage this customer</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<Button disabled>Edit Customer</Button>
					<Button disabled variant="outline">
						Send Message
					</Button>
					<Button disabled variant="outline">
						Create Order
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
