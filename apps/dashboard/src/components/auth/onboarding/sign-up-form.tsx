"use client";

import { signupInputSchema } from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { Icons } from "@dukkani/ui/components/icons";
import { withForm } from "@dukkani/ui/hooks/use-app-form";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { RoutePaths } from "@/lib/routes";

export const SignUpOnboardingForm = withForm({
	defaultValues: {
		name: "",
		email: "",
		password: "",
	},
	validators: {
		onChangeAsync: signupInputSchema,
	},
	render: function RenderForm({ form }) {
		const t = useTranslations("onboarding.signup");
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
								{(field) => <field.TextInput label="Name" placeholder="Name" />}
							</form.AppField>
							<form.AppField name="email">
								{(field) => (
									<field.EmailInput
										label="Email"
										placeholder="Email"
										disabled={!!form.state.values.email}
										autoComplete="email"
									/>
								)}
							</form.AppField>
							<form.AppField name="password">
								{(field) => (
									<field.PasswordInput
										label="Password"
										placeholder="Password"
										autoComplete="new-password"
									/>
								)}
							</form.AppField>
							<Button type="submit">Sign Up</Button>
						</FieldGroup>
					</form.AppForm>
				</Form>
				<div className="space-y-6 pt-4 text-center">
					<p className="text-sm">
						<span className="text-muted-foreground">
							{t("alreadyHaveAccount")}{" "}
						</span>
						<Link
							href={RoutePaths.AUTH.LOGIN.url}
							className="font-semibold text-primary underline-offset-4 hover:underline"
						>
							{t("login")}
						</Link>
					</p>

					<p className="mx-auto max-w-[280px] text-[11px] text-muted-foreground leading-relaxed">
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
