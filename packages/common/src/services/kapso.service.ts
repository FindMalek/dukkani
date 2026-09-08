import { database } from "@dukkani/db";
import { apiEnv } from "@dukkani/env";
import { logger } from "@dukkani/logger";
import {
  addSpanAttributes,
  enhanceLogWithTraceContext,
  fetchWithTrace,
  traceStaticClass,
} from "@dukkani/tracing";

/**
 * Kapso Service - Handles WhatsApp Business API interactions via Kapso (app.kapso.ai)
 *
 * Kapso is a managed WhatsApp Business API provider: merchants connect a WhatsApp
 * Business number in the Kapso dashboard and get back a `phone_number_id` for that
 * number. We send messages by POSTing to Kapso's Meta-compatible WhatsApp endpoint
 * using a project-level API key (KAPSO_API_KEY).
 *
 * API shape verified against https://docs.kapso.ai/api/meta/whatsapp/messages/send-a-message
 * and https://docs.kapso.ai/api/introduction (2026-09). No live credentials were available
 * while building this integration — the request shape below matches Kapso's published docs,
 * but has not been exercised against their servers.
 * // TODO: verify against Kapso API docs once a real KAPSO_API_KEY is available in staging.
 *
 * Rate Limiting: Uses simple delay-based rate limiting (MVP approach), mirroring
 * TelegramService until a proper queue system is in place.
 *
 * All methods are automatically traced via traceStaticClass
 */
class KapsoServiceBase {
  // Kapso's Meta-compatible WhatsApp Business API base URL.
  // TODO: verify against Kapso API docs — confirm this base URL / API version stays stable.
  private static readonly BASE_API_URL =
    "https://api.kapso.ai/meta/whatsapp/v24.0";

  // MVP: Simple delay-based rate limiting, same approach as TelegramService.
  // Production: Should use BullMQ/Redis queue for proper rate limiting.
  private static readonly RATE_LIMIT_DELAY = 50;
  private static lastMessageTime = 0;

  private static async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastMessage = now - KapsoServiceBase.lastMessageTime;

