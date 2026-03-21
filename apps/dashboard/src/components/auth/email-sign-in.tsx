"use client";

import { loginInputSchema } from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCheckEmailExists } from "@/hooks/api/use-check-email.hook";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

const emailFormSchema = loginInputSchema.pick({ email: true });

export function EmailSignIn({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const t = useTranslations("auth.emailSignIn");
	const checkEmailMutation = useCheckEmailExists();
	const [emailExists, setEmailExists] = useState<boolean | null>(null);

	const handleEmailExistenceCheck = async (email: string) => {
		try {
			const exists = await checkEmailMutation.mutateAsync({ email });

			if (!exists) {
				const onboardingUrl = getRouteWithQuery(
					RoutePaths.AUTH.ONBOARDING.INDEX.url,
					{
						email,
					},
				);
				router.push(onboardingUrl);
			} else {
				setEmailExists(true);
			}
		} catch (error) {
			handleAPIError(error);
		}
	};

	const emailForm = useAppForm({
		defaultValues: { email: "" },
		validators: {
			onChangeAsync: emailFormSchema,
			onChangeAsyncDebounceMs: 500,
		},
		async onSubmit({ value }) {
			await handleEmailExistenceCheck(value.email);
		},
	});

	const passwordForm = useAppForm({
		defaultValues: {
			email: emailForm.state.values.email,
			password: "",
			rememberMe: false,
		},
		validators: {
			onSubmit: loginInputSchema,
		},
		onSubmit({ value }) {
			return authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
					rememberMe: value.rememberMe,
				},
				{
					onSuccess: () => {
						router.push(RoutePaths.DASHBOARD.url);
					},
					onError: (error) => {
						handleAPIError(error);
					},
				},
			);
		},
	});

	return (
		<div className={cn("space-y-4", className)} {...props}>
			{emailExists === null ? (
				<Form className="space-y-4" onSubmit={emailForm.handleSubmit}>
					<FieldGroup>
						<emailForm.AppField name="email">
							{(field) => (
								<field.EmailInput
									label={t("email.label")}
									placeholder={t("email.placeholder")}
									autoFocus
								/>
							)}
						</emailForm.AppField>
						<emailForm.Subscribe>
							{(emailFormState) => (
								<Button type="submit" isLoading={emailFormState.isSubmitting}>
									{t("continue")}
								</Button>
							)}
						</emailForm.Subscribe>
					</FieldGroup>
				</Form>
			) : (
				<Form className="space-y-4" onSubmit={passwordForm.handleSubmit}>
					<FieldGroup>
						<passwordForm.AppField name="email">
							{(field) => (
								<field.EmailInput
									label={t("email.label")}
									placeholder={t("email.placeholder")}
									readOnly
								/>
							)}
						</passwordForm.AppField>
						<passwordForm.AppField name="password">
							{(field) => (
								<field.PasswordInput
									label={t("password.label")}
									placeholder={t("password.placeholder")}
									autoComplete="current-password"
								/>
							)}
						</passwordForm.AppField>
						<passwordForm.AppField name="rememberMe">
							{(field) => <field.CheckboxInput label={t("rememberMe")} />}
						</passwordForm.AppField>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								setEmailExists(null);
								emailForm.reset();
							}}
						>
							{t("back")}
						</Button>
						<passwordForm.Subscribe>
							{(passwordFormState) => (
								<Button
									type="submit"
									isLoading={passwordFormState.isSubmitting}
								>
									{t("signIn")}
								</Button>
							)}
						</passwordForm.Subscribe>
					</FieldGroup>
				</Form>
			)}
		</div>
	);
}
