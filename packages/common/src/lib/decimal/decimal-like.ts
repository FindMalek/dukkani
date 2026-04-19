import { Decimal } from "@prisma/client/runtime/client";

/**
 * Coerces Prisma `Decimal`, number, bigint, or numeric string to a JS number for pricing math.
 */
export function decimalLikeToNumber(
  value: Decimal | number | bigint | string | null | undefined,
): number {
  if (value == null) {
    return Number.NaN;
  }
  if (value instanceof Decimal) {
    return value.toNumber();
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "bigint") {
    return Number(value);
  }
  if (typeof value === "string") {
    return Number(value);
  }
  return Number.NaN;
}
