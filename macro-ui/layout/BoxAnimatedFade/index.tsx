import React, {forwardRef} from 'react';
import {FadeIn, FadeOut} from 'react-native-reanimated';
import {BoxAnimated} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const BoxAnimatedFade: BoxForwardRef = forwardRef((props, ref) => {
  return (
    <BoxAnimated ref={ref} entering={FadeIn} exiting={FadeOut} {...props} />
  );
});
