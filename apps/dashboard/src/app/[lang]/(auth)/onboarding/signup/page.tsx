"use client";

import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
	type SignupInput,
	signupInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Alert, AlertDescription } from "@dukkani/ui/components/alert";
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
import { Spinner } from "@dukkani/ui/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { OnboardingStepper } from "@/components/dashboard/onboarding/onboarding-stepper";
import { AuthBackground } from "@/components/layout/auth-background";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { RoutePaths } from "@/lib/routes";

export default function SignupPage() {
	const t = useTranslations("onboarding.signup");
	const router = useRouter();
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email");
	const hasEmail = !!emailFromQuery;

	const form = useForm<SignupInput>({
		resolver: zodResolver(signupInputSchema),
		defaultValues: {
			name: "",
			email: emailFromQuery || "",
			password: "",
		},
	});

	const onSubmit = async (values: SignupInput) => {
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
	};

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
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="space-y-1.5">
										<FormLabel className="text-muted-foreground">
											{t("name.label")}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={t("name.placeholder")}
												autoFocus={hasEmail}
												{...field}
												className="h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="space-y-1.5">
										<FormLabel className="text-muted-foreground">
											{t("email.label")}
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												readOnly={hasEmail}
												placeholder={t("email.placeholder")}
												autoFocus={!hasEmail}
												{...field}
												className={
													hasEmail
														? "h-12 cursor-not-allowed border-muted-foreground/10 bg-muted/30 text-muted-foreground"
														: "h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
												}
											/>
										</FormControl>
										{hasEmail ? (
											<p className="px-1 text-[10px] text-muted-foreground italic">
												{t("email.description")}
											</p>
										) : null}
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="space-y-1.5">
										<FormLabel className="text-muted-foreground">
											{t("password.label")}
										</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder={t("password.placeholder")}
												{...field}
												className="h-12 border-muted-foreground/20 bg-muted/5 focus-visible:ring-primary"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="h-12 w-full font-semibold text-base transition-all hover:opacity-90 active:scale-[0.98]"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Spinner className="mr-2 h-4 w-4" />
								) : (
									t("submit")
								)}
							</Button>
						</form>
					</Form>

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
