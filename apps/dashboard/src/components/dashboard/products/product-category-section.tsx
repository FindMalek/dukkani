"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
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
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@dukkani/ui/components/popover";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { CategoryDrawer } from "@/components/dashboard/products/category-drawer";
import { useCategoriesQuery } from "@/hooks/api/use-categories";

interface ProductCategorySectionProps {
	form: UseFormReturn<CreateProductInput>;
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

	return (
		<Card className="bg-muted-foreground/5 py-2 shadow-none">
			<CardContent className="space-y-4 px-4">
				<h3 className="font-bold">{t("sections.organization")}</h3>

				<div className="space-y-1.5">
					<FormLabel className="font-semibold text-xs">
						{t("form.category.label")}
					</FormLabel>
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => {
							const [open, setOpen] = useState(false);

							// Compute selected category inside render function so it's reactive
							const selectedCategory = categories?.find(
								(cat) => cat.id === field.value,
							);

							return (
								<FormItem>
									<FormControl>
										<Popover open={open} onOpenChange={setOpen}>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													role="combobox"
													aria-expanded={open}
													className="w-full justify-between"
													disabled={isLoadingCategories}
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
																	field.onChange(undefined);
																	setOpen(false);
																}}
															>
																<Icons.check
																	className={cn(
																		"mr-2 h-4 w-4",
																		!field.value ? "opacity-100" : "opacity-0",
																	)}
																/>
																{t("form.category.uncategorized")}
															</CommandItem>
															{categories?.map((category) => (
																<CommandItem
																	key={category.id}
																	value={category.name}
																	onSelect={() => {
																		field.onChange(category.id);
																		setOpen(false);
																	}}
																>
																	<Icons.check
																		className={cn(
																			"mr-2 h-4 w-4",
																			field.value === category.id
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
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<CategoryDrawer
						onCategoryCreated={(categoryId) => {
							form.setValue("categoryId", categoryId);
						}}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
