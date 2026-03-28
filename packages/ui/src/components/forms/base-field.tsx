import type * as React from "react";

import { useFieldContext } from "../../hooks/use-app-form";
import { cn } from "../../lib/utils";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldErrors,
  FieldLabel,
} from "../field";

export type CommonFieldProps = {
  label: React.ReactNode;
  srOnlyLabel?: boolean;
  description?: string;
  labelFirst?: boolean;
  rightToField?: React.ReactNode;
  orientation?: React.ComponentProps<typeof Field>["orientation"];
};

interface BaseFieldWithDescriptionProps
  extends Omit<CommonFieldProps, "description">,
    React.PropsWithChildren {
  description: string;
}

export function BaseFieldWithDescription({
  children,
  label,
  srOnlyLabel = false,
  description,
  orientation = "vertical",
  labelFirst = false,
  rightToField,
}: BaseFieldWithDescriptionProps) {
  const field = useFieldContext();
  if (orientation === "horizontal") {
    return labelFirst ? (
      <>
        <FieldContent>
          <FieldLabel
            htmlFor={field.name}
            className={cn(srOnlyLabel && "sr-only")}
          >
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
        <div className="flex items-center gap-2">
          {children}
          {rightToField}
        </div>
      </>
    ) : (
      <>
        <div className="flex items-center gap-2">
          {children}
          {rightToField}
        </div>
        <FieldContent>
          <FieldLabel
            htmlFor={field.name}
            className={cn(srOnlyLabel && "sr-only")}
          >
            {label}
          </FieldLabel>
          <FieldDescription>{description}</FieldDescription>
        </FieldContent>
      </>
    );
  }
  return (
    <>
      <FieldContent>
        <FieldLabel
          htmlFor={field.name}
          className={cn(srOnlyLabel && "sr-only")}
        >
          {label}
        </FieldLabel>
        <FieldDescription>{description}</FieldDescription>
      </FieldContent>
      <div className="flex items-center gap-2">
        {children}
        {rightToField}
      </div>
    </>
  );
}

interface BaseFieldWithoutDescriptionProps
  extends Omit<CommonFieldProps, "description">,
    React.PropsWithChildren {}

export function BaseFieldWithoutDescription({
  children,
  label,
  srOnlyLabel = false,
  orientation = "vertical",
  labelFirst = false,
  rightToField,
}: BaseFieldWithoutDescriptionProps) {
  const field = useFieldContext();
  if (orientation === "horizontal") {
    return labelFirst ? (
      <>
        <FieldLabel
          htmlFor={field.name}
          className={cn(srOnlyLabel && "sr-only")}
        >
          {label}
        </FieldLabel>
        {rightToField ? (
          <div className="flex items-center gap-2">
            {children}
            <div className="ml-auto">{rightToField}</div>
          </div>
        ) : (
          children
        )}
      </>
    ) : (
      <>
        {rightToField ? (
          <div className="flex items-center gap-2">
            {children}
            {rightToField}
          </div>
        ) : (
          children
        )}
        <FieldLabel
          htmlFor={field.name}
          className={cn(srOnlyLabel && "sr-only")}
        >
          {label}
        </FieldLabel>
      </>
    );
  }
  return (
    <>
      <FieldLabel htmlFor={field.name} className={cn(srOnlyLabel && "sr-only")}>
        {label}
      </FieldLabel>
      {rightToField ? (
        <div className="flex items-center gap-2">
          {children}
          {rightToField}
        </div>
      ) : (
        children
      )}
    </>
  );
}

export function BaseField({
  children,
  label,
  description,
  rightToField,
  srOnlyLabel = false,
  orientation = "vertical",
  className,
  labelFirst = false,
  ...props
}: CommonFieldProps & React.ComponentProps<typeof Field>) {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field orientation={orientation} className={className} {...props}>
      {description ? (
        <BaseFieldWithDescription
          labelFirst={labelFirst}
          orientation={orientation}
          label={label}
          description={description}
          srOnlyLabel={srOnlyLabel}
          rightToField={rightToField}
        >
          {children}
        </BaseFieldWithDescription>
      ) : (
        <BaseFieldWithoutDescription
          labelFirst={labelFirst}
          orientation={orientation}
          label={label}
          srOnlyLabel={srOnlyLabel}
          rightToField={rightToField}
        >
          {children}
        </BaseFieldWithoutDescription>
      )}
      <FieldErrors match={isInvalid} errors={field.state.meta.errors} />
    </Field>
  );
}
