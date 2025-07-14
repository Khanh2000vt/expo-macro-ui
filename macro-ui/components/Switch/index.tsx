import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { SwitchIcon } from "../../common/SwitchIcon";
import { HeightElementForm } from "../../global";
import { Box, Show } from "../../layout";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";
import { PressableApp } from "../PressableApp";

export type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  stylePressable?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
  onChange?: (checked: boolean) => void;
  require?: boolean;
};

export const Switch: React.FC<SwitchProps> = ({
  label,
  disabled = false,
  checked,
  stylePressable,
  styleLabel,
  onChange,
  require = false,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();

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
      height={HeightElementForm}
    >
      <SwitchIcon checked={checked} disabled={disabled} />
      <Show when={!!label}>
        <Box>
          <TextApp style={styleLabel} weight={400}>
            {label}
            <Show when={require}>
              <TextApp color={colors.red2}> *</TextApp>
            </Show>
          </TextApp>
        </Box>
      </Show>
    </PressableApp>
  );
};
