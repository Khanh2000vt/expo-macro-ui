import {LayoutStyleType} from './layout.type';

export const getStyleLayout = (props: LayoutStyleType): any => {
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
    bgColor,
    ...propsStyle
  } = props;
  const margin = {
    margin: m,
    marginHorizontal: mh,
    marginVertical: mv,
    marginLeft: ml,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginStart: ms,
    marginEnd: me,
  };

  const padding = {
    padding: p,
    paddingHorizontal: ph,
    paddingVertical: pv,
    paddingLeft: pl,
    paddingTop: pt,
    paddingRight: pr,
    paddingBottom: pb,
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
    backgroundColor: bgColor,
  };
};
