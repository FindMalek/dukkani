import { database } from "@dukkani/db";
import { StoreNotificationMethod } from "@dukkani/db/prisma/generated/enums";
import { logger } from "@dukkani/logger";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import type { OrderIncludeOutput } from "../schemas/order/output";
import { KapsoService } from "./kapso.service";
import { TelegramService } from "./telegram.service";

/**
 * Notification service - Handles sending notifications
 * All methods are automatically traced via traceStaticClass
 */
class NotificationServiceBase {
  static async sendOrderNotification(
    storeId: string,
    order: OrderIncludeOutput,
  ): Promise<void> {
    addSpanAttributes({
      "notification.store_id": storeId,
      "notification.order_id": order.id,
    });

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

    if (
      notificationMethod === StoreNotificationMethod.EMAIL ||
      notificationMethod === StoreNotificationMethod.BOTH
    ) {
      await NotificationServiceBase.sendEmailNotification(
        store.owner.email,
        store.name,
        order,
      );
    }

    if (
      (notificationMethod === StoreNotificationMethod.TELEGRAM ||
        notificationMethod === StoreNotificationMethod.BOTH) &&
      store.owner.telegramChatId
    ) {
      await NotificationServiceBase.sendTelegramNotification(storeId, order);
    }

    if (
      notificationMethod === StoreNotificationMethod.WHATSAPP &&
      store.kapsoPhoneNumberId &&
      store.kapsoNotificationNumber
    ) {
      await NotificationServiceBase.sendWhatsAppNotification(storeId, order);
    }
  }

  /**
   * Notify the merchant when an order's status changes.
   * Currently only wired for WhatsApp (via Kapso) - Telegram and email don't send
   * status-change notifications today, only new-order notifications (see above).
   */
  static async sendOrderStatusChangeNotification(
    storeId: string,
    order: { id: string },
    previousStatus: string,
    newStatus: string,
  ): Promise<void> {
    addSpanAttributes({
      "notification.store_id": storeId,
      "notification.order_id": order.id,
      "notification.previous_status": previousStatus,
      "notification.new_status": newStatus,
    });

    const store = await database.store.findUnique({
      where: { id: storeId },
      select: {
        notificationMethod: true,
        kapsoPhoneNumberId: true,
        kapsoNotificationNumber: true,
      },
    });

    if (!store) {
      return;
    }

    const notificationMethod =
      store.notificationMethod || StoreNotificationMethod.EMAIL;

    if (
      notificationMethod === StoreNotificationMethod.WHATSAPP &&
      store.kapsoPhoneNumberId &&
      store.kapsoNotificationNumber
    ) {
      await KapsoService.sendOrderStatusChangeNotification(storeId, {
        id: order.id,
        previousStatus,
        newStatus,
      });
    }
  }

  private static async sendEmailNotification(
    email: string,
    storeName: string,
    order: OrderIncludeOutput,
  ): Promise<void> {
    // TODO: Implement email sending (Resend) (FIN-203)
    logger.info(
      {
        to: email,
        storeName,
        orderId: order.id,
      },
      "Email notification (not implemented yet)",
    );
  }

  private static async sendTelegramNotification(
    storeId: string,
    order: OrderIncludeOutput,
  ): Promise<void> {
    if (!order.orderItems || order.orderItems.length === 0) {
      return;
    }

    const customerName = order.customer?.name;
    const customerPhone = order.customer?.phone;

    const total = order.orderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const items = order.orderItems.map((item) => ({
      name: item.product?.name || `Product #${item.productId}`,
      quantity: item.quantity,
    }));

    await TelegramService.sendOrderNotification(storeId, {
      id: order.id,
      customerName: customerName || "",
      customerPhone: customerPhone || "",
      items,
      total: total.toFixed(2),
    });
  }

  private static async sendWhatsAppNotification(
    storeId: string,
    order: OrderIncludeOutput,
  ): Promise<void> {
    if (!order.orderItems || order.orderItems.length === 0) {
      return;
    }

    const customerName = order.customer?.name;
    const customerPhone = order.customer?.phone;

    const total = order.orderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const items = order.orderItems.map((item) => ({
      name: item.product?.name || `Product #${item.productId}`,
      quantity: item.quantity,
    }));

    await KapsoService.sendOrderNotification(storeId, {
      id: order.id,
      customerName: customerName || "",
      customerPhone: customerPhone || "",
      items,
      total: total.toFixed(2),
    });
  }
}

export const NotificationService = traceStaticClass(NotificationServiceBase);
