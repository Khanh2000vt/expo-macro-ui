import {createContext, PropsWithChildren, useContext, useState} from 'react';

type AccordionRootContextType = {
  expandedItems: string[];
  onChangeValue?: (value: string) => void;
};

const AccordionRootContext = createContext<
  AccordionRootContextType | undefined
>(undefined);

type AccordionRootProviderProps = {
  defaultValue?: string[];
  collapsible?: boolean;
};

export const AccordionRootProvider: React.FC<
  PropsWithChildren<AccordionRootProviderProps>
> = ({children, defaultValue = [], collapsible}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultValue);

  const handleChangeValue = (valueNew: string) => {
    const isExpanded = expandedItems.includes(valueNew);
    if (collapsible) {
      setExpandedItems(isExpanded ? [] : [valueNew]);
      return;
    }
    setExpandedItems(prevValue =>
      isExpanded
        ? prevValue.filter(item => item !== valueNew)
        : [...prevValue, valueNew],
    );
  };

  return (
    <AccordionRootContext.Provider
      value={{expandedItems, onChangeValue: handleChangeValue}}>
      {children}
    </AccordionRootContext.Provider>
  );
};

export const useAccordionRootContext = (): AccordionRootContextType => {
  const context = useContext(AccordionRootContext);
  if (!context) {
    return {} as AccordionRootContextType;
  }
  return context;
};
