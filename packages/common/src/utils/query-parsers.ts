import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
} from "nuqs/server";
import { OrderStatus, UserOnboardingStep } from "../schemas/enums";
import { PRODUCT_SORT_OPTIONS } from "../schemas/product/input";

/**
 * Parser for onboarding step with Zod validation
 */
export const parseOnboardingStep = parseAsStringEnum(
  Object.values(UserOnboardingStep),
);

/**
 * Parser for email addresses with basic validation
 */
export const parseEmail = parseAsString;

/**
 * Parser for store slugs (alphanumeric with hyphens)
 */
export const parseStoreSlug = parseAsString;

/**
 * Parser for order status enum
 */
export const parseOrderStatus = parseAsStringEnum(Object.values(OrderStatus));

/**
 * Parser for product status (published boolean)
 */
export const parseProductStatus = parseAsBoolean;

/**
 * Parser for pagination page number
 */
export const parsePage = parseAsInteger.withDefault(1);

/**
 * Parser for pagination limit
 */
export const parseLimit = parseAsInteger.withDefault(50);

/**
 * Parser for search queries
 */
export const parseSearchQuery = parseAsString;

/**
 * Parser for date range (ISO dates)
 */
export const parseDate = parseAsString;

/**
 * Parser for array of strings (comma-separated)
 */
export const parseStringArray = parseAsArrayOf(parseAsString);

/**
 * Parser for boolean flags
 */
export const parseBooleanFlag = parseAsBoolean.withDefault(false);

/**
 * Combined date range parser
 */
export const parseDateRange = {
  from: parseDate,
  to: parseDate,
} as const;

/**
 * Parser for product stock filter.
 * Maps to the stockFilter field in listProductsInputSchema.
 */
export const parseStockFilter = parseAsStringEnum([
  "all",
  "in-stock",
  "low-stock",
  "out-of-stock",
] as const).withDefault("all");

/**
 * Parser for product variants filter.
 * Maps to the variantsFilter field in listProductsInputSchema.
 */
export const parseVariantsFilter = parseAsStringEnum([
  "all",
  "with-variants",
  "single-sku",
] as const).withDefault("all");

/**
 * Parser for minimum price filter (inclusive).
 * Maps to priceMin in listProductsInputSchema.
 */
export const parsePriceMin = parseAsFloat;

/**
 * Parser for maximum price filter (inclusive).
 * Maps to priceMax in listProductsInputSchema.
 */
export const parsePriceMax = parseAsFloat;

/**
 * Parser for product sort order.
 * Derived from PRODUCT_SORT_OPTIONS — single source of truth with productSortSchema.
 */
export const parseSortBy =
  parseAsStringLiteral(PRODUCT_SORT_OPTIONS).withDefault("newest");
