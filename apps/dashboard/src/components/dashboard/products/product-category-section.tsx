"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@dukkani/ui/components/select";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";
import { CategoryDrawer } from "@/components/dashboard/products/category-drawer";
import { useCategories } from "@/hooks/api/use-categories";

interface ProductCategorySectionProps {
	form: UseFormReturn<CreateProductInput>;
	storeId: string;
}

export function ProductCategorySection({
	form,
	storeId,
}: ProductCategorySectionProps) {
	const t = useTranslations("products.create");
	const { data: categories, isLoading: isLoadingCategories } = useCategories({
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
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										value={field.value || "none"}
										onValueChange={(value) => {
											field.onChange(value === "none" ? undefined : value);
										}}
										disabled={isLoadingCategories}
									>
										<SelectTrigger className="w-full">
											<SelectValue
												placeholder={t("form.category.placeholder")}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="none">
												{t("form.category.uncategorized")}
											</SelectItem>
											{categories?.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<CategoryDrawer
						storeId={storeId}
						onCategoryCreated={(categoryId) => {
							form.setValue("categoryId", categoryId);
						}}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
