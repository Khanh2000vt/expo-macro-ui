import React, { useMemo, useState } from "react";
import { useUnistyles } from "react-native-unistyles";
import { Editable, EditableProps } from "../../common";
import { BorderRadiusForm } from "../../global";
import { Box, Show } from "../../layout";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";

export type TextareaProps = {
  height?: number;
  error?: boolean;
} & EditableProps;

export const Textarea: React.FC<TextareaProps> = ({
  height = scaler(90),
  bottomSheet,
  error,
  editable = true,
  onFocus,
  onBlur,
  onChangeText,
  value,
  maxLength,
  style,
  ...props
}) => {
  const { theme } = useUnistyles();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const ColorInput = useMemo(() => {
    if (error) {
      return theme.colors.error;
    }
    if (isFocus) {
      return theme.colors.primary;
    }
    return theme.colors.border;
  }, [error, isFocus, theme.colors]);

  return (
    <Box
      opacity={editable ? 1 : 0.5}
      height={height}
      borderRadius={BorderRadiusForm}
      borderWidth={1}
      bgColor={theme.colors.white}
      borderColor={ColorInput}
    >
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
        multiline
        style={[
          {
            paddingVertical: scaler(4),
          },
          style,
        ]}
        {...props}
      />
      <Show when={!!maxLength}>
        <Box alignSelf="flex-end" p={scaler(2)}>
          <TextApp size={scaler(10)} color={theme.colors.grey[400]}>
            {value?.length}/{maxLength}
          </TextApp>
        </Box>
      </Show>
    </Box>
  );
};
