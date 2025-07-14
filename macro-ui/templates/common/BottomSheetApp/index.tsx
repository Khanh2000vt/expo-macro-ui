import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { scaler } from "../../themes/scale";
import {
  BottomSheetRef,
  ForwardRefComponent,
  ISnapPointsApp,
} from "../../types/common";
import { useBottomSheetBackHandler } from "./useBottomSheetBackHandler";

type BottomSheetAppProps = {
  keySheet?: string;
  snapPoints: ISnapPointsApp;
  pressBackdropClose?: boolean;
  enablePanDownToClose?: boolean;
  onChange?: (index: number) => void;
  handleIndicatorStyle?: StyleProp<ViewStyle>;
  enableContentPanningGesture?: boolean;
  topInset?: number;
  opacity?: number;
};

export const BottomSheetApp: ForwardRefComponent<
  BottomSheetRef,
  PropsWithChildren<BottomSheetAppProps>
> = forwardRef(
  (
    {
      children,
      snapPoints,
      pressBackdropClose = true,
      enablePanDownToClose = true,
      onChange,
      keySheet,
      handleIndicatorStyle,
      enableContentPanningGesture,
      topInset,
      opacity = 0.2,
    },
    ref
  ) => {
    const { rt } = useUnistyles();
    const sheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(
      ref,
      () => ({
        open,
        close,
      }),
      []
    );

    const open = () => {
      sheetRef.current?.present();
    };

    const close = () => {
      sheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={pressBackdropClose ? "close" : "none"}
          opacity={opacity}
          {...props}
        />
      ),
      [opacity, pressBackdropClose]
    );

    const handleChange = (index: number) => {
      onSheetPositionChange(index);
      onChange?.(index);
    };

    const { onSheetPositionChange } = useBottomSheetBackHandler(sheetRef);
    return (
      <BottomSheetModal
        enableDynamicSizing={false}
        keyboardBlurBehavior="restore"
        enableContentPanningGesture={enableContentPanningGesture}
        ref={sheetRef}
        key={keySheet}
        name={keySheet || "root"}
        snapPoints={snapPoints}
        children={children}
        stackBehavior="push"
        backdropComponent={renderBackdrop}
        enablePanDownToClose={enablePanDownToClose}
        handleIndicatorStyle={[
          styles.indicator(enablePanDownToClose),
          handleIndicatorStyle,
        ]}
        onChange={handleChange}
        topInset={topInset ?? rt.insets.top}
      />
    );
  }
);

const styles = StyleSheet.create(({ colors }) => ({
  indicator: (enablePanDownToClose: boolean) => ({
    width: scaler(50),
    backgroundColor: colors.grey[200],
    opacity: enablePanDownToClose ? 1 : 0,
  }),
}));
