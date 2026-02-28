"use client";

import { Card, CardContent } from "@dukkani/ui/components/card";
import { useTranslations } from "next-intl";
import { groupOrdersByDate } from "@/lib/group-orders-by-date";
import { OrderListCard } from "@/components/app/orders/order-list-card";
import { OrdersEmptyState } from "@/components/app/orders/orders-empty-state";
import { OrdersListSkeleton } from "@/components/app/orders/orders-list-skeleton";
import { OrdersPageHeader } from "@/components/app/orders/orders-page-header";
import { OrdersSearchBar } from "@/components/app/orders/orders-search-bar";
import { OrdersStatusTabs } from "@/components/app/orders/orders-status-tabs";
import { useOrdersController } from "@/hooks/controllers/use-orders-controller";

export default function OrdersPage() {
	const t = useTranslations("orders.list");
	const {
		ordersQuery: { data, isLoading, error, refetch, isRefetching },
		search,
		status,
		setSearch,
		setStatus,
	} = useOrdersController();

	if (error) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<OrdersPageHeader />
				<Card>
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">{t("error")}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	const grouped = data?.orders ? groupOrdersByDate(data.orders) : null;

	return (
		<div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
			<OrdersPageHeader
				onRefresh={() => refetch()}
				isRefetching={isRefetching}
			/>

			{/* Search & Filters */}
			<div className="mb-6 space-y-4">
				<OrdersSearchBar value={search} onChange={setSearch} />
				<OrdersStatusTabs value={status} onChange={setStatus} />
			</div>

			{/* Order List */}
			{isLoading ? (
				<OrdersListSkeleton />
			) : data && data.orders.length > 0 && grouped ? (
				<div className="space-y-6">
					{grouped.today.length > 0 && (
						<section>
							<h2 className="mb-3 font-medium text-muted-foreground text-sm">
								{t("today")}
							</h2>
							<div className="space-y-3">
								{grouped.today.map((order) => (
									<OrderListCard key={order.id} order={order} />
								))}
							</div>
						</section>
					)}
					{grouped.yesterday.length > 0 && (
						<section>
							<h2 className="mb-3 font-medium text-muted-foreground text-sm">
								{t("yesterday")}
							</h2>
							<div className="space-y-3">
								{grouped.yesterday.map((order) => (
									<OrderListCard key={order.id} order={order} />
								))}
							</div>
						</section>
					)}
					{grouped.older.map(({ label, orders: ords }) => (
						<section key={label}>
							<h2 className="mb-3 font-medium text-muted-foreground text-sm">
								{label}
							</h2>
							<div className="space-y-3">
								{ords.map((order) => (
									<OrderListCard key={order.id} order={order} />
								))}
							</div>
						</section>
					))}
				</div>
			) : (
				<OrdersEmptyState />
			)}
		</div>
	);
}
