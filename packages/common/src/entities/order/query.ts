import type { OrderStatus } from "@dukkani/common/schemas/order/enums";
import type { Prisma } from "@dukkani/db/prisma/generated";
import { AddressQuery } from "../address/query";
import { CustomerQuery } from "../customer/query";
import { OrderItemQuery } from "../order-item/query";

export type OrderSimpleDbData = Prisma.OrderGetPayload<{
  include: ReturnType<typeof OrderQuery.getSimpleInclude>;
}>;

export type OrderIncludeDbData = Prisma.OrderGetPayload<{
  include: ReturnType<typeof OrderQuery.getInclude>;
}>;

export type OrderIncludeWithProductDbData = Prisma.OrderGetPayload<{
  include: ReturnType<typeof OrderQuery.getIncludeWithProduct>;
}>;

export type OrderClientSafeDbData = Prisma.OrderGetPayload<{
  include: ReturnType<typeof OrderQuery.getClientSafeInclude>;
}>;

export type OrderListDbData = Prisma.OrderGetPayload<{
  select: ReturnType<typeof OrderQuery.getListSelect>;
}>;

export class OrderQuery {
  static getSimpleInclude() {
    return {} satisfies Prisma.OrderInclude;
  }

  static getListSelect() {
    return {
      id: true,
      status: true,
      paymentMethod: true,
      createdAt: true,
      customer: { select: { name: true, phone: true } },
      address: { select: { city: true, postalCode: true, street: true } },
      orderItems: { select: { price: true, quantity: true } },
    } satisfies Prisma.OrderSelect;
  }

  static getInclude() {
    return {
      ...OrderQuery.getSimpleInclude(),
      store: true,
      customer: CustomerQuery.getSimpleInclude(),
      address: {
        select: AddressQuery.getSimpleSelect(),
      },
      orderItems: true,
      whatsappMessages: true,
    } satisfies Prisma.OrderInclude;
  }

  static getIncludeWithProduct() {
    return {
      ...OrderQuery.getSimpleInclude(),
      store: true,
      customer: CustomerQuery.getSimpleInclude(),
      address: {
        select: AddressQuery.getSimpleSelect(),
      },
      orderItems: {
        include: OrderItemQuery.getIncludeWithProductSelect(),
      },
      whatsappMessages: true,
    } satisfies Prisma.OrderInclude;
  }

  static getClientSafeInclude() {
    return {
      ...OrderQuery.getSimpleInclude(),
      orderItems: true,
    } satisfies Prisma.OrderInclude;
  }

  /**
   * Generate where clause for filtering orders by store IDs and optional filters
   */
  static getWhere(
    storeIds: string[],
    filters?: {
      storeId?: string;
      status?: OrderStatus;
      customerId?: string;
      search?: string;
    },
  ): Prisma.OrderWhereInput {
    const where: Prisma.OrderWhereInput = {
      storeId: { in: storeIds },
    };

    if (filters?.storeId) {
      where.storeId = { in: [filters.storeId] };
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.customerId) {
      where.customerId = filters.customerId;
    }

    if (filters?.search) {
      where.OR = [
        {
          customer: {
            name: { contains: filters.search, mode: "insensitive" },
          },
        },
        {
          customer: {
            phone: { contains: filters.search, mode: "insensitive" },
          },
        },
        {
          id: { contains: filters.search, mode: "insensitive" },
        },
      ];
    }

    return where;
  }

  /**
   * Generate orderBy clause for orders
   */
  static getOrder(
    orderBy: "asc" | "desc" = "desc",
    field: "createdAt" | "updatedAt" = "createdAt",
  ): Prisma.OrderOrderByWithRelationInput {
    return { [field]: orderBy };
  }
}
