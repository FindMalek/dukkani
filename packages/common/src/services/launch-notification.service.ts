import type { SubscribeToLaunchInput } from "@dukkani/common/schemas/store/input";
import { database } from "@dukkani/db";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";

class LaunchNotificationServiceBase {
	/**
	 * Subscribe to launch notifications for a store
	 */
	static async subscribe(input: SubscribeToLaunchInput) {
		// Determine if emailOrPhone is an email or phone
		const isEmail = input.emailOrPhone.includes("@");
		const email = isEmail ? input.emailOrPhone : null;
		const phone = !isEmail ? input.emailOrPhone : null;

		addSpanAttributes({
			"launch_notification.store_id": input.storeId,
			"launch_notification.has_email": !!email,
			"launch_notification.has_phone": !!phone,
		});

		// Check if store exists and is in DRAFT status
		const store = await database.store.findUnique({
			where: { id: input.storeId },
			select: { id: true, status: true },
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.status !== "DRAFT") {
			throw new Error("Store is already published");
		}

		// Determine which unique constraint to use
		const whereClause = email
			? { storeId_email: { storeId: input.storeId, email } }
			: phone
				? { storeId_phone: { storeId: input.storeId, phone } }
				: null;

		if (!whereClause) {
			throw new Error("Either email or phone must be provided");
		}

		// Create or update subscription
		const subscription = await database.launchNotification.upsert({
			where: whereClause,
			create: {
				storeId: input.storeId,
				email,
				phone,
			},
			update: {
				// Reset notified status if resubscribing
				notified: false,
				notifiedAt: null,
			},
		});

		return subscription;
	}

	/**
	 * Notify all subscribers when store goes live
	 */
	static async notifySubscribers(storeId: string) {
		const subscribers = await database.launchNotification.findMany({
			where: {
				storeId,
				notified: false,
			},
		});

		// TODO: Send emails/SMS to subscribers
		// This would integrate with your email/SMS service

		// Mark as notified
		await database.launchNotification.updateMany({
			where: { storeId },
			data: {
				notified: true,
				notifiedAt: new Date(),
			},
		});

		return subscribers.length;
	}
}

export const LaunchNotificationService = traceStaticClass(
	LaunchNotificationServiceBase,
);
