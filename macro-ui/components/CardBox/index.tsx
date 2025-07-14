import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Box, BoxProps } from "../../layout";

export type CardBoxProps = {
  type?: "solid" | "outline" | "subtle" | "surface";
} & BoxProps;

export const CardBox: React.FC<CardBoxProps> = ({
  type = "solid",
  bgColor,
  style,
  ...props
}) => {
  styles.useVariants({ type });
  const { theme } = useUnistyles();
  const colorBadge = (bgColor || theme.colors.tint) as string;
  return <Box {...props} style={[styles.container(colorBadge), style]} />;
};

const styles = StyleSheet.create(({ colors }) => ({
  container: (color: string) => ({
    borderWidth: 1,
    variants: {
      type: {
        solid: {
          backgroundColor: color,
          borderColor: color,
        },
        outline: {
          borderColor: color,
        },
        subtle: {
          borderColor: `${color}20`,
          backgroundColor: `${color}20`,
        },
        surface: {
          borderColor: color,
          backgroundColor: `${color}20`,
        },
      },
    },
  }),
}));
