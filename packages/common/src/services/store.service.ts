import { ForbiddenError, NotFoundError } from "@dukkani/common/errors";
import { database } from "@dukkani/db";
import {
  type StoreCategory,
  StorePlanType,
  StoreStatus,
  type StoreTheme,
} from "@dukkani/db/prisma/generated/enums";
import logger from "@dukkani/logger";
import {
  addSpanAttributes,
  enhanceLogWithTraceContext,
  traceStaticClass,
} from "@dukkani/tracing";
import {
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
  subDays,
} from "date-fns";
import { OrderQuery } from "../entities/order/query";
import { OrderItemQuery } from "../entities/order-item/query";
import { ProductQuery } from "../entities/product/query";
import { StoreEntity } from "../entities/store/entity";
import { StoreQuery } from "../entities/store/query";
import { OrderStatus } from "../schemas/order/enums";
import { isReservedStoreSlug } from "../schemas/store/constants";
import type { CreateStoreOnboardingInput } from "../schemas/store/input";
import type {
  StoreIncludeOutput,
  StorePublicOutput,
  StoreSimpleOutput,
} from "../schemas/store/output";
import { getOrderLimitForPlan } from "../schemas/store-plan/constants";

/**
 * Store service - Shared business logic for store operations
 * All methods are automatically traced via traceStaticClass
 */
