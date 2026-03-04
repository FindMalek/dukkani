"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import {
	type VariantOptionInput,
	variantOptionInputSchema,
} from "@dukkani/common/schemas/variant/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent, CardFooter } from "@dukkani/ui/components/card";
import {
	Collapsible,
	CollapsibleContent,
} from "@dukkani/ui/components/collapsible";
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
	forwardRef,
	useCallback,
	useEffect,
	useEffectEvent,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ProductCategorySection } from "@/components/app/products/product-category-section";
import { ProductDescriptionSection } from "@/components/app/products/product-description-section";
import { ProductEssentialsSection } from "@/components/app/products/product-essentials-section";
import { ProductFormActions } from "@/components/app/products/product-form-actions";
import { ProductPhotosSection } from "@/components/app/products/product-photos-section";
import { ProductVariantsSection } from "@/components/app/products/product-variants-section";
import { useCategoriesQuery } from "@/hooks/api/use-categories";
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
		const t = useTranslations("products.create");
		const {
			data: categories,
			isLoading: isLoadingCategories,
			isFetching: isFetchingCategories,
		} = useCategoriesQuery({
			storeId,
		});
		const formV2 = useAppForm({
			defaultValues: {
				name: "",
				description: "",
				price: "",
				stock: "1",
				published: false,
				storeId,
				categoryId: "",
				hasVariants: false,
				variantOptions: [] as VariantOptionInput[],
			},
			onSubmit: async ({ value }) => {
				console.log(value);
			},
			validators: {
				onChange: z.object({
					name: z.string().min(1),
					description: z.string(),
					price: z.coerce.number<string>().positive(),
					stock: z.coerce.number<string>().int().min(1),
					published: z.boolean(),
					storeId: z.string().min(1),
					categoryId: z.string(),
					hasVariants: z.boolean(),
					variantOptions: z.array(variantOptionInputSchema),
				}),
			},
		});

		const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
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

		const [isUploading, setIsUploading] = useState(false);
		const [previews, setPreviews] = useState<string[]>([]);
		const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
		const [submittingAction, setSubmittingAction] = useState<
			"draft" | "publish" | null
		>(null);

		useEffect(() => {
			// Clean up old URLs when previews change
			return () => {
				previews.forEach((url) => {
					URL.revokeObjectURL(url);
				});
			};
		}, [previews]);

		const createProductMutation = useMutation({
			mutationFn: (input: CreateProductInput) => client.product.create(input),
			onSuccess: () => {
				toast.success(t("success"));
				router.push(RoutePaths.PRODUCTS.INDEX.url);
				form.reset();
				setSubmittingAction(null);
			},
			onError: (error) => {
				handleAPIError(error);
				setSubmittingAction(null);
			},
		});

		const form = useSchemaForm({
			schema: createProductInputSchema,
			defaultValues: {
				name: "",
				description: "",
				price: 0,
				stock: 10,
				published: false,
				storeId,
				imageUrls: [],
				hasVariants: false,
				variantOptions: [],
				variants: [],
			},
			validationMode: ["onBlur", "onSubmit"],
			onSubmit: async (values: CreateProductInput) => {
				if (createProductMutation.isPending || isUploading) {
					return;
				}

				const hasVariants = form.state.values.hasVariants;
				const submitData: CreateProductInput = {
					...values,
					imageUrls: [], // Will be set after upload
					hasVariants,
					variantOptions: hasVariants
						? values.variantOptions?.filter(
								(opt) => opt.name && opt.values && opt.values.length > 0,
							)
						: undefined,
					variants: hasVariants ? values.variants : undefined,
				};

				try {
					setIsUploading(true);
					let urls: string[] = [];
					if (selectedFiles.length > 0) {
						const res = await client.storage.uploadMany({
							files: selectedFiles,
						});
						urls = res.files.map((f) => f.url);
					}

					submitData.imageUrls = urls;
					createProductMutation.mutate(submitData);
				} catch (e) {
					handleAPIError(e);
				} finally {
					setIsUploading(false);
				}
			},
		});

		// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// 	const files = Array.from(e.target.files || []);
		// 	if (files.length + selectedFiles.length > 10) return;
		// 	setSelectedFiles([...selectedFiles, ...files]);
		// 	setPreviews([...previews, ...files.map((f) => URL.createObjectURL(f))]);
		// };

		// const removeImage = (i: number) => {
		// 	const f = [...selectedFiles];
		// 	f.splice(i, 1);
		// 	setSelectedFiles(f);
		// 	const p = [...previews];
		// 	URL.revokeObjectURL(p[i]);
		// 	p.splice(i, 1);
		// 	setPreviews(p);
		// };

		const onSubmit = async (published: boolean) => {
			if (createProductMutation.isPending || isUploading) {
				return;
			}

			setSubmittingAction(published ? "publish" : "draft");
			form.setFieldValue("published", published);

			const hasVariants = form.state.values.hasVariants;
			if (!hasVariants) {
				form.setFieldValue("variantOptions", []);
				form.setFieldValue("variants", []);
			}

			await form.handleSubmit();
		};

		useImperativeHandle(ref, () => ({
			submit: onSubmit,
		}));

		return (
			<>
				<Form
					onSubmit={formV2.handleSubmit}
					className="flex flex-col gap-4 px-2 pb-24"
				>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>{t("sections.essentials")}</FieldLegend>
							<FieldDescription>
								Enter the essentials of your product
							</FieldDescription>
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
													options={categoriesOptions}
													onNewOptionClick={() => {
														// field.handleChange("cmmc6kx4w0006019kon6hflwp");
														setIsCategoryDrawerOpen(true);
													}}
												/>
												<CategoryDrawer
													onCategoryCreated={(categoryId) => {
														console.log("categoryId", categoryId);
														handleCategoryCreated(categoryId);
													}}
													open={isCategoryDrawerOpen}
													onOpenChange={setIsCategoryDrawerOpen}
												/>
											</>
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
															<formV2.AppField name="variantOptions">
																{(variantOptionsField) => (
																	<CardFooter>
																		<Button
																			type="button"
																			variant="outline"
																			size="sm"
																			className="w-full"
																			onClick={() => {
																				variantOptionsField.handleChange(
																					(prev) => [
																						...(prev ?? []),
																						{
																							name: "",
																							values: [],
																						},
																					],
																				);
																			}}
																		>
																			<Icons.plus className="mr-2 h-4 w-4" />
																			{t("form.variants.options.addAnother")}
																		</Button>
																	</CardFooter>
																)}
															</formV2.AppField>
														</Card>
													</FieldSet>
												</CollapsibleContent>
											</Collapsible>
										)}
									</formV2.Subscribe>
								</formV2.AppForm>
							</FieldGroup>
						</FieldSet>
					</FieldGroup>
				</Form>

				{/* <form
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
					className="flex flex-col gap-4 px-2 pb-24"
				>
					<ProductPhotosSection
						previews={previews}
						onFileChange={handleFileChange}
						onRemoveImage={removeImage}
					/>

					<ProductEssentialsSection form={form} />

					<ProductDescriptionSection form={form} />

					<ProductCategorySection form={form} storeId={storeId} />

					<ProductVariantsSection form={form} />

					<ProductFormActions
						onSubmit={onSubmit}
						isDraftLoading={
							(submittingAction === "draft" &&
								createProductMutation.isPending) ||
							(submittingAction === "draft" && isUploading)
						}
						isPublishLoading={
							(submittingAction === "publish" &&
								createProductMutation.isPending) ||
							(submittingAction === "publish" && isUploading)
						}
					/>
				</form> */}
			</>
		);
	},
);

ProductForm.displayName = "ProductForm";
