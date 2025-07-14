import React, {PropsWithChildren} from 'react';

type ShowProps = {
  fallback?: React.ReactNode;
  when: boolean | undefined | null;
};

export const Show: React.FC<PropsWithChildren<ShowProps>> = ({
  when,
  fallback = null,
  children,
}) => {
  if (!when) {
    return fallback;
  }
  return children;
};
