"use client";

import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ProductDescriptionProps {
	description: string | null;
	maxLength?: number;
}

export function ProductDescription({
	description,
	maxLength = 150,
}: ProductDescriptionProps) {
	const t = useTranslations("storefront.store.product.description");
	const [isExpanded, setIsExpanded] = useState(false);

	if (!description) {
		return null;
	}

	const shouldTruncate = description.length > maxLength;
	const displayText =
		isExpanded || !shouldTruncate
			? description
			: `${description.slice(0, maxLength)}...`;

	return (
		<div className="space-y-2">
			<h3 className="font-medium text-muted-foreground text-sm">
				{t("label", { defaultValue: "Description" })}
			</h3>
			<p className="text-muted-foreground text-sm leading-relaxed">
				{displayText}
			</p>
			{shouldTruncate && (
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsExpanded(!isExpanded)}
					className="h-auto p-0 text-foreground underline"
				>
					{isExpanded ? t("readLess") : t("readMore")}
				</Button>
			)}
		</div>
	);
}
