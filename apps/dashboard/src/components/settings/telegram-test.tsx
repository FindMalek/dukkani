"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
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
	useSendTestMessage,
	useSendTestOrderNotification,
} from "@/hooks/api/use-telegram";
import { handleAPIError } from "@/lib/error";

export function TelegramTest() {
	const [selectedStoreId, setSelectedStoreId] = useState<string>("");

	const { data: stores, isLoading: storesLoading } = useStores();
	const sendTestMessage = useSendTestMessage();
	const sendTestOrder = useSendTestOrderNotification();

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
						disabled={sendTestMessage.isPending}
						className="w-full"
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
						<Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
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
						disabled={sendTestOrder.isPending || !selectedStoreId}
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
	);
}
