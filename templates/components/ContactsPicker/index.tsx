import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import * as Contacts from "expo-contacts";
import * as Linking from "expo-linking";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheetApp, ItemSelect } from "../../common";
import {
  HeightItemPicker,
  ItemSelectType,
  MaxHeightModal,
  PaddingBottomList,
} from "../../global";
import { BottomSheetRef, ModalAppRef } from "../../types";
import { ModalConfirm } from "../ModalConfirm";
import { PressableApp } from "../PressableApp";
import { Separator } from "../Separator";

type ContactsPickerProps = {
  onSelect?: (contact: ItemSelectType<Contacts.Contact>) => void;
};

export const ContactsPicker: React.FC<
  PropsWithChildren<ContactsPickerProps>
> = ({ onSelect, children }) => {
  const [data, setData] = useState<ItemSelectType<Contacts.Contact>[]>([]);

  const sheetRef = useRef<BottomSheetRef>(null);
  const modalRef = useRef<ModalAppRef>(null);

  const handlePress = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === Contacts.PermissionStatus.DENIED) {
      modalRef.current?.open();
      return;
    }
    const contact: Contacts.Contact | null =
      await Contacts.presentContactPickerAsync();
    if (!contact?.phoneNumbers || contact?.phoneNumbers?.length === 0) {
      return;
    }
    const listPhone: ItemSelectType<Contacts.Contact>[] =
      contact?.phoneNumbers?.map((tel: Contacts.Contact) => ({
        label: `${tel?.label}: ${tel?.number}`,
        value: tel?.digits,
        ...contact,
      }));
    if (listPhone?.length === 1) {
      onSelect?.(listPhone[0]);
      return;
    }
    setData(listPhone);
    sheetRef.current?.open();
  };

  const renderItem = useCallback(
    ({ item }: { item: ItemSelectType<Contacts.Contact> }) => {
      return (
        <ItemSelect
          item={item}
          onPress={() => {
            sheetRef.current?.close();
            onSelect?.(item);
          }}
          values={[]}
        />
      );
    },
    []
  );

  const snapPoints = useMemo(() => {
    if (!data) {
      return "50%";
    }
    const _height = data?.length * HeightItemPicker + 2 * PaddingBottomList;

    return Math.min(_height, MaxHeightModal);
  }, []);

  const keyExtractor = useCallback(
    (_: any, i: number) => `contact_select_${_?.value}_${i}`,
    []
  );

  return (
    <>
      <PressableApp onPress={handlePress}>{children}</PressableApp>
      <BottomSheetApp
        snapPoints={[snapPoints]}
        keySheet="contacts"
        ref={sheetRef}
      >
        <BottomSheetFlatList
          renderItem={renderItem}
          key={"contact_select"}
          data={data}
          bounces={false}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps={"handled"}
          ItemSeparatorComponent={() => <Separator space={0} />}
        />
      </BottomSheetApp>
      <ModalConfirm
        ref={modalRef}
        title="Quyền truy cập Danh bạ bị khoá"
        description="Hãy mở quyền truy cập danh bạ trong Cài đặt!"
        onCancel={() => modalRef.current?.close()}
        onConfirm={async () => {
          Linking.openSettings();
          modalRef.current?.close();
        }}
      />
    </>
  );
};
