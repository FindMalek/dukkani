import { CustomerEntity } from "@dukkani/common/entities/customer/entity";
import { CustomerQuery } from "@dukkani/common/entities/customer/query";
import {
	createCustomerInputSchema,
	getCustomerInputSchema,
	listCustomersInputSchema,
	updateCustomerInputSchema,
} from "@dukkani/common/schemas/customer/input";
import type {
	CustomerIncludeOutput,
	CustomerSimpleOutput,
	ListCustomersOutput,
} from "@dukkani/common/schemas/customer/output";
import {
	customerIncludeOutputSchema,
	customerSimpleOutputSchema,
	listCustomersOutputSchema,
} from "@dukkani/common/schemas/customer/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { CustomerService } from "@dukkani/common/services";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";

export const customerRouter = {
	/**
	 * Get all customers for user's stores (with pagination/filtering)
	 */
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

			// Verify store ownership if filtering by specific store
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

	/**
	 * Get customer by ID (verify store ownership)
	 */
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
				throw new ORPCError("NOT_FOUND", {
					message: "Customer not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, customer.storeId);

			return CustomerEntity.getRo(customer);
		}),

	/**
	 * Create new customer (verify store ownership)
	 */
	create: protectedProcedure
		.input(createCustomerInputSchema)
		.output(customerSimpleOutputSchema)
		.handler(async ({ input, context }): Promise<CustomerSimpleOutput> => {
			const userId = context.session.user.id;
			return await CustomerService.createCustomer(input, userId);
		}),

	/**
	 * Update customer (verify store ownership)
	 */
	update: protectedProcedure
		.input(updateCustomerInputSchema)
		.output(customerSimpleOutputSchema)
		.handler(async ({ input, context }): Promise<CustomerSimpleOutput> => {
			const userId = context.session.user.id;
			return await CustomerService.updateCustomer(input, userId);
		}),

	/**
	 * Delete customer (verify store ownership)
	 */
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
				throw new ORPCError("NOT_FOUND", {
					message: "Customer not found",
				});
			}

			await verifyStoreOwnership(userId, customer.storeId);

			// Delete customer (orders will have customerId set to null)
			await database.customer.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),
};
