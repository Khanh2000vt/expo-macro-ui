import React from 'react';
import TextTicker from 'react-native-text-ticker';
import {styleTypography} from '../typography.style';
import {TextAppProps} from '../typography.type';

export const TextTickerApp: React.FC<TextAppProps> = ({
  allowFontScaling = false,
  children,
  ellipsizeMode,
  lineBreakMode,
  numberOfLines,
  onLayout,
  onTextLayout,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  style,
  maxFontSizeMultiplier,
  minimumFontScale,
  type = 'text',
  ...props
}) => {
  styleTypography.useVariants({type});
  return (
    <TextTicker
      allowFontScaling={allowFontScaling}
      children={children}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      onLayout={onLayout}
      onTextLayout={onTextLayout}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      minimumFontScale={minimumFontScale}
      duration={6000}
      repeatSpacer={50}
      marqueeDelay={3000}
      style={[styleTypography.typography(props), style]}
    />
  );
};
