import type {
  CustomerIncludeOutput,
  CustomerListItemOutput,
  CustomerSimpleOutput,
} from "../../schemas/customer/output";
import { StoreEntity } from "../store/entity";
import type {
  CustomerIncludeDbData,
  CustomerListDbData,
  CustomerSimpleDbData,
  CustomerStatsRow,
} from "./query";

function getOrderTotal(order: {
  orderItems: { price: unknown; quantity: number }[];
}): number {
  return order.orderItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
}

export class CustomerEntity {
  static getListRo(entity: CustomerListDbData): {
    name: string;
    phone: string;
  } {
    return { name: entity.name, phone: entity.phone };
  }

  static getSimpleRo(entity: CustomerSimpleDbData): CustomerSimpleOutput {
    return {
      id: entity.id,
      name: entity.name,
      phone: entity.phone,
      prefersWhatsApp: entity.prefersWhatsApp,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static getRo(entity: CustomerIncludeDbData): CustomerIncludeOutput {
    const orders = entity.orders.map((order) => ({
      id: order.id,
      status: order.status,
      createdAt: order.createdAt,
      total: getOrderTotal(order),
    }));

    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const orderCount = orders.length;
    const lastOrderAt = orders[0]?.createdAt ?? null;

    return {
      ...CustomerEntity.getSimpleRo(entity),
      store: StoreEntity.getSimpleRo(entity.store),
      notes: entity.notes,
      nameManuallySet: entity.nameManuallySet,
      nameVariants: entity.nameVariants.map((variant) => ({
        name: variant.name,
        timesUsed: variant.timesUsed,
        lastUsedAt: variant.lastUsedAt,
      })),
      addresses: entity.addresses.map((address) => ({
        id: address.id,
        street: address.street,
        city: address.city,
        governorate: address.governorate,
        isDefault: address.isDefault,
        orderCount: address._count.orders,
      })),
      orders,
      orderCount,
      totalSpent,
      avgOrderValue: orderCount > 0 ? totalSpent / orderCount : 0,
      lastOrderAt,
    };
  }

  static getListWithStatsRo(row: CustomerStatsRow): CustomerListItemOutput {
    return {
      id: row.id,
      name: row.name,
      phone: row.phone,
      prefersWhatsApp: row.prefersWhatsApp,
      storeId: row.storeId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      governorates: row.governorates ?? [],
      orderCount: row.orderCount,
      totalSpent: row.totalSpent,
      lastOrderAt: row.lastOrderAt,
    };
  }
}
