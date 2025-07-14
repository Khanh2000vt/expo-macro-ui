import {Dimensions, Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';

// base UI design
const baseWidth = 390;
const baseHeight = 844;
const {height, width} = Dimensions.get('window');

const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);

const scaler = (size: number) => {
  const DESIGN_RESOLUTION = Math.sqrt(
    baseHeight * baseHeight + baseWidth * baseWidth,
  );
  const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return RESOLUTIONS_PROPORTION * size;
};

const scalerAndroid = (size: any) => {
  return !isIOS ? scaler(size) : 0;
};

const scalerDevice = (sizeAndroid: any, sizeIOS: any) => {
  return scaler(isIOS ? sizeIOS : sizeAndroid);
};

export {scaler, scalerAndroid, scalerDevice};
