import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { BoxAnimated } from "../../layout/Box";

type CaretAnimatedRotateProps = {
  isUp: boolean;
};

export const CaretAnimatedRotate: React.FC<CaretAnimatedRotateProps> = ({
  isUp,
}) => {
  const up = useSharedValue(isUp ? 0 : 1);
  const {
    theme: { colors },
  } = useUnistyles();

  useEffect(() => {
    up.value = withTiming(isUp ? 0 : 1, {
      duration: 200,
      easing: Easing.linear,
    });
  }, [isUp]);

  const styleRotate = useAnimatedStyle(() => {
    const rotate = interpolate(up.value, [0, 1], [180, 0]);
    return { transform: [{ rotate: `${rotate}deg` }] };
  }, []);

  return (
    <BoxAnimated style={styleRotate}>
      <Ionicons name="chevron-down" size={24} color="black" />
    </BoxAnimated>
  );
};
