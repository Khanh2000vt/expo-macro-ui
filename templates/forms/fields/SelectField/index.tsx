import { produce } from "immer";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Select } from "../../../components";
import { FormFieldProps, SelectFieldType } from "../../form.type";
import { FormField } from "../../FormField";

export const SelectField = <T extends FieldValues>({
  field,
  control,
  isRow,
}: FormFieldProps<T>) => {
  const {
    title,
    name,
    rules,
    type,
    hide,
    options = [],
    typeSelect,
    ...props
  } = field as SelectFieldType<T>;

  const _rules = produce(rules, (draft) => {
    if (draft) {
      draft.validate = (value: string | string[]) => {
        if (rules?.required) {
          return !!value;
        }
        return undefined;
      };
    }
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={_rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormField
          error={error?.message}
          title={title}
          flex={isRow ? 1 : 0}
          require={!!rules?.required}
        >
          <Select
            options={options}
            values={value}
            keySheet={name}
            title={title}
            onChange={onChange}
            type={typeSelect}
            {...props}
          />
        </FormField>
      )}
    />
  );
};
