"use client";

import type {
	VariantOptionOutput,
	VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { useEffect, useState } from "react";
import { VariantSelector } from "@/components/shared/variant-selector";
import { AddToCartFooter } from "./add-to-cart-footer";

interface ProductVariantManagerProps {
	productId: string;
	productStock: number;
	productPrice: number;
	hasVariants: boolean;
	variantOptions?: VariantOptionOutput[];
	variants?: VariantOutput[];
}

export function ProductVariantManager({
	productId,
	productStock,
	productPrice,
	hasVariants,
	variantOptions,
	variants,
}: ProductVariantManagerProps) {
	const [selectedVariantId, setSelectedVariantId] = useState<
		string | undefined
	>();

	// Auto-select first available variant when product has variants
	useEffect(() => {
		if (hasVariants && variants && variants.length > 0) {
			// Find first variant with stock > 0, or just first variant if all are out of stock
			const firstAvailable = variants.find((v) => v.stock > 0) || variants[0];
			if (firstAvailable) {
				setSelectedVariantId(firstAvailable.id);
			}
		}
	}, [hasVariants, variants]);

	// Get selected variant data
	const selectedVariant = variants?.find((v) => v.id === selectedVariantId);

	// Determine stock and price to use
	// For products with variants: use variant stock/price, or 0 if no variant selected yet
	// For products without variants: use product stock/price
	const stock = hasVariants ? (selectedVariant?.stock ?? 0) : productStock;
	const price = hasVariants
		? (selectedVariant?.price ?? productPrice)
		: productPrice;

	return (
		<>
			<VariantSelector
				variantOptions={variantOptions}
				variants={variants}
				selectedVariantId={selectedVariantId}
				onVariantSelect={setSelectedVariantId}
			/>
			<AddToCartFooter
				productId={productId}
				stock={stock}
				price={price}
				selectedVariantId={selectedVariantId}
			/>
		</>
	);
}
