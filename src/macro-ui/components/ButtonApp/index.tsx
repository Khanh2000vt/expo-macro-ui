import React, { useCallback } from "react";
import { ColorValue, Pressable, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { ActivityIndicatorApp } from "../../common/ActivityIndicatorApp";
import { scaler, shadow } from "../../themes";
import { TextApp } from "../../typography";
import { PressableAppProps } from "../PressableApp";

export type ButtonAppProps = {
  IconLeft?: React.ReactElement;
  IconRight?: React.ReactElement;
  title?: string;
  loading?: boolean;
  loadingText?: string;
  type?: "solid" | "subtle" | "surface" | "outline" | undefined;
  color?: ColorValue;
  spinnerPlacement?: "start" | "end";
} & PressableAppProps;

export const ButtonApp: React.FC<ButtonAppProps> = ({
  IconLeft,
  IconRight,
  title,
  loading = false,
  disabled = false,
  loadingText,
  type = "solid",
  color,
  spinnerPlacement = "start",
  style,
  ...propsButton
}) => {
  styles.useVariants({ type });
  const {
    theme: { colors },
  } = useUnistyles();
  const buttonColor = (color || colors.primary) as string;
  const isDisabled = loading || !!disabled;

  const renderIcon = useCallback(
    (Icon: React.ReactElement | undefined, isStart: boolean) => {
      const isSpinnerStart = spinnerPlacement === "start";
      const isShow = isSpinnerStart === isStart;
      if (loading && isShow) {
        return (
          <ActivityIndicatorApp
            color={type === "solid" ? colors.white : buttonColor}
          />
        );
      }
      return Icon || null;
    },
    [loading, spinnerPlacement, buttonColor]
  );
  return (
    <Pressable
      {...propsButton}
      style={[styles.pressable(buttonColor, isDisabled), shadow.box2, style]}
      disabled={isDisabled}
    >
      {renderIcon(IconLeft, true)}
      <View style={styles.containerText}>
        <TextApp
          weight={700}
          color={type === "solid" ? colors.white : buttonColor}
        >
          {loading ? loadingText || title : title}
        </TextApp>
      </View>
      {renderIcon(IconRight, false)}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: (color: string, disabled: boolean) => ({
    height: 55,
    columnGap: scaler(4),
    borderRadius: 100,
    borderWidth: 1,
    opacity: disabled ? 0.5 : 1,
    paddingHorizontal: scaler(8),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  icon: {
    height: scaler(24),
    width: scaler(24),
  },
  containerText: {
    // flex: 1,
  },
});
