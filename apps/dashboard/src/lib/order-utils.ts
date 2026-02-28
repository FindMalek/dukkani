import type { OrderIncludeOutput } from "@dukkani/common/schemas/order/output";

export function formatOrderDateTime(
	date: Date,
	now: Date,
	t: (key: string) => string,
): string {
	const d = new Date(date);
	const today = new Date(now);
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const dStart = new Date(d);
	dStart.setHours(0, 0, 0, 0);

	const timeStr = d.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});

	if (dStart.getTime() === today.getTime()) {
		return `${t("today")} ${timeStr}`;
	}
	if (dStart.getTime() === yesterday.getTime()) {
		return `${t("yesterday")} ${timeStr}`;
	}
	return d.toLocaleDateString(undefined, {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function getOrderTotal(order: OrderIncludeOutput): number {
	return (
		order.orderItems?.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		) ?? 0
	);
}

export function getItemsCount(order: OrderIncludeOutput): number {
	return order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
}
