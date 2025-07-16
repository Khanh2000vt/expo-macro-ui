import React, {PropsWithChildren} from 'react';
import {BoxExpanded} from '../../layout';
import {useAccordionItemContext} from './item';

export const AccordionContent: React.FC<PropsWithChildren> = ({children}) => {
  const {isExpanded} = useAccordionItemContext();
  return <BoxExpanded expanded={isExpanded}>{children}</BoxExpanded>;
};
