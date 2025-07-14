import React, {forwardRef} from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

import {stylesLayout} from '../layout.style';
import {BoxForwardRef} from '../layout.type';

export const Box: BoxForwardRef = forwardRef(
  ({children = null, style, onLayout, collapsable, ...props}, ref) => {
    return (
      <View
        collapsable={collapsable}
        style={[stylesLayout.layout(props), style]}
        onLayout={onLayout}
        ref={ref}
        children={children}
      />
    );
  },
);

export const BoxAnimated = Animated.createAnimatedComponent(Box);
