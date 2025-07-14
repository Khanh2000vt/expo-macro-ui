import {StyleSheet} from 'react-native-unistyles';
import {getStyleTypography} from './typography.func';
import {TypographyStyleType} from './typography.type';

export const styleTypography = StyleSheet.create(theme => ({
  typography: (props: TypographyStyleType) =>
    getStyleTypography(props, theme.colors),
}));
