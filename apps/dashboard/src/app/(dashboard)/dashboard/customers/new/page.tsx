"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { routes } from "@/lib/routes";

export default function NewCustomerPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<Link href={routes.dashboard.customers.index}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-2xl font-bold md:text-3xl">Add New Customer</h1>
						<p className="text-muted-foreground mt-2 text-sm md:text-base">
							Manually add a customer to your database
						</p>
					</div>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Customer Form</CardTitle>
					<CardDescription>
						Fill in the details to add a new customer
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="space-y-2">
							<label className="text-sm font-medium">Name</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's full name
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Phone Number</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's phone number
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Email (Optional)</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's email address if available
							</p>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Notes</label>
							<p className="text-muted-foreground text-sm">
								Add any additional notes about this customer
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Add Customer</Button>
							<Link href={routes.dashboard.customers.index}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
