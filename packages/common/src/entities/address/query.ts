import type { Prisma } from "@dukkani/db/prisma/generated";

export type AddressSimpleDbData = Prisma.AddressGetPayload<{
  select: ReturnType<typeof AddressQuery.getSimpleSelect>;
}>;

export type AddressListDbData = Prisma.AddressGetPayload<{
  select: ReturnType<typeof AddressQuery.getListSelect>;
}>;

export class AddressQuery {
  static getListSelect() {
    return {
      city: true,
      postalCode: true,
      street: true,
    } satisfies Prisma.AddressSelect;
  }

  static getSimpleSelect() {
    return {
      id: true,
      street: true,
      city: true,
      postalCode: true,
      latitude: true,
      longitude: true,
      isDefault: true,
      customerId: true,
      createdAt: true,
      updatedAt: true,
    } satisfies Prisma.AddressSelect;
  }
}