    if (timeSinceLastMessage < KapsoServiceBase.RATE_LIMIT_DELAY) {
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          KapsoServiceBase.RATE_LIMIT_DELAY - timeSinceLastMessage,
        ),
      );
    }

    KapsoServiceBase.lastMessageTime = Date.now();
  }

  /**
   * Send a plain-text WhatsApp message through Kapso.
   *
   * @param phoneNumberId - Kapso WhatsApp Business Phone Number ID for the sending number
   * @param to - Recipient phone number (E.164, without a leading "+" per Meta's WhatsApp API)
   * @param text - Message body
   *
   * Structured as a thin, single-purpose REST call so it's easy to mock/stub in tests and
   * PR review: swap fetchWithTrace or wrap this method in a test double.
   */
  static async sendMessage(
    phoneNumberId: string,
    to: string,
    text: string,
  ): Promise<void> {
    addSpanAttributes({
      "kapso.phone_number_id": phoneNumberId,
      "kapso.message_length": text.length,
    });
    logger.debug(
      enhanceLogWithTraceContext({
        phone_number_id: phoneNumberId,
        to,
        text_length: text.length,
      }),
      "Sending Kapso WhatsApp message",
    );

    await KapsoServiceBase.rateLimit();

    const response = await fetchWithTrace(
      `${KapsoServiceBase.BASE_API_URL}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiEnv.KAPSO_API_KEY,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to,
          type: "text",
          text: { body: text },
        }),
      },
    );

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      // TODO: verify against Kapso API docs — confirm the real error response shape
      // (assuming a Meta-style `{ error: { message } }` payload here).
      const errorMessage = responseData?.error?.message || response.statusText;
      throw new Error(
        `Kapso API error: ${errorMessage || response.statusText}`,
      );
    }

    addSpanAttributes({
      "kapso.message_sent": true,
      "kapso.response_ok": response.ok,
    });
    logger.debug(
      enhanceLogWithTraceContext({
        phone_number_id: phoneNumberId,
        success: response.ok,
        response_status: response.status,
        response_data: responseData,
      }),
      "Kapso WhatsApp message sent",
    );
  }

  /**
   * Send a new-order notification to the store's configured WhatsApp number.
   * Silently no-ops if the store hasn't connected Kapso (fire-and-forget pattern,
   * mirrors TelegramService.sendOrderNotification).
   */
  static async sendOrderNotification(
    storeId: string,
    order: {
      id: string;
      customerName: string;
      customerPhone: string;
      items: Array<{ name: string; quantity: number }>;
      total: string;
    },
  ): Promise<void> {
    const store = await database.store.findUnique({
      where: { id: storeId },
      select: {
        name: true,
        kapsoPhoneNumberId: true,
        kapsoNotificationNumber: true,
      },
    });

    if (!store?.kapsoPhoneNumberId || !store.kapsoNotificationNumber) {
      // Kapso not connected for this store - silently skip (order creation must not fail).
      return;
    }

    const itemsText = order.items
      .map((item) => `  • ${item.name} (x${item.quantity})`)
      .join("\n");

    // WhatsApp text messages support a small markdown subset (*bold*, no HTML).
    const message = `🛒 *New Order #${order.id}*

*Store:* ${store.name}
*Customer:* ${order.customerName}
*Phone:* ${order.customerPhone}

*Items:*
${itemsText}

*Total:* ${order.total}

${apiEnv.NEXT_PUBLIC_DASHBOARD_URL}/orders/${order.id}`;

    await KapsoServiceBase.sendMessage(
      store.kapsoPhoneNumberId,
      store.kapsoNotificationNumber,
      message,
    );
  }

  /**
   * Send an order status change notification to the store's configured WhatsApp number.
   * Silently no-ops if the store hasn't connected Kapso.
   */
  static async sendOrderStatusChangeNotification(
    storeId: string,
    order: { id: string; previousStatus: string; newStatus: string },
  ): Promise<void> {
    const store = await database.store.findUnique({
      where: { id: storeId },
      select: {
        name: true,
        kapsoPhoneNumberId: true,
        kapsoNotificationNumber: true,
      },
    });

    if (!store?.kapsoPhoneNumberId || !store.kapsoNotificationNumber) {
      return;
    }

    const message = `📦 *Order #${order.id} Updated*

*Store:* ${store.name}
*Status:* ${order.previousStatus} → ${order.newStatus}

${apiEnv.NEXT_PUBLIC_DASHBOARD_URL}/orders/${order.id}`;

    await KapsoServiceBase.sendMessage(
      store.kapsoPhoneNumberId,
      store.kapsoNotificationNumber,
      message,
    );
  }

  /**
   * Connect (or reconfigure) Kapso WhatsApp notifications for a store.
   */
  static async connectStore(
    storeId: string,
    input: { phoneNumberId: string; notificationNumber: string },
  ): Promise<void> {
    await database.store.update({
      where: { id: storeId },
      data: {
        kapsoPhoneNumberId: input.phoneNumberId,
        kapsoNotificationNumber: input.notificationNumber,
        kapsoConnectedAt: new Date(),
      },
    });
  }

  /**
   * Disconnect Kapso WhatsApp notifications for a store.
   */
  static async disconnectStore(storeId: string): Promise<void> {
    await database.store.update({
      where: { id: storeId },
      data: {
        kapsoPhoneNumberId: null,
        kapsoNotificationNumber: null,
        kapsoConnectedAt: null,
      },
    });
  }

  /**
   * Get the Kapso WhatsApp connection status for a store.
   */
  static async getConnectionStatus(storeId: string): Promise<{
    connected: boolean;
    connectedAt: Date | null;
    phoneNumberId: string | null;
    notificationNumber: string | null;
  }> {
    const store = await database.store.findUnique({
      where: { id: storeId },
      select: {
        kapsoPhoneNumberId: true,
        kapsoNotificationNumber: true,
        kapsoConnectedAt: true,
      },
    });

    return {
      connected: !!(
        store?.kapsoPhoneNumberId && store?.kapsoNotificationNumber
      ),
      connectedAt: store?.kapsoConnectedAt ?? null,
      phoneNumberId: store?.kapsoPhoneNumberId ?? null,
      notificationNumber: store?.kapsoNotificationNumber ?? null,
    };
  }

  /**
   * Send a test message to verify a store's Kapso configuration works end-to-end.
   * Intended for the dashboard settings page's "Send test message" action.
   */
  static async sendTestMessage(storeId: string): Promise<void> {
    const status = await KapsoServiceBase.getConnectionStatus(storeId);

    if (!status.phoneNumberId || !status.notificationNumber) {
      throw new Error("WhatsApp notifications are not connected yet");
    }

    await KapsoServiceBase.sendMessage(
      status.phoneNumberId,
      status.notificationNumber,
      "✅ This is a test message from Dukkani. Your WhatsApp order notifications are working!",
    );
  }
}

export const KapsoService = traceStaticClass(KapsoServiceBase);
