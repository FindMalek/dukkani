import {
  createLoader,
  createParser,
  parseAsBoolean,
  parseAsStringEnum,
} from "nuqs/server";

const priceRangeParser = createParser({
  parse: (value) => {
    const separatorIndex = value.indexOf("..");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      min: value.slice(0, separatorIndex).trim(),
      max: value.slice(separatorIndex + 2).trim(),
    };
  },
  serialize: (value) => {
    if (!value.max) {
      return `${value.min}..`;
    }
    if (!value.min) {
      return `..${value.max}`;
    }
    return `${value.min}..${value.max}`;
  },
  eq: (a, b) => a.min === b.min && a.max === b.max,
});

export const productsFilteringSearchParams = (
  categories: { name: string }[],
) => ({
  "filters[price]": priceRangeParser.withDefault({ min: "", max: "" }),
  "filters[inStockOnly]": parseAsBoolean.withDefault(false),
  "filters[sort]": parseAsStringEnum([
    "featured",
    "priceAsc",
    "priceDesc",
    "newest",
  ]).withDefault("newest"),
  "filters[category]": parseAsStringEnum([
    "all",
    ...categories.map((cat) => cat.name),
  ]).withDefault("all"),
});
export const loadProductsFiltersSearchParams = (
  categories: { name: string }[],
) => createLoader(productsFilteringSearchParams(categories));
