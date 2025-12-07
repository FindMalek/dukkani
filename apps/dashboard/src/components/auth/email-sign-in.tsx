"use client";

import {
	checkEmailExistsInputSchema,
	loginInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Input } from "@dukkani/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { useCheckEmailExists } from "@/hooks/api/use-check-email";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { RoutePaths } from "@/lib/routes";

interface EmailSignInProps {
	className?: string;
}

const emailSchema = checkEmailExistsInputSchema;
const passwordSchema = loginInputSchema.pick({ email: true, password: true });

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function EmailSignIn({ className }: EmailSignInProps) {
	const router = useRouter();
	const checkEmailMutation = useCheckEmailExists();

	const [step, setStep] = useState<"email" | "password" | "signup">("email");

	const emailForm = useForm<EmailFormValues>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: "" },
	});

	const passwordForm = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { email: "", password: "" },
	});

	const onEmailSubmit = async (values: EmailFormValues) => {
		try {
			const exists = await checkEmailMutation.mutateAsync({
				email: values.email,
			});

			if (exists) {
				// Existing user - show password field
				passwordForm.setValue("email", values.email);
				setStep("password");
			} else {
				// New user - redirect to onboarding with email
				const onboardingUrl = `${RoutePaths.AUTH.ONBOARDING.url}?email=${encodeURIComponent(values.email)}`;
				router.push(onboardingUrl);
			}
		} catch (error) {
			handleAPIError(error);
		}
	};

	const onPasswordSubmit = async (values: PasswordFormValues) => {
		await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onSuccess: () => {
					router.push(RoutePaths.DASHBOARD.url);
					toast.success("Sign in successful");
				},
				onError: (error) => {
					handleAPIError(error);
				},
			},
		);
	};

	return (
		<div className={`space-y-4 ${className || ""}`}>
			{/* Step 1: Email */}
			{step === "email" && (
				<Form {...emailForm}>
					<form
						onSubmit={emailForm.handleSubmit(onEmailSubmit)}
						className="space-y-4"
					>
						<FormField
							control={emailForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="h-11 w-full"
							disabled={checkEmailMutation.isPending}
						>
							{checkEmailMutation.isPending ? "Checking..." : "Continue"}
						</Button>
					</form>
				</Form>
			)}

			{/* Step 2: Password for existing user */}
			{step === "password" && (
				<Form {...passwordForm}>
					<form
						onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
						className="space-y-4"
					>
						<FormField
							control={passwordForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="email"
											placeholder="Enter your email"
											disabled
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={passwordForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									setStep("email");
									emailForm.reset();
								}}
							>
								Back
							</Button>
							<Button
								type="submit"
								className="h-11 flex-1"
								disabled={passwordForm.formState.isSubmitting}
							>
								{passwordForm.formState.isSubmitting
									? "Signing in..."
									: "Sign in"}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
}
