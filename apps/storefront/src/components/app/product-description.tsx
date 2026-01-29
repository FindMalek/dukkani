import { useTranslations } from "next-intl";

interface ProductDescriptionProps {
	description: string | null;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
	const t = useTranslations("storefront.store.product.description");

	if (!description) return null;

	return (
		<div className="space-y-2">
			<h3 className="font-medium text-muted-foreground text-sm">
				{t("label")}
			</h3>
			<p className="text-muted-foreground text-sm leading-relaxed">
				{description}
			</p>
		</div>
	);
}
