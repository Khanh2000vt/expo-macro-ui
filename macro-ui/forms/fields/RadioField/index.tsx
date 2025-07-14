import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Radio } from "../../../components";
import { Box, For } from "../../../layout";
import { scaler } from "../../../themes";
import { FormFieldProps, RadioFieldType } from "../../form.type";
import { FormField } from "../../FormField";

export const RadioField = <T extends FieldValues>({
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
    direction,
    ...props
  } = field as RadioFieldType<T>;

  const isRowField = direction === "row";
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormField
          error={error?.message}
          title={title}
          flex={isRow ? 1 : 0}
          require={!!rules?.required}
        >
          <Box flexDirection={direction} columnGap={scaler(12)} flexWrap="wrap">
            <For each={options}>
              {(item) => {
                const isChecked = !!value && value === item?.value;
                return (
                  <Radio
                    key={item.value}
                    {...props}
                    checked={isChecked}
                    label={item?.label}
                    onChange={() => {
                      onChange(item?.value);
                    }}
                  />
                );
              }}
            </For>
          </Box>
        </FormField>
      )}
    />
  );
};
