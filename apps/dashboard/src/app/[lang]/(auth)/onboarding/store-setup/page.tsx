"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	storeNotificationMethodEnum,
	UserOnboardingStep,
} from "@dukkani/common/schemas/enums";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { OnboardingStepper } from "@/components/dashboard/onboarding/onboarding-stepper";
import { AuthBackground } from "@/components/layout/auth-background";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default function StoreSetupPage() {
	const router = useRouter();
	const t = useTranslations("onboarding.storeSetup");

	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: (data) => {
			toast.success(t("success"));
			router.push(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.STORE_CONFIGURATION.url, {
					storeId: data.id,
				}),
			);
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const form = useSchemaForm({
		schema: createStoreOnboardingInputSchema,
		defaultValues: {
			name: "",
			notificationMethod: storeNotificationMethodEnum.EMAIL,
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: CreateStoreOnboardingInput) => {
			createStoreMutation.mutate(values);
		},
	});

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />

			<div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					{/* Progress Indicator */}
					<OnboardingStepper currentStep={UserOnboardingStep.STORE_SETUP} />

					<div className="space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							{t("title")}
						</h1>
						<p className="text-muted-foreground">{t("subtitle")}</p>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-6"
					>
						<form.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											{t("storeName.label")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											placeholder={t("storeName.placeholder")}
											autoFocus
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											className="h-12 text-lg"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="notificationMethod">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-4">
										<FieldLabel>{t("notifications.label")}</FieldLabel>
										<RadioGroup
											name={field.name}
											value={field.state.value}
											onValueChange={(value) =>
												field.handleChange(
													StoreEntity.valueToNotificationMethod(value),
												)
											}
											className="grid grid-cols-1 gap-4"
										>
											<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
												<RadioGroupItem
													value={storeNotificationMethodEnum.EMAIL}
													id="email"
													aria-invalid={isInvalid}
												/>
												<label
													htmlFor="email"
													className="flex flex-1 cursor-pointer flex-col"
												>
													<span className="font-medium">
														{t("notifications.options.email.label")}
													</span>
													<span className="font-normal text-muted-foreground text-xs">
														{t("notifications.options.email.description")}
													</span>
												</label>
											</div>

											<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
												<RadioGroupItem
													value={storeNotificationMethodEnum.TELEGRAM}
													id="telegram"
													aria-invalid={isInvalid}
												/>
												<label
													htmlFor="telegram"
													className="flex flex-1 cursor-pointer flex-col"
												>
													<span className="font-medium">
														{t("notifications.options.telegram.label")}
													</span>
													<span className="font-normal text-muted-foreground text-xs">
														{t("notifications.options.telegram.description")}
													</span>
												</label>
											</div>

											<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
												<RadioGroupItem
													value={storeNotificationMethodEnum.BOTH}
													id="both"
													aria-invalid={isInvalid}
												/>
												<label
													htmlFor="both"
													className="flex flex-1 cursor-pointer flex-col"
												>
													<span className="font-medium">
														{t("notifications.options.both.label")}
													</span>
													<span className="font-normal text-muted-foreground text-xs">
														{t("notifications.options.both.description")}
													</span>
												</label>
											</div>
										</RadioGroup>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<Button
							type="submit"
							className="h-12 w-full text-lg"
							isLoading={createStoreMutation.isPending}
						>
							{t("submit")}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
