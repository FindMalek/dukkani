import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs";
import { OrderStatus, UserOnboardingStep } from "../schemas/enums";

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
