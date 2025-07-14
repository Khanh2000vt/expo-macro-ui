import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  ColorValue,
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { ActivityIndicatorApp } from "../../common";
import { dimensions } from "../../global";
import { Center, Show } from "../../layout";
import { scaler } from "../../themes";
import { ForwardRefComponent } from "../../types";
import { ErrorState } from "../ErrorState";

type ScrollPageProps = {
  HeaderSticky?: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
  countFetching?: number;
  bgColor?: ColorValue;
  isKeyboardAware?: boolean;
  heightElementOther?: number;
} & Omit<ScrollViewProps, "">;

const HEIGHT_ELEMENT_OTHER = dimensions.height - scaler(180);

export const ScrollPage: ForwardRefComponent<
  ScrollView,
  PropsWithChildren<ScrollPageProps>
> = forwardRef(
  (
    {
      isLoading,
      bgColor,
      isKeyboardAware,
      showsVerticalScrollIndicator = false,
      contentContainerStyle,
      children,
      isError,
      refetch,
      countFetching = 0,
      style,
      heightElementOther = HEIGHT_ELEMENT_OTHER,
      ...props
    },
    ref
  ) => {
    const {
      theme: { colors },
    } = useUnistyles();

    const Scroll = isKeyboardAware ? KeyboardAwareScrollView : ScrollView;

    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (refreshing) {
        timer = setTimeout(() => {
          setRefreshing(false);
        }, 800);
      }
      return () => {
        clearTimeout(timer);
      };
    }, [countFetching, refreshing]);

    const handleRefresh = () => {
      if (refreshing) {
        return;
      }
      refetch?.();
      setRefreshing(true);
    };

    if (isLoading) {
      return (
        <Center flexGrow={1}>
          <ActivityIndicatorApp />
        </Center>
      );
    }
    return (
      <Scroll
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={[styles.scroll, style]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        horizontal={false}
        ref={ref}
        refreshControl={
          refetch ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          ) : undefined
        }
        {...props}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
      >
        <Show when={!isError} fallback={<ErrorState />}>
          {children}
        </Show>
      </Scroll>
    );
  }
);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    marginTop: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: scaler(12),
    rowGap: scaler(12),
    paddingBottom: scaler(40),
    paddingTop: scaler(10),
    flexGrow: 1,
  },
});
