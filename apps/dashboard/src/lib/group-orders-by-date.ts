import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";

export type DateGroupKey = "today" | "yesterday" | "older";

export interface GroupedOrders {
	today: OrderIncludeOutput[];
	yesterday: OrderIncludeOutput[];
	older: { label: string; orders: OrderIncludeOutput[] }[];
}

function getStartOfDay(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

function isToday(d: Date, now: Date): boolean {
	return getStartOfDay(d).getTime() === getStartOfDay(now).getTime();
}

function isYesterday(d: Date, now: Date): boolean {
	const yesterday = new Date(now);
	yesterday.setDate(yesterday.getDate() - 1);
	return getStartOfDay(d).getTime() === getStartOfDay(yesterday).getTime();
}

/**
 * Groups orders by date: today, yesterday, and older (with formatted date labels).
 */
export function groupOrdersByDate(
	orders: OrderIncludeOutput[],
	now = new Date(),
): GroupedOrders {
	const today: OrderIncludeOutput[] = [];
	const yesterday: OrderIncludeOutput[] = [];
	const olderByDate = new Map<string, OrderIncludeOutput[]>();

	for (const order of orders) {
		const createdAt = new Date(order.createdAt);
		if (isToday(createdAt, now)) {
			today.push(order);
		} else if (isYesterday(createdAt, now)) {
			yesterday.push(order);
		} else {
			const label = createdAt.toLocaleDateString(undefined, {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
			const existing = olderByDate.get(label) ?? [];
			existing.push(order);
			olderByDate.set(label, existing);
		}
	}

	const older = Array.from(olderByDate.entries())
		.map(([label, ords]) => {
			const firstDate = ords[0] ? new Date(ords[0].createdAt).getTime() : 0;
			return { label, orders: ords, sortKey: firstDate };
		})
		.sort((a, b) => b.sortKey - a.sortKey)
		.map(({ label, orders: ords }) => ({ label, orders: ords }));

	return { today, yesterday, older };
}