class StoreServiceBase {
  /**
   * Generate a unique slug from store name
   * Handles conflicts by appending numbers
   */
  private static async generateUniqueSlug(baseName: string): Promise<string> {
    addSpanAttributes({
      "store.slug_base": baseName,
    });

    // Convert to slug: lowercase, replace spaces with hyphens, remove special chars
    const baseSlug = baseName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    let slug = baseSlug;
    let counter = 1;

    // Check if slug is reserved or exists in DB; if so append number
    while (true) {
      const isReserved = isReservedStoreSlug(slug);
      const existing = await database.store.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (!isReserved && !existing) {
        addSpanAttributes({
          "store.slug_final": slug,
          "store.slug_attempts": counter,
        });
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  /**
   * Create a new store with auto-generated slug and default plan
   */
  static async createStore(
    input: CreateStoreOnboardingInput,
    userId: string,
  ): Promise<StoreSimpleOutput> {
    addSpanAttributes({
      "store.user_id": userId,
      "store.name": input.name,
    });

    const slug = await StoreServiceBase.generateUniqueSlug(input.name);
    const orderLimit = getOrderLimitForPlan(StorePlanType.FREE);

    const store = await database.store.create({
      data: {
        name: input.name,
        slug,
        description: input.description,
        notificationMethod: input.notificationMethod,
        currency: input.currency,
        ownerId: userId,
        storePlan: {
          create: {
            planType: StorePlanType.FREE,
            orderLimit,
            orderCount: 0,
          },
        },
      },
      include: StoreQuery.getClientSafeInclude(),
    });

    addSpanAttributes({
      "store.id": store.id,
      "store.slug": store.slug,
    });

    logger.info(
      enhanceLogWithTraceContext({
        store_id: store.id,
        store_slug: store.slug,
        user_id: userId,
      }),
      "Store created successfully",
    );

    return StoreEntity.getSimpleRo(store);
  }

  /**
   * Get all stores owned by a user
   */
  static async getAllStores(userId: string): Promise<StoreSimpleOutput[]> {
    addSpanAttributes({
      "store.user_id": userId,
    });

    const stores = await database.store.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: StoreQuery.getClientSafeInclude(),
    });

    addSpanAttributes({
      "store.count": stores.length,
    });

    return stores.map(StoreEntity.getSimpleRo);
  }

  /**
   * Get store by ID with ownership verification
   */
  static async getStoreById(
    id: string,
    userId: string,
  ): Promise<StoreIncludeOutput> {
    addSpanAttributes({
      "store.id": id,
      "store.user_id": userId,
    });

    const store = await database.store.findUnique({
      where: { id },
      include: StoreQuery.getInclude(),
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this store");
    }

    return StoreEntity.getRo(store);
  }

  /**
   * Get store by slug with ownership verification
   */
  static async getStoreBySlug(
    slug: string,
    userId: string,
  ): Promise<StoreIncludeOutput> {
    addSpanAttributes({
      "store.slug": slug,
      "store.user_id": userId,
    });

    const store = await database.store.findUnique({
      where: { slug },
      include: StoreQuery.getInclude(),
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this store");
    }

    return StoreEntity.getRo(store);
  }

  /**
   * Get store by slug (public - for storefronts)
   * Returns public data with owner (limited) and products (published only, paginated)
   * For DRAFT stores, returns minimal data for "Coming Soon" display
   */
  static async getStoreBySlugPublic(
    slug: string,
    options?: {
      productPage?: number;
      productLimit?: number;
    },
  ): Promise<StorePublicOutput> {
    const productPage = options?.productPage ?? 1;
    const productLimit = options?.productLimit ?? 20;

    addSpanAttributes({
      "store.slug": slug,
      "store.product_page": productPage,
      "store.product_limit": productLimit,
    });

    // Fetch all necessary data in a single query to avoid race conditions
    const store = await database.store.findUnique({
      where: { slug },
      include: StoreQuery.getPublicInclude({
        productPage,
        productLimit,
      }),
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    // Handle DRAFT status - return minimal data for "Coming Soon" display
    if (store.status === StoreStatus.DRAFT) {
      const result = StoreEntity.getPublicRo({ ...store, products: [] });
      return {
        ...result,
        products: [],
        productsPagination: {
          total: 0,
          hasMore: false,
          page: 1,
          limit: 0,
        },
      };
    }

    // For SUSPENDED or ARCHIVED stores, throw error (not accessible)
    if (
      store.status === StoreStatus.SUSPENDED ||
      store.status === StoreStatus.ARCHIVED
    ) {
      throw new NotFoundError("Store is not available");
    }

    // For PUBLISHED stores, get total count of published products
    const totalProducts = await database.product.count({
      where: {
        storeId: store.id,
        ...ProductQuery.getPublishableWhere(),
      },
    });

    const result = StoreEntity.getPublicRo(store);

    // Add pagination metadata
    const productSkip = (productPage - 1) * productLimit;
    const hasMoreProducts =
      productSkip + (store.products?.length ?? 0) < totalProducts;

    addSpanAttributes({
      "store.total_products": totalProducts,
      "store.products_returned": store.products?.length ?? 0,
      "store.has_more_products": hasMoreProducts,
    });

    return {
      ...result,
      productsPagination: {
        total: totalProducts,
        hasMore: hasMoreProducts,
        page: productPage,
        limit: productLimit,
      },
    };
  }

  /**
   * Update store configuration (theme and category)
   */
  static async updateStoreConfiguration(
    storeId: string,
    userId: string,
    updates: {
      theme?: StoreTheme;
      category?: StoreCategory;
    },
  ): Promise<StoreSimpleOutput> {
    addSpanAttributes({
      "store.id": storeId,
      "store.user_id": userId,
      "store.theme": updates.theme ?? "",
      "store.category": updates.category ?? "",
    });

    // Verify ownership
    const store = await database.store.findUnique({
      where: { id: storeId },
      select: { ownerId: true },
    });

    if (!store) {
      throw new NotFoundError("Store not found");
    }

    if (store.ownerId !== userId) {
      throw new ForbiddenError("You don't have access to this store");
    }

    // Update store
    const updatedStore = await database.store.update({
      where: { id: storeId },
      data: {
        theme: updates.theme,
        category: updates.category,
      },
      include: StoreQuery.getClientSafeInclude(),
    });

    return StoreEntity.getSimpleRo(updatedStore);
  }

  /**
   * Dashboard home overview: today / week order and revenue stats for the user's store(s).
   * When `storeId` is set, stats are limited to that store; otherwise all owned stores.
   */
  static async getStoreStats(userId: string, storeId?: string) {
    addSpanAttributes({
      "store.stats_user_id": userId,
      "store.stats_filter_id": storeId ?? "all",
    });

    const userStoreIds = await database.store.findMany({
      where: { ownerId: userId },
      select: { id: true },
    });

    const storeIds = userStoreIds.map((s) => s.id);

    if (storeIds.length === 0) {
      return {
        todayOrders: 0,
        todayOrdersChange: 0,
        todayRevenue: 0,
        weekOrders: 0,
      };
    }

    const filteredStoreIds =
      storeId && storeIds.includes(storeId) ? [storeId] : storeIds;

    const now = new Date();
    const todayStart = startOfDay(now);
    const todayEnd = endOfDay(now);
    const yesterdayStart = startOfDay(subDays(now, 1));
    const yesterdayEnd = endOfDay(subDays(now, 1));
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const baseOrderWhere = OrderQuery.getWhere(filteredStoreIds);

    const [todayOrders, yesterdayOrders, todayDeliveredOrders, weekOrders] =
      await database.$transaction([
        database.order.count({
          where: {
            ...baseOrderWhere,
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        }),
        database.order.count({
          where: {
            ...baseOrderWhere,
            createdAt: {
              gte: yesterdayStart,
              lte: yesterdayEnd,
            },
          },
        }),
        database.order.findMany({
          where: {
            ...baseOrderWhere,
            status: OrderStatus.DELIVERED,
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
          include: {
            orderItems: {
              select: OrderItemQuery.getRevenueSelect(),
            },
          },
        }),
        database.order.count({
          where: {
            ...baseOrderWhere,
            createdAt: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
        }),
      ]);

    const todayRevenue = todayDeliveredOrders.reduce((sum, order) => {
      const orderTotal = order.orderItems.reduce(
        (itemSum, item) => itemSum + Number(item.price) * item.quantity,
        0,
      );
      return sum + orderTotal;
    }, 0);

    const todayOrdersChange =
      yesterdayOrders > 0 ? todayOrders - yesterdayOrders : todayOrders;

    addSpanAttributes({
      "store.stats_owner_store_count": storeIds.length,
    });

    return {
      todayOrders,
      todayOrdersChange,
      todayRevenue,
      weekOrders,
    };
  }
}

export const StoreService = traceStaticClass(StoreServiceBase);
