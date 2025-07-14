import { produce } from "immer";
import React, { useCallback, useEffect, useRef } from "react";
import {
  LayoutChangeEvent,
  LayoutRectangle,
  ScrollView,
  View,
} from "react-native";
import { NavigationState, Route } from "react-native-tab-view";
import { StyleSheet } from "react-native-unistyles";
import { PressableApp } from "../../components/PressableApp";
import { dimensions } from "../../global/global.constant";
import { For } from "../../layout/For";
import { Show } from "../../layout/Show";
import { scaler } from "../../themes/scale";
import { TextApp } from "../../typography/TextApp";

type TabBarProps = {
  state: NavigationState<Route>;
  onChange: (index: number) => void;
  scroll?: boolean;
};

export const TabBar: React.FC<TabBarProps> = ({
  state,
  onChange,
  scroll = false,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const sizeTabRef = useRef<LayoutRectangle[]>([]);

  useEffect(() => {
    onScrollTab(state?.index);
  }, [state?.index]);

  const onScrollTab = useCallback((index: number) => {
    if (!sizeTabRef.current.length) {
      return;
    }
    const { x, width } = sizeTabRef.current[index];
    const scrollToX = x + width / 2 - dimensions.width / 2;

    scrollViewRef.current?.scrollTo({
      x: scrollToX,
      y: 0,
      animated: true,
    });
  }, []);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    const layout = event.nativeEvent.layout;
    sizeTabRef.current = produce(sizeTabRef.current, (draft) => {
      draft[index] = layout;
    });
  };

  const renderTabItem = useCallback(() => {
    return (
      <For each={state?.routes}>
        {(route, index) => {
          const isFocus = state?.index === index;
          return (
            <PressableApp
              onPress={() => onChange(index)}
              key={route.key}
              style={styles.button(scroll, isFocus)}
              onLayout={(e: LayoutChangeEvent) => handleLayout(e, index)}
            >
              <TextApp style={styles.text(isFocus)}>{route.title}</TextApp>
            </PressableApp>
          );
        }}
      </For>
    );
  }, [state]);
  return (
    <View style={styles.container(scroll)}>
      <Show when={scroll} fallback={<>{renderTabItem()}</>}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          contentContainerStyle={styles.scroll}
        >
          {renderTabItem()}
        </ScrollView>
      </Show>
    </View>
  );
};

const styles = StyleSheet.create(({ colors }, rt) => ({
  container: (scroll: boolean) => ({
    backgroundColor: colors.white,
    flexDirection: scroll ? "column" : "row",
    alignItems: "stretch",
    paddingTop: rt.insets.top,
  }),
  scroll: {
    backgroundColor: colors.white,
    paddingHorizontal: scaler(8),
  },
  button: (scroll: boolean, focus: boolean) => ({
    flex: scroll ? undefined : 1,
    padding: scaler(8),
    borderBottomWidth: scaler(2),
    justifyContent: "center",
    borderBottomColor: focus ? colors.primary : colors.transparent,
  }),
  text: (focus: boolean) => ({
    color: focus ? colors.primary : colors.secondary,
    fontWeight: "600",
    textAlign: "center",
  }),
}));
