"use client";

import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@dukkani/ui/components/drawer";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useTranslations } from "next-intl";
import type { UseFormReturn } from "react-hook-form";

interface VariantEditDrawerProps {
	form: UseFormReturn<CreateProductInput>;
	index: number;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function VariantEditDrawer({
	form,
	index,
	open,
	onOpenChange,
}: VariantEditDrawerProps) {
	const t = useTranslations("products.create");
	const variant = form.watch(`variants.${index}`);

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("form.variants.edit.title")}</DrawerTitle>
					<DrawerDescription>
						{Object.entries(variant?.selections || {})
							.map(([key, value]) => `${key}: ${value}`)
							.join(", ")}
					</DrawerDescription>
				</DrawerHeader>

				<div className="space-y-4 px-4">
					<FormField
						control={form.control}
						name={`variants.${index}.sku`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("form.variants.edit.sku")}</FormLabel>
								<FormControl>
									<Input
										placeholder={t("form.variants.edit.skuPlaceholder")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`variants.${index}.price`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("form.variants.edit.price")}</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="number"
											step="0.01"
											{...field}
											value={field.value ?? ""}
											onChange={(e) =>
												field.onChange(
													e.target.value ? Number(e.target.value) : undefined,
												)
											}
										/>
										<span className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 text-sm">
											TND
										</span>
									</div>
								</FormControl>
								<p className="text-muted-foreground text-xs">
									{t("form.variants.edit.priceHelp")}
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={`variants.${index}.stock`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("form.variants.edit.stock")}</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										value={field.value ?? 0}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<DrawerFooter>
					<DrawerClose asChild>
						<Button variant="outline">{t("form.cancel")}</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
