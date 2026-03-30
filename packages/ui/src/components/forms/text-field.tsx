import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { Input } from "../input";
import { BaseField, type CommonFieldProps } from "./base-field";

type InputProps = React.ComponentProps<typeof Input>;

type InputType = Extract<InputProps["type"], "text" | "email">;
interface TextFieldProps extends CommonFieldProps, Omit<InputProps, "type"> {
  type?: InputType;
}

export function TextField({
  label,
  description,
  srOnlyLabel = false,
  type = "text",
  rightToField,
  orientation,
  ...inputProps
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <BaseField
      label={label}
      description={description}
      srOnlyLabel={srOnlyLabel}
      rightToField={rightToField}
      orientation={orientation}
    >
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        {...inputProps}
        type={type}
      />
    </BaseField>
  );
}
