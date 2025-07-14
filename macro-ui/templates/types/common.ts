import {SharedValue} from 'react-native-reanimated';

export type MemoComponent<T> = React.MemoExoticComponent<React.FC<T>>;

export type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;

export type ISnapPointsApp =
  | (string | number)[]
  | SharedValue<(string | number)[]>;

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export type ModalAppRef = {
  open: () => void;
  close: () => void;
};

export type LoadingHandlerRef = {
  loading: () => void;
  overlay: () => void;
  disable: () => void;
  hide: () => void;
};
