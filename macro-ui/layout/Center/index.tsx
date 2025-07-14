import React, {forwardRef} from 'react';
import {Box} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const Center: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} justify="center" align="center" {...props} />;
});
