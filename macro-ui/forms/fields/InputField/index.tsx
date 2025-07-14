import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Input } from "../../../components";
import { FormFieldProps, InputFieldType } from "../../form.type";
import { FormField } from "../../FormField";

export const InputField = <T extends FieldValues>({
  field,
  control,
  isRow,
}: FormFieldProps<T>) => {
  const { title, name, rules, type, hide, ...props } =
    field as InputFieldType<T>;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormField
          error={error?.message}
          title={title}
          require={!!rules?.required}
          flex={isRow ? 1 : 0}
        >
          <Input
            onChangeText={onChange}
            value={value}
            error={!!error?.message}
            {...props}
          />
        </FormField>
      )}
    />
  );
};
