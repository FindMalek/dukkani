"use client";

import type { Locale } from "@dukkani/common/schemas/constants";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@dukkani/ui/components/popover";
import { useTranslations } from "next-intl";
import { StoreSelectorForm } from "./store-selector";

interface StoreSelectorBubbleProps {
	locale: Locale;
}

export function StoreSelectorBubble({ locale }: StoreSelectorBubbleProps) {
	const t = useTranslations("storefront.storeSelector");

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="secondary"
					size="icon"
					className="fixed end-4 bottom-4 z-50 size-12 rounded-full shadow-lg"
					aria-label={t("heading")}
				>
					<Icons.storefront className="size-5" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="end" side="top" className="w-80">
				<StoreSelectorForm locale={locale} compact />
			</PopoverContent>
		</Popover>
	);
}
