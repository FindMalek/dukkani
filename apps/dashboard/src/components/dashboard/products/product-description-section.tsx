"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";
import { Field, FieldError } from "@dukkani/ui/components/field";
import { Textarea } from "@dukkani/ui/components/textarea";
import type { UseFormApi } from "@tanstack/react-form";
import { useTranslations } from "next-intl";

interface ProductDescriptionSectionProps {
	form: UseFormApi<CreateProductInput, unknown>;
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
					<form.Field name="description">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<Textarea
										id={field.name}
										name={field.name}
										className="min-h-[100px]"
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
