import { scaler } from "../themes/scale";

import { Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window");
const { height: heightScreen, width: widthScreen } = Dimensions.get("screen");

const ratio = (width / 414 / height) * 1000;

const widthRatio = width / 500;
const heightRatio = height / 500;

export const dimensions = {
  height,
  width,
  ratio,
  widthRatio,
  heightRatio,
  heightScreen,
  widthScreen,
};

const shorter = Math.min(dimensions.width, dimensions.height);
const longer = Math.max(dimensions.width, dimensions.height);
const shorterScreen = Math.min(dimensions.widthScreen, dimensions.heightScreen);
const longerScreen = Math.max(dimensions.widthScreen, dimensions.heightScreen);

export const edgeScreen = {
  shorter,
  longer,
  shorterScreen,
  longerScreen,
};

export const DEVICE = {
  isIos: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  isSmallDevice: dimensions.widthScreen < 375,
};

export const DateVIDefault = {
  monthNames: [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ],
  monthNamesShort: [
    "Th1",
    "Th2",
    "Th3",
    "Th4",
    "Th5",
    "Th6",
    "Th7",
    "Th8",
    "Th9",
    "Th10",
    "Th11",
    "Th12",
  ],
  dayNames: [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};

export const HeightElementForm = 60;
export const FontSizeForm = 14;
export const BorderRadiusForm = 12;

export const PaddingBottomList = scaler(60);
export const HeightItemPicker = scaler(46);
export const MaxHeightModal = (3 * dimensions.height) / 4;
