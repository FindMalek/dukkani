"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	type StoreTheme,
	storeCategoryEnum,
	storeThemeEnum,
} from "@dukkani/common/schemas";
import {
	type ConfigureStoreOnboardingInput,
	configureStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Field,
	FieldErrors,
	FieldGroup,
	FieldLabel,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { cn } from "@dukkani/ui/lib/utils";
import { formOptions } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { CategorySelector } from "@/components/app/onboarding/category-selector";
import { THEME_PREVIEWS } from "@/components/app/onboarding/theme-previews";

export const storeConfigurationFormDefaultValues = formOptions({
	defaultValues: {
		theme: storeThemeEnum.MODERN,
		category: storeCategoryEnum.FASHION,
	} as Omit<ConfigureStoreOnboardingInput, "storeId">,
	validators: {
		onBlur: configureStoreOnboardingInputSchema.omit({ storeId: true }),
		onSubmit: configureStoreOnboardingInputSchema.omit({ storeId: true }),
	},
});

export const StoreConfigurationOnboardingForm = withForm({
	...storeConfigurationFormDefaultValues,
	render: function RenderForm({ form }) {
		const t = useTranslations("onboarding.storeConfiguration");

		return (
			<>
				<div className="space-y-1">
					<h1 className="font-semibold text-2xl">{t("title")}</h1>
					<p className="text-muted-foreground text-sm">{t("subtitle")}</p>
				</div>
				<Form onSubmit={form.handleSubmit}>
					<form.AppForm>
						<FieldGroup>
							<form.AppField name="category">
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
											<FieldErrors
												errors={field.state.meta.errors}
												match={isInvalid}
											/>
										</Field>
									);
								}}
							</form.AppField>
							<form.AppField name="theme">
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
											<FieldErrors
												errors={field.state.meta.errors}
												match={isInvalid}
											/>
										</Field>
									);
								}}
							</form.AppField>
							<form.Subscribe>
								{(formState) => (
									<Button
										type="submit"
										disabled={formState.isSubmitting || !formState.canSubmit}
									>
										{t("submit")}
									</Button>
								)}
							</form.Subscribe>
						</FieldGroup>
					</form.AppForm>
				</Form>
			</>
		);
	},
});
