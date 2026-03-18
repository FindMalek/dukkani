"use client";

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
} from "@dukkani/ui/components/drawer";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useTranslations } from "next-intl";
import { useCreateCategoryMutation } from "@/hooks/api/use-categories";
import { useActiveStoreStore } from "@/stores/active-store.store";

interface CategoryDrawerProps {
	onCategoryCreated?: (categoryId: string) => void;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const categoryFormSchema = createCategoryInputSchema.omit({ storeId: true });

export function CategoryDrawer({
	onCategoryCreated,
	open,
	onOpenChange,
}: CategoryDrawerProps) {
	const t = useTranslations("products.create");
	const { selectedStoreId } = useActiveStoreStore();
	const createCategoryMutation = useCreateCategoryMutation();

	if (!selectedStoreId) {
		return null;
	}

	const form = useAppForm({
		defaultValues: {
			name: "",
		},
		validators: {
			onBlur: categoryFormSchema,
			onSubmit: categoryFormSchema,
		},
		onSubmit: async ({ value, formApi }) => {
			const parsed = categoryFormSchema.parse(value);
			const result = await createCategoryMutation.mutateAsync(
				{ ...parsed, storeId: selectedStoreId },
				{
					onSuccess: (data) => {
						formApi.reset();
						onOpenChange(false);
						onCategoryCreated?.(data.id);
					},
				},
			);
			return result;
		},
	});

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("form.category.create")}</DrawerTitle>
					<DrawerDescription>
						{t("form.category.createDescription")}
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-6">
					<Form onSubmit={form.handleSubmit}>
						<form.AppForm>
							<FieldGroup>
								<form.AppField name="name">
									{(field) => (
										<field.TextInput
											label={t("form.category.nameLabel")}
											placeholder={t("form.category.namePlaceholder")}
										/>
									)}
								</form.AppField>
							</FieldGroup>
							<DrawerFooter>
								<form.Subscribe>
									{(formState) => (
										<>
											<Button
												type="submit"
												disabled={
													!formState.canSubmit || formState.isSubmitting
												}
												isLoading={formState.isSubmitting}
											>
												{t("form.category.create")}
											</Button>
											<DrawerClose asChild>
												<Button variant="outline" type="button">
													{t("form.cancel")}
												</Button>
											</DrawerClose>
										</>
									)}
								</form.Subscribe>
							</DrawerFooter>
						</form.AppForm>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
