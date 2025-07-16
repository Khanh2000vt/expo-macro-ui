import React, { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Box } from "../Box";
import { BoxProps } from "../layout.type";
import { Show } from "../Show";

type BoxExpandedProps = {
  expanded?: boolean;
  heightChild?: number;
} & Omit<BoxProps, "onLayout">;

export const BoxExpanded: React.FC<BoxExpandedProps> = ({
  expanded,
  heightChild,
  style,
  ...props
}) => {
  const height = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(heightChild ?? 0);

  useEffect(() => {
    if (expanded) {
      height.value = withTiming(contentHeight, { duration: 200 });
    } else {
      height.value = withTiming(0, { duration: 200 });
    }
  }, [expanded, contentHeight]);

  useEffect(() => {
    setContentHeight(heightChild ?? 0);
  }, [heightChild]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    setContentHeight(measuredHeight);
  };

  return (
    <>
      <Show when={heightChild === undefined}>
        <Box
          onLayout={handleLayout}
          {...props}
          style={[style, { position: "absolute", opacity: 0, zIndex: -1 }]}
        />
      </Show>
      <Animated.View style={[{ overflow: "hidden" }, animatedStyle]}>
        <Box {...props} style={style} />
      </Animated.View>
    </>
  );
};
