import {
	AppError,
	BadRequestError,
	ConflictError,
	ForbiddenError,
	NotFoundError,
} from "@dukkani/common/errors";
import { ORPCError } from "@orpc/server";

export function convertServiceError(error: unknown): never {
	if (error instanceof NotFoundError) {
		throw new ORPCError("NOT_FOUND", { message: error.message });
	}
	if (error instanceof ForbiddenError) {
		throw new ORPCError("FORBIDDEN", { message: error.message });
	}
	if (error instanceof BadRequestError) {
		throw new ORPCError("BAD_REQUEST", { message: error.message });
	}
	if (error instanceof ConflictError) {
		throw new ORPCError("BAD_REQUEST", { message: error.message });
	}
	if (error instanceof AppError) {
		throw new ORPCError("BAD_REQUEST", { message: error.message });
	}
	throw error;
}
