import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  effectiveVariantUnitPrice,
  variantPriceRangeMinMax,
} from "./variant-effective-price";

describe("variant-effective-price", () => {
  it("inherits version price when variant price is null", () => {
    assert.equal(effectiveVariantUnitPrice(null, 25), 25);
    assert.equal(effectiveVariantUnitPrice(undefined, 10), 10);
  });

  it("uses explicit variant price when set", () => {
    assert.equal(effectiveVariantUnitPrice(15, 25), 15);
  });

  it("computes min/max from mixed null variant prices", () => {
    const range = variantPriceRangeMinMax([{ price: null }, { price: 20 }], 10);
    assert.deepEqual(range, { min: 10, max: 20 });
  });
});
