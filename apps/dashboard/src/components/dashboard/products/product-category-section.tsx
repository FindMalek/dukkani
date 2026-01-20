"use client";

import type { createProductInputSchema } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@dukkani/ui/components/command";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@dukkani/ui/components/popover";
import type { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CategoryDrawer } from "@/components/dashboard/products/category-drawer";
import { useCategoriesQuery } from "@/hooks/api/use-categories";

interface ProductCategorySectionProps {
	form: ReturnType<typeof useSchemaForm<typeof createProductInputSchema>>;
	storeId: string;
}
export function ProductCategorySection({
	form,
	storeId,
}: ProductCategorySectionProps) {
	const t = useTranslations("products.create");
	const { data: categories, isLoading: isLoadingCategories } =
		useCategoriesQuery({
			storeId,
		});
	const [open, setOpen] = useState(false);

	return (
		<Card className="bg-muted-foreground/5 py-2 shadow-none">
			<CardContent className="space-y-4 px-4">
				<h3 className="font-bold">{t("sections.organization")}</h3>

				<div className="space-y-1.5">
					<form.Field name="categoryId">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;

							const selectedCategory = categories?.find(
								(cat) => cat.id === field.state.value,
							);

							return (
								<Field data-invalid={isInvalid}>
									<FieldLabel className="font-semibold text-xs">
										{t("form.category.label")}
									</FieldLabel>
									<Popover open={open} onOpenChange={setOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												role="combobox"
												aria-expanded={open}
												aria-invalid={isInvalid}
												className="w-full justify-between"
												disabled={isLoadingCategories}
												type="button"
											>
												{selectedCategory
													? selectedCategory.name
													: t("form.category.placeholder")}
												<Icons.chevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0" align="start">
											<Command>
												<CommandInput
													placeholder={t("form.category.searchPlaceholder")}
												/>
												<CommandList className="max-h-[300px]">
													<CommandEmpty>
														{t("form.category.noResults")}
													</CommandEmpty>
													<CommandGroup>
														<CommandItem
															value="none"
															onSelect={() => {
																field.handleChange(undefined);
																setOpen(false);
															}}
														>
															<Icons.check
																className={cn(
																	"mr-2 h-4 w-4",
																	!field.state.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
															{t("form.category.uncategorized")}
														</CommandItem>
														{categories?.map((category) => (
															<CommandItem
																key={category.id}
																value={category.name}
																onSelect={() => {
																	field.handleChange(category.id);
																	setOpen(false);
																}}
															>
																<Icons.check
																	className={cn(
																		"mr-2 h-4 w-4",
																		field.state.value === category.id
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
																{category.name}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</form.Field>
					<CategoryDrawer
						onCategoryCreated={(categoryId) => {
							form.setFieldValue("categoryId", categoryId);
						}}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
