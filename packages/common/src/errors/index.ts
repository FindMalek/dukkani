// Base - allows instanceof checks
export class AppError extends Error {
	readonly code: AppErrorCode;

	constructor(message: string, code: AppErrorCode) {
		super(message);
		this.name = "AppError";
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export type AppErrorCode =
	| "NOT_FOUND"
	| "FORBIDDEN"
	| "BAD_REQUEST"
	| "CONFLICT";

export class NotFoundError extends AppError {
	constructor(message: string) {
		super(message, "NOT_FOUND");
		this.name = "NotFoundError";
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string) {
		super(message, "FORBIDDEN");
		this.name = "ForbiddenError";
	}
}

export class BadRequestError extends AppError {
	constructor(message: string) {
		super(message, "BAD_REQUEST");
		this.name = "BadRequestError";
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, "CONFLICT");
		this.name = "ConflictError";
	}
}
