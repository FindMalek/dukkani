"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function NewCustomerPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="mb-4 flex items-center gap-4">
					<Link href={RoutePaths.CUSTOMERS.INDEX.url}>
						<Button variant="ghost" size="icon">
							<Icons.arrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="font-bold text-2xl md:text-3xl">Add New Customer</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
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
							<label className="font-medium text-sm">Name</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's full name
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Phone Number</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's phone number
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Email (Optional)</label>
							<p className="text-muted-foreground text-sm">
								Enter the customer's email address if available
							</p>
						</div>

						<div className="space-y-2">
							<label className="font-medium text-sm">Notes</label>
							<p className="text-muted-foreground text-sm">
								Add any additional notes about this customer
							</p>
						</div>

						<div className="flex gap-4 pt-4">
							<Button disabled>Add Customer</Button>
							<Link href={RoutePaths.CUSTOMERS.INDEX.url}>
								<Button variant="outline">Cancel</Button>
							</Link>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
