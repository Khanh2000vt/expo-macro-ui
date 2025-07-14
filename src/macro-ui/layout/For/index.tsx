import React from 'react';

type ForProps<T extends any> = {
  each: T[] | undefined;
  children: (item: T, index: number, array: T[]) => React.ReactNode;
};

export const For = <T,>({each, children}: ForProps<T>) => {
  return each?.map(children);
};
