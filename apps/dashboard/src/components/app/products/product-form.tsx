"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { toast } from "sonner";
import { ProductCategorySection } from "@/components/app/products/product-category-section";
import { ProductDescriptionSection } from "@/components/app/products/product-description-section";
import { ProductEssentialsSection } from "@/components/app/products/product-essentials-section";
import { ProductFormActions } from "@/components/app/products/product-form-actions";
import { ProductPhotosSection } from "@/components/app/products/product-photos-section";
import { ProductVariantsSection } from "@/components/app/products/product-variants-section";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export interface ProductFormHandle {
	submit: (published: boolean) => void;
}

export const ProductForm = forwardRef<ProductFormHandle, { storeId: string }>(
	({ storeId }, ref) => {
		const router = useRouter();
		const t = useTranslations("products.create");

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

		const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = Array.from(e.target.files || []);
			if (files.length + selectedFiles.length > 10) return;
			setSelectedFiles([...selectedFiles, ...files]);
			setPreviews([...previews, ...files.map((f) => URL.createObjectURL(f))]);
		};

		const removeImage = (i: number) => {
			const f = [...selectedFiles];
			f.splice(i, 1);
			setSelectedFiles(f);
			const p = [...previews];
			URL.revokeObjectURL(p[i]);
			p.splice(i, 1);
			setPreviews(p);
		};

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
			<form
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
						(submittingAction === "draft" && createProductMutation.isPending) ||
						(submittingAction === "draft" && isUploading)
					}
					isPublishLoading={
						(submittingAction === "publish" &&
							createProductMutation.isPending) ||
						(submittingAction === "publish" && isUploading)
					}
				/>
			</form>
		);
	},
);

ProductForm.displayName = "ProductForm";
