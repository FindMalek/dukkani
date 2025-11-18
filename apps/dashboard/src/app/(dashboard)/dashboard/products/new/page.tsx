"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "@/utils/navigation";

export default function NewProductPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.products.index}>
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Create New Product</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
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
							<label className="text-sm font-medium">Product Name</label>
							<p className="text-muted-foreground text-sm">
								Enter the name of the product
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Price</label>
							<p className="text-muted-foreground text-sm">
								Set the product price
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Description</label>
							<p className="text-muted-foreground text-sm">
								Add a description for the product
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Images</label>
							<p className="text-muted-foreground text-sm">
								Upload product images
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Stock</label>
							<p className="text-muted-foreground text-sm">
								Set the initial stock quantity
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Create Product</Button>
							<Link href={routes.dashboard.products.index}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

