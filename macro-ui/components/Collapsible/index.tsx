import React, { PropsWithChildren, useState } from "react";
import { ActivityIndicator, StyleProp, View, ViewStyle } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { CaretAnimatedRotate } from "../../common";
import { Box, Row, Show } from "../../layout";
import { scaler, shadow } from "../../themes";
import { TextTickerApp } from "../../typography";
import { PressableApp } from "../PressableApp";

type CollapsibleProps = {
  title?: string;
  styleBody?: StyleProp<ViewStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  rowGap?: number;
  initOpen?: boolean;
  LeftElement?: React.ReactElement;
  RightElement?: React.ReactElement;
};

export const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = ({
  title,
  styleContainer,
  styleBody,
  isLoading,
  rowGap,
  children,
  initOpen = true,
  LeftElement,
  RightElement,
}) => {
  const {
    theme: { colors },
  } = useUnistyles();
  const [open, setOpen] = useState<boolean>(initOpen);

  const handlePress = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };
  return (
    <View style={[styles.container, shadow.box, styleContainer]}>
      <PressableApp style={styles.button} onPress={handlePress}>
        <Row flex={1} columnGap={scaler(6)}>
          {LeftElement}
          <TextTickerApp type="title" lineHeight={24}>
            {title}
          </TextTickerApp>
          {RightElement}
        </Row>
        <CaretAnimatedRotate isUp={open} />
      </PressableApp>
      <Show when={open}>
        <Box ph={scaler(16)} pb={scaler(16)} rowGap={rowGap} style={styleBody}>
          <Show when={isLoading} fallback={children}>
            <ActivityIndicator size="small" color={colors.tint} />
          </Show>
        </Box>
      </Show>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: scaler(8),
    backgroundColor: theme.colors.white,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: scaler(16),
    paddingVertical: scaler(12),
    paddingBottom: scaler(8),
    height: scaler(56),
    columnGap: scaler(8),
  },
  text: {
    fontSize: scaler(14),
    fontWeight: "600",
  },
}));
