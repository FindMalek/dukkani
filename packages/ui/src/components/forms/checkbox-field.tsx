import type * as React from "react";
import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import { Card } from "../card";
import { Checkbox } from "../checkbox";
import { Field, FieldDescription, FieldErrors } from "../field";
import { Label } from "../label";
import { BaseField, type CommonFieldProps } from "./base-field";

interface CheckboxFieldProps
  extends Omit<CommonFieldProps, "orientation">,
    React.ComponentProps<typeof Checkbox> {
  variant?: "default" | "card";
  leadingVisual?: React.ReactNode;
}

export function CheckboxField({
  label,
  description,
  srOnlyLabel,
  labelFirst,
  rightToField,
  leadingVisual,
  variant = "default",
  ...props
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const { className: checkboxClassName, ...checkboxRest } = props;

  if (variant === "card") {
    return (
      <Field orientation="vertical" data-invalid={isInvalid}>
        <Card
          className={cn(
            "flex flex-row items-start gap-2.5 p-3 shadow-sm transition-colors",
            field.state.value &&
              "border-primary bg-primary/5 dark:bg-primary/10",
          )}
        >
          <Label
            htmlFor={field.name}
            className={cn(
              "w-full min-w-0 flex-1 cursor-pointer flex-row items-start gap-3 font-normal leading-snug",
            )}
          >
            {leadingVisual ? (
              <span className="flex shrink-0 text-foreground [&_svg]:size-5">
                {leadingVisual}
              </span>
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="font-medium text-sm leading-snug text-foreground">
                {label}
              </div>
              {description ? (
                <FieldDescription className="text-xs">
                  {description}
                </FieldDescription>
              ) : null}
            </div>
            <Checkbox
              id={field.name}
              name={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) =>
                checked !== "indeterminate" && field.handleChange(checked)
              }
              onBlur={field.handleBlur}
              aria-invalid={isInvalid}
              className={cn("mt-0.5 size-5 shrink-0", checkboxClassName)}
              {...checkboxRest}
            />
          </Label>
        </Card>
        <FieldErrors match={isInvalid} errors={field.state.meta.errors} />
      </Field>
    );
  }

  return (
    <BaseField
      label={label}
      description={description}
      srOnlyLabel={srOnlyLabel}
      labelFirst={labelFirst}
      rightToField={rightToField}
      orientation={"horizontal"}
    >
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) =>
          checked !== "indeterminate" && field.handleChange(checked)
        }
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        className={checkboxClassName}
        {...checkboxRest}
      />
    </BaseField>
  );
}
