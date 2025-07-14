import React, {forwardRef} from 'react';

import {Box} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const AbsoluteCenter: BoxForwardRef = forwardRef((props, ref) => {
  return (
    <Box
      ref={ref}
      position="absolute"
      justify="center"
      align="center"
      {...props}
    />
  );
});
