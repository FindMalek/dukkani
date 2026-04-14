import { ProductQuery } from "@dukkani/common/entities/product/query";
import type {
  ProductSort,
  StockFilter,
} from "@dukkani/common/schemas/product/input";
import type { Prisma } from "@dukkani/db/prisma/generated";

export const STOCK_RANGE_MAP: Partial<
  Record<NonNullable<StockFilter>, { gte?: number; lte?: number }>
> = {
  "in-stock": { gte: 1 },
  "low-stock": { gte: 1, lte: 10 },
  "out-of-stock": { lte: 0 },
  // "all" intentionally absent — no filter applied
};

export const SORT_ORDER_MAP: Record<
  NonNullable<ProductSort>,
  Prisma.ProductOrderByWithRelationInput
> = {
  priceAsc: ProductQuery.getOrder("asc", "price"),
  priceDesc: ProductQuery.getOrder("desc", "price"),
  newest: ProductQuery.getOrder("desc", "createdAt"),
};
