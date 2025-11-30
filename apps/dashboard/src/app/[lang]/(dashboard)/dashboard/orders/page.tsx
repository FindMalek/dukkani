"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@dukkani/ui/components/table";
import { Badge } from "@dukkani/ui/components/badge";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useOrders } from "@/hooks/api/use-orders";

const statusColors: Record<
	string,
	"default" | "secondary" | "destructive" | "outline"
> = {
	PENDING: "outline",
	CONFIRMED: "default",
	PROCESSING: "default",
	SHIPPED: "secondary",
	DELIVERED: "secondary",
	CANCELLED: "destructive",
};

export default function OrdersPage() {
	const { data, isLoading, error } = useOrders({ page: 1, limit: 50 });

	if (error) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<div className="mb-6">
					<h1 className="font-bold text-2xl md:text-3xl">Orders</h1>
					<p className="mt-2 text-muted-foreground text-sm md:text-base">
						View and manage orders
					</p>
				</div>
				<Card>
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">
							Error loading orders. Please try again later.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="font-bold text-2xl md:text-3xl">Orders</h1>
				<p className="mt-2 text-muted-foreground text-sm md:text-base">
					View and manage orders
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Orders</CardTitle>
					<CardDescription>
						{data
							? `Order management (${data.total} total)`
							: "Order management"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="space-y-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="flex items-center gap-4">
									<Skeleton className="h-12 flex-1" />
									<Skeleton className="h-12 w-32" />
									<Skeleton className="h-12 w-24" />
									<Skeleton className="h-12 w-20" />
								</div>
							))}
						</div>
					) : data && data.orders.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order ID</TableHead>
									<TableHead>Customer</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Created</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.orders.map((order) => (
									<TableRow key={order.id}>
										<TableCell className="font-medium font-mono text-sm">
											{order.id}
										</TableCell>
										<TableCell>{order.customerName}</TableCell>
										<TableCell className="text-muted-foreground">
											{order.customerPhone}
										</TableCell>
										<TableCell>
											<Badge variant={statusColors[order.status] ?? "default"}>
												{order.status}
											</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground text-sm">
											{new Date(order.createdAt).toLocaleDateString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<p className="text-muted-foreground text-sm">
							No orders found. Orders will appear here once customers start
							placing them.
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
