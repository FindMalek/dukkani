"use client";

import { Badge } from "@dukkani/ui/components/badge";
import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Label } from "@dukkani/ui/components/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@dukkani/ui/components/select";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import { useStores } from "@/hooks/api/use-stores";
import {
	useGetBotLink,
	useSendTestMessage,
	useSendTestOrderNotification,
	useTelegramStatus,
} from "@/hooks/api/use-telegram";
import { handleAPIError } from "@/lib/error";
import { Spinner } from "@dukkani/ui/components/spinner";

export function TelegramTest() {
	const [selectedStoreId, setSelectedStoreId] = useState<string>("");
	const [otpData, setOtpData] = useState<{
		botLink: string;
		otpCode: string;
	} | null>(null);

	const { data: status, isLoading: statusLoading } = useTelegramStatus();
	const { data: stores, isLoading: storesLoading } = useStores();
	const getBotLink = useGetBotLink();
	const sendTestMessage = useSendTestMessage();
	const sendTestOrder = useSendTestOrderNotification();

	const handleGenerateOTP = () => {
		getBotLink.mutate(undefined, {
			onSuccess: (data) => {
				setOtpData({
					botLink: data.botLink,
					otpCode: data.otpCode,
				});
				toast.success(
					"OTP generated! Follow the instructions to link your account.",
				);
			},
			onError: (error) => {
				handleAPIError(error);
			},
		});
	};

	const handleCopyOTP = async () => {
		if (!otpData?.otpCode) return;
		try {
			await navigator.clipboard.writeText(otpData.otpCode);
			toast.success("OTP code copied to clipboard!");
		} catch (error) {
			toast.error("Failed to copy OTP code");
		}
	};

	const handleCopyBotLink = async () => {
		if (!otpData?.botLink) return;
		try {
			await navigator.clipboard.writeText(otpData.botLink);
			toast.success("Bot link copied to clipboard!");
		} catch (error) {
			toast.error("Failed to copy bot link");
		}
	};

	const handleSendTestMessage = () => {
		sendTestMessage.mutate(
			{
				message:
					"🧪 <b>Test Message</b>\n\nThis is a test from Dukkani dev mode!",
				parseMode: "HTML",
			},
			{
				onSuccess: () => {
					toast.success("Test message sent! Check your Telegram.");
				},
				onError: (error) => {
					handleAPIError(error);
				},
			},
		);
	};

	const handleSendTestOrder = () => {
		if (!selectedStoreId) {
			toast.error("Please select a store first");
			return;
		}

		sendTestOrder.mutate(
			{ storeId: selectedStoreId },
			{
				onSuccess: () => {
					toast.success("Test order notification sent! Check your Telegram.");
				},
				onError: (error) => {
					handleAPIError(error);
				},
			},
		);
	};

	return (
		<div className="space-y-6">
			{/* Account Status */}
			<Card>
				<CardHeader>
					<CardTitle>Account Status</CardTitle>
					<CardDescription>
						Check if your Telegram account is linked
					</CardDescription>
				</CardHeader>
				<CardContent>
					{statusLoading ? (
						<Skeleton className="h-6 w-32" />
					) : (
						<div className="flex items-center gap-2">
							<Badge variant={status?.linked ? "default" : "outline"}>
								{status?.linked ? (
									<>
										<Icons.circleCheck className="h-3 w-3" />
										Linked
									</>
								) : (
									<>
										<Icons.x className="h-3 w-3" />
										Not Linked
									</>
								)}
							</Badge>
							{status?.linked && status.linkedAt && (
								<span className="text-muted-foreground text-sm">
									Linked on {new Date(status.linkedAt).toLocaleDateString()}
								</span>
							)}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Link Account */}
			<Card>
				<CardHeader>
					<CardTitle>Link Telegram Account</CardTitle>
					<CardDescription>
						Generate an OTP code to link your Telegram account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button
						onClick={handleGenerateOTP}
						disabled={getBotLink.isPending}
						className="w-full"
					>
						{getBotLink.isPending ? (
							<>
								<Spinner className="h-4 w-4 animate-spin" />
								Generating OTP...
							</>
						) : (
							<>
								<Icons.key className="h-4 w-4" />
								Generate OTP Code
							</>
						)}
					</Button>

					{otpData && (
						<div className="space-y-4 rounded-lg border bg-muted/50 p-4">
							<div className="space-y-2">
								<Label>Bot Link</Label>
								<div className="flex gap-2">
									<Input
										value={otpData.botLink}
										readOnly
										className="flex-1 font-mono text-sm"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={handleCopyBotLink}
									>
										<Icons.copy className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<Label>OTP Code</Label>
								<div className="flex gap-2">
									<Input
										value={otpData.otpCode}
										readOnly
										className="flex-1 font-mono text-lg font-semibold tracking-wider"
									/>
									<Button variant="outline" size="icon" onClick={handleCopyOTP}>
										<Icons.copy className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="rounded-md bg-primary/10 p-3 text-sm">
								<p className="font-medium mb-2">Instructions:</p>
								<ol className="list-decimal list-inside space-y-1 text-muted-foreground">
									<li>Click the bot link above or copy it</li>
									<li>Open the link in Telegram</li>
									<li>
										Send the command:{" "}
										<code className="bg-background px-1.5 py-0.5 rounded text-foreground font-mono text-xs">
											/link {otpData.otpCode}
										</code>
									</li>
									<li>Your account will be linked!</li>
								</ol>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Test Messages */}
			<Card>
				<CardHeader>
					<CardTitle>Test Telegram Messages</CardTitle>
					<CardDescription>
						Send test messages to your linked Telegram account
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Button
							onClick={handleSendTestMessage}
							disabled={sendTestMessage.isPending || !status?.linked}
							className="w-full"
							variant="outline"
						>
							📤 Send Test Message
						</Button>
						<p className="text-muted-foreground text-xs">
							Sends a simple test message to verify Telegram is working
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="store-select">Select Store</Label>
						{storesLoading ? (
							<Skeleton className="h-9 w-full" />
						) : (
							<Select
								value={selectedStoreId}
								onValueChange={setSelectedStoreId}
							>
								<SelectTrigger id="store-select" className="w-full">
									<SelectValue placeholder="Choose a store to test order notification" />
								</SelectTrigger>
								<SelectContent>
									{stores && stores.length > 0 ? (
										stores.map((store) => (
											<SelectItem key={store.id} value={store.id}>
												{store.name}
											</SelectItem>
										))
									) : (
										<SelectItem value="no-stores" disabled>
											No stores available
										</SelectItem>
									)}
								</SelectContent>
							</Select>
						)}
						<Button
							onClick={handleSendTestOrder}
							disabled={
								sendTestOrder.isPending || !selectedStoreId || !status?.linked
							}
							variant="outline"
							className="w-full"
						>
							🛒 Send Test Order Notification
						</Button>
						<p className="text-muted-foreground text-xs">
							Sends a test order notification with sample data
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
