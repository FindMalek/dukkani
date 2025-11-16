import prisma from "@dukkani/db";
import { protectedProcedure } from "../index";
import { getUserStoreIds, verifyStoreOwnership } from "../utils/store-access";
import { ProductService } from "@dukkani/common/services/productService";
import {
	listProductsInputSchema,
	createProductInputSchema,
	updateProductInputSchema,
	getProductInputSchema,
} from "@dukkani/common/schemas/product/input";
import { ProductQuery } from "@dukkani/common/entities/product/query";
import { ProductEntity } from "@dukkani/common/entities/product/entity";
import type {
	ListProductsOutput,
	ProductIncludeOutput,
} from "@dukkani/common/schemas/product/output";
import { z } from "zod";

// Extended schema for create with imageUrls
const createProductWithImagesSchema = createProductInputSchema.extend({
	imageUrls: z.array(z.url()).optional(),
});

// Extended schema for update with imageUrls
const updateProductWithImagesSchema = updateProductInputSchema.extend({
	imageUrls: z.array(z.url()).optional(),
});

export const productRouter = {
	/**
	 * Get all products for user's stores (with pagination/filtering)
	 */
	getAll: protectedProcedure
		.input(listProductsInputSchema.optional())
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

			const where: {
				storeId: { in: string[] };
				published?: boolean;
				OR?: Array<
					| { name: { contains: string; mode: "insensitive" } }
					| { description: { contains: string; mode: "insensitive" } }
				>;
			} = {
				storeId: { in: userStoreIds },
			};

			if (input?.published !== undefined) {
				where.published = input.published;
			}

			if (input?.storeId) {
				// Verify user owns this store
				if (!userStoreIds.includes(input.storeId)) {
					throw new Error("You don't have access to this store");
				}
				where.storeId = { in: [input.storeId] };
			}

			if (input?.search) {
				where.OR = [
					{ name: { contains: input.search, mode: "insensitive" } },
					{ description: { contains: input.search, mode: "insensitive" } },
				];
			}

			const [products, total] = await Promise.all([
				prisma.product.findMany({
					where,
					skip,
					take: limit,
					orderBy: {
						createdAt: "desc",
					},
					include: ProductQuery.getClientSafeInclude(),
				}),
				prisma.product.count({ where }),
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
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			const product = await prisma.product.findUnique({
				where: { id: input.id },
				include: ProductQuery.getInclude(),
			});

			if (!product) {
				throw new Error("Product not found");
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			return ProductEntity.getRo(product);
		}),

	/**
	 * Create new product (verify store ownership)
	 */
	create: protectedProcedure
		.input(createProductWithImagesSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Verify ownership
			await verifyStoreOwnership(userId, input.storeId);

			// Get store to generate product ID
			const store = await prisma.store.findUnique({
				where: { id: input.storeId },
				select: { slug: true },
			});

			if (!store) {
				throw new Error("Store not found");
			}

			// Generate product ID
			const productId = ProductService.generateProductId(store.slug);

			// Create product with images
			const product = await prisma.product.create({
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
		.input(updateProductWithImagesSchema)
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const existingProduct = await prisma.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!existingProduct) {
				throw new Error("Product not found");
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
				await prisma.image.deleteMany({
					where: { productId: input.id },
				});

				// Create new images
				if (input.imageUrls.length > 0) {
					await prisma.image.createMany({
						data: input.imageUrls.map((url) => ({
							url,
							productId: input.id,
						})),
					});
				}
			}

			const product = await prisma.product.update({
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
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const product = await prisma.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!product) {
				throw new Error("Product not found");
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			// Delete product (images will be cascade deleted)
			await prisma.product.delete({
				where: { id: input.id },
			});

			return { success: true };
		}),

	/**
	 * Toggle product published status
	 */
	togglePublish: protectedProcedure
		.input(z.object({ id: z.string().min(1), published: z.boolean() }))
		.handler(async ({ input, context }): Promise<ProductIncludeOutput> => {
			const userId = context.session.user.id;

			// Get product to verify ownership
			const product = await prisma.product.findUnique({
				where: { id: input.id },
				select: { storeId: true },
			});

			if (!product) {
				throw new Error("Product not found");
			}

			// Verify ownership
			await verifyStoreOwnership(userId, product.storeId);

			// Update published status
			const updated = await prisma.product.update({
				where: { id: input.id },
				data: { published: input.published },
				include: ProductQuery.getInclude(),
			});

			return ProductEntity.getRo(updated);
		}),
};
