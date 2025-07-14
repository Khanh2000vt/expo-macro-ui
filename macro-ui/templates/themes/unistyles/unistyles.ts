import {StyleSheet} from 'react-native-unistyles';
import {breakpoints} from './breakpoints';
import {colors} from './colors';

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof colors.light;
  dark: typeof colors.dark;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: {
    light: colors.light,
    dark: colors.dark,
  },
  settings: {
    initialTheme: 'light',
  },
});
