"use client";

import { subscribeToLaunchInputSchema } from "@dukkani/common/schemas/store/input";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { Button } from "@dukkani/ui/components/button";
import { Field, FieldError } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";

interface ComingSoonProps {
	store: StorePublicOutput;
}

export function ComingSoon({ store }: ComingSoonProps) {
	const t = useTranslations("storefront.comingSoon");
	const [isSuccess, setIsSuccess] = useState(false);

	const subscribeMutation = useMutation({
		mutationFn: (input: { storeId: string; emailOrPhone: string }) =>
			client.store.subscribeToLaunch(input),
		onSuccess: () => {
			setIsSuccess(true);
			form.reset();
		},
		onError: handleAPIError,
	});

	const form = useSchemaForm({
		schema: subscribeToLaunchInputSchema,
		defaultValues: {
			storeId: store.id,
			emailOrPhone: "",
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values) => {
			subscribeMutation.mutate({
				storeId: values.storeId,
				emailOrPhone: values.emailOrPhone,
			});
		},
	});

	return (
		<div className="container mx-auto px-4 py-16">
			<div className="mx-auto max-w-md">
				{/* Store Name Box */}
				<div className="mb-8 rounded-lg border bg-card p-4 text-center">
					<h1 className="font-bold text-xl">{store.name}</h1>
				</div>

				{/* Main Heading */}
				<h2 className="mb-4 text-center font-bold text-3xl">{t("heading")}</h2>

				{/* Description */}
				<p className="mb-2 text-center text-muted-foreground">
					{t("description.line1")}
				</p>
				<p className="mb-8 text-center text-muted-foreground">
					{t("description.line2")}
				</p>

				{/* Form */}
				{isSuccess ? (
					<div className="rounded-lg border bg-muted/30 p-6 text-center">
						<p className="text-muted-foreground">{t("success")}</p>
					</div>
				) : (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-4"
					>
						<form.Field name="emailOrPhone">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<Input
											id={field.name}
											name={field.name}
											type="text"
											placeholder={t("input.placeholder")}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											disabled={subscribeMutation.isPending}
											aria-invalid={isInvalid}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<Button
							type="submit"
							disabled={subscribeMutation.isPending}
							className="w-full"
						>
							{subscribeMutation.isPending ? (
								<>
									<Icons.spinner className="mr-2 size-4 animate-spin" />
									{t("button.submitting")}
								</>
							) : (
								t("button.label")
							)}
						</Button>
					</form>
				)}

				{/* Privacy Note */}
				<div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground text-sm">
					<Icons.lock className="size-4" />
					<span>{t("privacy")}</span>
				</div>
			</div>
		</div>
	);
}
