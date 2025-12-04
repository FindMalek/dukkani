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
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id as string;

	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="mb-4 flex items-center gap-4">
					<Link href={RoutePaths.PRODUCTS.INDEX.url}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="font-bold text-2xl md:text-3xl">Product Details</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							View and edit product information
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Product Information</CardTitle>
						<CardDescription>Product ID: {productId}</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Name
							</label>
							<p className="mt-1 text-sm">Product name will appear here</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Description
							</label>
							<p className="mt-1 text-sm">
								Product description will appear here
							</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Price
							</label>
							<p className="mt-1 text-sm">$0.00</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Stock
							</label>
							<p className="mt-1 text-sm">0 units</p>
						</div>
						<div>
							<label className="font-medium text-muted-foreground text-sm">
								Status
							</label>
							<div className="mt-1">
								<Badge variant="secondary">Draft</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Product Preview</CardTitle>
						<CardDescription>
							How customers will see this product
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex aspect-square items-center justify-center rounded-lg bg-muted">
							<p className="text-muted-foreground text-sm">
								Product images will appear here
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Actions</CardTitle>
					<CardDescription>Manage this product</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-wrap gap-4">
					<Button disabled>Edit Product</Button>
					<Button disabled variant="outline">
						Duplicate Product
					</Button>
					<Button disabled variant="destructive">
						Delete Product
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
