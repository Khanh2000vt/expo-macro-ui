import React, {PropsWithChildren, ReactElement} from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native-unistyles';

const HEADER_HEIGHT = 180;

type ParallaxScrollViewProps = PropsWithChildren<{
  ComponentAnimation: ReactElement;
  ComponentNonAnimation?: ReactElement;
}>;

export const ParallaxScrollView: React.FC<ParallaxScrollViewProps> = ({
  children,
  ComponentAnimation,
  ComponentNonAnimation,
}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <View style={{height: HEADER_HEIGHT}}>
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            {ComponentAnimation}
          </Animated.View>
          {!!ComponentNonAnimation ? ComponentNonAnimation : null}
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
}));
