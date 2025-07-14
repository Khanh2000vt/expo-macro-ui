import React from "react";
import {
  AnimatableNumericValue,
  ColorValue,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { Box } from "../../layout";
import { scaler } from "../../themes";

type LineProps = {
  vertical?: boolean;
  space?: number;
  size?: number;
  opacity?: AnimatableNumericValue;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
};

export const Separator: React.FC<LineProps> = ({
  vertical = false,
  space = scaler(8),
  size = 1,
  opacity,
  style,
  color,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Box
      width={vertical ? scaler(size) : "100%"}
      height={vertical ? "100%" : scaler(size)}
      mh={vertical ? space : undefined}
      mv={vertical ? undefined : space}
      bgColor={color || colors.gray1}
      opacity={opacity}
      style={style}
    />
  );
};
