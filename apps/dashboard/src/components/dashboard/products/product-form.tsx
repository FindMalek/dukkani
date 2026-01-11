"use client";

import {
	type CreateProductInput,
	createProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@dukkani/ui/components/accordion";
import { Button } from "@dukkani/ui/components/button";
import { ButtonGroup } from "@dukkani/ui/components/button-group";
import { Card, CardContent } from "@dukkani/ui/components/card";
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
import { Separator } from "@dukkani/ui/components/separator";
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
				className="flex flex-col gap-4 px-2 pb-24"
			>
				{/* Product Photos */}
				<section>
					<h3 className="mb-3 font-semibold text-sm">{t("sections.photos")}</h3>
					<div className="scrollbar-hide flex gap-3 overflow-x-auto">
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
				<Card className="bg-muted-foreground/5 py-2 shadow-none">
					<CardContent className="space-y-4 px-4">
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
										<Input {...field} />
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

						<Separator />

						<FormField
							control={form.control}
							name="stock"
							render={({ field }) => (
								<FormItem className="flex items-center justify-between">
									<FormLabel className="font-semibold text-sm">
										{t("form.stock.label")}
									</FormLabel>
									<ButtonGroup orientation="horizontal">
										<Button
											variant="outline"
											size="icon"
											className="bg-muted-foreground/5"
											onClick={() =>
												field.onChange(Math.max(0, field.value - 1))
											}
										>
											<Icons.minus className="size-4" />
										</Button>
										<Input
											type="number"
											className="w-16 rounded-none border-x-0 bg-muted-foreground/5 text-center"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
										<Button
											variant="outline"
											size="icon"
											className="bg-muted-foreground/5"
											onClick={() => field.onChange(field.value + 1)}
										>
											<Icons.plus className="size-4" />
										</Button>
									</ButtonGroup>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				{/* Description Accordion */}
				<Accordion type="single" collapsible>
					<AccordionItem
						value="description"
						className="rounded-xl border bg-muted-foreground/5 shadow-none"
					>
						<AccordionTrigger className="px-4 font-bold text-sm">
							{t("form.description.label")} (optional)
						</AccordionTrigger>
						<AccordionContent className="px-2">
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormControl>
										<Textarea className="min-h-[100px]" {...field} />
									</FormControl>
								)}
							/>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* Organization */}
				<Card className="bg-muted-foreground/5 py-2 shadow-none">
					<CardContent className="space-y-4 px-4">
						<h3 className="font-bold">{t("sections.organization")}</h3>
						<div className="space-y-1.5">
							<FormLabel className="font-semibold text-xs">
								{t("form.category.label")}
							</FormLabel>
							<Select>
								<SelectTrigger className="w-full">
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
