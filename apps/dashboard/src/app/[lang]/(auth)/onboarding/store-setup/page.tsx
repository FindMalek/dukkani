"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	storeNotificationMethodEnum,
	storeThemeEnum,
	UserOnboardingStep,
} from "@dukkani/common/schemas/enums";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
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
import { Input } from "@dukkani/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingStepper } from "@/components/dashboard/onboarding/onboarding-stepper";
import { AuthBackground } from "@/components/layout/auth-background";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

export default function StoreSetupPage() {
	const router = useRouter();
	const t = useTranslations("onboarding.storeSetup");

	const form = useForm<CreateStoreOnboardingInput>({
		resolver: zodResolver(createStoreOnboardingInputSchema),
		defaultValues: {
			name: "",
			theme: storeThemeEnum.MODERN,
			notificationMethod: storeNotificationMethodEnum.EMAIL,
		},
	});

	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: (data) => {
			toast.success(t("success"));
			router.push(
				getRouteWithQuery(RoutePaths.AUTH.ONBOARDING.COMPLETE.url, {
					storeId: data.id,
				}),
			);
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const onSubmit = async (values: CreateStoreOnboardingInput) => {
		createStoreMutation.mutate(values);
	};

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

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t("storeName.label")}</FormLabel>
										<FormControl>
											<Input
												placeholder={t("storeName.placeholder")}
												autoFocus
												{...field}
												className="h-12 text-lg"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="notificationMethod"
								render={({ field }) => (
									<FormItem className="space-y-4">
										<FormLabel>{t("notifications.label")}</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={(value) =>
													field.onChange(
														StoreEntity.valueToNotificationMethod(value),
													)
												}
												defaultValue={field.value}
												className="grid grid-cols-1 gap-4"
											>
												<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
													<RadioGroupItem
														value={storeNotificationMethodEnum.EMAIL}
														id="email"
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
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full text-lg"
								disabled={createStoreMutation.isPending}
							>
								{createStoreMutation.isPending ? (
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
