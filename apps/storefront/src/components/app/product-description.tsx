import { getT } from "next-i18next/server";

interface ProductDescriptionProps {
  description: string | null;
}

export async function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const { t } = await getT("pages", { keyPrefix: "store.product.description" });

  if (!description) {
    return null;
  }
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
