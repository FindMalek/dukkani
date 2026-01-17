"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";
import { FormControl, FormField } from "@dukkani/ui/components/form";
import { Textarea } from "@dukkani/ui/components/textarea";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

interface ProductDescriptionSectionProps {
	form: UseFormReturn<CreateProductInput>;
}

export function ProductDescriptionSection({
	form,
}: ProductDescriptionSectionProps) {
	const t = useTranslations("products.create");

	return (
		<Accordion type="single" collapsible>
			<AccordionItem
				value="description"
				className="rounded-xl border bg-muted-foreground/5 shadow-none"
			>
				<AccordionTrigger className="px-4 font-bold text-sm">
					{t("form.description.label")} ({t("form.optional")})
				</AccordionTrigger>
				<AccordionContent className="px-2">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormControl>
								<Textarea className="min-h-[100px]" {...field} />
							</FormControl>
						)}
					/>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
