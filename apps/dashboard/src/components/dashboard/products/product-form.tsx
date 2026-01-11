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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@dukkani/ui/components/tabs";
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

export function ProductForm({ storeId }: { storeId: string }) {
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
		if (files.length + selectedFiles.length > 10)
			return toast.error(t("form.images.maxImages"));
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

	const onSubmit = async (values: CreateProductInput) => {
		try {
			setIsUploading(true);
			let urls: string[] = [];
			if (selectedFiles.length > 0) {
				const res = await client.storage.uploadMany({
					files: selectedFiles,
					bucket: "product-images",
				});
				urls = res.files.map((f) => f.url);
			}
			createProductMutation.mutate({ ...values, imageUrls: urls });
		} catch (e) {
			handleAPIError(e);
		} finally {
			setIsUploading(false);
		}
	};

	const EditorContent = () => (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>{t("sections.general")}</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("form.name.label")}</FormLabel>
								<FormControl>
									<Input placeholder={t("form.name.placeholder")} {...field} />
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
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("sections.pricing")}</CardTitle>
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
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</div>
								</FormControl>
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
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>{t("sections.media")}</CardTitle>
					<CardDescription>{t("form.images.description")}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-3 gap-3">
						{previews.map((p, i) => (
							<div
								key={p}
								className="group relative aspect-square overflow-hidden rounded-md border bg-muted"
							>
								<img src={p} className="h-full w-full object-cover" alt="" />
								<button
									type="button"
									onClick={() => removeImage(i)}
									className="absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
								>
									<Icons.x className="mx-auto h-3.5 w-3.5" />
								</button>
							</div>
						))}
						{previews.length < 10 && (
							<label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed transition-colors hover:bg-muted/50">
								<Icons.plus className="h-6 w-6 text-muted-foreground" />
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

			<Card>
				<CardContent className="pt-6">
					<FormField
						control={form.control}
						name="published"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
				</CardContent>
			</Card>
		</div>
	);

	const PreviewContent = () => (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
					{t("sections.preview")}
				</h3>
				<Badge variant={watchedValues.published ? "default" : "secondary"}>
					{watchedValues.published ? t("status.live") : t("status.draft")}
				</Badge>
			</div>
			<Card className="overflow-hidden border-2 border-primary/5 shadow-lg">
				<div className="flex aspect-square items-center justify-center bg-muted">
					{previews[0] ? (
						<img
							src={previews[0]}
							className="h-full w-full object-cover"
							alt=""
						/>
					) : (
						<Icons.package className="h-12 w-12 text-muted-foreground/20" />
					)}
				</div>
				<CardContent className="space-y-3 p-5">
					<div className="flex items-start justify-between gap-4">
						<h4 className="line-clamp-1 font-bold text-lg">
							{watchedValues.name || t("preview.unnamed")}
						</h4>
						<span className="font-bold text-lg text-primary">
							${watchedValues.price || "0.00"}
						</span>
					</div>
					<p className="line-clamp-2 text-muted-foreground text-sm">
						{watchedValues.description || t("preview.noDescription")}
					</p>
					<Separator />
					<div className="flex items-center justify-between font-semibold text-xs">
						<span
							className={
								watchedValues.stock > 0 ? "text-green-600" : "text-destructive"
							}
						>
							{watchedValues.stock > 0
								? t("preview.inStock", { count: watchedValues.stock })
								: t("preview.outOfStock")}
						</span>
						<span className="text-muted-foreground">
							{watchedValues.published ? t("status.live") : t("status.draft")}
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="pb-24 md:pb-0">
				{/* Mobile: Tabs */}
				<div className="md:hidden">
					<Tabs defaultValue="edit" className="w-full">
						<TabsList className="sticky top-16 z-20 grid h-12 w-full grid-cols-2 rounded-none border-b bg-background">
							<TabsTrigger value="edit">{t("tabs.edit")}</TabsTrigger>
							<TabsTrigger value="preview">{t("tabs.preview")}</TabsTrigger>
						</TabsList>
						<TabsContent value="edit" className="mt-0 p-4">
							<EditorContent />
						</TabsContent>
						<TabsContent value="preview" className="mt-0 p-4">
							<PreviewContent />
						</TabsContent>
					</Tabs>

					{/* Sticky Bottom Actions */}
					<div className="fixed bottom-0 left-0 z-40 w-full border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<div className="container flex gap-3">
							<Button
								type="button"
								variant="outline"
								className="flex-1"
								onClick={() => router.back()}
							>
								{t("form.cancel")}
							</Button>
							<Button
								type="submit"
								className="flex-[2]"
								disabled={createProductMutation.isPending || isUploading}
							>
								{createProductMutation.isPending || isUploading ? (
									<Icons.spinner className="h-4 w-4 animate-spin" />
								) : (
									t("form.submit")
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* Desktop: Side-by-side */}
				<div className="hidden py-6 md:grid md:grid-cols-3 md:gap-8">
					<div className="space-y-6 md:col-span-2">
						<EditorContent />
					</div>
					<div className="sticky top-6 h-fit space-y-6">
						<PreviewContent />
						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={createProductMutation.isPending || isUploading}
							>
								{createProductMutation.isPending || isUploading ? (
									<Icons.spinner className="h-4 w-4 animate-spin" />
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
						</div>
					</div>
				</div>
			</form>
		</Form>
	);
}
