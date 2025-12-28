import { z } from "zod";

/**
 * User input schemas for authentication and user management
 */

export const loginInputSchema = z.object({
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean().optional(),
});

export const userInputSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Please enter a valid email address"),
	image: z.string().url("Please enter a valid image URL").optional(),
});

export const createUserInputSchema = userInputSchema.extend({
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const updateUserInputSchema = userInputSchema.partial().extend({
	id: z.string().min(1, "User ID is required"),
});

export const getUserInputSchema = z.object({
	id: z.string().min(1, "User ID is required"),
});

export const listUsersInputSchema = z.object({
	page: z.number().int().min(1).default(1),
	limit: z.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
});

export const signupInputSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
export type UserInput = z.infer<typeof userInputSchema>;
export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
export type GetUserInput = z.infer<typeof getUserInputSchema>;
export type ListUsersInput = z.infer<typeof listUsersInputSchema>;
export type SignupInput = z.infer<typeof signupInputSchema>;

export const checkEmailExistsInputSchema = z.object({
	email: z.email("Please enter a valid email address"),
});

export type CheckEmailExistsInput = z.infer<typeof checkEmailExistsInputSchema>;
