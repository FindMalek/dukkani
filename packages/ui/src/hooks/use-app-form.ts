import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { ArrayField } from "../components/forms/array-field";
import { CheckboxField } from "../components/forms/checkbox-field";
import { EmailField } from "../components/forms/email-field";
import { ImagesField } from "../components/forms/images-field";
import { NumberField } from "../components/forms/number-field";
import { PasswordField } from "../components/forms/password-field";
import { PhoneNumberField } from "../components/forms/phone-number-field";
import { PillField } from "../components/forms/pill-text-field";
import { PriceField } from "../components/forms/price-field";
import { RadioGroupField } from "../components/forms/radio-group-field";
import { SelectField } from "../components/forms/select-field";
import { SwitchField } from "../components/forms/switch-field";
import { TextAreaField } from "../components/forms/text-area-field";
import { TextField } from "../components/forms/text-field";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const dukkaniAppFormFieldComponents = {
  TextInput: TextField,
  EmailInput: EmailField,
  PhoneNumberInput: PhoneNumberField,
  TextAreaInput: TextAreaField,
  PasswordInput: PasswordField,
  NumberInput: NumberField,
  PriceInput: PriceField,
  SelectInput: SelectField,
  CheckboxInput: CheckboxField,
  SwitchInput: SwitchField,
  ArrayInput: ArrayField,
  ImagesInput: ImagesField,
  PillInput: PillField,
  RadioGroupInput: RadioGroupField,
};

export type DukkaniAppFormFieldComponents =
  typeof dukkaniAppFormFieldComponents;

/**
 * Empty form-level component map. Use `{}`, not `Record<string, never>`: TanStack intersects
 * `ReactFormExtendedApi & NoInfer<TFormComponents>`, and a string index signature forces a
 * clash with `FormApi` members.
 */
export type DukkaniAppFormComponents = {};

const { useAppForm, withForm } = createFormHook({
  fieldComponents: dukkaniAppFormFieldComponents,
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext, withForm };
