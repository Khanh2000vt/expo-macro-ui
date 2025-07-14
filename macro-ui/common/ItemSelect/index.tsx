import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { useUnistyles } from "react-native-unistyles";
import { PressableApp } from "../../components/PressableApp";
import { HeightItemPicker } from "../../global/global.constant";
import { ItemSelectType } from "../../global/global.types";
import { Box } from "../../layout/Box";
import { scaler } from "../../themes/scale";
import { TextApp } from "../../typography/TextApp";

type ItemSelectProps = {
  item: ItemSelectType;
  onPress?: (value: string) => void;
  values?: string | string[];
  disabled?: boolean;
};

export const ItemSelect: React.FC<ItemSelectProps> = ({
  item,
  disabled,
  onPress,
  values,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  const selected = useMemo(() => {
    if (!values) {
      return false;
    }
    if (Array.isArray(values)) {
      return values?.some((v) => v === item?.value);
    }
    return values === item?.value;
  }, [values]);
  return (
    <PressableApp
      flexDirection="row"
      align="center"
      justify="space-between"
      minH={HeightItemPicker}
      ph={scaler(20)}
      bgColor={selected ? colors.tint10 : colors.white}
      pv={scaler(12)}
      columnGap={scaler(8)}
      disabled={disabled}
      onPress={() => onPress?.(item?.value)}
    >
      <Box flex={1}>
        <TextApp weight={400}>{item?.label}</TextApp>
      </Box>
      <Ionicons
        name="checkmark-outline"
        stroke={colors.tint}
        opacity={selected ? 1 : 0}
      />
    </PressableApp>
  );
};
