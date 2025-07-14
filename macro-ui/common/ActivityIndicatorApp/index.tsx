import React from 'react';
import {ActivityIndicator, ColorValue} from 'react-native';
import {useUnistyles} from 'react-native-unistyles';

type ActivityIndicatorAppProps = {
  size?: number | 'small' | 'large' | undefined;
  color?: ColorValue | undefined;
};

export const ActivityIndicatorApp: React.FC<ActivityIndicatorAppProps> = ({
  size = 'small',
  color,
}) => {
  const {
    theme: {colors},
  } = useUnistyles();
  return <ActivityIndicator size={size} color={color || colors.tint} />;
};
