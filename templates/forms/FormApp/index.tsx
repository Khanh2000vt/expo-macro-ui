import React from "react";
import { FieldValues } from "react-hook-form";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Box } from "../../layout";
import { scaler } from "../../themes";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  SwitchField,
  TextareaField,
  TextField,
} from "../fields";
import { FormAppProps, FormFieldType } from "../form.type";

export const FormApp = <T extends FieldValues>({
  fields,
  control,
}: FormAppProps<T>) => {
  const renderField = (field: FormFieldType<T>, isRow: boolean) => {
    switch (field.type) {
      case "input":
        return (
          <InputField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "checkbox":
        return (
          <CheckboxField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "radio":
        return (
          <RadioField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "switch":
        return (
          <SwitchField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "select":
        return (
          <SelectField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "textarea":
        return (
          <TextareaField
            field={field}
            control={control}
            isRow={isRow}
            key={field.name}
          />
        );
      case "text":
        return <TextField field={field} key={field.name} />;
      default:
        return null;
    }
  };
  return (
    <Box rowGap={scaler(10)}>
      {fields?.map((field, index) => {
        if (Array.isArray(field)) {
          return (
            <View key={index?.toString()} style={styles.row}>
              {field.map((item: FormFieldType<T>) => {
                if (item?.hide) {
                  return null;
                }
                return renderField(item, true);
              })}
            </View>
          );
        }
        if (field?.hide) {
          return null;
        }
        return renderField(field, false);
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    columnGap: scaler(8),
  },
});
