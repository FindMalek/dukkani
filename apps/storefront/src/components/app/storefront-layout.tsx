"use client";

import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { useMemo, useState } from "react";
import { CategoryFilter } from "./category-filter";
import { HeroBanner } from "./hero-banner";
import { ProductGrid } from "./product-grid";
import { ProductSectionHeader } from "./product-section-header";
import { StoreHeader } from "./store-header";

interface StorefrontLayoutProps {
	store: StorePublicOutput;
}

export function StorefrontLayout({ store }: StorefrontLayoutProps) {
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
		null,
	);
	const [cartCount, setCartCount] = useState(0);

	// Extract unique categories from products
	const categories = useMemo(() => {
		if (!store.products) return [];
		const categoryMap = new Map<string, { id: string; name: string }>();

		store.products.forEach((product) => {
			// Note: ProductPublicOutput doesn't include category, so we'd need to
			// either modify the query or fetch categories separately
			// For now, we'll create a placeholder that can be enhanced
		});

		// Since we don't have category in ProductPublicOutput, we'll need to
		// either: 1) Modify the store query to include category, or
		// 2) Create a separate API call for categories
		// For now, returning empty array - you'll need to add category support
		return Array.from(categoryMap.values());
	}, [store.products]);

	// Filter products by category
	const filteredProducts = useMemo(() => {
		if (!store.products) return [];
		if (selectedCategoryId === null) return store.products;

		// Filter by category when category data is available
		// For now, return all products since category isn't in ProductPublicOutput
		return store.products;
	}, [store.products, selectedCategoryId]);

	const handleAddToCart = (productId: string) => {
		// TODO: Implement cart logic
		setCartCount((prev) => prev + 1);
	};

	return (
		<div className="min-h-screen bg-background">
			<StoreHeader storeName={store.name} cartCount={cartCount} />
			<HeroBanner
				title="New Spring Collection"
				subtitle="Shop the look →"
				linkHref="#"
			/>
			{categories.length > 0 && (
				<CategoryFilter
					categories={categories}
					selectedCategoryId={selectedCategoryId}
					onCategoryChange={setSelectedCategoryId}
				/>
			)}
			<ProductSectionHeader />
			<ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
		</div>
	);
}
