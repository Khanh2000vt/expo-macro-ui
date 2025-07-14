import React from "react";
import { FieldValues } from "react-hook-form";
import { TextApp } from "../../../typography";
import { FormFieldType, TextFieldType } from "../../form.type";

type TextFieldProps<T extends FieldValues> = {
  field: FormFieldType<T>;
};

export const TextField = <T extends FieldValues>({
  field,
}: TextFieldProps<T>) => {
  const { type, name, hide, ...props } = field as TextFieldType;
  return <TextApp {...props} />;
};
