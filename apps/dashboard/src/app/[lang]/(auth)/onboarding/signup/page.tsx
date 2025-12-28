"use client";

import {
	type CreateUserInput,
	createUserInputSchema,
} from "@dukkani/common/schemas/user/input";
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
import { AuthBackground } from "@/components/layout/auth-background";
import { authClient } from "@/lib/auth-client";
import { handleAPIError } from "@/lib/error";
import { RoutePaths } from "@/lib/routes";

export default function SignupPage() {
	const t = useTranslations("onboarding.signup");
	const router = useRouter();
	const searchParams = useSearchParams();
	const emailFromQuery = searchParams.get("email");

	const form = useForm<CreateUserInput>({
		resolver: zodResolver(createUserInputSchema),
		defaultValues: {
			name: "",
			email: emailFromQuery || "",
			password: "",
		},
	});

	const onSubmit = async (values: CreateUserInput) => {
		try {
			await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: values.name,
			});

			toast.success(t("success"));
			// After signup, user is automatically logged in
			// Redirect to store setup
			router.push(RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url);
		} catch (error) {
			handleAPIError(error);
		}
	};

	return (
		<div className="flex min-h-screen bg-background">
			{/* Left Side - Branded Background */}
			<AuthBackground />

			{/* Right Side - Signup Form */}
			<div className="flex w-full flex-col items-center justify-center p-8 pb-2 lg:w-1/2 lg:p-12">
				<div className="flex h-full w-full max-w-md flex-col">
					<div className="flex flex-1 flex-col justify-center space-y-8">
						{/* Header */}
						<div className="space-y-2 text-center">
							<Icons.logo className="mx-auto size-10" />
							<h1 className="font-semibold text-lg">{t("title")}</h1>
							<p className="font-sans text-[#878787] text-sm">
								{t("subtitle")}
							</p>
						</div>

						{/* Form */}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-5"
							>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[#878787]">
												{t("name.label")}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={t("name.placeholder")}
													autoFocus
													{...field}
													className="h-12 bg-muted/30 text-lg focus:bg-background"
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
										<FormItem>
											<FormLabel className="text-[#878787]">
												{t("email.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder={t("email.placeholder")}
													{...field}
													className="h-12 bg-muted/30 text-lg focus:bg-background"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-[#878787]">
												{t("password.label")}
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder={t("password.placeholder")}
													{...field}
													className="h-12 bg-muted/30 text-lg focus:bg-background"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<Button
									type="submit"
									className="h-12 w-full text-lg shadow-lg shadow-primary/10 transition-all active:scale-[0.98]"
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

						{/* Login Link */}
						<div className="text-center text-sm">
							<span className="text-[#878787]">{t("alreadyHaveAccount")} </span>
							<Link
								href={RoutePaths.AUTH.LOGIN.url}
								className="font-medium text-primary hover:underline"
							>
								{t("login")}
							</Link>
						</div>
					</div>

					{/* Terms and Privacy Policy - Bottom aligned */}
					<div className="mt-auto pt-8 text-center">
						<p className="font-sans text-[#878787] text-xs">
							By signing up you agree to our{" "}
							<Link
								href="/terms"
								className="text-[#878787] underline transition-colors hover:text-foreground"
							>
								Terms of service
							</Link>{" "}
							&{" "}
							<Link
								href="/policy"
								className="text-[#878787] underline transition-colors hover:text-foreground"
							>
								Privacy policy
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
