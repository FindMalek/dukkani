import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";

/**
 * Seeder for Todo model
 */
export class TodoSeeder extends BaseSeeder {
	name = "TodoSeeder";
	order = 10;

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Todo seeding...");

		const todoData = [
			{
				text: "Learn Prisma",
				completed: false,
			},
			{
				text: "Build awesome features",
				completed: false,
			},
			{
				text: "Write tests",
				completed: true,
			},
		];

		// Check if todos already exist
		const existingTodos = await prisma.todo.findMany();
		if (existingTodos.length > 0) {
			this.log(`Skipping: ${existingTodos.length} todos already exist`);
			return;
		}

		// Create todos
		for (const todo of todoData) {
			await prisma.todo.create({ data: todo });
		}

		this.log(`Created ${todoData.length} todos`);
	}
}

