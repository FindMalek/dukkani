"use client";

import { Button } from "@dukkani/ui/components/button";
import { useTranslations } from "next-intl";

interface ProductFormActionsProps {
	onSubmit: (published: boolean) => void;
	isPending: boolean;
}

export function ProductFormActions({
	onSubmit,
	isPending,
}: ProductFormActionsProps) {
	const t = useTranslations("products.create");

	return (
		<div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background p-4">
			<div className="container flex max-w-lg gap-4">
				<Button
					variant="secondary"
					className="flex-1"
					isLoading={isPending}
					disabled={isPending}
					onClick={() => onSubmit(false)}
				>
					{t("form.saveDraft")}
				</Button>
				<Button
					className="flex-1"
					isLoading={isPending}
					disabled={isPending}
					onClick={() => onSubmit(true)}
				>
					{t("form.savePublish")}
				</Button>
			</div>
		</div>
	);
}
