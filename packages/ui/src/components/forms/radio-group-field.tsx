import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import { Badge } from "../badge";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../field";
import { Label } from "../label";
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

interface PillItemOption extends BaseItemOption {
  icon?: React.ReactNode;
}

type RadioGroupFieldProps =
  | (CommonFieldProps & {
      as: "cards";
      options: CardItemOption[];
    })
  | (CommonFieldProps & {
      as: "pills";
      options: PillItemOption[];
    });

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
  const isPills = props.as === "pills";

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
        className={cn(isPills && "flex flex-wrap gap-2")}
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
          : props.options.map((option) => (
              <Label key={option.value} htmlFor={option.value}>
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  aria-invalid={isInvalid}
                  disabled={option.disabled}
                  className="sr-only"
                />
                <Badge
                  asChild
                  variant={
                    field.state.value === option.value ? "default" : "outline"
                  }
                  className={cn(
                    "inline-flex px-3 py-1.5",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <span>
                    {option.icon && <>{option.icon}</>}
                    {option.label}
                  </span>
                </Badge>
              </Label>
            ))}
      </RadioGroup>
    </BaseField>
  );
}
