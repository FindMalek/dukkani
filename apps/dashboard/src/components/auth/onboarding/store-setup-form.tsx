"use client";

import { storeNotificationMethodEnum } from "@dukkani/common/schemas/enums";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

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
		const options = useMemo(
			() => [
				{
					label: t("notifications.options.email.label"),
					description: t("notifications.options.email.description"),
					value: storeNotificationMethodEnum.EMAIL,
				},
				{
					label: t("notifications.options.telegram.label"),
					description: t("notifications.options.telegram.description"),
					value: storeNotificationMethodEnum.TELEGRAM,
				},
				{
					label: t("notifications.options.both.label"),
					description: t("notifications.options.both.description"),
					value: storeNotificationMethodEnum.BOTH,
				},
			],
			[t],
		);
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
								{(field) => (
									<field.RadioGroupInput
										label={t("notifications.label")}
										as="cards"
										options={options}
									/>
								)}
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
