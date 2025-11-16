"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { useDashboardStats } from "@/hooks/api/use-dashboard-stats";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { formatCurrency } from "@dukkani/common/utils";

export default function DashboardPage() {
	const { data: stats, isLoading, error } = useDashboardStats();

	if (error) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold md:text-3xl">Dashboard Overview</h1>
					<p className="text-muted-foreground mt-2 text-sm md:text-base">
						Welcome to your dashboard
					</p>
				</div>
				<Card>
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">
							Error loading dashboard stats. Please try again later.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold md:text-3xl">Dashboard Overview</h1>
				<p className="text-muted-foreground mt-2 text-sm md:text-base">
					Welcome to your dashboard
				</p>
			</div>

			{isLoading ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-4 w-24" />
								<Skeleton className="mt-2 h-3 w-32" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-20" />
							</CardContent>
						</Card>
					))}
				</div>
			) : stats ? (
				<>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Products
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stats.totalProducts}</div>
								<p className="text-muted-foreground text-xs">
									Products in your stores
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Orders
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stats.totalOrders}</div>
								<p className="text-muted-foreground text-xs">All time orders</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Revenue
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{formatCurrency(stats.totalRevenue)}
								</div>
								<p className="text-muted-foreground text-xs">
									From delivered orders
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">Low Stock</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.lowStockProducts.length}
								</div>
								<p className="text-muted-foreground text-xs">
									Products needing restock
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Recent Orders</CardTitle>
								<CardDescription>Latest 10 orders</CardDescription>
							</CardHeader>
							<CardContent>
								{stats.recentOrders.length === 0 ? (
									<p className="text-muted-foreground text-sm">
										No recent orders
									</p>
								) : (
									<div className="space-y-2">
										{stats.recentOrders.slice(0, 5).map((order) => (
											<div
												key={order.id}
												className="flex items-center justify-between border-b pb-2 last:border-0"
											>
												<div>
													<p className="text-sm font-medium">
														{order.customerName}
													</p>
													<p className="text-muted-foreground text-xs">
														{order.id}
													</p>
												</div>
												<div className="text-right">
													<p className="text-sm font-medium">{order.status}</p>
													<p className="text-muted-foreground text-xs">
														{new Date(order.createdAt).toLocaleDateString()}
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Low Stock Products</CardTitle>
								<CardDescription>Products with stock ≤ 10</CardDescription>
							</CardHeader>
							<CardContent>
								{stats.lowStockProducts.length === 0 ? (
									<p className="text-muted-foreground text-sm">
										All products are well stocked
									</p>
								) : (
									<div className="space-y-2">
										{stats.lowStockProducts.slice(0, 5).map((product) => (
											<div
												key={product.id}
												className="flex items-center justify-between border-b pb-2 last:border-0"
											>
												<div>
													<p className="text-sm font-medium">{product.name}</p>
													<p className="text-muted-foreground text-xs">
														{formatCurrency(product.price)}
													</p>
												</div>
												<div className="text-right">
													<p
														className={`text-sm font-medium ${product.stock === 0 ? "text-destructive" : "text-warning"}`}
													>
														{product.stock} left
													</p>
												</div>
											</div>
										))}
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</>
			) : null}
		</div>
	);
}
