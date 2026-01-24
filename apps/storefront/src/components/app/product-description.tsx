import { getTranslations } from "next-intl/server";

interface ProductDescriptionProps {
	description: string | null;
}

export async function ProductDescription({
	description,
}: ProductDescriptionProps) {
	const t = await getTranslations("storefront.store.product.description");

	if (!description) {
		return null;
	}
	return (
		<div className="space-y-2">
			<h3 className="font-medium text-muted-foreground text-sm">
				{t("label", { defaultValue: "Description" })}
			</h3>
			<p className="text-muted-foreground text-sm leading-relaxed">
				{description}
			</p>
		</div>
	);
}
