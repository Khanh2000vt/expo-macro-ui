import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { BoxProps, stylesLayout } from "../../layout";

export type TouchableAppProps = Pick<
  TouchableOpacityProps,
  "onPress" | "disabled" | "onPressIn" | "onPressOut"
> &
  BoxProps;

export const TouchableApp: React.FC<TouchableAppProps> = ({
  onPress,
  style,
  children,
  disabled,
  onLayout,
  onPressIn,
  onPressOut,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      style={[stylesLayout.layout(props), style]}
      onPress={onPress}
      onLayout={onLayout}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      children={children}
    />
  );
};
