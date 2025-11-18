"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { routes } from "@/utils/navigation";

export default function ProfileSettingsPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.settings.index}>
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Profile Management</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
							Manage your account profile and preferences
						</p>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Personal Information</CardTitle>
						<CardDescription>Update your name and contact details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium">Full Name</label>
							<p className="text-muted-foreground text-sm">
								Your display name
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Email Address</label>
							<p className="text-muted-foreground text-sm">
								Your account email
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Phone Number</label>
							<p className="text-muted-foreground text-sm">
								Your contact phone number
							</p>
						</div>

						<Button disabled>Update Profile</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Security</CardTitle>
						<CardDescription>Change your password and security settings</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium">Current Password</label>
							<p className="text-muted-foreground text-sm">
								Enter your current password
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">New Password</label>
							<p className="text-muted-foreground text-sm">
								Enter your new password
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Confirm New Password</label>
							<p className="text-muted-foreground text-sm">
								Re-enter your new password
							</p>
						</div>

						<Button disabled>Change Password</Button>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-6">
				<CardHeader>
					<CardTitle>Account Preferences</CardTitle>
					<CardDescription>Manage your account settings</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<label className="text-sm font-medium">Email Notifications</label>
							<p className="text-muted-foreground text-sm">
								Receive email updates about orders and account activity
							</p>
						</div>
						<Button variant="outline" size="sm" disabled>
							Toggle
						</Button>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<label className="text-sm font-medium">SMS Notifications</label>
							<p className="text-muted-foreground text-sm">
								Receive SMS updates about orders
							</p>
						</div>
						<Button variant="outline" size="sm" disabled>
							Toggle
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

