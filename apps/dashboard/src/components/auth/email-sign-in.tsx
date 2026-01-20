"use client";

import {
	type CheckEmailExistsInput,
	checkEmailExistsInputSchema,
	type LoginInput,
	loginInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Input } from "@dukkani/ui/components/input";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCheckEmailExists } from "@/hooks/api/use-check-email.hook";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

interface EmailSignInProps {
	className?: string;
}

export function EmailSignIn({ className }: EmailSignInProps) {
	const router = useRouter();
	const t = useTranslations("auth.emailSignIn");
	const checkEmailMutation = useCheckEmailExists();

	const [step, setStep] = useState<"email" | "password">("email");

	const emailForm = useSchemaForm({
		schema: checkEmailExistsInputSchema,
		defaultValues: { email: "" },
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: CheckEmailExistsInput) => {
			try {
				const exists = await checkEmailMutation.mutateAsync({
					email: values.email,
				});

				if (exists) {
					passwordForm.setFieldValue("email", values.email);
					setStep("password");
				} else {
					const onboardingUrl = getRouteWithQuery(
						RoutePaths.AUTH.ONBOARDING.INDEX.url,
						{
							email: values.email,
						},
					);
					router.push(onboardingUrl);
				}
			} catch (error) {
				handleAPIError(error);
			}
		},
	});

	const passwordForm = useSchemaForm({
		schema: loginInputSchema,
		defaultValues: { email: "", password: "", rememberMe: false },
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: LoginInput) => {
			await authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					rememberMe: values.rememberMe,
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
		<div className={`space-y-4 ${className || ""}`}>
			{/* Step 1: Email */}
			{step === "email" && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						emailForm.handleSubmit();
					}}
					className="space-y-4"
				>
					<emailForm.Field name="email">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										placeholder={t("email.placeholder")}
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</emailForm.Field>

					<Button
						type="submit"
						className="h-11 w-full"
						isLoading={checkEmailMutation.isPending}
					>
						{t("continue")}
					</Button>
				</form>
			)}

			{/* Step 2: Password for existing user */}
			{step === "password" && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						passwordForm.handleSubmit();
					}}
					className="space-y-4"
				>
					<passwordForm.Field name="email">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<Input
										id={field.name}
										name={field.name}
										type="email"
										placeholder={t("email.placeholder")}
										disabled
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</passwordForm.Field>

					<passwordForm.Field name="password">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field data-invalid={isInvalid}>
									<Input
										id={field.name}
										name={field.name}
										type="password"
										placeholder={t("password.placeholder")}
										value={field.state.value ?? ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
									/>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</passwordForm.Field>

					<passwordForm.Field name="rememberMe">
						{(field) => {
							const isInvalid =
								field.state.meta.isTouched && !field.state.meta.isValid;
							return (
								<Field
									orientation="horizontal"
									data-invalid={isInvalid}
									className="flex flex-row items-start space-x-3 space-y-0"
								>
									<Checkbox
										id={field.name}
										name={field.name}
										checked={field.state.value ?? false}
										onCheckedChange={field.handleChange}
										aria-invalid={isInvalid}
									/>
									<div className="space-y-1 leading-none">
										<FieldLabel
											htmlFor={field.name}
											className="cursor-pointer font-normal text-sm"
										>
											{t("rememberMe")}
										</FieldLabel>
									</div>
									{isInvalid && <FieldError errors={field.state.meta.errors} />}
								</Field>
							);
						}}
					</passwordForm.Field>

					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								setStep("email");
								emailForm.reset();
							}}
						>
							{t("back")}
						</Button>
						<Button
							type="submit"
							className="h-11 flex-1"
							disabled={passwordForm.state.isSubmitting}
						>
							{passwordForm.state.isSubmitting && <Spinner />}
							{t("signIn")}
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
