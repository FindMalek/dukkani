"use client";

import { signupInputSchema } from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import { formOptions } from "@tanstack/react-form";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

export const signUpOnboardingFormDefaultValues = (email = "") =>
	formOptions({
		defaultValues: {
			name: "",
			email: email,
			password: "",
		},
		validators: {
			onBlur: signupInputSchema,
			onSubmit: signupInputSchema,
		},
	});

export const SignUpOnboardingForm = withForm({
	...signUpOnboardingFormDefaultValues(),
	render: function RenderForm({ form }) {
		const t = useTranslations("onboarding.signup");
		const emailValue = form.getFieldValue("email");
		const hasEmailFromParams = !!emailValue;

		return (
			<>
				<div className="space-y-3 text-center">
					<Icons.logo className="mx-auto size-12 text-primary" />
					<div className="space-y-1">
						<h1 className="font-bold text-2xl tracking-tight">{t("title")}</h1>
						<p className="text-muted-foreground text-sm">{t("subtitle")}</p>
					</div>
				</div>
				<Form onSubmit={form.handleSubmit}>
					<form.AppForm>
						<FieldGroup>
							<form.AppField name="name">
								{(field) => (
									<field.TextInput
										label={t("name.label")}
										placeholder={t("name.placeholder")}
										autoComplete="name"
									/>
								)}
							</form.AppField>
							<form.AppField name="email">
								{(field) => (
									<>
										<field.EmailInput
											label={t("email.label")}
											placeholder={t("email.placeholder")}
											autoComplete="email"
											readOnly={hasEmailFromParams}
											disabled={hasEmailFromParams}
										/>
									</>
								)}
							</form.AppField>
							<form.AppField name="password">
								{(field) => (
									<field.PasswordInput
										label={t("password.label")}
										placeholder={t("password.placeholder")}
										autoComplete="new-password"
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
				<div className="space-y-6 pt-4 text-center">
					<p className="text-sm">
						<span className="text-muted-foreground">
							{t("alreadyHaveAccount")}{" "}
						</span>
						<Button asChild variant={"link"}>
							<Link href={RoutePaths.AUTH.LOGIN.url}>{t("login")}</Link>
						</Button>
					</p>

					<p className="mx-auto max-w-xs text-muted-foreground text-xs leading-relaxed">
						{t("agreeText")}{" "}
						<Link href="/terms" className="underline hover:text-foreground">
							{t("terms")}
						</Link>{" "}
						{t("and")}{" "}
						<Link href="/policy" className="underline hover:text-foreground">
							{t("privacy")}
						</Link>
					</p>
				</div>
			</>
		);
	},
});
