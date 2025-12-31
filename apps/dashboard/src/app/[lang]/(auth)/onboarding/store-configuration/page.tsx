"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	type StoreTheme,
	storeThemeEnum,
	UserOnboardingStep,
} from "@dukkani/common/schemas/enums";
import {
	type ConfigureStoreOnboardingInput,
	configureStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { Spinner } from "@dukkani/ui/components/spinner";
import { cn } from "@dukkani/ui/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategorySelector } from "@/components/dashboard/onboarding/category-selector";
import { OnboardingStepper } from "@/components/dashboard/onboarding/onboarding-stepper";
import { THEME_PREVIEWS } from "@/components/dashboard/onboarding/theme-previews";
import { AuthBackground } from "@/components/layout/auth-background";
import { handleAPIError } from "@/lib/error";
import { client, orpc } from "@/lib/orpc";

import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default function StoreConfigurationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlStoreId = searchParams.get("storeId");
	const t = useTranslations("onboarding.storeConfiguration");

	// Fetch stores if storeId is missing
	const { data: stores, isLoading: isLoadingStores } = useQuery({
		...orpc.store.getAll.queryOptions({ input: undefined }),
		enabled: !urlStoreId, // Only fetch if storeId is missing
	});

	// Determine the storeId to use
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

	const form = useForm<ConfigureStoreOnboardingInput>({
		resolver: zodResolver(configureStoreOnboardingInputSchema),
		defaultValues: {
			storeId: storeId || "",
			theme: storeThemeEnum.MODERN,
		},
	});

	// Update form when storeId is determined
	useEffect(() => {
		if (storeId) {
			form.setValue("storeId", storeId);
		}
	}, [storeId, form]);

	const configureStoreMutation = useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: () => {
			toast.success(t("success"));
			router.push(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.COMPLETE.url, {
					storeId: storeId!,
				}),
			);
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

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

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit((v) =>
								configureStoreMutation.mutate(v),
							)}
							className="space-y-8"
						>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel className="font-medium text-sm">
											{t("category.label")}
										</FormLabel>
										<FormControl>
											<CategorySelector
												value={field.value}
												onChange={field.onChange}
												t={t}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="theme"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel className="font-medium text-sm">
											{t("theme.label")}
										</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												value={field.value}
												className="grid grid-cols-2 gap-3"
											>
												{Object.values(storeThemeEnum).map((theme) => {
													const Preview = THEME_PREVIEWS[theme as StoreTheme];
													const isActive = field.value === theme;
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
															/>
															<Preview />
															<div className="flex items-center justify-between px-1">
																<span className="font-medium text-xs">
																	{
																		t(
																			StoreEntity.getThemeLabelKey(
																				theme as StoreTheme,
																			),
																		).split(" ")[0]
																	}
																</span>
																{isActive && (
																	<Icons.check className="h-3 w-3 text-primary" />
																)}
															</div>
														</label>
													);
												})}
											</RadioGroup>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full font-medium text-base"
								disabled={configureStoreMutation.isPending}
							>
								{configureStoreMutation.isPending ? (
									<Icons.spinner className="h-4 w-4 animate-spin" />
								) : (
									t("submit")
								)}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
