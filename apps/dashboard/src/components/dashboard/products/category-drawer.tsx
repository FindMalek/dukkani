"use client";

import type { CreateCategoryInput } from "@dukkani/common/schemas/category/input";
import { createCategoryInputSchema } from "@dukkani/common/schemas/category/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@dukkani/ui/components/drawer";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCreateCategoryMutation } from "@/hooks/api/use-categories";
import { useActiveStoreStore } from "@/stores/active-store.store";

interface CategoryDrawerProps {
	onCategoryCreated?: (categoryId: string) => void;
}

export function CategoryDrawer({ onCategoryCreated }: CategoryDrawerProps) {
	const [open, setOpen] = useState(false);

	const t = useTranslations("products.create");
	const { selectedStoreId } = useActiveStoreStore();
	const createCategoryMutation = useCreateCategoryMutation();

	if (!selectedStoreId) {
		return null;
	}

	const categoryForm = useSchemaForm({
		schema: createCategoryInputSchema,
		defaultValues: {
			name: "",
			storeId: selectedStoreId,
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: CreateCategoryInput) => {
			createCategoryMutation.mutate(values, {
				onSuccess: (data) => {
					categoryForm.reset();
					setOpen(false);
					onCategoryCreated?.(data.id);
				},
			});
		},
	});

	// Update storeId when selectedStoreId changes
	useEffect(() => {
		if (selectedStoreId) {
			categoryForm.setFieldValue("storeId", selectedStoreId);
		}
	}, [selectedStoreId, categoryForm]);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="link"
					type="button"
					className="p-0 font-medium text-primary text-xs"
				>
					<Icons.plus className="mr-1 h-3 w-3" />
					{t("form.category.create")}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("form.category.create")}</DrawerTitle>
					<DrawerDescription>
						{t("form.category.createDescription")}
					</DrawerDescription>
				</DrawerHeader>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						categoryForm.handleSubmit();
					}}
				>
					<div className="px-4">
						<categoryForm.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											{t("form.category.nameLabel")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											placeholder={t("form.category.namePlaceholder")}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</categoryForm.Field>
					</div>
					<DrawerFooter>
						<Button
							className="w-full"
							type="submit"
							isLoading={createCategoryMutation.isPending}
						>
							{t("form.category.create")}
						</Button>
						<DrawerClose asChild>
							<Button variant="outline" type="button" className="w-full">
								{t("form.cancel")}
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</form>
			</DrawerContent>
		</Drawer>
	);
}
