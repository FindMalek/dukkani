import { z } from "zod";

/**
 * User input schemas for authentication and user management
 */

export const loginInputSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string(),
  rememberMe: z.boolean().catch(false),
});

export const userInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  image: z.url("Please enter a valid image URL").optional(),
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

export const accountUploadAvatarInputSchema = z.object({
  file: z.file(),
});

export type AccountUploadAvatarInput = z.infer<
  typeof accountUploadAvatarInputSchema
>;

/**
 * Profile settings forms (dashboard "Settings > Profile" page). These are
 * client-side validators for direct Better Auth client calls
 * (`authClient.updateUser` / `authClient.changePassword`), not oRPC
 * procedures — mirrors `loginInputSchema` / `signupInputSchema` above.
 */
export const updateProfileInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const changePasswordInputSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;
