"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { ButtonGroup } from "@dukkani/ui/components/button-group";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Separator } from "@dukkani/ui/components/separator";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

interface ProductEssentialsSectionProps {
	form: UseFormReturn<CreateProductInput>;
}

export function ProductEssentialsSection({
	form,
}: ProductEssentialsSectionProps) {
	const t = useTranslations("products.create");

	return (
		<Card className="bg-muted-foreground/5 py-2 shadow-none">
			<CardContent className="space-y-4 px-4">
				<h3 className="font-bold">{t("sections.essentials")}</h3>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-xs">
								{t("form.name.label")}{" "}
								<span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-xs">
								{t("form.price.label")}{" "}
								<span className="text-destructive">*</span>
							</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type="number"
										step="0.01"
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
									<span className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 text-sm">
										TND
									</span>
								</div>
							</FormControl>
							<FormDescription className="text-[10px]">
								{t("form.priceHelp")}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator />

				<FormField
					control={form.control}
					name="stock"
					render={({ field }) => {
						// Helper to safely get a valid number
						const getValidStock = (value: unknown): number => {
							const num = Number(value);
							return Number.isFinite(num) && num >= 0 ? Math.floor(num) : 0;
						};

						const currentStock = getValidStock(field.value);

						return (
							<FormItem className="flex items-center justify-between">
								<FormLabel className="font-semibold text-sm">
									{t("form.stock.label")}
								</FormLabel>
								<ButtonGroup orientation="horizontal">
									<Button
										variant="outline"
										size="icon"
										className="bg-muted-foreground/5"
										onClick={() => {
											const newValue = Math.max(0, currentStock - 1);
											field.onChange(newValue);
										}}
									>
										<Icons.minus className="size-4" />
									</Button>
									<Input
										type="number"
										className="w-16 rounded-none bg-muted-foreground/5 text-center"
										{...field}
										value={field.value ?? ""}
										onChange={(e) => {
											const value = e.target.value;
											if (value === "") {
												field.onChange(0);
												return;
											}
											const num = Number(value);
											if (Number.isFinite(num)) {
												field.onChange(Math.max(0, Math.floor(num)));
											}
										}}
									/>
									<Button
										variant="outline"
										size="icon"
										className="border-l-0 bg-muted-foreground/5"
										onClick={() => {
											const newValue = currentStock + 1;
											field.onChange(newValue);
										}}
									>
										<Icons.plus className="size-4" />
									</Button>
								</ButtonGroup>
							</FormItem>
						);
					}}
				/>
			</CardContent>
		</Card>
	);
}
