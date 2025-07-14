import { Ionicons } from "@expo/vector-icons";
import React, { memo, useEffect, useState } from "react";
import { useUnistyles } from "react-native-unistyles";
import { Input } from "../../components/Input";
import { PressableApp } from "../../components/PressableApp";
import { Switch } from "../../components/Switch";
import { Box } from "../../layout/Box";
import { Row } from "../../layout/Row";
import { Show } from "../../layout/Show";
import { scaler } from "../../themes/scale";
import { shadow } from "../../themes/shadow";
import { TextApp } from "../../typography/TextApp";

export type HeaderSheetProps = {
  title?: string;
  searchLocal?: boolean;
  onSearch?: (value: string) => void;
  onClose?: () => void;
  onConfirm?: () => void;
  isMultiple: boolean;
  checkedAll: boolean;
  onPressAll?: (checked: boolean) => void;
};

export const HeaderSheet: React.FC<HeaderSheetProps> = memo(
  ({
    title,
    onClose,
    onSearch,
    onConfirm,
    searchLocal,
    isMultiple,
    checkedAll,
    onPressAll,
  }) => {
    const {
      theme: { colors },
    } = useUnistyles();
    const [text, onChangeText] = useState<string>("");

    useEffect(() => {
      const debounce = setTimeout(() => {
        onSearch?.(text);
      }, 800);
      return () => {
        clearTimeout(debounce);
      };
    }, [text]);

    return (
      <Box style={shadow.primary} bgColor={colors.white}>
        <Row justify="space-between">
          <PressableApp flex={1} p={scaler(12)} onPress={onClose}>
            <Ionicons name="close" size={24} color={colors.tint} />
          </PressableApp>
          <Box flex={isMultiple ? 3 : 6}>
            <TextApp textAlign="center" type="title">
              {title}
            </TextApp>
          </Box>
          <Show when={isMultiple} fallback={<Box flex={1} />}>
            <Box flex={1} align="flex-end">
              <PressableApp align="flex-end" p={scaler(12)} onPress={onConfirm}>
                <TextApp weight={600} color={colors.tint}>
                  Chọn
                </TextApp>
              </PressableApp>
            </Box>
          </Show>
        </Row>
        <Show when={searchLocal}>
          <Box ph={scaler(12)}>
            <Input
              placeholder={"Tìm kiếm"}
              onChangeText={onChangeText}
              bottomSheet
            />
          </Box>
        </Show>
        <Show when={isMultiple}>
          <Box ph={scaler(12)} align="flex-end">
            <Switch
              label="Chọn tất cả"
              checked={checkedAll}
              onChange={onPressAll}
              // disabled={checkedAll}
            />
          </Box>
        </Show>
      </Box>
    );
  }
);
