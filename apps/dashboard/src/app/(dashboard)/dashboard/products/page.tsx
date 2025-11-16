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
import { useProducts } from "@/hooks/api/use-products";
import { formatCurrency } from "@dukkani/common/utils";

export default function ProductsPage() {
	const { data, isLoading, error } = useProducts({ page: 1, limit: 50 });

	if (error) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<div className="mb-6">
					<h1 className="text-2xl font-bold md:text-3xl">Products</h1>
					<p className="text-muted-foreground mt-2 text-sm md:text-base">
						Manage your products
					</p>
				</div>
				<Card>
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">
							Error loading products. Please try again later.
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold md:text-3xl">Products</h1>
				<p className="text-muted-foreground mt-2 text-sm md:text-base">
					Manage your products
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Products</CardTitle>
					<CardDescription>
						{data
							? `Your product catalog (${data.total} total)`
							: "Your product catalog"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="space-y-2">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="flex items-center gap-4">
									<Skeleton className="h-12 flex-1" />
									<Skeleton className="h-12 w-24" />
									<Skeleton className="h-12 w-24" />
									<Skeleton className="h-12 w-20" />
								</div>
							))}
						</div>
					) : data && data.products.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Created</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.products.map((product) => (
									<TableRow key={product.id}>
										<TableCell className="font-medium">
											{product.name}
											{product.description && (
												<p className="text-muted-foreground text-xs mt-1">
													{product.description}
												</p>
											)}
										</TableCell>
										<TableCell>{formatCurrency(product.price)}</TableCell>
										<TableCell>
											<span
												className={
													product.stock === 0
														? "text-destructive font-medium"
														: product.stock <= 10
															? "text-warning font-medium"
															: ""
												}
											>
												{product.stock}
											</span>
										</TableCell>
										<TableCell>
											<Badge
												variant={product.published ? "default" : "secondary"}
											>
												{product.published ? "Published" : "Draft"}
											</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground text-sm">
											{new Date(product.createdAt).toLocaleDateString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<p className="text-muted-foreground text-sm">
							No products found. Create your first product to get started.
						</p>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
