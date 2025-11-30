"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@dukkani/ui/components/table";
import { Button } from "@dukkani/ui/components/button";
import { Skeleton } from "@dukkani/ui/components/skeleton";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { RoutePaths } from "@/lib/routes";

export default function CustomersPage() {
	return (
		<div className="container mx-auto max-w-7xl p-4 md:p-6">
			<div className="mb-6">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl md:text-3xl">Customers</h1>
						<p className="mt-2 text-muted-foreground text-sm md:text-base">
							Manage your customer database
						</p>
					</div>
					<Link href={RoutePaths.CUSTOMERS.NEW.url}>
						<Button>
							<Icons.plus className="mr-2 h-4 w-4" />
							Add Customer
						</Button>
					</Link>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Customers</CardTitle>
					<CardDescription>
						All your customers will appear here. Search by name or phone number.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex gap-4">
							<div className="flex-1">
								<input
									type="text"
									placeholder="Search by name or phone..."
									className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
									disabled
								/>
							</div>
						</div>

						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Phone</TableHead>
									<TableHead>Orders</TableHead>
									<TableHead>Total Spent</TableHead>
									<TableHead>Last Order</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell colSpan={5} className="py-8 text-center">
										<p className="text-muted-foreground text-sm">
											No customers found. Customers will appear here once they
											place orders or you add them manually.
										</p>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
