"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Input } from "@dukkani/ui/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCheckEmailExists } from "@/hooks/api/use-check-email";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/lib/routes";

interface EmailSignInProps {
	className?: string;
}

// Step 1: Email only
const emailSchema = z.object({
	email: z.email("Invalid email address"),
});

// Step 2a: Password for existing user
const passwordSchema = z.object({
	email: z.email(),
	password: z.string().min(1, "Password is required"),
});

// Step 2b: Name + Password for new user
const signupSchema = z.object({
	email: z.email(),
	name: z.string().min(2, "Name must be at least 2 characters"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function EmailSignIn({ className }: EmailSignInProps) {
	const router = useRouter();
	const checkEmailMutation = useCheckEmailExists();

	const [email, setEmail] = useState("");
	const [step, setStep] = useState<"email" | "password" | "signup">("email");

	const emailForm = useForm<EmailFormValues>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: "" },
	});

	const passwordForm = useForm<PasswordFormValues>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { email: "", password: "" },
	});

	const signupForm = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", name: "", password: "" },
	});

	const onEmailSubmit = async (values: EmailFormValues) => {
		try {
			const exists = await checkEmailMutation.mutateAsync({
				email: values.email,
			});

			setEmail(values.email);

			if (exists) {
				// Existing user - show password field
				passwordForm.setValue("email", values.email);
				setStep("password");
			} else {
				// New user - show signup form
				signupForm.setValue("email", values.email);
				setStep("signup");
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to check email. Please try again.");
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
					toast.error(error.error.message || error.error.statusText);
				},
			},
		);
	};

	const onSignupSubmit = async (values: SignupFormValues) => {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onSuccess: () => {
					router.push(RoutePaths.AUTH.ONBOARDING.url);
					toast.success("Account created successfully");
				},
				onError: (error) => {
					toast.error(error.error.message || error.error.statusText);
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
									<FormLabel>Email</FormLabel>
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

			{/* Step 2a: Password for existing user */}
			{step === "password" && (
				<Form {...passwordForm}>
					<form
						onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
						className="space-y-4"
					>
						<div className="text-muted-foreground text-sm">
							Signing in as {email}
						</div>

						<FormField
							control={passwordForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
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

			{/* Step 2b: Signup for new user */}
			{step === "signup" && (
				<Form {...signupForm}>
					<form
						onSubmit={signupForm.handleSubmit(onSignupSubmit)}
						className="space-y-4"
					>
						<div className="text-muted-foreground text-sm">
							Create account for {email}
						</div>

						<FormField
							control={signupForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter your name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={signupForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Create a password"
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
								disabled={signupForm.formState.isSubmitting}
							>
								{signupForm.formState.isSubmitting
									? "Creating account..."
									: "Create account"}
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
}
