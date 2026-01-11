"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
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
import { Separator } from "@dukkani/ui/components/separator";
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

	// Watch form values for the live preview
	const watchedValues = form.watch();

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
			toast.error(t("form.images.maxImages"));
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
				<div className="grid gap-8 lg:grid-cols-3">
					{/* LEFT COLUMN: EDITOR */}
					<div className="space-y-6 lg:col-span-2">
						{/* General Information */}
						<Card className="border-none shadow-none md:border md:shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl">
									{t("sections.general")}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-6">
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
													className="min-h-[150px] resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>

						{/* Pricing & Inventory */}
						<Card className="border-none shadow-none md:border md:shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl">
									{t("sections.pricing")}
								</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-6 sm:grid-cols-2">
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("form.price.label")}</FormLabel>
											<FormControl>
												<div className="relative">
													<span className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
														$
													</span>
													<Input
														type="number"
														step="0.01"
														className="pl-7"
														placeholder={t("form.price.placeholder")}
														{...field}
														onChange={(e) =>
															field.onChange(Number.parseFloat(e.target.value))
														}
													/>
												</div>
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
							</CardContent>
						</Card>

						{/* Media */}
						<Card className="border-none shadow-none md:border md:shadow-sm">
							<CardHeader>
								<CardTitle className="text-xl">{t("sections.media")}</CardTitle>
								<CardDescription>
									{t("form.images.description")}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
									{previews.map((preview, index) => (
										<div
											key={preview}
											className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
										>
											<img
												src={preview}
												alt={t("form.images.previewAlt", { index: index + 1 })}
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
												{t("form.images.uploadButton")}
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
							</CardContent>
						</Card>
					</div>

					{/* RIGHT COLUMN: PREVIEW */}
					<div className="space-y-6">
						<div className="sticky top-6 space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">
									{t("sections.preview")}
								</h3>
								{watchedValues.published && (
									<Badge className="border-green-500/20 bg-green-500/10 text-green-600">
										{t("form.published.label")}
									</Badge>
								)}
							</div>

							{/* Live Preview Card */}
							<Card className="overflow-hidden border-2 border-primary/10 shadow-xl transition-all">
								<div className="relative flex aspect-square items-center justify-center bg-muted">
									{previews.length > 0 ? (
										<img
											src={previews[0]}
											className="h-full w-full object-cover"
											alt="Primary preview"
										/>
									) : (
										<Icons.package className="h-12 w-12 text-muted-foreground/40" />
									)}
								</div>
								<CardContent className="space-y-3 p-5">
									<div className="flex items-start justify-between">
										<h4 className="line-clamp-1 font-bold text-lg">
											{watchedValues.name || t("preview.unnamed")}
										</h4>
										<p className="font-bold text-lg text-primary">
											${watchedValues.price || "0.00"}
										</p>
									</div>
									<p className="line-clamp-2 text-muted-foreground text-sm">
										{watchedValues.description || t("preview.noDescription")}
									</p>
									<Separator />
									<div className="flex items-center justify-between font-medium text-xs">
										<span
											className={
												watchedValues.stock > 0
													? "text-green-600"
													: "text-destructive"
											}
										>
											{watchedValues.stock > 0
												? t("preview.inStock", { count: watchedValues.stock })
												: t("preview.outOfStock")}
										</span>
										<FormField
											control={form.control}
											name="published"
											render={({ field }) => (
												<div className="flex items-center gap-2">
													<Checkbox
														checked={field.value}
														onCheckedChange={field.onChange}
														id="preview-publish"
													/>
													<label
														htmlFor="preview-publish"
														className="cursor-pointer"
													>
														{t("form.published.label")}
													</label>
												</div>
											)}
										/>
									</div>
								</CardContent>
							</Card>

							{/* Actions */}
							<Card className="lg:border-none lg:bg-transparent lg:shadow-none">
								<CardContent className="flex flex-col gap-3 p-0">
									<Button
										type="submit"
										size="lg"
										className="w-full shadow-lg shadow-primary/20"
										disabled={createProductMutation.isPending || isUploading}
									>
										{createProductMutation.isPending || isUploading ? (
											<>
												<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
												{isUploading
													? t("form.images.uploading")
													: t("form.submit")}
											</>
										) : (
											t("form.submit")
										)}
									</Button>
									<Button
										type="button"
										variant="ghost"
										className="w-full"
										onClick={() => router.back()}
									>
										{t("form.cancel")}
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
