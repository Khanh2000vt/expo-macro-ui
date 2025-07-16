import React, { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { CaretAnimatedRotate } from "../../common";
import { scaler } from "../../themes";
import { PressableApp } from "../PressableApp";
import { useAccordionItemContext } from "./item";
import { useAccordionRootContext } from "./root";

export const AccordionHeader: React.FC<PropsWithChildren> = ({ children }) => {
  const { onChangeValue } = useAccordionRootContext();
  const { value, isExpanded } = useAccordionItemContext();
  return (
    <PressableApp style={styles.button} onPress={() => onChangeValue?.(value)}>
      {children}
      <CaretAnimatedRotate isUp={isExpanded} />
    </PressableApp>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaler(12),
    paddingBottom: scaler(8),
    paddingHorizontal: scaler(16),
  },
});
