import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useRef} from 'react';
import {BackHandler, NativeEventSubscription} from 'react-native';

export const useBottomSheetBackHandler = (
  sheetRef: React.RefObject<BottomSheetModal | null>,
) => {
  const nativeRef = useRef<NativeEventSubscription | null>(null);
  const onSheetPositionChange = useCallback(
    (index: number) => {
      const isBottomSheetVisible = index >= 0;
      if (isBottomSheetVisible && !nativeRef.current) {
        nativeRef.current = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {
            sheetRef.current?.close();
            return true;
          },
        );
      } else if (!isBottomSheetVisible) {
        nativeRef.current?.remove();
        nativeRef.current = null;
      }
    },
    [sheetRef, nativeRef],
  );
  return {onSheetPositionChange};
};
