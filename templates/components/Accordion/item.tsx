import { createContext, PropsWithChildren, useContext } from "react";
import { Box } from "../../layout";
import { Separator } from "../Separator";
import { useAccordionRootContext } from "./root";
import { scaler } from "../../themes";

type AccordionItemContextType = {
  value: string;
  isExpanded: boolean;
};

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

type AccordionItemProviderProps = {
  value: string;
};

export const AccordionItemProvider: React.FC<
  PropsWithChildren<AccordionItemProviderProps>
> = ({ children, value }) => {
  const { expandedItems } = useAccordionRootContext();
  const isExpanded = expandedItems?.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded }}>
      <Box rowGap={scaler(10)}>{children}</Box>
      <Separator />
    </AccordionItemContext.Provider>
  );
};

export const useAccordionItemContext = (): AccordionItemContextType => {
  const context = useContext(AccordionItemContext);
  if (!context) {
    return {} as AccordionItemContextType;
  }
  return context;
};
