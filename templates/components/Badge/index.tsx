import React from "react";
import { StyleProp, TextProps } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { BoxProps, Row } from "../../layout";
import { scaler } from "../../themes";
import { TextApp, TextAppProps } from "../../typography";

export type BadgeProps = {
  type?: "solid" | "outline" | "subtle" | "surface";
  title: string | undefined;
  RightElement?: React.ReactNode;
  LeftElement?: React.ReactNode;
  styleText?: StyleProp<TextProps>;
} & Pick<BoxProps, "pv" | "ph" | "bgColor" | "style"> &
  Pick<TextAppProps, "size">;

export const Badge: React.FC<BadgeProps> = ({
  title,
  type = "solid",
  pv = scaler(2),
  ph = scaler(8),
  bgColor,
  size,
  RightElement,
  LeftElement,
  style,
  styleText,
}) => {
  styles.useVariants({ type });
  const { theme } = useUnistyles();
  const colorBadge = (bgColor || theme.colors.primary) as string;
  return (
    <Row
      pv={pv}
      ph={ph}
      align="center"
      columnGap={scaler(6)}
      style={[styles.container(colorBadge), style]}
    >
      {LeftElement}
      <TextApp
        weight={700}
        lineHeight={18}
        size={size ?? scaler(12)}
        style={[styles.text(colorBadge), styleText]}
      >
        {title}
      </TextApp>
      {RightElement}
    </Row>
  );
};

const styles = StyleSheet.create(({ colors }) => ({
  container: (color: string) => ({
    borderWidth: 1,
    borderRadius: scaler(4),
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
  text: (color: string) => ({
    color: color,
    variants: {
      type: {
        solid: {
          color: colors.white,
        },
      },
    },
  }),
}));
