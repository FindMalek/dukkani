import type { AddressSimpleOutput } from "../../schemas/address/output";
import type { AddressListDbData, AddressSimpleDbData } from "./query";

export class AddressEntity {
  static getListRo(
    entity: AddressListDbData,
  ): { city: string; postalCode: string | null; street: string | null } {
    return {
      city: entity.city,
      postalCode: entity.postalCode,
      street: entity.street,
    };
  }

  static formatShortLocation(
    address: AddressSimpleOutput | null | undefined,
  ): string | null {
    if (!address) return null;
    return address.street ? `${address.city}, ${address.street}` : address.city;
  }

  static formatOrderListLocation(
    address: { city: string; postalCode: string | null } | null | undefined,
  ): string | null {
    if (!address) return null;
    const { city, postalCode } = address;
    if (postalCode) return `${city}, ${postalCode}`;
    return city;
  }

  static getSimpleRo(entity: AddressSimpleDbData): AddressSimpleOutput {
    return {
      id: entity.id,
      street: entity.street,
      city: entity.city,
      postalCode: entity.postalCode,
      latitude: entity.latitude,
      longitude: entity.longitude,
      isDefault: entity.isDefault,
      customerId: entity.customerId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
