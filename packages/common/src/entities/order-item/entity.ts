import type {
  OrderItemSimpleOutput,
  OrderItemWithProductOutput,
} from "../../schemas/order-item/output";
import type {
  OrderItemIncludeDbData,
  OrderItemListDbData,
  OrderItemSimpleDbData,
  OrderItemWithProductDbData,
} from "./query";

export class OrderItemEntity {
  static getListRo(entity: OrderItemListDbData): {
    price: number;
    quantity: number;
  } {
    return { price: Number(entity.price), quantity: entity.quantity };
  }

  static getSimpleRo(entity: OrderItemSimpleDbData): OrderItemSimpleOutput {
    return {
      id: entity.id,
      orderId: entity.orderId,
      productId: entity.productId,
      quantity: entity.quantity,
      price: Number(entity.price),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static getRo(entity: OrderItemIncludeDbData): OrderItemWithProductOutput {
    return {
      ...OrderItemEntity.getSimpleRo(entity),
      product: entity.product
        ? {
            id: entity.product.id,
            ...(entity.productVersion?.name != null
              ? { name: entity.productVersion.name }
              : {}),
          }
        : undefined,
    };
  }

  static getRoWithProduct(
    entity: OrderItemWithProductDbData,
  ): OrderItemWithProductOutput {
    return {
      ...OrderItemEntity.getSimpleRo(entity),
      displayAttributes: entity.displayAttributes.map((row) => ({
        optionName: row.optionName,
        value: row.value,
      })),
      product: entity.product
        ? {
            id: entity.product.id,
            ...(entity.productVersion?.name != null
              ? { name: entity.productVersion.name }
              : {}),
            imageUrl:
              entity.productVariant?.image?.url ??
              entity.productVersion?.images?.[0]?.url ??
              null,
          }
        : undefined,
    };
  }
}
