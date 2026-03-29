import { useFieldContext } from "../../hooks/use-app-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { BaseField, type CommonFieldProps } from "./base-field";

type BaseItemOption = {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
};

interface CardItemOption extends BaseItemOption {
  description?: string;
  icon?: React.ReactNode;
}

interface RadioGroupFieldProps extends CommonFieldProps {
  as?: "cards";
  options: CardItemOption[];
}
export function RadioGroupField({
  label,
  description,
  labelFirst,
  rightToField,
  orientation,
  srOnlyLabel,
  ...props
}: RadioGroupFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <BaseField
      label={label}
      description={description}
      labelFirst={labelFirst}
      rightToField={rightToField}
      orientation={orientation}
      srOnlyLabel={srOnlyLabel}
    >
      <RadioGroup
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onValueChange={field.handleChange}
      >
        {props.as === "cards"
          ? props.options.map((option) => (
              <FieldLabel key={option.value} htmlFor={option.value}>
                <Field
                  orientation="horizontal"
                  data-invalid={isInvalid}
                  data-disabled={option.disabled}
                >
                  <FieldContent>
                    <FieldTitle>
                      {option.icon && <>{option.icon}</>}
                      {option.label}
                    </FieldTitle>
                    {option.description && (
                      <FieldDescription>{option.description}</FieldDescription>
                    )}
                  </FieldContent>
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    aria-invalid={isInvalid}
                    disabled={option.disabled}
                  />
                </Field>
              </FieldLabel>
            ))
          : null}
      </RadioGroup>
    </BaseField>
  );
}
