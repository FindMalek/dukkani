import { ProductEntity } from "@dukkani/common/entities/product/entity";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import {
	createProductInputSchema,
	getProductInputSchema,
	listProductsInputSchema,
	togglePublishProductInputSchema,
	updateProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import type {
	ListProductsOutput,
	ProductIncludeOutput,
} from "@dukkani/common/schemas/product/output";
import {
	listProductsOutputSchema,
	productIncludeOutputSchema,
} from "@dukkani/common/schemas/product/output";
import { successOutputSchema } from "@dukkani/common/schemas/utils/success";
import { ProductService } from "@dukkani/common/services/productService";
import { database } from "@dukkani/db";
import { ORPCError } from "@orpc/server";
import { protectedProcedure } from "../index";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";

export const productRouter = {
	/**
	 * Get all products for user's stores (with pagination/filtering)
	 */
	getAll: protectedProcedure
		.input(listProductsInputSchema.optional())
		.output(listProductsOutputSchema)
		.handler(async ({ input, context }): Promise<ListProductsOutput> => {
			const userId = context.session.user.id;
			const userStoreIds = await getUserStoreIds(userId);

			if (userStoreIds.length === 0) {
				return {
					products: [],
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
			const where = ProductQuery.getWhere(userStoreIds, {
				storeId: input?.storeId,
				published: input?.published,
				search: input?.search,
			});

			const [products, total] = await Promise.all([
				database.product.findMany({
					where,
					skip,
					take: limit,
					orderBy: ProductQuery.getOrder("desc", "createdAt"),
					include: ProductQuery.getClientSafeInclude(),
				}),
				database.product.count({ where }),
			]);

			const hasMore = skip + products.length < total;

			return {
				products: products.map(ProductEntity.getSimpleRo),
				total,
				hasMore,
				page,
				limit,
			};
		}),

	/**
	 * Get product by ID (verify store ownership)
	 */
	getById: protectedProcedure
		.input(getProductInputSchema)
		.output(productIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			const product = await database.product.findUnique({
				where: { id: input.id },
				include: ProductQuery.getInclude(),
			});

			if (!product) {
				throw new ORPCError("NOT_FOUND", {
					message: "Product not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			return ProductEntity.getRo(product);
		}),

	/**
	 * Create new product (verify store ownership)
	 */
	create: protectedProcedure
		.input(createProductInputSchema)
		.output(productIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Verify ownership
			await verifyStoreOwnership(userId, input.storeId);

			// Get store to generate product ID
			const store = await database.store.findUnique({
				where: { id: input.storeId },
				select: { slug: true },
			});

			if (!store) {
				throw new ORPCError("NOT_FOUND", {
					message: "Store not found",
				});
			}

			// Generate product ID
			const productId = ProductService.generateProductId(store.slug);

			// Create product with images
			const product = await database.product.create({
				data: {
					id: productId,
					name: input.name,
					description: input.description,
					price: input.price,
					stock: input.stock,
					published: input.published ?? false,
					storeId: input.storeId,
					images: input.imageUrls
						? {
								create: input.imageUrls.map((url) => ({ url })),
							}
						: undefined,
				},
				include: ProductQuery.getInclude(),
			});

			return ProductEntity.getRo(product);
		}),

	/**
	 * Update product (verify store ownership)
	 */
	update: protectedProcedure
		.input(updateProductInputSchema)
		.output(productIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const existingProduct = await database.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!existingProduct) {
				throw new ORPCError("NOT_FOUND", {
					message: "Product not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, existingProduct.storeId);

			// Update product
			const updateData: {
				name?: string;
				description?: string | null;
				price?: number;
				stock?: number;
				published?: boolean;
			} = {};

			if (input.name !== undefined) updateData.name = input.name;
			if (input.description !== undefined)
				updateData.description = input.description || null;
			if (input.price !== undefined) updateData.price = input.price;
			if (input.stock !== undefined) updateData.stock = input.stock;
			if (input.published !== undefined) updateData.published = input.published;

			// Handle image updates
			if (input.imageUrls !== undefined) {
				// Delete existing images
				await database.image.deleteMany({
					where: { productId: input.id },
				});

				// Create new images
				if (input.imageUrls.length > 0) {
					await database.image.createMany({
						data: input.imageUrls.map((url) => ({
							url,
							productId: input.id,
						})),
					});
				}
			}

			const product = await database.product.update({
				where: { id: input.id },
				data: updateData,
				include: ProductQuery.getInclude(),
			});

			return ProductEntity.getRo(product);
		}),

	/**
	 * Delete product (verify store ownership)
	 */
	delete: protectedProcedure
		.input(getProductInputSchema)
		.output(successOutputSchema)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const product = await database.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!product) {
				throw new ORPCError("NOT_FOUND", {
					message: "Product not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			// Delete product (images will be cascade deleted)
			await database.product.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	/**
	 * Toggle product published status
	 */
	togglePublish: protectedProcedure
		.input(togglePublishProductInputSchema)
		.output(productIncludeOutputSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const product = await database.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!product) {
				throw new ORPCError("NOT_FOUND", {
					message: "Product not found",
				});
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			// Update published status
			const updated = await database.product.update({
				where: { id: input.id },
				data: { published: input.published },
				include: ProductQuery.getInclude(),
			});

			return ProductEntity.getRo(updated);
		}),
};
