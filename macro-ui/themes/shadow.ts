import {StyleSheet} from 'react-native';
import {ColorsStatic} from './colors-static';

/*
 * generated with https://ethercreative.github.io/react-native-shadow-generator/
 * to get the same shadow on both platforms
 */
export const shadow = StyleSheet.create({
  primary: {
    elevation: 5,
    shadowColor: '#DEE4EA',
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  primaryTint: {
    elevation: 5,
    shadowColor: '#f1f4e3',
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  upto: {
    elevation: 5,
    shadowColor: '#DEE4EA',
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: -4,
    },
  },
  updown: {
    elevation: 5,
    shadowColor: '#DEE4EA',
    shadowRadius: 3.84,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 4, // Bóng đổ hướng lên trên
    },
  },
  box: {
    shadowColor: '#000000',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  box2: {
    shadowColor: ColorsStatic.secondary,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  prominent: {
    shadowColor: '#000000',
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
  },
  none: {
    shadowColor: '#000000',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});
