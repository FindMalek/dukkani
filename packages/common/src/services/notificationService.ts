import { database } from "@dukkani/db";
import { StoreNotificationMethod } from "@dukkani/db/prisma/generated/enums";
import { apiEnv } from "@dukkani/env";
import { OrderQuery } from "../entities/order/query";
import type { OrderSimpleOutput } from "../schemas/order/output";
import { TelegramService } from "./telegramService";

/**
 * Notification Service - Handles order notifications via Email and Telegram
 */
export class NotificationService {
	/**
	 * Send order notification based on store's notification preferences
	 */
	static async sendOrderNotification(
		storeId: string,
		order: OrderSimpleOutput,
	): Promise<void> {
		const store = await database.store.findUnique({
			where: { id: storeId },
			include: {
				owner: {
					select: {
						email: true,
						telegramChatId: true,
					},
				},
			},
		});

		if (!store) {
			return;
		}

		const notificationMethod =
			store.notificationMethod || StoreNotificationMethod.EMAIL;

		// Send email notifications
		if (
			notificationMethod === StoreNotificationMethod.EMAIL ||
			notificationMethod === StoreNotificationMethod.BOTH
		) {
			await NotificationService.sendEmailNotification(
				store.owner.email,
				store.name,
				order,
			);
		}

		// Send Telegram notifications
		if (
			(notificationMethod === StoreNotificationMethod.TELEGRAM ||
				notificationMethod === StoreNotificationMethod.BOTH) &&
			store.owner.telegramChatId
		) {
			await NotificationService.sendTelegramNotification(storeId, order);
		}
	}

	/**
	 * Send email notification for new order
	 */
	private static async sendEmailNotification(
		email: string,
		storeName: string,
		order: OrderSimpleOutput,
	): Promise<void> {
		// TODO: Implement email sending (Resend) (FIN-203)
		// For now, log the notification
		console.log("Email notification (not implemented yet):", {
			to: email,
			storeName,
			orderId: order.id,
		});

		// Example implementation structure:
		// const emailContent = NotificationService.renderEmailTemplate(storeName, order);
		// await sendEmail(email, "New Order on Dukkani", emailContent);
	}

	/**
	 * Send Telegram notification for new order
	 */
	private static async sendTelegramNotification(
		storeId: string,
		order: OrderSimpleOutput,
	): Promise<void> {
		// Get order with items and customer for display
		// Need to include product relation within orderItems
		const orderWithDetails = await database.order.findUnique({
			where: { id: order.id },
			include: {
				...OrderQuery.getInclude(),
				orderItems: {
					include: {
						product: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		if (!orderWithDetails) {
			return;
		}

		const customerName =
			orderWithDetails.customer?.name || order.customerName || "Guest";
		const customerPhone =
			orderWithDetails.customer?.phone || order.customerPhone || "N/A";

		// Calculate total from order items
		const total = orderWithDetails.orderItems.reduce((sum, item) => {
			return sum + Number(item.price) * item.quantity;
		}, 0);

		const items = orderWithDetails.orderItems.map((item) => ({
			name: item.product.name,
			quantity: item.quantity,
		}));

		// TelegramService.sendOrderNotification fetches store and telegramChatId internally
		await TelegramService.sendOrderNotification(storeId, {
			id: order.id,
			customerName,
			customerPhone,
			items,
			total: total.toFixed(2),
		});
	}

	/**
	 * Render email template for order notification
	 * TODO: Implement proper email template (FIN-203)
	 */
	private static renderEmailTemplate(
		storeName: string,
		order: OrderSimpleOutput,
	): string {
		// TODO: we want to use this `apps/dashboard/src/lib/routes.ts`
		const orderUrl = `${apiEnv.NEXT_PUBLIC_DASHBOARD_URL}/orders/${order.id}`;

		return `
			Hello ${storeName} Owner,

			You have a new order:
			- Order ID: ${order.id}
			- Status: ${order.status}

			View Order: ${orderUrl}
		`;
	}
}
