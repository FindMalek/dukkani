import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { getTranslations } from "next-intl/server";
import { CategoryFilter } from "./category-filter";
import { HeroBanner } from "./hero-banner";
import { ProductGrid } from "./product-grid";
import { ProductSectionHeader } from "./product-section-header";
import { StoreHeader } from "./store-header";

interface StorefrontLayoutProps {
	store: StorePublicOutput;
}

export async function StorefrontLayout({ store }: StorefrontLayoutProps) {
	const t = await getTranslations("storefront.store");

	const categories: Array<{ id: string | null; name: string }> = [];

	const products = store.products || [];

	return (
		<div className="min-h-screen bg-background">
			<StoreHeader storeName={store.name} cartCount={0} />
			{categories.length > 0 && (
				<CategoryFilter
					categories={categories}
					selectedCategoryId={selectedCategoryId}
					onCategoryChange={setSelectedCategoryId}
				/>
			)}
			<ProductGrid products={products} onAddToCart={handleAddToCart} />
			<HeroBanner
				title="New Spring Collection"
				subtitle="Shop the look →"
				linkHref="#"
			/>
			<ProductSectionHeader title={t("products.title")} />
		</div>
	);
}
