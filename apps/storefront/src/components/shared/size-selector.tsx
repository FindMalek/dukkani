"use client";

import type {
	VariantOptionOutput,
	VariantOutput,
} from "@dukkani/common/schemas/variant/output";
import { Button } from "@dukkani/ui/components/button";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";

interface SizeSelectorProps {
	variantOptions?: VariantOptionOutput[];
	variants?: VariantOutput[];
	selectedVariantId?: string;
	onVariantSelect?: (variantId: string) => void;
}

export function SizeSelector({
	variantOptions,
	variants,
	selectedVariantId,
	onVariantSelect,
}: SizeSelectorProps) {
	const t = useTranslations("storefront.store.product.sizeSelector");

	if (!variantOptions || variantOptions.length === 0 || !variants) {
		return null;
	}

	// Find the "Size" option (case-insensitive)
	const sizeOption = variantOptions.find(
		(opt) => opt.name.toLowerCase() === "size",
	);

	if (!sizeOption) {
		return null;
	}

	// Group variants by size value
	const variantsBySize = new Map<string, VariantOutput>();

	variants.forEach((variant) => {
		const sizeSelection = variant.selections.find(
			(sel) => sel.optionId === sizeOption.id,
		);
		if (sizeSelection) {
			variantsBySize.set(sizeSelection.value.value, variant);
		}
	});

	return (
		<div className="space-y-2">
			<h3 className="font-medium text-muted-foreground text-sm">
				{t("label", { defaultValue: "Size" })}
			</h3>
			<div className="flex flex-wrap gap-2">
				{sizeOption.values.map((value) => {
					const variant = variantsBySize.get(value.value);
					const isSelected = variant?.id === selectedVariantId;
					const isOutOfStock = variant ? variant.stock === 0 : false;

					return (
						<Button
							key={value.id}
							variant={isSelected ? "default" : "outline"}
							size="sm"
							disabled={isOutOfStock}
							onClick={() => variant && onVariantSelect?.(variant.id)}
							className={cn(
								"rounded-lg",
								isSelected && "bg-primary text-primary-foreground",
								isOutOfStock && "cursor-not-allowed opacity-50",
							)}
						>
							{value.value}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
