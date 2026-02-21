"use client";

import {
	loginInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { FieldGroup } from "@dukkani/ui/components/field";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { cn } from "@dukkani/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCheckEmailExists } from "@/hooks/api/use-check-email.hook";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

const emailFormSchema = loginInputSchema.pick({ email: true });

export function EmailSignIn({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	const router = useRouter();
	const t = useTranslations("auth.emailSignIn");
	const checkEmailMutation = useCheckEmailExists();

	const handleEmailExistenceCheck = async (email: string) => {
		try {
			await checkEmailMutation.mutateAsync({ email });
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
		onSubmit({ value }) {
			return handleEmailExistenceCheck(value.email);
		},
		onSubmitInvalid({ value }) {
			const onboardingUrl = getRouteWithQuery(
				RoutePaths.AUTH.ONBOARDING.INDEX.url,
				{
					email: value.email,
				},
			);
			router.push(onboardingUrl);
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
			<emailForm.Subscribe>
				{(emailFormState) =>
					!emailFormState.isSubmitSuccessful ? (
						<Form className="space-y-4" onSubmit={emailForm.handleSubmit}>
							<FieldGroup>
								<emailForm.AppField name="email">
									{(field) => (
										<field.EmailInput placeholder={t("email.placeholder")} />
									)}
								</emailForm.AppField>
								<Button type="submit" isLoading={emailFormState.isSubmitting}>
									{t("continue")}
								</Button>
							</FieldGroup>
						</Form>
					) : (
						<Form className="space-y-4" onSubmit={passwordForm.handleSubmit}>
							<FieldGroup>
								<passwordForm.AppField name="email">
									{(field) => (
										<field.EmailInput
											placeholder={t("email.placeholder")}
											readOnly
										/>
									)}
								</passwordForm.AppField>
								<passwordForm.AppField name="password">
									{(field) => (
										<field.PasswordInput
											placeholder={t("password.placeholder")}
										/>
									)}
								</passwordForm.AppField>
								<passwordForm.AppField name="rememberMe">
									{(field) => <field.CheckboxInput label={t("rememberMe")} />}
								</passwordForm.AppField>
								<Button variant="outline" onClick={() => emailForm.reset()}>
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
					)
				}
			</emailForm.Subscribe>
		</div>
	);
}
