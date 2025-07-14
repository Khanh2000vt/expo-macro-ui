import { produce } from "immer";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Checkbox } from "../../../components";
import { ItemSelectType } from "../../../global";
import { Box, For } from "../../../layout";
import { scaler } from "../../../themes";
import { CheckboxFieldType, FormFieldProps } from "../../form.type";
import { FormField } from "../../FormField";

export const CheckboxField = <T extends FieldValues>({
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
  } = field as CheckboxFieldType<T>;
  const _rules = produce(rules, (draft) => {
    if (draft) {
      draft.validate = (value: ItemSelectType) => {
        if (rules?.required) {
          return !!value.value;
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
      render={({
        field: { onChange, value = [] as string[] },
        fieldState: { error },
      }) => (
        <FormField
          error={error?.message}
          title={title}
          flex={isRow ? 1 : 0}
          require={!!rules?.required}
        >
          <Box flexDirection={direction} columnGap={scaler(12)} flexWrap="wrap">
            <For each={options}>
              {(item) => {
                const isChecked = value?.includes(item?.value);
                return (
                  <Checkbox
                    key={item.value}
                    {...props}
                    checked={isChecked}
                    label={item?.label}
                    onChange={() => {
                      if (isChecked) {
                        onChange(
                          value?.filter((v: string) => v !== item?.value)
                        );
                      } else {
                        onChange([...value, item.value]);
                      }
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
