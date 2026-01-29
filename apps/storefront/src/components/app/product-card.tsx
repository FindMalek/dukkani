"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
	product: ProductPublicOutput;
	onAddToCart?: (product: ProductPublicOutput) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
	const imageUrl = product.imagesUrls?.[0];
	const price = product.price.toFixed(2);

	return (
		<div className="group">
			<Link href={`/products/${product.id}`} className="block">
				<div className="relative overflow-hidden rounded-lg">
					<AspectRatio ratio={3 / 4}>
						{imageUrl ? (
							<Image
								src={imageUrl}
								alt={product.name}
								fill
								className="object-cover transition-transform group-hover:scale-105"
							/>
						) : (
							<Skeleton className="h-full w-full" />
						)}
					</AspectRatio>
					<Button
						variant="secondary"
						size="icon"
						className="absolute right-2 bottom-2 size-10 rounded-full"
						onClick={(e) => {
							e.preventDefault();
							onAddToCart?.(product);
						}}
					>
						<Icons.plus className="size-5 text-primary" />
					</Button>
				</div>
				<div className="mt-2">
					<h3 className="mb-1 font-bold text-foreground">{product.name}</h3>
					<p className="text-muted-foreground text-sm">{price} TND</p>
				</div>
			</Link>
		</div>
	);
}
