import { FontSizeForm } from "../global";
import { scaler } from "../themes";
import { TypographyStyleType } from "./typography.type";

const fontMap: { [key: string]: { normal: string; italic: string } } = {
  "300": { normal: "WorkSans-Light", italic: "WorkSans-LightItalic" },
  "400": { normal: "WorkSans-Regular", italic: "WorkSans-Italic" },
  "500": { normal: "WorkSans-Medium", italic: "WorkSans-MediumItalic" },
  "600": { normal: "WorkSans-SemiBold", italic: "WorkSans-SemiBoldItalic" },
  "700": { normal: "WorkSans-Bold", italic: "WorkSans-BoldItalic" },
  "800": { normal: "WorkSans-ExtraBold", italic: "WorkSans-ExtraBoldItalic" },
};

export const getStyleTypography = (
  props: TypographyStyleType,
  colors: Record<string, string>
): any => {
  const {
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
    p,
    pt,
    pr,
    pb,
    pl,
    ph,
    pv,
    me,
    ms,
    pe,
    ps,
    maxH,
    maxW,
    minH,
    minW,
    align,
    justify,
    color,
    size,
    weight,
    fontStyle,
    ...propsStyle
  } = props;
  const margin = {
    marginLeft: ml || mh || m,
    marginTop: mt || mv || m,
    marginRight: mr || mh || m,
    marginBottom: mb || mv || m,
    marginStart: ms,
    marginEnd: me,
  };

  const padding = {
    paddingLeft: pl || ph || p,
    paddingTop: pt || pv || p,
    paddingRight: pr || ph || p,
    paddingBottom: pb || pv || p,
    paddingStart: ps,
    paddingEnd: pe,
  };

  return {
    ...propsStyle,
    ...margin,
    ...padding,
    maxHeight: maxH,
    maxWidth: maxW,
    minHeight: minH,
    minWidth: minW,
    alignItems: align,
    justifyContent: justify,
    color: color ?? colors.text,
    fontSize: size ?? FontSizeForm,
    variants: {
      type: {
        heading: {
          fontSize: size ?? scaler(20),
          fontFamily: getFontFamily(weight ?? "600", fontStyle),
          fontStyle: fontStyle,
        },
        title: {
          fontSize: size ?? scaler(18),
          fontFamily: getFontFamily(weight ?? "600", fontStyle),
          fontStyle: fontStyle,
        },
        label: {
          fontSize: size ?? scaler(16),
          fontFamily: getFontFamily(weight ?? "600", fontStyle),
          fontStyle: fontStyle,
        },
        text: {
          fontSize: size ?? scaler(14),
          fontFamily: getFontFamily(weight ?? "400", fontStyle),
          fontStyle: fontStyle,
        },
        subtext: {
          fontSize: size ?? scaler(12),
          fontFamily: getFontFamily(weight ?? "400", fontStyle),
          fontStyle: fontStyle,
        },
        error: {
          fontSize: size ?? scaler(10),
          fontFamily: getFontFamily(weight ?? "500", fontStyle ?? "italic"),
          fontStyle: fontStyle ?? "italic",
          color: color ?? colors.error,
        },
        titleForm: {
          fontSize: size ?? scaler(14),
          fontFamily: getFontFamily(weight ?? "600", fontStyle),
          fontStyle: fontStyle,
        },
        default: {
          fontSize: size ?? scaler(14),
          fontFamily: getFontFamily(weight ?? "400", fontStyle),
          fontStyle: fontStyle,
        },
      },
    },
  };
};

const getFontFamily = (
  fontWeight: string | number | undefined,
  fontStyle?: string
): string => {
  const weight = fontWeight ? String(fontWeight) : "400";
  const isItalic = fontStyle === "italic";
  const selectedWeight = fontMap[weight] || fontMap["400"];
  return isItalic ? selectedWeight.italic : selectedWeight.normal;
};
