import type { ProductPublicOutput } from "@dukkani/common/schemas/product/output";
import { getTranslations } from "next-intl/server";
import { ProductCard } from "./product-card";

interface ProductGridProps {
	products: ProductPublicOutput[];
	onAddToCart?: (productId: string) => void;
}

export async function ProductGrid({ products, onAddToCart }: ProductGridProps) {
	const t = await getTranslations("storefront.store.products");

	if (products.length === 0) {
		return (
			<div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
				{t("empty")}
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 pb-8">
			<div className="grid grid-cols-2 gap-4">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={onAddToCart}
					/>
				))}
			</div>
		</div>
	);
}
