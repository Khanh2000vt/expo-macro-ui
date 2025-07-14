import { Image } from "expo-image";
import React, { useMemo } from "react";
import { Pressable, StyleProp } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { AbsoluteCenter, Show } from "../../layout";
import { SkeletonFastImage, useImageApp } from "../../media";
import { scaler } from "../../themes";
import { TextApp } from "../../typography";

type AvatarProps = {
  size?: number;
  style?: StyleProp<Image>;
  border?: number;
  uri?: string | null | undefined;
  name?: string;
  bgColor?: string;
  onPress?: () => void;
};
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const Avatar: React.FC<AvatarProps> = ({
  size = 40,
  border = 2,
  style,
  uri,
  name,
  bgColor,
  onPress,
}) => {
  const { loading, error, onLoadStart, onLoad, onError } = useImageApp();
  const {
    theme: { colors },
  } = useUnistyles();
  const NameUser = useMemo(() => {
    if (!name) {
      return "";
    }
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0, 2);
  }, [name]);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    // navigation.navigate(RouteApp.Login);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container(border), styles.fame(size + 4)]}
    >
      <Image
        source={{
          uri: uri ?? undefined,
        }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoad}
        onError={onError}
        style={styles.fame(size)}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
      <Show when={(error || !uri) && !!name}>
        <AbsoluteCenter
          bgColor={bgColor || colors.tint}
          style={styles.fame(size)}
        >
          <TextApp color={colors.white} weight={900} size={scaler(size / 3)}>
            {NameUser}
          </TextApp>
        </AbsoluteCenter>
      </Show>
      <Show when={!!uri && loading}>
        <AbsoluteCenter style={styles.fame(size)}>
          <SkeletonFastImage />
        </AbsoluteCenter>
      </Show>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: (border: number) => ({
    borderWidth: scaler(16),
    borderColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
  }),
  fame: (size: number) => ({
    width: scaler(size),
    height: scaler(size),
    borderRadius: scaler(16),
  }),
}));
