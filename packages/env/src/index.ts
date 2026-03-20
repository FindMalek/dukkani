export { baseEnv, getBaseEnvironment } from "./base";
export { getApiUrl } from "./utils/get-api-url";
export { getStorefrontBaseUrl } from "./utils/get-storefront-base-url";

import { baseEnv } from "./base";
export const env = baseEnv;

export * from "./modules";
export * from "./presets";
