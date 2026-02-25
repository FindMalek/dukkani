import { database } from "@dukkani/db";
import { NotFoundError } from "@dukkani/common/errors";
import { addSpanAttributes, traceStaticClass } from "@dukkani/tracing";
import { CategoryEntity } from "../entities/category/entity";
import { CategoryQuery } from "../entities/category/query";
import type {
	CreateCategoryInput,
	UpdateCategoryInput,
} from "../schemas/category/input";
import type { CategoryOutput } from "../schemas/category/output";

class CategoryServiceBase {
	static async createCategory(
		input: CreateCategoryInput,
	): Promise<CategoryOutput> {
		addSpanAttributes({
			"category.store_id": input.storeId,
			"category.name": input.name,
		});

		const category = await database.category.create({
			data: {
				name: input.name,
				storeId: input.storeId,
			},
			include: CategoryQuery.getSimpleInclude(),
		});

		return CategoryEntity.getSimpleRo(category);
	}

	static async getAllCategories(storeId: string): Promise<CategoryOutput[]> {
		addSpanAttributes({
			"category.store_id": storeId,
		});

		const categories = await database.category.findMany({
			where: { storeId },
			include: CategoryQuery.getSimpleInclude(),
			orderBy: { name: "asc" },
		});

		return categories.map(CategoryEntity.getSimpleRo);
	}

	static async getCategoryById(id: string): Promise<CategoryOutput> {
		const category = await database.category.findUnique({
			where: { id },
			include: CategoryQuery.getSimpleInclude(),
		});

		if (!category) {
			throw new NotFoundError("Category not found");
		}

		return CategoryEntity.getSimpleRo(category);
	}

	static async updateCategory(
		input: UpdateCategoryInput,
	): Promise<CategoryOutput> {
		addSpanAttributes({
			"category.id": input.id,
		});

		const category = await database.category.update({
			where: { id: input.id },
			data: {
				...(input.name && { name: input.name }),
			},
			include: CategoryQuery.getSimpleInclude(),
		});

		return CategoryEntity.getSimpleRo(category);
	}

	static async deleteCategory(id: string): Promise<void> {
		addSpanAttributes({
			"category.id": id,
		});

		await database.category.delete({
			where: { id },
		});
	}
}

export const CategoryService = traceStaticClass(CategoryServiceBase);
