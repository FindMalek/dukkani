import { os } from "@orpc/server";
import { convertServiceError } from "./utils/convert-service-error";

export interface StorefrontContext {
	apiUrl: string;
}

export const oStorefront = os.$context<StorefrontContext>();

const storefrontErrorHandling = oStorefront.middleware(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		convertServiceError(error);
	}
});

export const storefrontProcedure = oStorefront.use(storefrontErrorHandling);
