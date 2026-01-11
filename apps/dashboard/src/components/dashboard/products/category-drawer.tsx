"use client";

import type { CreateCategoryInput } from "@dukkani/common/schemas/category/input";
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
	DrawerTrigger,
} from "@dukkani/ui/components/drawer";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleAPIError } from "@/lib/error";
import { client, orpc } from "@/lib/orpc";

interface CategoryDrawerProps {
	storeId: string;
	onCategoryCreated?: (categoryId: string) => void;
}

export function CategoryDrawer({
	storeId,
	onCategoryCreated,
}: CategoryDrawerProps) {
	const t = useTranslations("products.create");
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const categoryForm = useForm<CreateCategoryInput>({
		resolver: zodResolver(createCategoryInputSchema),
		defaultValues: {
			name: "",
			storeId,
		},
	});

	const createCategoryMutation = useMutation({
		mutationFn: (input: CreateCategoryInput) => client.category.create(input),
		onSuccess: (newCategory) => {
			toast.success(t("form.category.created"));
			categoryForm.reset();
			setOpen(false);
			onCategoryCreated?.(newCategory.id);
			queryClient.invalidateQueries({
				queryKey: orpc.category.getAll.queryKey({ input: { storeId } }),
			});
		},
		onError: (error) => handleAPIError(error),
	});

	const onCategorySubmit = (values: CreateCategoryInput) => {
		createCategoryMutation.mutate(values);
	};

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="link"
					type="button"
					className="p-0 font-medium text-primary text-xs"
				>
					<Icons.plus className="mr-1 h-3 w-3" />
					{t("form.category.create")}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{t("form.category.create")}</DrawerTitle>
					<DrawerDescription>
						{t("form.category.createDescription")}
					</DrawerDescription>
				</DrawerHeader>

				<Form {...categoryForm}>
					<form onSubmit={categoryForm.handleSubmit(onCategorySubmit)}>
						<FormField
							control={categoryForm.control}
							name="name"
							render={({ field }) => (
								<FormItem className="px-4">
									<FormLabel>{t("form.category.nameLabel")}</FormLabel>
									<FormControl>
										<Input
											placeholder={t("form.category.namePlaceholder")}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DrawerFooter>
							<Button
								className="w-full"
								type="submit"
								disabled={createCategoryMutation.isPending}
							>
								{createCategoryMutation.isPending ? (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								) : null}
								{t("form.category.create")}
							</Button>
							<DrawerClose asChild>
								<Button variant="outline" type="button" className="w-full">
									{t("form.cancel")}
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</Form>
			</DrawerContent>
		</Drawer>
	);
}
