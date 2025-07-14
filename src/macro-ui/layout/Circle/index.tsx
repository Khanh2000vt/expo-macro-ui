import React, { forwardRef } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import { Box } from "../Box";
import { ForwardRefComponent } from "../../types";
type CircleProps = {
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};
export const Circle: ForwardRefComponent<View, CircleProps> = forwardRef(
  ({ size = 4, color, style }, ref) => {
    return (
      <Box
        height={size}
        width={size}
        borderRadius={size / 2}
        bgColor={color}
        style={style}
        ref={ref}
      />
    );
  }
);
