import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { scaler, shadow } from "../../themes";
import { PressableApp, PressableAppProps } from "../PressableApp";

type CardProps = {} & PressableAppProps;

export const Card: React.FC<CardProps> = ({ style, ...props }) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <PressableApp
      p={scaler(16)}
      borderRadius={scaler(16)}
      bgColor={colors.white}
      borderWidth={1}
      borderColor={colors.secondary}
      style={[shadow.primary, style]}
      {...props}
    />
  );
};
