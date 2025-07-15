import React, { useEffect } from "react";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useUnistyles } from "react-native-unistyles";
import { HeightElementForm } from "../../global";
import { Center } from "../../layout";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type ProgressCircleProps = {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage = 0,
  size = HeightElementForm,
  strokeWidth = 6,
  color,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  const progress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const sizePart = size / 2;

  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 500 });
  }, [percentage, progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, 0]
    );

    return {
      strokeDashoffset,
    };
  });

  return (
    <Center width={scaler(size)} height={scaler(size)}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={sizePart}
          cy={sizePart}
          r={radius}
          stroke={color ? `${color}20` : `${colors.primary}20`}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={sizePart}
          cy={sizePart}
          r={radius}
          stroke={color ?? colors.primary}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${sizePart} ${sizePart})`}
          animatedProps={animatedProps}
        />
      </Svg>

      <TextApp
        size={percentage === 1 ? scaler(12) : scaler(14)}
        color={color ?? colors.primary}
        textAlign="center"
        weight={800}
      >
        {Math.round(percentage * 100)}
      </TextApp>
    </Center>
  );
};
