import {Image, ImageProps} from 'expo-image';
import React from 'react';
import {ImageRequireSource, StyleProp, View, ViewStyle} from 'react-native';
import {useImageApp} from './ImageApp.func';
import {styles} from './ImageApp.style';
import {SkeletonFastImage} from './SkeletonFastImage';

export type SourceImageType = string | ImageRequireSource | undefined;

export type ImageAppProps = {
  uri?: string | null;
  stylesPlaceholder?: StyleProp<ViewStyle>;
  borderRadius?: number;
} & ImageProps;

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const ImageApp: React.FC<ImageAppProps> = ({
  uri,
  stylesPlaceholder,
  source,
  ...props
}) => {
  const {loading, error, onLoadStart, onLoad, onError} = useImageApp();

  if (!uri || (error && !loading)) {
    return <Image source={source} {...props} />;
  }

  return (
    <View>
      <Image
        {...props}
        source={{
          uri: uri ?? undefined,
        }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoad}
        onError={onError}
        placeholder={{blurhash}}
        contentFit="cover"
        transition={1000}
      />
      {loading && (
        <View
          style={[
            props?.style,
            styles.containerPlaceholder,
            stylesPlaceholder,
          ]}>
          <SkeletonFastImage />
        </View>
      )}
    </View>
  );
};
