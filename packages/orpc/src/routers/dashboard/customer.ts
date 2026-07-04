import { CustomerEntity } from "@dukkani/common/entities/customer/entity";
import { CustomerQuery } from "@dukkani/common/entities/customer/query";
import {
  createCustomerInputSchema,
  getCustomerInputSchema,
  getGovernorateCountsInputSchema,
  listCustomersInputSchema,
  listCustomersWithStatsInputSchema,
  updateCustomerInputSchema,
  updateCustomerNotesInputSchema,
} from "@dukkani/common/schemas/customer/input";
import type {
  CustomerIncludeOutput,
  CustomerSimpleOutput,
  GovernorateCountsOutput,
  ListCustomersOutput,
  ListCustomersWithStatsOutput,
} from "@dukkani/common/schemas/customer/output";
import {
  customerIncludeOutputSchema,
  customerSimpleOutputSchema,
  governorateCountsOutputSchema,
  listCustomersOutputSchema,
  listCustomersWithStatsOutputSchema,
} from "@dukkani/common/schemas/customer/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { CustomerService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../../procedures";
import {
  getUserStoreIds,
  verifyStoreOwnership,
} from "../../utils/store-access";

export const customerRouter = {
  getAll: protectedProcedure
    .input(listCustomersInputSchema.optional())
    .output(listCustomersOutputSchema)
    .handler(async ({ input, context }): Promise<ListCustomersOutput> => {
      const userId = context.session.user.id;
      const userStoreIds = await getUserStoreIds(userId);

      if (userStoreIds.length === 0) {
        return {
          customers: [],
          total: 0,
          hasMore: false,
          page: input?.page ?? 1,
          limit: input?.limit ?? 20,
        };
      }

      const page = input?.page ?? 1;
      const limit = input?.limit ?? 20;
      const skip = (page - 1) * limit;

      if (input?.storeId && !userStoreIds.includes(input.storeId)) {
        throw new ORPCError("FORBIDDEN", {
          message: "You don't have access to this store",
        });
      }

      const where = CustomerQuery.getWhere(userStoreIds, {
        storeId: input?.storeId,
        search: input?.search,
        phone: input?.phone,
      });

      const [customers, total] = await Promise.all([
        database.customer.findMany({
          where,
          skip,
          take: limit,
          orderBy: CustomerQuery.getOrder("desc", "createdAt"),
          include: CustomerQuery.getInclude(),
        }),
        database.customer.count({ where }),
      ]);

      const hasMore = skip + customers.length < total;

      return {
        customers: customers.map(CustomerEntity.getSimpleRo),
        total,
        hasMore,
        page,
        limit,
      };
    }),

  getAllWithStats: protectedProcedure
    .input(listCustomersWithStatsInputSchema.optional())
    .output(listCustomersWithStatsOutputSchema)
    .handler(
      async ({ input, context }): Promise<ListCustomersWithStatsOutput> => {
        const userId = context.session.user.id;
        const userStoreIds = await getUserStoreIds(userId);

        const page = input?.page ?? 1;
        const limit = input?.limit ?? 20;

        if (userStoreIds.length === 0) {
          return { customers: [], total: 0, hasMore: false, page, limit };
        }

        if (input?.storeId && !userStoreIds.includes(input.storeId)) {
          throw new ORPCError("FORBIDDEN", {
            message: "You don't have access to this store",
          });
        }

        const { customers, total } = await CustomerService.listWithStats(
          userStoreIds,
          {
            storeId: input?.storeId,
            search: input?.search,
            governorates: input?.governorates,
          },
          input?.sortBy ?? "recent",
          page,
          limit,
        );

        return {
          customers,
          total,
          hasMore: (page - 1) * limit + customers.length < total,
          page,
          limit,
        };
      },
    ),

  getGovernorateCounts: protectedProcedure
    .input(getGovernorateCountsInputSchema.optional())
    .output(governorateCountsOutputSchema)
    .handler(
      async ({ input, context }): Promise<GovernorateCountsOutput> => {
        const userId = context.session.user.id;
        const userStoreIds = await getUserStoreIds(userId);

        if (userStoreIds.length === 0) {
          return { counts: [] };
        }

        if (input?.storeId && !userStoreIds.includes(input.storeId)) {
          throw new ORPCError("FORBIDDEN", {
            message: "You don't have access to this store",
          });
        }

        return await CustomerService.getGovernorateCounts(
          userStoreIds,
          input?.storeId,
        );
      },
    ),

  getById: protectedProcedure
    .input(getCustomerInputSchema)
    .output(customerIncludeOutputSchema)
    .handler(async ({ input, context }): Promise<CustomerIncludeOutput> => {
      const userId = context.session.user.id;

      const customer = await database.customer.findUnique({
        where: { id: input.id },
        include: CustomerQuery.getInclude(),
      });

      if (!customer) {
        throw new ORPCError("NOT_FOUND", { message: "Customer not found" });
      }

      await verifyStoreOwnership(userId, customer.storeId);
      return CustomerEntity.getRo(customer);
    }),

  create: protectedProcedure
    .input(createCustomerInputSchema)
    .output(customerSimpleOutputSchema)
    .handler(async ({ input, context }): Promise<CustomerSimpleOutput> => {
      const userId = context.session.user.id;

      return await CustomerService.createCustomer(input, userId);
    }),

  update: protectedProcedure
    .input(updateCustomerInputSchema)
    .output(customerSimpleOutputSchema)
    .handler(async ({ input, context }): Promise<CustomerSimpleOutput> => {
      const userId = context.session.user.id;

      return await CustomerService.updateCustomer(input, userId);
    }),

  updateNotes: protectedProcedure
    .input(updateCustomerNotesInputSchema)
    .output(customerSimpleOutputSchema)
    .handler(async ({ input, context }): Promise<CustomerSimpleOutput> => {
      const userId = context.session.user.id;

      return await CustomerService.updateNotes(
        input.id,
        input.notes,
        userId,
      );
    }),

  delete: protectedProcedure
    .input(getCustomerInputSchema)
    .output(successOutputSchema)
    .handler(async ({ input, context }) => {
      const userId = context.session.user.id;

      const customer = await database.customer.findUnique({
        where: { id: input.id },
        select: { storeId: true },
      });

      if (!customer) {
        throw new ORPCError("NOT_FOUND", { message: "Customer not found" });
      }

      await verifyStoreOwnership(userId, customer.storeId);

      const orderCount = await database.order.count({
        where: { customerId: input.id },
      });

      if (orderCount > 0) {
        throw new ORPCError("CONFLICT", {
          message: "Customer has existing orders and cannot be deleted",
        });
      }

      await database.customer.delete({ where: { id: input.id } });

      return { success: true };
    }),
};
