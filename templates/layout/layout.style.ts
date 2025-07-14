import {StyleSheet} from 'react-native-unistyles';
import {getStyleLayout} from './layout.func';
import {LayoutStyleType} from './layout.type';

export const stylesLayout = StyleSheet.create({
  layout: (props: LayoutStyleType) => getStyleLayout(props),
});
