import React, {forwardRef} from 'react';

import {Box} from '../Box';
import {BoxForwardRef} from '../layout.type';

export const Column: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} align="center" flexDirection="column" {...props} />;
});
