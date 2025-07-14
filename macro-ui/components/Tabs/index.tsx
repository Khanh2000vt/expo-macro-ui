import React, { useCallback } from "react";
import {
  NavigationState,
  Route,
  SceneRendererProps,
  TabDescriptor,
  TabView,
} from "react-native-tab-view";
import { ActivityIndicatorApp, TabBar } from "../../common";
import { dimensions } from "../../global";
import { Center } from "../../layout";

export type TabBarType = SceneRendererProps & {
  navigationState: NavigationState<Route>;
  options: Record<string, TabDescriptor<Route>> | undefined;
};

export type SceneTabType = SceneRendererProps & {
  route: Route;
};

type TabsProps = {
  routes: Route[];
  initIndex?: number;
  renderScene: (props: SceneTabType) => React.ReactNode;
  scroll?: boolean;
};

export const Tabs: React.FC<TabsProps> = ({
  routes,
  renderScene,
  initIndex,
  scroll,
}) => {
  const [index, setIndex] = React.useState<number>(initIndex ?? 0);
  const renderLazyPlaceholder = useCallback(() => {
    return (
      <Center flex={1}>
        <ActivityIndicatorApp />
      </Center>
    );
  }, []);

  const renderTabBar = useCallback(
    (props: TabBarType) => {
      return (
        <TabBar
          state={props.navigationState}
          onChange={setIndex}
          scroll={scroll}
        />
      );
    },
    [scroll]
  );
  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderLazyPlaceholder={renderLazyPlaceholder}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: dimensions.width }}
      renderTabBar={renderTabBar}
    />
  );
};
