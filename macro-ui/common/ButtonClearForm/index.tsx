import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { PressableApp } from "../../components/PressableApp";
import { HeightElementForm } from "../../global/global.constant";
import { BoxAnimatedFade } from "../../layout/BoxAnimatedFade";
import { Show } from "../../layout/Show";
import { scaler } from "../../themes/scale";

type ButtonClearFormProps = {
  onPress?: () => void;
  show: boolean;
  size?: number;
  disabled?: boolean;
};

export const ButtonClearForm: React.FC<ButtonClearFormProps> = ({
  show,
  onPress,
  disabled,
  size = HeightElementForm,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Show when={show}>
      <BoxAnimatedFade>
        <PressableApp
          disabled={disabled}
          height={size}
          ph={scaler(8)}
          justify="center"
          align="center"
          onPress={onPress}
        >
          <MaterialIcons
            size={scaler(16)}
            name="cancel"
            color={colors.border}
          />
        </PressableApp>
      </BoxAnimatedFade>
    </Show>
  );
};
