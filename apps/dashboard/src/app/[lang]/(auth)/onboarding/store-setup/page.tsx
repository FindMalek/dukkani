"use client";

import {
	StoreNotificationMethod,
	StoreNotificationTypeEnum,
} from "@dukkani/common/schemas/store/enums";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Label } from "@dukkani/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@dukkani/ui/components/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AuthBackground } from "@/components/layout/auth-background";
import { handleAPIError } from "@/lib/error";
import { orpc } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default function StoreSetupPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<CreateStoreOnboardingInput>({
		resolver: zodResolver(createStoreOnboardingInputSchema),
		defaultValues: {
			name: "",
			notificationMethod: StoreNotificationMethod.EMAIL,
		},
	});

	const createStoreMutation = orpc.store.create.useMutation({
		onSuccess: (data) => {
			toast.success("Store created successfully!");
			router.push(
				`${RoutePaths.AUTH.ONBOARDING.COMPLETE.url}?storeId=${data.id}`,
			);
		},
		onError: (error) => {
			handleAPIError(error);
			setIsLoading(false);
		},
	});

	const onSubmit = async (values: CreateStoreOnboardingInput) => {
		setIsLoading(true);
		createStoreMutation.mutate(values);
	};

	return (
		<div className="flex min-h-screen bg-background">
			<AuthBackground />

			<div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
				<div className="w-full max-w-md space-y-8">
					<div className="space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Create your store
						</h1>
						<p className="text-muted-foreground">
							Just one more step to get started
						</p>
					</div>

					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="name">Store Name</Label>
							<Input
								id="name"
								placeholder="My Awesome Store"
								autoFocus
								{...form.register("name")}
								className="h-12 text-lg"
							/>
							{form.formState.errors.name && (
								<p className="text-destructive text-sm">
									{form.formState.errors.name.message}
								</p>
							)}
						</div>

						<div className="space-y-4">
							<Label>How do you want to receive new order alerts?</Label>
							<RadioGroup
								defaultValue={form.getValues("notificationMethod")}
								onValueChange={(value) =>
									form.setValue(
										"notificationMethod",
										value as StoreNotificationMethod,
									)
								}
								className="grid grid-cols-1 gap-4"
							>
								<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
									<RadioGroupItem
										value={StoreNotificationTypeEnum.EMAIL}
										id="email"
									/>
									<Label
										htmlFor="email"
										className="flex flex-1 cursor-pointer flex-col"
									>
										<span className="font-medium">Email Notifications</span>
										<span className="font-normal text-muted-foreground text-xs">
											Sent to your login email address
										</span>
									</Label>
								</div>

								<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
									<RadioGroupItem
										value={StoreNotificationTypeEnum.TELEGRAM}
										id="telegram"
									/>
									<Label
										htmlFor="telegram"
										className="flex flex-1 cursor-pointer flex-col"
									>
										<span className="font-medium">Telegram Alerts</span>
										<span className="font-normal text-muted-foreground text-xs">
											Fast and instant alerts via our Telegram bot
										</span>
									</Label>
								</div>

								<div className="flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
									<RadioGroupItem
										value={StoreNotificationTypeEnum.BOTH}
										id="both"
									/>
									<Label
										htmlFor="both"
										className="flex flex-1 cursor-pointer flex-col"
									>
										<span className="font-medium">Both</span>
										<span className="font-normal text-muted-foreground text-xs">
											Get notified everywhere so you never miss an order
										</span>
									</Label>
								</div>
							</RadioGroup>
						</div>

						<Button
							type="submit"
							className="h-12 w-full text-lg"
							disabled={isLoading}
						>
							{isLoading ? (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							) : (
								"Finish Setup"
							)}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}
