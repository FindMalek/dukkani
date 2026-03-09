"use client";

import {
	type ProductFormInput,
	type ProductFormOutput,
	productFormSchema,
} from "@dukkani/common/schemas/product/form";
import type { CreateProductInput } from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardFooter } from "@dukkani/ui/components/card";
import {
	Collapsible,
	CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import {
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { useCategoriesQuery } from "@/hooks/api/use-categories";
import { useProductsController } from "@/hooks/controllers/use-products-controller";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";
import { CategoryDrawer } from "./category-drawer";

export interface ProductFormHandle {
	submit: (published: boolean) => void;
}

export const ProductForm = forwardRef<ProductFormHandle, { storeId: string }>(
	({ storeId }, ref) => {
		const router = useRouter();
		const { createProductMutationOptions } = useProductsController();
		const createProductMutation = useMutation(createProductMutationOptions);
		const formV2 = useAppForm({
			defaultValues: {
				name: "",
				description: "",
				price: "",
				stock: "1",
				published: false,
				categoryId: "",
				hasVariants: false,
				imageFiles: [],
				variantOptions: [],
				// here we need to explicitly type the value so that arrays and undefined values are allowed
			} as ProductFormInput,
			onSubmit: async ({ value }) => {
				let imageUrls: string[] = [];
				if (value.imageFiles.length > 0) {
					try {
						const res = await client.storage.uploadMany({
							files: value.imageFiles,
						});
						imageUrls = res.files.map((file) => file.url);
					} catch (error) {
						handleAPIError(error);
					}
				}
				const cleanedFormData = productFormSchema.parse(value);
				const cleanedData = {
					...cleanedFormData,
					imageUrls,
					storeId,
				};
				console.log(cleanedData);
				
				// await handleCreateProduct(cleanedData);
			},
			validators: {
				onChange: productFormSchema,
			},
		});
		const handleCreateProduct = useCallback(
			async (input: CreateProductInput) => {
				await createProductMutation.mutateAsync(input, {
					onSuccess: () => {
						router.push(RoutePaths.PRODUCTS.INDEX.url);
						formV2.reset();
					},
					onError: (error) => {
						handleAPIError(error);
					},
				});
			},
			[createProductMutation, formV2, router],
		);

		const t = useTranslations("products.create");
		const { data: categories } = useCategoriesQuery({
			storeId,
		});

		const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);

		const handleOpenCategoryDrawer = useCallback(() => {
			setIsCategoryDrawerOpen(true);
		}, []);

		const categoriesOptions = useMemo(() => {
			if (!categories?.length) return [];
			return [
				{
					id: "categories",
					options: categories.map((category) => ({
						id: category.id,
						name: category.name,
					})),
				},
			];
		}, [categories]);

		const handleCategoryCreated = useCallback(
			(categoryId: string) => {
				const timeoutId = setTimeout(() => {
					formV2.setFieldValue("categoryId", categoryId);
				}, 1000);

				return () => clearTimeout(timeoutId);
			},
			[formV2],
		);

		const handleAddNewVariantOption = useCallback(() => {
			formV2.setFieldValue("variantOptions", (prev) => [
				...(prev ?? []),
				{ name: "", values: [] },
			]);
		}, [formV2]);

		// const createProductMutation = useMutation({
		// 	mutationFn: (input) => client.product.create(input),
		// 	onSuccess: () => {
		// 		router.push(RoutePaths.PRODUCTS.INDEX.url);
		// 		formV2.reset();
		// 	},
		// 	onError: (error) => {
		// 		handleAPIError(error);
		// 	},
		// });

		useImperativeHandle(ref, () => ({
			submit: (published: boolean) => {
				formV2.setFieldValue("published", published);
				formV2.handleSubmit();
			},
		}));

		return (
			<Form
				onSubmit={formV2.handleSubmit}
				className="flex flex-col gap-4 px-2 pb-24"
			>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>{t("sections.essentials")}</FieldLegend>
						<FieldGroup>
							<formV2.AppForm>
								<formV2.AppField name="name">
									{(field) => (
										<field.TextInput
											label={t("form.name.label")}
											placeholder={t("form.name.placeholder")}
										/>
									)}
								</formV2.AppField>
								<formV2.AppField name="description">
									{(field) => (
										<field.TextAreaInput
											label={t("form.description.label")}
											placeholder={t("form.description.placeholder")}
										/>
									)}
								</formV2.AppField>
								<div className="flex items-start justify-between gap-4">
									<formV2.AppField name="price">
										{(field) => (
											<field.PriceInput label={t("form.price.label")} />
										)}
									</formV2.AppField>
									<formV2.AppField name="stock">
										{(field) => (
											<field.NumberInput label={t("form.stock.label")} />
										)}
									</formV2.AppField>
								</div>
								<formV2.AppField name="categoryId">
									{(field) => (
										<>
											<field.SelectInput
												label={t("form.category.label")}
												placeholder={t("form.category.uncategorized")}
												options={categoriesOptions}
												onNewOptionClick={handleOpenCategoryDrawer}
											/>
											<CategoryDrawer
												onCategoryCreated={handleCategoryCreated}
												open={isCategoryDrawerOpen}
												onOpenChange={setIsCategoryDrawerOpen}
											/>
										</>
									)}
								</formV2.AppField>
								<formV2.AppField name="imageFiles" mode="array">
									{(imageUrlsField) => (
										<imageUrlsField.ImagesInput label={t("form.photos")} />
									)}
								</formV2.AppField>
								<formV2.AppField
									name="hasVariants"
									listeners={{
										onChange: ({ value }) => {
											if (value) {
												formV2.setFieldValue("variantOptions", [
													{ name: "", values: [] },
												]);
											} else {
												formV2.setFieldValue("variantOptions", []);
											}
										},
									}}
								>
									{(field) => (
										<field.SwitchInput
											label={t("form.options.label")}
											description={t("form.options.description")}
										/>
									)}
								</formV2.AppField>
								<formV2.Subscribe
									selector={(state) => state.values.hasVariants}
								>
									{(hasVariants) => (
										<Collapsible open={hasVariants}>
											<CollapsibleContent>
												<FieldSet>
													<Card className="mb-4">
														<CardContent>
															<FieldGroup>
																<formV2.AppField
																	name="variantOptions"
																	mode="array"
																>
																	{(variantOptionsField) =>
																		variantOptionsField.state.value?.map(
																			(variantOption, variantOptionIndex) => (
																				<formV2.AppField
																					name={`variantOptions[${variantOptionIndex}].name`}
																					key={`variantOption-${variantOption.name}-${variantOptionIndex}`}
																				>
																					{(field) => (
																						<FieldGroup>
																							<field.TextInput
																								label="Variant Name"
																								srOnlyLabel
																								rightToField={
																									<Button
																										type="button"
																										variant="secondary"
																										size="icon"
																										onClick={() =>
																											variantOptionsField.removeValue(
																												variantOptionIndex,
																											)
																										}
																									>
																										<Icons.trash className="h-4 w-4" />
																									</Button>
																								}
																							/>
																							<formV2.AppField
																								name={`variantOptions[${variantOptionIndex}].values`}
																								mode="array"
																							>
																								{(optionsField) => (
																									<optionsField.ArrayInput
																										as="text-pills"
																										fromKey="value"
																									/>
																								)}
																							</formV2.AppField>
																							<FieldSeparator />
																						</FieldGroup>
																					)}
																				</formV2.AppField>
																			),
																		)
																	}
																</formV2.AppField>
															</FieldGroup>
														</CardContent>
														<CardFooter>
															<Button
																type="button"
																variant="outline"
																size="sm"
																className="w-full"
																onClick={handleAddNewVariantOption}
															>
																<Icons.plus className="mr-2 h-4 w-4" />
																{t("form.variants.options.addAnother")}
															</Button>
														</CardFooter>
													</Card>
												</FieldSet>
											</CollapsibleContent>
										</Collapsible>
									)}
								</formV2.Subscribe>
								<formV2.Subscribe>
									{(formState) => (
										<formV2.AppField name="published">
											{(field) => (
												<div className="flex w-full items-center gap-2">
													<Button
														type="button"
														variant="outline"
														className="flex-1"
														disabled={
															formState.isSubmitting || !formState.canSubmit
														}
														onClick={() => {
															field.handleChange(false);
															formV2.handleSubmit();
														}}
													>
														{t("form.saveDraft")}
													</Button>
													<Button
														type="submit"
														className="flex-1"
														disabled={
															formState.isSubmitting || !formState.canSubmit
														}
														onClick={() => field.handleChange(true)}
													>
														{t("form.savePublish")}
													</Button>
												</div>
											)}
										</formV2.AppField>
									)}
								</formV2.Subscribe>
							</formV2.AppForm>
						</FieldGroup>
					</FieldSet>
				</FieldGroup>
			</Form>
		);
	},
);

ProductForm.displayName = "ProductForm";
