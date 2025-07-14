import React, {forwardRef} from 'react';
import {Keyboard, Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import {stylesLayout} from '../layout.style';
import {BoxForwardRef} from '../layout.type';

export const BoxHideKeyboard: BoxForwardRef = forwardRef(
  ({children = null, style, onLayout, ...props}, ref) => {
    return (
      <Pressable
        onPress={Keyboard.dismiss}
        style={[stylesLayout.layout(props), style]}
        onLayout={onLayout}
        ref={ref}
        children={children}
      />
    );
  },
);

export const BoxHideKeyboardAnimated =
  Animated.createAnimatedComponent(BoxHideKeyboard);
