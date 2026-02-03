"use client";

import type {
	VariantOptionOutput,
	VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { VariantSelector } from "@/components/shared/variant-selector";
import { useProductVariantSelection } from "@/hooks/use-product-variant-selection";
import { AddToCartFooter } from "./add-to-cart-footer";

interface ProductVariantManagerProps {
	productId: string;
	productStock: number;
	productPrice: number;
	hasVariants: boolean;
	variantOptions?: VariantOptionOutput[];
	variants?: VariantOutput[];
	variant?: "fixed" | "inline";
	onAddToCart?: () => void;
}

export function ProductVariantManager({
	productId,
	productStock,
	productPrice,
	hasVariants,
	variantOptions,
	variants,
	variant = "fixed",
	onAddToCart,
}: ProductVariantManagerProps) {
	const { selectedVariantId, setSelectedVariantId, stock, price } =
		useProductVariantSelection({
			hasVariants,
			variants,
			productStock,
			productPrice,
		});

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
				variant={variant}
				onAddToCart={onAddToCart}
			/>
		</>
	);
}
