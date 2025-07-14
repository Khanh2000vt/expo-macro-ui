import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { FormFieldProps, SwitchFieldType } from "../../form.type";
import { FormField } from "../../FormField";
import { Switch } from "../../../components";

export const SwitchField = <T extends FieldValues>({
  field,
  control,
  isRow,
}: FormFieldProps<T>) => {
  const { title, name, rules, type, hide, ...props } =
    field as SwitchFieldType<T>;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormField error={error?.message} flex={isRow ? 1 : 0}>
          <Switch
            {...props}
            checked={!!value}
            onChange={onChange}
            label={title}
            require={!!rules?.required}
          />
        </FormField>
      )}
    />
  );
};
