import React, { useMemo } from "react";
import { useUnistyles } from "react-native-unistyles";
import { PressableApp } from "../../components/PressableApp";
import {
  BorderRadiusForm,
  HeightElementForm,
} from "../../global/global.constant";
import { Box } from "../../layout/Box";
import { Show } from "../../layout/Show";
import { scaler } from "../../themes/scale";
import { stylesCommon } from "../../themes/styles";
import { TextApp } from "../../typography/TextApp";
import { ButtonClearForm } from "../ButtonClearForm";

type SelectBoxProps = {
  error?: boolean;
  label?: string | string[];
  placeholder?: string;
  RightElement?: (color: string) => React.ReactNode;
  onPress?: () => void;
  onClear?: () => void;
  disabled?: boolean;
};

export const SelectBox: React.FC<SelectBoxProps> = ({
  error,
  label,
  placeholder,
  RightElement,
  onPress,
  onClear,
  disabled,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();

  const isHaveValue = Array.isArray(label) ? !!label?.length : !!label;

  const ColorSelect = useMemo(() => {
    if (error) {
      return colors.error;
    }
    if (isHaveValue) {
      return colors.primary;
    }
    return colors.border;
  }, [error, colors, isHaveValue]);

  const getLabel = () => {
    if (!label) {
      return placeholder;
    }
    if (Array.isArray(label)) {
      return label?.length ? label?.join("; ") : placeholder;
    }
    return label;
  };

  return (
    <PressableApp
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={onPress}
      height={HeightElementForm}
      borderRadius={BorderRadiusForm}
      borderColor={ColorSelect}
      align="center"
      flexDirection="row"
      pl={scaler(8)}
      pr={isHaveValue ? 0 : scaler(8)}
      borderWidth={1}
    >
      <Box flex={1}>
        <TextApp
          numberOfLines={1}
          size={scaler(14)}
          style={[
            stylesCommon.input,
            { color: isHaveValue ? colors.text : colors.secondary },
          ]}
        >
          {getLabel()}
        </TextApp>
      </Box>
      <ButtonClearForm
        disabled={disabled}
        show={isHaveValue}
        onPress={onClear}
      />
      <Show when={!isHaveValue}>{RightElement?.(ColorSelect)}</Show>
    </PressableApp>
  );
};
