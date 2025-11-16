"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";

export default function SettingsPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold md:text-3xl">Settings</h1>
				<p className="text-muted-foreground mt-2 text-sm md:text-base">
					Manage your account settings
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Account Settings</CardTitle>
					<CardDescription>Manage your preferences</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">
						Settings form coming soon
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
