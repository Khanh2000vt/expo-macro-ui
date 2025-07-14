import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { BoxAnimatedFade } from "~/macro-ui/layout/BoxAnimatedFade";
import { Show } from "../../layout/Show";
import { scaler } from "../../themes/scale";

type CheckboxIconProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: number;
};

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
  checked,
  disabled = false,
  size = 22,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <View style={styles.container(size, checked)}>
      <Show when={checked}>
        <BoxAnimatedFade>
          <Ionicons name="checkmark" size={14} color={colors.primary} />
        </BoxAnimatedFade>
      </Show>
    </View>
  );
};

const styles = StyleSheet.create(({ colors }) => ({
  container: (size: number, checked?: boolean) => ({
    width: scaler(size),
    height: scaler(size),
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: checked ? colors.primary : colors.border,
    justifyContent: "center",
    alignItems: "center",
  }),
}));
