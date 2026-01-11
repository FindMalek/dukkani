"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { Form } from "@dukkani/ui/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductCategorySection } from "@/components/dashboard/products/product-category-section";
import { ProductDescriptionSection } from "@/components/dashboard/products/product-description-section";
import { ProductEssentialsSection } from "@/components/dashboard/products/product-essentials-section";
import { ProductFormActions } from "@/components/dashboard/products/product-form-actions";
import { ProductPhotosSection } from "@/components/dashboard/products/product-photos-section";
import { ProductVariantsSection } from "@/components/dashboard/products/product-variants-section";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export function ProductForm({ storeId }: { storeId: string }) {
	const router = useRouter();
	const t = useTranslations("products.create");

	const [isUploading, setIsUploading] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const form = useForm<CreateProductInput>({
		resolver: zodResolver(createProductInputSchema),
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
	});

	const createProductMutation = useMutation({
		mutationFn: (input: CreateProductInput) => client.product.create(input),
		onSuccess: () => {
			toast.success(t("success"));
			router.push(RoutePaths.PRODUCTS.INDEX.url);
		},
		onError: (error) => handleAPIError(error),
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
		form.setValue("published", published);

		const isValid = await form.trigger();
		if (!isValid) {
			toast.error(t("form.validation.errors"));
			return;
		}

		const values = form.getValues();
		const hasVariants = values.hasVariants;

		try {
			setIsUploading(true);
			let urls: string[] = [];
			if (selectedFiles.length > 0) {
				const res = await client.storage.uploadMany({
					files: selectedFiles,
				});
				urls = res.files.map((f) => f.url);
			}

			// Clean up data: only include variants if hasVariants is true
			const submitData: CreateProductInput = {
				...values,
				imageUrls: urls,
				hasVariants,
				// Explicitly set to empty arrays/undefined when hasVariants is false
				variantOptions: hasVariants
					? values.variantOptions?.filter(
							(opt) => opt.name && opt.values && opt.values.length > 0,
						)
					: undefined,
				variants: hasVariants ? values.variants : undefined,
			};

			createProductMutation.mutate(submitData);
		} catch (e) {
			handleAPIError(e);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => e.preventDefault()}
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
					isPending={createProductMutation.isPending || isUploading}
				/>
			</form>
		</Form>
	);
}
