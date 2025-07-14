import {StyleSheet} from 'react-native-unistyles';
import {BorderRadiusForm, FontSizeForm} from '../global/global.constant';

export const stylesCommon = StyleSheet.create(({colors}) => ({
  input: {
    fontSize: FontSizeForm,
    fontWeight: '600',
    color: colors.text,
    // backgroundColor: colors.white10,
    borderRadius: BorderRadiusForm,
    fontFamily: 'WorkSans-SemiBold',
  },
}));
