import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { ButtonClearForm } from "../../common/ButtonClearForm";
import { Editable, EditableProps } from "../../common/Editable";
import { BorderRadiusForm, HeightElementForm } from "../../global";
import { Row, Show } from "../../layout";
import { scaler } from "../../themes";
import { PressableApp } from "../PressableApp";

export type InputProps = {
  IconLeft?: (color: string) => React.ReactNode;
  IconRight?: (color: string) => React.ReactNode;
  error?: boolean;
  password?: boolean;
} & EditableProps;

export const Input: React.FC<InputProps> = ({
  bottomSheet,
  error,
  IconLeft,
  IconRight,
  editable = true,
  onFocus,
  onBlur,
  onChangeText,
  value,
  password,
  style,
  ...props
}) => {
  const isHaveValue = !!value?.length;
  const showBtnDelete = isHaveValue && editable;

  const { theme } = useUnistyles();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const ColorInput = useMemo(() => {
    if (error) {
      return theme.colors.error;
    }
    if (isFocus || isHaveValue) {
      return theme.colors.primary;
    }
    return theme.colors.grey[500];
  }, [error, isFocus, theme.colors, isHaveValue]);

  return (
    <Row
      opacity={editable ? 1 : 0.5}
      height={HeightElementForm}
      borderRadius={BorderRadiusForm}
      bgColor={`${ColorInput}14`}
      borderWidth={1}
      borderColor={ColorInput}
    >
      <View>{IconLeft?.(ColorInput)}</View>
      <Row flex={1} height={"100%"}>
        <Editable
          editable={editable}
          onChangeText={onChangeText}
          onFocus={(e) => {
            setIsFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            onBlur?.(e);
          }}
          value={value}
          style={[{ borderRadius: BorderRadiusForm }, style]}
          secureTextEntry={password && show}
          textContentType={"oneTimeCode"}
          {...props}
        />
      </Row>
      <Row pl={showBtnDelete ? 0 : scaler(8)}>
        <Show when={password}>
          <PressableApp
            height={HeightElementForm}
            ph={scaler(8)}
            justify="center"
            align="center"
            onPress={() => setShow(!show)}
          >
            <Ionicons
              name={show ? "eye-off" : "eye"}
              size={18}
              color={ColorInput}
            />
          </PressableApp>
        </Show>
        <ButtonClearForm
          show={showBtnDelete}
          onPress={() => onChangeText?.("")}
        />
        <View>{IconRight?.(ColorInput)}</View>
      </Row>
    </Row>
  );
};
