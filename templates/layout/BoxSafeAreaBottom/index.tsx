import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { scaler } from "../../themes";
import { Box } from "../Box";
import { BoxProps } from "../layout.type";

export const BoxSafeAreaBottom: React.FC<BoxProps> = (props) => {
  const {
    rt,
    theme: { colors },
  } = useUnistyles();
  return (
    <Box
      bgColor={colors.white}
      p={scaler(16)}
      pb={Math.max(rt.insets.bottom, scaler(16))}
      {...props}
    />
  );
};
