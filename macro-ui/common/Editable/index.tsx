import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { scaler } from "../../themes/scale";
import { stylesCommon } from "../../themes/styles";

export type EditableProps = {
  bottomSheet?: boolean;
} & TextInputProps;

export const Editable: React.FC<EditableProps> = ({
  bottomSheet,
  style,
  ...props
}) => {
  const Input = bottomSheet ? BottomSheetTextInput : TextInput;
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Input
      style={[styles.input, stylesCommon.input, style]}
      placeholderTextColor={colors.gray2}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
    fontWeight: "600",
    paddingLeft: scaler(8),
    paddingVertical: 0,
  },
});
