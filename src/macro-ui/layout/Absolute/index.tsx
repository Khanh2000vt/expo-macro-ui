import React, {forwardRef} from 'react';

import {Box} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const Absolute: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} position="absolute" {...props} />;
});
