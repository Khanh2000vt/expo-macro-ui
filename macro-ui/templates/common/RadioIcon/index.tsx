import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { BoxAnimatedFade, Center, Show } from "../../layout";
import { scaler } from "../../themes/scale";

type RadioIconProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: number;
};

export const RadioIcon: React.FC<RadioIconProps> = ({
  checked,
  disabled = false,
  size = 22,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  return (
    <Center
      style={styles.container(size)}
      borderWidth={1.5}
      borderColor={checked ? colors.primary : colors.border}
    >
      <Show when={checked}>
        <BoxAnimatedFade
          style={styles.container(size - 8)}
          bgColor={colors.primary}
        />
      </Show>
    </Center>
  );
};
const styles = StyleSheet.create(({ colors }) => ({
  container: (size: number) => ({
    width: scaler(size),
    height: scaler(size),
    borderRadius: size / 2,
  }),
}));
