"use client";

import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
	type SignupInput,
	signupInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Alert, AlertDescription } from "@dukkani/ui/components/alert";
import { Button } from "@dukkani/ui/components/button";
import { Field, FieldError, FieldLabel } from "@dukkani/ui/components/field";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useSchemaForm } from "@dukkani/ui/hooks/use-schema-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "sonner";
import { OnboardingStepper } from "@/components/app/onboarding/onboarding-stepper";
import { AuthBackground } from "@/components/layout/auth-background";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { RoutePaths } from "@/lib/routes";

export default function SignupPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const t = useTranslations("onboarding.signup");

	const emailFromQuery = searchParams.get("email");
	const hasEmail = !!emailFromQuery;

	const form = useSchemaForm({
		schema: signupInputSchema,
		defaultValues: {
			name: "",
			email: emailFromQuery || "",
			password: "",
		},
		validationMode: ["onBlur", "onSubmit"],
		onSubmit: async (values: SignupInput) => {
			try {
				await authClient.signUp.email({
					email: values.email,
					password: values.password,
					name: values.name,
				});

				toast.success(t("success"));
				router.push(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
			} catch (error) {
				handleAPIError(error);
			}
		},
	});

	const { setFieldValue } = form;

	useEffect(() => {
		if (emailFromQuery) {
			setFieldValue("email", emailFromQuery);
		}
	}, [emailFromQuery, setFieldValue]);

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />

			<div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12">
				<div className="flex w-full max-w-md flex-col gap-10">
					{/* Progress Indicator */}
					<OnboardingStepper currentStep={UserOnboardingStep.STORE_SETUP} />

					{/* Header Section */}
					<div className="space-y-3 text-center">
						<Icons.logo className="mx-auto size-12 text-primary" />
						<div className="space-y-1">
							<h1 className="font-bold text-2xl tracking-tight">
								{t("title")}
							</h1>
							<p className="text-muted-foreground text-sm">{t("subtitle")}</p>
						</div>
					</div>

					{/* Missing Email Warning */}
					{!hasEmail && (
						<Alert
							variant="default"
							className="border-yellow-500/50 bg-yellow-500/10"
						>
							<Icons.alertCircle className="h-4 w-4 text-yellow-600" />
							<AlertDescription className="text-sm text-yellow-800">
								{t("email.missingWarning")}
							</AlertDescription>
						</Alert>
					)}

					{/* Form Section */}
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
						className="space-y-6"
					>
						<form.Field name="name">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-1.5">
										<FieldLabel
											htmlFor={field.name}
											className="text-muted-foreground"
										>
											{t("name.label")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											placeholder={t("name.placeholder")}
											autoFocus={hasEmail}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											className="h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="email">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-1.5">
										<FieldLabel
											htmlFor={field.name}
											className="text-muted-foreground"
										>
											{t("email.label")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											readOnly={hasEmail}
											placeholder={t("email.placeholder")}
											autoFocus={!hasEmail}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											className={
												hasEmail
													? "h-12 cursor-not-allowed border-muted-foreground/10 bg-muted/30 text-muted-foreground"
													: "h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
											}
										/>
										{hasEmail ? (
											<p className="px-1 text-[10px] text-muted-foreground italic">
												{t("email.description")}
											</p>
										) : null}
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<form.Field name="password">
							{(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid} className="space-y-1.5">
										<FieldLabel
											htmlFor={field.name}
											className="text-muted-foreground"
										>
											{t("password.label")}
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="password"
											placeholder={t("password.placeholder")}
											value={field.state.value ?? ""}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											className="h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						</form.Field>

						<Button
							type="submit"
							className="h-12 w-full font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]"
							disabled={form.state.isSubmitting}
						>
							{form.state.isSubmitting ? (
								<Spinner className="mr-2 h-4 w-4" />
							) : (
								t("submit")
							)}
						</Button>
					</form>

					{/* Footer Links */}
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
				</div>
			</div>
		</div>
	);
}
