import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { scaler } from "../../themes/scale";

type SwitchIconProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: number;
};

export const SwitchIcon: React.FC<SwitchIconProps> = ({
  checked,
  disabled = false,
  size = scaler(22),
}) => {
  const animated = useSharedValue(0);

  useEffect(() => {
    animated.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked]);

  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      animated.value,
      [0, 1],
      [0, size],
      Extrapolation.CLAMP
    );
    const scalerSwitch = interpolate(
      animated.value,
      [0, 1],
      [1, 0.88],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateX: translateX }, { scale: scalerSwitch }],
    };
  });

  return (
    <View style={styles.container(size, !!checked)}>
      <Animated.View style={[styles.switch(size - 3), animatedStyles]} />
    </View>
  );
};

const styles = StyleSheet.create(({ colors }) => ({
  container: (size: number, checked: boolean) => ({
    backgroundColor: checked ? colors.tint : colors.border,
    borderColor: checked ? colors.tint : colors.border,
    height: size,
    width: size * 2,
    borderRadius: size,
    borderWidth: 1,
  }),
  switch: (size: number) => ({
    height: size,
    width: size,
    backgroundColor: colors.white,
    borderRadius: size / 2,
  }),
}));
