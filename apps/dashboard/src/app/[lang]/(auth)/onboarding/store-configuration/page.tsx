"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	storeCategoryEnum,
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
	FormMessage,
} from "@dukkani/ui/components/form";
import { Icons } from "@dukkani/ui/components/icons";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingStepper } from "@/components/dashboard/onboarding/onboarding-stepper";
import { AuthBackground } from "@/components/layout/auth-background";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default function StoreConfigurationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const storeId = searchParams.get("storeId");
	const t = useTranslations("onboarding.storeConfiguration");

	const form = useForm<ConfigureStoreOnboardingInput>({
		resolver: zodResolver(configureStoreOnboardingInputSchema),
		defaultValues: {
			storeId: storeId || "",
			theme: storeThemeEnum.MODERN,
			category: undefined,
		},
	});

	const configureStoreMutation = useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: () => {
			toast.success(t("success"));
			router.push(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.COMPLETE.url, {
					storeId: form.getValues("storeId"),
				}),
			);
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const onSubmit = async (values: ConfigureStoreOnboardingInput) => {
		if (!values.storeId) {
			toast.error("Store ID is required");
			return;
		}
		configureStoreMutation.mutate(values);
	};

	if (!storeId) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<p className="text-muted-foreground">Store ID is required</p>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />

			<div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					{/* Progress Indicator */}
					<OnboardingStepper
						currentStep={UserOnboardingStep.STORE_CONFIGURED}
					/>

					<div className="space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							{t("title")}
						</h1>
						<p className="text-muted-foreground">{t("subtitle")}</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem className="space-y-4">
										<FormLabel>{t("category.label")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) => {
													field.onChange(
														value as (typeof storeCategoryEnum)[keyof typeof storeCategoryEnum],
													);
												}}
												value={field.value}
												className="grid grid-cols-1 gap-4"
											>
												{Object.values(storeCategoryEnum).map((category) => (
													<div
														key={category}
														className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
													>
														<RadioGroupItem value={category} id={category} />
														<label
															htmlFor={category}
															className="flex flex-1 cursor-pointer flex-col"
														>
															<span className="font-medium">
																{t(StoreEntity.getCategoryLabelKey(category))}
															</span>
															<span className="font-normal text-muted-foreground text-xs">
																{t(
																	StoreEntity.getCategoryDescriptionKey(
																		category,
																	),
																)}
															</span>
														</label>
													</div>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="theme"
								render={({ field }) => (
									<FormItem className="space-y-4">
										<FormLabel>{t("theme.label")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) => {
													field.onChange(
														value as (typeof storeThemeEnum)[keyof typeof storeThemeEnum],
													);
												}}
												value={field.value}
												className="grid grid-cols-2 gap-4"
											>
												{Object.values(storeThemeEnum).map((theme) => (
													<div
														key={theme}
														className="flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
													>
														<RadioGroupItem value={theme} id={theme} />
														<label
															htmlFor={theme}
															className="flex cursor-pointer flex-col items-center text-center"
														>
															<span className="font-medium text-sm">
																{t(StoreEntity.getThemeLabelKey(theme))}
															</span>
															<span className="font-normal text-muted-foreground text-xs">
																{t(StoreEntity.getThemeDescriptionKey(theme))}
															</span>
														</label>
													</div>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full text-lg"
								disabled={configureStoreMutation.isPending}
							>
								{configureStoreMutation.isPending ? (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
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
