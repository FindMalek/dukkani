"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@dukkani/ui/components/collapsible";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@dukkani/ui/components/select";
import { Switch } from "@dukkani/ui/components/switch";
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
			stock: 10,
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
		const values = form.getValues();
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

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="flex flex-col gap-4 pb-24"
			>
				{/* Product Photos */}
				<section className="px-4 py-2">
					<h3 className="mb-3 font-semibold text-sm">{t("sections.photos")}</h3>
					<div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
						{previews.map((p, i) => (
							<div
								key={p}
								className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted"
							>
								<img src={p} className="h-full w-full object-cover" alt="" />
								<button
									type="button"
									onClick={() => removeImage(i)}
									className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
								>
									<Icons.x className="h-3 w-3" />
								</button>
							</div>
						))}
						{previews.length < 10 && (
							<label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-muted-foreground/20 border-dashed hover:bg-muted/50">
								<Icons.camera className="mb-1 h-6 w-6 text-muted-foreground/60" />
								<span className="text-[10px] text-muted-foreground">
									{t("form.addPhotos")}
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
				</section>

				{/* Essentials Card */}
				<Card className="mx-4 border-muted/50 shadow-none">
					<CardContent className="space-y-6 pt-6">
						<h3 className="font-bold">{t("sections.essentials")}</h3>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-xs">
										{t("form.name.label")}{" "}
										<span className="text-destructive">*</span>
									</FormLabel>
									<FormControl>
										<Input
											className="h-12 border-muted bg-muted/20 focus-visible:ring-0"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold text-xs">
										{t("form.price.label")}{" "}
										<span className="text-destructive">*</span>
									</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												type="number"
												step="0.01"
												className="h-12 border-muted bg-muted/20 pr-12 focus-visible:ring-0"
												{...field}
												onChange={(e) => field.onChange(Number(e.target.value))}
											/>
											<span className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground/50 text-sm">
												TND
											</span>
										</div>
									</FormControl>
									<p className="text-[10px] text-muted-foreground/60">
										{t("form.priceHelp")}
									</p>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between border-t pt-4">
									<FormLabel className="font-semibold text-sm">
										{t("form.stock.label")}
									</FormLabel>
									<div className="flex h-10 items-center overflow-hidden rounded-lg border border-muted bg-muted/10">
										<Button
											variant="ghost"
											size="icon"
											className="h-full w-10 rounded-none border-r"
											onClick={() =>
												field.onChange(Math.max(0, field.value - 1))
											}
										>
											<Icons.minus className="h-4 w-4" />
										</Button>
										<Input
											type="number"
											className="h-full w-16 border-none bg-transparent text-center focus-visible:ring-0"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
										<Button
											variant="ghost"
											size="icon"
											className="h-full w-10 rounded-none border-l"
											onClick={() => field.onChange(field.value + 1)}
										>
											<Icons.plus className="h-4 w-4" />
										</Button>
									</div>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{/* Description Accordion */}
				<Collapsible className="mx-4 overflow-hidden rounded-xl border border-muted/50 bg-card">
					<CollapsibleTrigger className="flex w-full items-center justify-between p-4 font-bold text-sm">
						{t("form.description.label")} (optional)
						<Icons.chevronDown className="h-4 w-4 text-muted-foreground" />
					</CollapsibleTrigger>
					<CollapsibleContent className="p-4 pt-0">
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormControl>
									<Textarea
										className="min-h-[100px] border-muted bg-muted/20"
										{...field}
									/>
								</FormControl>
							)}
						/>
					</CollapsibleContent>
				</Collapsible>

				{/* Organization */}
				<Card className="mx-4 border-muted/50 shadow-none">
					<CardContent className="space-y-4 pt-6">
						<h3 className="font-bold">{t("sections.organization")}</h3>
						<div className="space-y-1.5">
							<FormLabel className="font-semibold text-xs">
								{t("form.category.label")}
							</FormLabel>
							<Select>
								<SelectTrigger className="h-12 border-muted bg-muted/20">
									<SelectValue placeholder={t("form.category.placeholder")} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="uncategorized">Uncategorized</SelectItem>
								</SelectContent>
							</Select>
							<Button
								variant="link"
								className="h-auto p-0 font-medium text-primary text-xs"
							>
								<Icons.plus className="mr-1 h-3 w-3" />
								{t("form.category.create")}
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Has Options */}
				<Card className="mx-4 border-muted/50 shadow-none">
					<CardContent className="flex items-center justify-between pt-6">
						<div className="space-y-1">
							<h3 className="font-bold text-sm">{t("form.options.label")}</h3>
							<p className="text-muted-foreground/60 text-xs">
								{t("form.options.description")}
							</p>
						</div>
						<Switch />
					</CardContent>
				</Card>

				{/* Sticky Bottom Bar */}
				<div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background p-4">
					<div className="container flex max-w-lg gap-4">
						<Button
							variant="secondary"
							className="flex-1"
							onClick={() => onSubmit(false)}
						>
							{t("form.saveDraft")}
						</Button>
						<Button
							className="flex-1"
							disabled={createProductMutation.isPending || isUploading}
							onClick={() => onSubmit(true)}
						>
							{createProductMutation.isPending || isUploading ? (
								<Icons.spinner className="h-4 w-4 animate-spin" />
							) : (
								t("form.savePublish")
							)}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
