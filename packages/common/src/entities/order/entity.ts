import type { PaymentMethod } from "../../schemas/enums";
import { LIST_ORDER_STATUSES } from "../../schemas/enums";
import type { OrderStatus } from "../../schemas/order/enums";
import type {
	OrderIncludeOutput,
	OrderPublicOutput,
	OrderSimpleOutput,
} from "../../schemas/order/output";
import { AddressEntity } from "../address/entity";
import { CustomerEntity } from "../customer/entity";
import { OrderItemEntity } from "../order-item/entity";
import { StoreEntity } from "../store/entity";
import { WhatsAppMessageEntity } from "../whatsapp-message/entity";
import type {
	OrderIncludeDbData,
	OrderIncludeWithProductDbData,
	OrderSimpleDbData,
} from "./query";

/** Badge variant strings for UI display - maps OrderStatus to shadcn Badge variant */
export const ORDER_STATUS_BADGE_VARIANT: Record<
	OrderStatus,
	"outline" | "statusSuccess" | "statusMuted" | "destructive"
> = {
	PENDING: "outline",
	CONFIRMED: "statusSuccess",
	PROCESSING: "statusMuted",
	SHIPPED: "statusMuted",
	DELIVERED: "statusSuccess",
	CANCELLED: "destructive",
};

export type OrderStatusFilter = OrderStatus | null;

/** Translation keys for orders.list.filters */
export type OrderStatusFilterLabelKey =
	| "all"
	| "pending"
	| "confirmed"
	| "processing"
	| "shipped"
	| "delivered"
	| "cancelled";

const ORDER_STATUS_TO_FILTER_LABEL_KEY: Record<
	OrderStatus,
	Exclude<OrderStatusFilterLabelKey, "all">
> = {
	PENDING: "pending",
	CONFIRMED: "confirmed",
	PROCESSING: "processing",
	SHIPPED: "shipped",
	DELIVERED: "delivered",
	CANCELLED: "cancelled",
};

/** Translation keys for orders.list payment method display */
export type OrderPaymentMethodLabelKey = "cashOnDelivery" | "card";

const PAYMENT_METHOD_TO_LABEL_KEY: Record<
	PaymentMethod,
	OrderPaymentMethodLabelKey
> = {
	COD: "cashOnDelivery",
	CARD: "card",
};

export class OrderEntity {
	/**
	 * Converts OrderStatus (Prisma enum) to orders.list.filters translation key.
	 */
	static getStatusFilterLabelKey(
		status: OrderStatus,
	): Exclude<OrderStatusFilterLabelKey, "all"> {
		return ORDER_STATUS_TO_FILTER_LABEL_KEY[status];
	}

	/**
	 * Converts OrderStatus (Prisma enum) to orders.list.status translation key.
	 * Use with useTranslations("orders.list") then t(OrderEntity.getStatusLabelKey(status)).
	 */
	static getStatusLabelKey(
		status: OrderStatus,
	): `status.${Exclude<OrderStatusFilterLabelKey, "all">}` {
		return `status.${ORDER_STATUS_TO_FILTER_LABEL_KEY[status]}`;
	}

	/**
	 * Converts PaymentMethod (Prisma enum) to orders.list translation key.
	 * Use with useTranslations("orders.list") then t(OrderEntity.getPaymentMethodLabelKey(paymentMethod)).
	 */
	static getPaymentMethodLabelKey(
		paymentMethod: PaymentMethod,
	): OrderPaymentMethodLabelKey {
		return PAYMENT_METHOD_TO_LABEL_KEY[paymentMethod];
	}

	/**
	 * Returns filter options for status tabs/drawer. Uses LIST_ORDER_STATUSES.
	 */
	static getStatusFilterOptions(): ReadonlyArray<{
		value: OrderStatusFilter;
		labelKey: OrderStatusFilterLabelKey;
	}> {
		return [
			{ value: null, labelKey: "all" },
			...LIST_ORDER_STATUSES.map((value) => ({
				value,
				labelKey: OrderEntity.getStatusFilterLabelKey(value),
			})),
		];
	}

	static getSimpleRo(entity: OrderSimpleDbData): OrderSimpleOutput {
		return {
			id: entity.id,
			status: entity.status,
			paymentMethod: entity.paymentMethod,
			isWhatsApp: entity.isWhatsApp,
			notes: entity.notes,
			storeId: entity.storeId,
			customerId: entity.customerId,
			addressId: entity.addressId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: OrderIncludeDbData): OrderIncludeOutput {
		return {
			...OrderEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			customer: entity.customer
				? CustomerEntity.getSimpleRo(entity.customer)
				: undefined,
			address: entity.address
				? AddressEntity.getSimpleRo(entity.address)
				: undefined,
			orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
			whatsappMessages: entity.whatsappMessages.map(
				WhatsAppMessageEntity.getSimpleRo,
			),
		};
	}

	static getRoWithProduct(
		entity: OrderIncludeWithProductDbData,
	): OrderIncludeOutput {
		return {
			...OrderEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			customer: entity.customer
				? CustomerEntity.getSimpleRo(entity.customer)
				: undefined,
			address: entity.address
				? AddressEntity.getSimpleRo(entity.address)
				: undefined,
			orderItems: entity.orderItems.map(OrderItemEntity.getRoWithProduct),
			whatsappMessages: entity.whatsappMessages.map(
				WhatsAppMessageEntity.getSimpleRo,
			),
		};
	}

	static getPublicRo(entity: OrderIncludeDbData): OrderPublicOutput {
		return {
			...OrderEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
			whatsappMessages: entity.whatsappMessages.map(
				WhatsAppMessageEntity.getSimpleRo,
			),
		};
	}
}
