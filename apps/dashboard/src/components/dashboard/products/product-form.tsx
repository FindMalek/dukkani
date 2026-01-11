"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Textarea } from "@dukkani/ui/components/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

interface ProductFormProps {
	storeId: string;
}

export function ProductForm({ storeId }: ProductFormProps) {
	const t = useTranslations("products.create");
	const router = useRouter();
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const form = useForm<CreateProductInput>({
		resolver: zodResolver(createProductInputSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			stock: 0,
			published: false,
			storeId,
			imageUrls: [],
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
		if (files.length + selectedFiles.length > 10) {
			toast.error("Maximum 10 images allowed");
			return;
		}

		const newFiles = [...selectedFiles, ...files];
		setSelectedFiles(newFiles);

		const newPreviews = files.map((file) => URL.createObjectURL(file));
		setPreviews((prev) => [...prev, ...newPreviews]);
	};

	const removeImage = (index: number) => {
		const newFiles = [...selectedFiles];
		newFiles.splice(index, 1);
		setSelectedFiles(newFiles);

		const newPreviews = [...previews];
		URL.revokeObjectURL(newPreviews[index]);
		newPreviews.splice(index, 1);
		setPreviews(newPreviews);
	};

	const onSubmit = async (values: CreateProductInput) => {
		try {
			let imageUrls: string[] = [];

			if (selectedFiles.length > 0) {
				setIsUploading(true);
				const uploadResult = await client.storage.uploadMany({
					files: selectedFiles,
					bucket: "product-images",
				});
				imageUrls = uploadResult.files.map((file) => file.url);
			}

			createProductMutation.mutate({
				...values,
				imageUrls,
			});
		} catch (error) {
			handleAPIError(error);
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-6">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("form.name.label")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("form.name.placeholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("form.description.label")}</FormLabel>
									<FormControl>
										<Textarea
											placeholder={t("form.description.placeholder")}
											className="min-h-[120px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("form.price.label")}</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												placeholder={t("form.price.placeholder")}
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseFloat(e.target.value))
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("form.stock.label")}</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder={t("form.stock.placeholder")}
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseInt(e.target.value))
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="published"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>{t("form.published.label")}</FormLabel>
										<FormDescription>
											{t("form.published.description")}
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
					</div>

					<div className="space-y-6">
						<FormItem>
							<FormLabel>{t("form.images.label")}</FormLabel>
							<FormDescription>{t("form.images.description")}</FormDescription>
							<div className="mt-2 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
								{previews.map((preview, index) => (
									<div
										key={preview}
										className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
									>
										<img
											src={preview}
											alt={`Preview ${index}`}
											className="h-full w-full object-cover transition-transform group-hover:scale-105"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
										>
											<Icons.x className="h-4 w-4" />
										</button>
									</div>
								))}
								{previews.length < 10 && (
									<label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:bg-muted/50">
										<Icons.upload className="mb-2 h-6 w-6 text-muted-foreground" />
										<span className="text-muted-foreground text-xs">
											Upload
										</span>
										<input
											type="file"
											multiple
											accept="image/*"
											className="hidden"
											onChange={handleFileChange}
										/>
									</label>
								)}
							</div>
						</FormItem>
					</div>
				</div>

				<div className="flex flex-col gap-4 pt-6 sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant="outline"
						className="w-full sm:w-auto"
						onClick={() => router.back()}
					>
						{t("form.cancel")}
					</Button>
					<Button
						type="submit"
						className="w-full sm:w-auto"
						disabled={createProductMutation.isPending || isUploading}
					>
						{createProductMutation.isPending || isUploading ? (
							<>
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								{isUploading ? t("form.images.uploading") : t("form.submit")}
							</>
						) : (
							t("form.submit")
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
