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

export default function NewProductPage() {
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
						<h1 className="font-bold text-2xl md:text-3xl">
							Create New Product
						</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							Add a new product to your catalog
						</p>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Product Form</CardTitle>
					<CardDescription>
						Fill in the details to create a new product
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="space-y-2">
							<label className="font-medium text-sm">Product Name</label>
							<p className="text-muted-foreground text-sm">
								Enter the name of the product
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Price</label>
							<p className="text-muted-foreground text-sm">
								Set the product price
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Description</label>
							<p className="text-muted-foreground text-sm">
								Add a description for the product
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Images</label>
							<p className="text-muted-foreground text-sm">
								Upload product images
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Stock</label>
							<p className="text-muted-foreground text-sm">
								Set the initial stock quantity
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Create Product</Button>
							<Link href={RoutePaths.PRODUCTS.INDEX.url}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
