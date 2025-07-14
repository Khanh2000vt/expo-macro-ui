import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native-unistyles";
import {
  BottomSheetApp,
  HeaderSheet,
  ItemSelect,
  SelectBox,
} from "../../common";
import {
  HeightItemPicker,
  ItemSelectType,
  MaxHeightModal,
  PaddingBottomList,
} from "../../global";
import { Box } from "../../layout";
import { scaler } from "../../themes";
import { BottomSheetRef } from "../../types";
import { getLabelInListSelect, searchAndSortFilterSelect } from "../../utils";
import { EmptyState } from "../EmptyState";
import { Separator } from "../Separator";

export type SelectType = "select" | "multiple";

export type SelectProps = {
  keySheet?: string;
  options?: ItemSelectType[];
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  sort?: boolean;
  type?: SelectType;
  values?: string | string[];
  onChange?: (values: string | string[] | undefined) => void;
  // Nếu true, thì khi chọn "Tất cả" sẽ trả về mảng rỗng thay vì tất cả values trong options
  isAllReturnEmpty?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  options,
  keySheet,
  values,
  title,
  onChange,
  placeholder,
  disabled,
  sort = true,
  type = "select",
  isAllReturnEmpty = true,
}) => {
  const optionsLength = options?.length || 0;
  const searchLocal = options ? optionsLength > 10 : false;
  const isMultiple = type === "multiple";
  const isDisabled = disabled || !optionsLength;

  const snapPoints = useMemo(() => {
    if (!optionsLength) {
      return "50%";
    }
    const _height =
      optionsLength * HeightItemPicker +
      2 * PaddingBottomList +
      (searchLocal ? scaler(100) : 0);

    return Math.min(_height, MaxHeightModal);
  }, [optionsLength]);

  const [search, setSearch] = useState<string>("");
  const [listPick, setListPick] = useState<string[]>([]);

  const listRef = useRef<BottomSheetFlatListMethods>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const checkedAll = isAllReturnEmpty
    ? listPick?.length === 0
    : listPick?.length === optionsLength;

  const LabelSelected = useMemo(() => {
    if (checkedAll) {
      return "Tất cả";
    }
    if (!values) {
      return undefined;
    }
    if (Array.isArray(values)) {
      return options?.reduce((acc: string[], item: ItemSelectType) => {
        if (values?.includes(item?.value)) {
          acc.push(item?.label);
        }
        return acc;
      }, []);
    }
    return getLabelInListSelect(options, values);
  }, [values, checkedAll]);

  const DATA = useMemo(() => {
    return searchAndSortFilterSelect(options, search, sort);
  }, [options, search, sort]);

  useEffect(() => {
    initData();
  }, [values]);

  const initData = () => {
    setListPick(Array.isArray(values) ? values : values ? [values] : []);
  };

  const handleChangeModal = (index: number) => {
    if (index !== 0 || !optionsLength) {
      setSearch("");
      initData();
      return;
    }

    if (!searchLocal) {
      return;
    }
    const valueFocus = Array.isArray(values) ? values[0] : values;
    const findIndex = options?.findIndex((_item) => _item.value === valueFocus);
    if (findIndex === -1 || findIndex === undefined) {
      return;
    }
    listRef.current?.scrollToIndex({ index: findIndex });
  };

  const close = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handleSearchHeader = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const keyExtractor = useCallback(
    (_: any, i: number) => `${String(keySheet)}_${_?.value}_${i}`,
    [keySheet]
  );

  const open = () => {
    sheetRef.current?.open();
  };

  const handleClear = () => {
    if (isMultiple) {
      handleChange([]);
    } else {
      handleChange(undefined);
    }
  };

  const handleConfirm = () => {
    handleChange(listPick);
    close();
  };

  const handleChange = (valueSelect: (string | undefined) | string[]) => {
    if (isMultiple) {
      (onChange as (v: string[]) => void)?.(valueSelect as string[]);
    } else {
      (onChange as (v: string | undefined) => void)?.(
        valueSelect as string | undefined
      );
    }
  };

  const handlePressItem = (value: string) => {
    if (isMultiple) {
      setListPick((prevState) => {
        return prevState?.includes(value)
          ? prevState.filter((_item) => _item !== value)
          : [...prevState, value];
      });
    } else {
      handleChange(value);
      close();
    }
  };

  const handlePressAll = (checked: boolean) => {
    if (!checked || isAllReturnEmpty) {
      setListPick([]);
    } else {
      const allValues = options?.map((item) => item.value) || [];
      setListPick(allValues);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: ItemSelectType }) => {
      return (
        <ItemSelect item={item} onPress={handlePressItem} values={listPick} />
      );
    },
    [listPick, isMultiple]
  );

  return (
    <>
      <SelectBox
        onPress={open}
        onClear={handleClear}
        label={LabelSelected}
        placeholder={placeholder}
        disabled={isDisabled}
        RightElement={(color: string) => (
          <Ionicons name="chevron-down" size={24} color={color} />
        )}
      />
      <BottomSheetApp
        snapPoints={[snapPoints]}
        ref={sheetRef}
        onChange={handleChangeModal}
        pressBackdropClose
        enablePanDownToClose
        keySheet={keySheet}
      >
        <Box flex={1}>
          <HeaderSheet
            isMultiple={isMultiple}
            title={title || placeholder}
            onClose={close}
            searchLocal={searchLocal}
            onSearch={handleSearchHeader}
            onConfirm={handleConfirm}
            checkedAll={checkedAll}
            onPressAll={handlePressAll}
          />
          <Box flex={1}>
            <BottomSheetFlatList
              ref={listRef}
              key={keySheet ?? "keySheet"}
              data={DATA}
              keyExtractor={keyExtractor}
              bounces={false}
              renderItem={renderItem}
              keyboardShouldPersistTaps={"handled"}
              contentContainerStyle={styles.contentContainer}
              onEndReachedThreshold={0.5}
              initialNumToRender={110}
              onScrollToIndexFailed={(info) => {
                const wait = new Promise((resolve: any) =>
                  setTimeout(resolve, 50)
                );
                wait.then(() => {
                  listRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                });
              }}
              showsVerticalScrollIndicator={searchLocal}
              ItemSeparatorComponent={() => <Separator space={0} />}
              style={styles.list}
              ListEmptyComponent={<EmptyState />}
            />
          </Box>
        </Box>
      </BottomSheetApp>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: scaler(50),
    flexGrow: 1,
  },
  list: {
    flex: 1,
    marginTop: scaler(4),
  },
});
