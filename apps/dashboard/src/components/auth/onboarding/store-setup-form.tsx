"use client";

import { StoreEntity } from "@dukkani/common/entities/store/entity";
import { storeNotificationMethodEnum } from "@dukkani/common/schemas/enums";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Field,
	FieldErrors,
	FieldGroup,
	FieldLabel,
} from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useTranslations } from "next-intl";

export const storeSetupFormDefaultOptions = formOptions({
	defaultValues: {
		name: "",
		description: "",
		notificationMethod: storeNotificationMethodEnum.EMAIL,
	} as CreateStoreOnboardingInput,
	validators: {
		onBlur: createStoreOnboardingInputSchema,
		onSubmit: createStoreOnboardingInputSchema,
	},
});

export const StoreSetupOnboardingForm = withForm({
	...storeSetupFormDefaultOptions,
	render: function RenderForm({ form }) {
		const t = useTranslations("onboarding.storeSetup");
		return (
			<>
				<div className="space-y-2 text-center">
					<h1 className="font-semibold text-2xl tracking-tight">
						{t("title")}
					</h1>
					<p className="text-muted-foreground">{t("subtitle")}</p>
				</div>
				<Form onSubmit={form.handleSubmit}>
					<form.AppForm>
						<FieldGroup>
							<form.AppField name="name">
								{(field) => (
									<field.TextInput
										label={t("storeName.label")}
										placeholder={t("storeName.placeholder")}
										autoFocus
									/>
								)}
							</form.AppField>
							<form.AppField name="notificationMethod">
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
											<FieldErrors
												errors={field.state.meta.errors}
												match={isInvalid}
											/>
										</Field>
									);
								}}
							</form.AppField>
							<Button type="submit">{t("submit")}</Button>
						</FieldGroup>
					</form.AppForm>
				</Form>
			</>
		);
	},
});
