"use client";

import {
	type CheckEmailExistsInput,
	checkEmailExistsInputSchema,
	type LoginInput,
	loginInputSchema,
} from "@dukkani/common/schemas/user/input";
import { Button } from "@dukkani/ui/components/button";
import { Checkbox } from "@dukkani/ui/components/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@dukkani/ui/components/form";
import { Input } from "@dukkani/ui/components/input";
import { Spinner } from "@dukkani/ui/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCheckEmailExists } from "@/hooks/api/use-check-email";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { getRouteWithQuery, RoutePaths } from "@/lib/routes";

interface EmailSignInProps {
	className?: string;
}

export function EmailSignIn({ className }: EmailSignInProps) {
	const router = useRouter();
	const checkEmailMutation = useCheckEmailExists();

	const [step, setStep] = useState<"email" | "password">("email");

	const emailForm = useForm<CheckEmailExistsInput>({
		resolver: zodResolver(checkEmailExistsInputSchema),
		defaultValues: { email: "" },
	});

	const passwordForm = useForm<LoginInput>({
		resolver: zodResolver(loginInputSchema),
		defaultValues: { email: "", password: "", rememberMe: false },
	});

	const onEmailSubmit = async (values: CheckEmailExistsInput) => {
		try {
			const exists = await checkEmailMutation.mutateAsync({
				email: values.email,
			});

			if (exists) {
				passwordForm.setValue("email", values.email);
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
	};

	const onPasswordSubmit = async (values: LoginInput) => {
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
							{checkEmailMutation.isPending && <Spinner />}
							Continue
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

						<FormField
							control={passwordForm.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel className="cursor-pointer font-normal text-sm">
											Remember me
										</FormLabel>
									</div>
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
								{passwordForm.formState.isSubmitting && <Spinner />}
								Sign in
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
}
