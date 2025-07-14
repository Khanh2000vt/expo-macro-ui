import React from "react";
import { Pressable, PressableProps } from "react-native";
import { BoxProps, stylesLayout } from "../../layout";

export type PressableAppProps = Pick<
  PressableProps,
  "onPress" | "disabled" | "onPressIn" | "onPressOut"
> &
  BoxProps;

export const PressableApp: React.FC<PressableAppProps> = ({
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
    <Pressable
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
