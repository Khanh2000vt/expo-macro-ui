import React, {forwardRef} from 'react';

import {Box} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const Wrap: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} flexDirection="row" flexWrap="wrap" {...props} />;
});
