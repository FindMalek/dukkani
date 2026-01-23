"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { AspectRatio } from "@dukkani/ui/components/aspect-ratio";
import { Button } from "@dukkani/ui/components/button";
import { Card } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
	product: ProductPublicOutput;
	onAddToCart?: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
	const imageUrl = product.imagesUrls?.[0];
	const price = product.price.toFixed(2);

	return (
		<Card className="group relative overflow-hidden border-0 shadow-sm">
			<Link href={`/products/${product.id}`} className="block">
				<div className="relative">
					<AspectRatio ratio={1}>
						{imageUrl ? (
							<Image
								src={imageUrl}
								alt={product.name}
								fill
								className="object-cover transition-transform group-hover:scale-105"
							/>
						) : (
							<div className="h-full w-full bg-muted" />
						)}
					</AspectRatio>
					<Button
						variant="default"
						size="icon"
						className="absolute right-2 bottom-2 size-10 rounded-full"
						onClick={(e) => {
							e.preventDefault();
							onAddToCart?.(product.id);
						}}
					>
						<Icons.plus className="size-4" />
					</Button>
				</div>
				<div className="p-4">
					<h3 className="mb-1 font-semibold">{product.name}</h3>
					<p className="text-muted-foreground text-sm">{price} TND</p>
				</div>
			</Link>
		</Card>
	);
}
