export {
  cartesianSelections,
  countVariantCombinations,
  MAX_VARIANT_COMBINATIONS,
  VARIANT_COMBINATIONS_LIMIT,
} from "./cartesian";
export { selectionKey, variantOptionsStructureFingerprint } from "./keys";
export type { FormVariantRow } from "./reconcile";
export {
  formVariantRowsToInput,
  reconcileVariants,
} from "./reconcile";
export type {
  MatrixValidationErrorCode,
  MatrixValidationResult,
} from "./validate";
export { validateVariantMatrixAgainstOptions } from "./validate";
