import type {
  CustomerIncludeOutput,
  CustomerSimpleOutput,
} from "../../schemas/customer/output";
import { StoreEntity } from "../store/entity";
import type {
  CustomerIncludeDbData,
  CustomerListDbData,
  CustomerSimpleDbData,
} from "./query";

export class CustomerEntity {
  static getListRo(entity: CustomerListDbData): { name: string; phone: string } {
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
    return {
      ...CustomerEntity.getSimpleRo(entity),
      store: StoreEntity.getSimpleRo(entity.store),
    };
  }
}
