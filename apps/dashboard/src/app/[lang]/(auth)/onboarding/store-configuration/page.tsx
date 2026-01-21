"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	type StoreTheme,
	storeCategoryEnum,
	storeThemeEnum,
	UserOnboardingStep,
} from "@dukkani/common/schemas/enums";
import {
	type ConfigureStoreOnboardingInput,
	configureStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import { CategorySelector } from "@/components/app/onboarding/category-selector";
import { OnboardingStepper } from "@/components/app/onboarding/onboarding-stepper";
import { THEME_PREVIEWS } from "@/components/app/onboarding/theme-previews";
import { AuthBackground } from "@/components/layout/auth-background";
import { useStoresQuery } from "@/hooks/api/use-stores.hook";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";

import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default function StoreConfigurationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlStoreId = searchParams.get("storeId");
	const t = useTranslations("onboarding.storeConfiguration");

	// Fetch stores if storeId is missing
	const { data: stores, isLoading: isLoadingStores } = useStoresQuery(
		!urlStoreId,
	);
	const storeId = urlStoreId || stores?.[0]?.id;

	// Update URL if we found a storeId from stores but it's not in the URL
	useEffect(() => {
		if (!urlStoreId && storeId) {
			router.replace(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.STORE_CONFIGURATION.url, {
					storeId,
				}),
			);
		}
	}, [urlStoreId, storeId, router]);

	const configureStoreMutation = useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: () => {
			toast.success(t("success"));
			router.push(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.COMPLETE.url, {
					storeId,
				}),
			);
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const form = useSchemaForm({
		schema: configureStoreOnboardingInputSchema,
		defaultValues: {
			storeId: storeId || "",
			theme: storeThemeEnum.MODERN,
			category: storeCategoryEnum.FASHION,
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: ConfigureStoreOnboardingInput) => {
			configureStoreMutation.mutate(values);
		},
	});

	const { setFieldValue } = form;

	useEffect(() => {
		if (storeId) {
			setFieldValue("storeId", storeId);
		}
	}, [storeId, setFieldValue]);

	// Show loading state while fetching stores
	if (!storeId && isLoadingStores) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	// Redirect if no store found
	if (!storeId && !isLoadingStores) {
		router.replace(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
		return null;
	}

	// Don't render form until we have a storeId
	if (!storeId) {
		return null;
	}

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />
			<div className="flex w-full flex-col items-center p-6 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					<OnboardingStepper
						currentStep={UserOnboardingStep.STORE_CONFIGURED}
					/>

					<div className="space-y-1">
						<h1 className="font-semibold text-2xl">{t("title")}</h1>
						<p className="text-muted-foreground text-sm">{t("subtitle")}</p>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-8"
					>
						<form.Field name="category">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-3">
										<FieldLabel className="font-medium text-sm">
											{t("category.label")}
										</FieldLabel>
										<CategorySelector
											value={field.state.value}
											onChange={field.handleChange}
											t={t}
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="theme">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-3">
										<FieldLabel className="font-medium text-sm">
											{t("theme.label")}
										</FieldLabel>
										<RadioGroup
											name={field.name}
											value={field.state.value}
											onValueChange={(value) =>
												field.handleChange(StoreEntity.valueToTheme(value))
											}
											className="grid grid-cols-2 gap-3"
										>
											{Object.values(storeThemeEnum).map((theme) => {
												const Preview = THEME_PREVIEWS[theme as StoreTheme];
												const isActive = field.state.value === theme;
												return (
													<label
														key={theme}
														htmlFor={theme}
														className={cn(
															"relative flex cursor-pointer flex-col gap-2 rounded-xl border p-2 transition-all",
															isActive
																? "border-primary bg-primary/5"
																: "border-muted hover:border-muted-foreground/30",
														)}
													>
														<RadioGroupItem
															value={theme}
															id={theme}
															className="sr-only"
															aria-invalid={isInvalid}
														/>
														<Preview />
														<div className="flex items-center justify-between px-1">
															<span className="font-medium text-xs">
																{t(StoreEntity.getThemeLabelKey(theme))}
															</span>
															{isActive && (
																<Icons.check className="h-3 w-3 text-primary" />
															)}
														</div>
													</label>
												);
											})}
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
							className="h-12 w-full font-medium text-base"
							isLoading={configureStoreMutation.isPending}
						>
							{t("submit")}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
