import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { CheckboxIcon } from "../../common";
import { Box, Show } from "../../layout";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";
import { PressableApp } from "../PressableApp";

export type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  stylePressable?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  onChange?: (checked: boolean) => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  disabled = false,
  checked,
  stylePressable,
  styleLabel,
  onChange,
}) => {
  const handlePress = () => {
    onChange?.(!checked);
  };

  return (
    <PressableApp
      style={stylePressable}
      onPress={handlePress}
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
      columnGap={scaler(8)}
      flexDirection="row"
      align="center"
    >
      <CheckboxIcon checked={checked} disabled={disabled} />
      <Show when={!!label}>
        <Box>
          <TextApp style={styleLabel} weight={400}>
            {label}
          </TextApp>
        </Box>
      </Show>
    </PressableApp>
  );
};
