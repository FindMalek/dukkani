import type { ProductFormInput } from "@dukkani/common/schemas/product/form";
import type {
  DukkaniAppFormComponents,
  DukkaniAppFormFieldComponents,
} from "@dukkani/ui/hooks/use-app-form";
import type {
  AppFieldExtendedReactFormApi,
  FormState,
} from "@tanstack/react-form";

/**
 * TanStack wires `FormApi` recursively (e.g. `listeners` → `formApi.options.validators`);
 * fully precise per-slot validator generics then produce duplicate structural types and
 * break assignability from `withForm`. We only need `values` typing for selectors.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see comment above
type FormValidatorSlot = any;

/** Full form store snapshot for `useStore(form.store, …)` selectors. */
export type ProductFormSnapshot = FormState<
  ProductFormInput,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot
>;

/**
 * TanStack form API for the product create/edit form (`withForm` + `productFormOptions`).
 * Field / form component maps match `@dukkani/ui`’s `createFormHook` registration.
 */
export type ProductFormApi = AppFieldExtendedReactFormApi<
  ProductFormInput,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  FormValidatorSlot,
  unknown,
  DukkaniAppFormFieldComponents,
  DukkaniAppFormComponents
>;
