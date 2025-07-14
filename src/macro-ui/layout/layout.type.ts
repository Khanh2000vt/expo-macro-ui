import {PropsWithChildren} from 'react';
import {
  ColorValue,
  DimensionValue,
  FlexAlignType,
  StyleProp,
  TransformsStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {ForwardRefComponent} from '../types';

type FlexJustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;

export type ViewStyleType = {
  m?: DimensionValue | undefined;
  mt?: DimensionValue | undefined;
  mr?: DimensionValue | undefined;
  me?: DimensionValue | undefined;
  mb?: DimensionValue | undefined;
  ml?: DimensionValue | undefined;
  ms?: DimensionValue | undefined;
  mv?: DimensionValue | undefined;
  mh?: DimensionValue | undefined;
  p?: DimensionValue | undefined;
  pt?: DimensionValue | undefined;
  pr?: DimensionValue | undefined;
  pe?: DimensionValue | undefined;
  pb?: DimensionValue | undefined;
  pl?: DimensionValue | undefined;
  ps?: DimensionValue | undefined;
  pv?: DimensionValue | undefined;
  ph?: DimensionValue | undefined;
  maxH?: DimensionValue | undefined;
  maxW?: DimensionValue | undefined;
  minH?: DimensionValue | undefined;
  minW?: DimensionValue | undefined;
  align?: FlexAlignType | undefined;
  justify?: FlexJustifyType;
  bgColor?: ColorValue | undefined;
};

export type LayoutStyleType = ViewStyleType &
  Omit<
    ViewStyle,
    | 'margin'
    | 'marginTop'
    | 'marginRight'
    | 'marginEnd'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginStart'
    | 'marginVertical'
    | 'marginHorizontal'
    | 'padding'
    | 'paddingTop'
    | 'paddingRight'
    | 'paddingEnd'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingStart'
    | 'paddingVertical'
    | 'paddingHorizontal'
    | 'maxHeight'
    | 'maxWidth'
    | 'minHeight'
    | 'minWidth'
    | 'alignItems'
    | 'justifyContent'
    | 'backgroundColor'
    | keyof TransformsStyle
    | 'filter'
    | 'boxShadow'
  >;

export type BoxProps = PropsWithChildren<
  {
    style?: StyleProp<ViewStyle>;
  } & LayoutStyleType &
    Pick<ViewProps, 'onLayout' | 'collapsable'>
>;

export type BoxForwardRef = ForwardRefComponent<View, BoxProps>;
