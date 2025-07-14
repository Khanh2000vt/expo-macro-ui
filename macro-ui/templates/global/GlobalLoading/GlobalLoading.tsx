import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Box, BoxAnimatedFade, Show } from "../../layout";
import { LoadingHandlerRef } from "../../types";
import { ELoadingApp } from "../global.enum";

export const GlobalLoading = forwardRef<LoadingHandlerRef>(({}, ref) => {
  const { theme } = useUnistyles();
  const [load, setLoad] = useState<ELoadingApp>(ELoadingApp.None);

  styles.useVariants({
    color: load,
  });

  const loading = () => {
    setLoad(ELoadingApp.Default);
  };

  const overlay = () => {
    setLoad(ELoadingApp.Overlay);
  };

  const disable = () => {
    setLoad(ELoadingApp.Disable);
  };

  const hide = () => {
    setLoad(ELoadingApp.None);
  };

  useImperativeHandle(
    ref,
    () => ({
      loading,
      overlay,
      disable,
      hide,
    }),
    []
  );

  return (
    <Show when={load !== ELoadingApp.None}>
      <BoxAnimatedFade
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={99999}
        flex={0}
        width="100%"
        height={"100%"}
        position="absolute"
      >
        <Box style={styles.container}>
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        </Box>
      </BoxAnimatedFade>
    </Show>
  );
});

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: "absolute",
    zIndex: 99999,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    variants: {
      color: {
        [ELoadingApp.Default]: {
          backgroundColor: theme.colors.white,
        },
        [ELoadingApp.Overlay]: {
          backgroundColor: `${theme.colors.black}2a`,
        },
        [ELoadingApp.Disable]: {
          backgroundColor: theme.colors.transparent,
          opacity: 0,
        },
        [ELoadingApp.None]: {
          backgroundColor: theme.colors.transparent,
        },
      },
    },
  },
}));
