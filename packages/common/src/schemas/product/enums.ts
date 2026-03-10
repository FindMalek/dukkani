import type { StockFilter, VariantsFilter } from "./input";

export type PublishedFilter = boolean | null;

export const PUBLISHED_FILTER_OPTIONS = [
	{ value: null as PublishedFilter, labelKey: "all" as const },
	{ value: true as PublishedFilter, labelKey: "published" as const },
	{ value: false as PublishedFilter, labelKey: "draft" as const },
] as const;

export const STOCK_FILTER_OPTIONS = [
	{ value: "all" as const, labelKey: "allInventory" as const },
	{ value: "in-stock" as const, labelKey: "inStock" as const },
	{ value: "low-stock" as const, labelKey: "lowStock" as const },
	{ value: "out-of-stock" as const, labelKey: "outOfStock" as const },
] satisfies {
	value: NonNullable<StockFilter>;
	labelKey: "allInventory" | "inStock" | "lowStock" | "outOfStock";
}[];

export const VARIANTS_FILTER_OPTIONS = [
	{ value: "all" as const, labelKey: "allProducts" as const },
	{ value: "with-variants" as const, labelKey: "withVariants" as const },
	{ value: "single-sku" as const, labelKey: "singleSku" as const },
] satisfies {
	value: NonNullable<VariantsFilter>;
	labelKey: "allProducts" | "withVariants" | "singleSku";
}[];
