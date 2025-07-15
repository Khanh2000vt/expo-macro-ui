import { BlurView, BlurViewProps } from "expo-blur";
import React from "react";
import { BoxProps, stylesLayout } from "../../layout";

type BlurAppProps = Pick<BlurViewProps, "intensity" | "tint"> & BoxProps;

export const BlurApp: React.FC<BlurAppProps> = ({
  intensity,
  tint = "light",
  children = null,
  style,
  onLayout,
  collapsable,
  ...props
}) => {
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      collapsable={collapsable}
      style={[stylesLayout.layout(props), style]}
      onLayout={onLayout}
      children={children}
    />
  );
};
