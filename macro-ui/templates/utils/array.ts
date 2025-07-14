import { ItemSelectType } from "../global/global.types";

/**
 * Trả về thuộc tính attributeReturn của item có attributeCompare bằng valueCompare hoặc undefined
 * @param array mảng object
 * @param attributeCompare key cần so sánh
 * @param valueCompare giá trị muốn so sánh
 * @param attributeReturn key muốn trả về khi tìm thấy
 * @returns foundItem[attributeReturn]
 */
export const getAttributeItemInArrayObject = <
  T extends Record<string, any>,
  K extends keyof T
>(
  array: T[] | undefined,
  attributeCompare: K,
  valueCompare: T[K] | undefined,
  attributeReturn: keyof T
): T[K] | undefined => {
  if (!array) {
    return undefined;
  }
  const foundItem = array?.find(
    (item) => item[attributeCompare] === valueCompare
  );
  return foundItem ? foundItem[attributeReturn] : undefined;
};

/**
 * Trả về item có attributeCompare bằng valueCompare hoặc undefined
 * @param array mảng object
 * @param attributeCompare key cần so sánh
 * @param valueCompare giá trị muốn so sánh
 * @returns foundItem[keyReturn]
 */
export const getItemInArrayObject = <
  T extends Record<string, any>,
  K extends keyof T
>(
  array: T[] | undefined,
  attributeCompare: K,
  valueCompare: T[K] | undefined
): T | undefined => {
  if (array === undefined || valueCompare === undefined) {
    return undefined;
  }
  return array?.find((item) => item[attributeCompare] === valueCompare);
};

/**
 * chuyển 1 mảng thành object
 * @param array any[]
 * @returns Record<K, T>
 */
export const convertArrayToObject = <
  T extends Record<string, any>,
  K extends keyof T
>(
  array: T[],
  keyObject: K
): Record<K, T> => {
  const object: Record<K, T> = {} as Record<K, T>;
  if (!array || !array?.length) {
    return {} as Record<K, T>;
  }
  return array?.reduce((acc: Record<K, T>, item: T) => {
    acc[item[keyObject]] = item;
    return acc;
  }, {} as Record<K, T>);
};

/**
 *
 * @param arr 1 array bất kỳ
 * @param filterDeep có filter sâu hay không (nếu là true sẽ loại cả số 0, chuỗi rỗng)
 * @returns object đã loại bỏ các thuộc tính empty
 */
export const filterEmptyElementItemArray = <T>(
  arr: T[] | undefined,
  filterDeep = false
): T[] => {
  if (!arr || !arr?.length) {
    return [];
  }
  const filteredEntries = arr?.filter((value) => {
    if (filterDeep) {
      return !!value;
    }
    return !(value === undefined || value === null || Number.isNaN(value));
  });
  return filteredEntries;
};

export const replaceOrAddItemsToArrayByKey = <T extends object>(
  roots: T[],
  array: T[],
  key: keyof T
): T[] => {
  const map = new Map(roots.map((item) => [item?.[key], item]));

  array.forEach((item) => {
    map.set(item?.[key], item);
  });
  return Array.from(map.values());
};

export const getRandomItemInArray = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

/**
 * Hàm để sắp xếp mảng theo giá trị của key
 * @param array mảng T
 * @param key keyof T
 * @returns mảng sắp xếp theo key
 */
export const sortArrayByKey = <T>(array: T[], key: keyof T): T[] => {
  return array?.sort((a, b) => {
    const valueA = String(a[key]);
    const valueB = String(b[key]);
    return valueA.localeCompare(valueB, "vi");
  });
};

/**
 * trả về các label của list được nối bằng [join]
 * @param list list ItemPickerType
 * @param join ký tự muốn join
 * @returns trả về các label của list được nối bằng [join]
 */
export const concatLabelListPicker = (
  list: ItemSelectType[] | undefined,
  join: string = "; "
) => {
  if (!list || !list.length) {
    return "";
  }
  return list
    .map((item) => item?.label)
    .sort()
    .join(join);
};

/**
 * Lấy ra label của value picker tương tứng
 * @param list mảng picker
 * @param value value của picker
 * @returns lấy ra label của value picker tương tứng
 */
export const getLabelInListSelect = (
  list: ItemSelectType[] | undefined,
  value: string | undefined
) => {
  if (!list || !value || list.length === 0) {
    return undefined;
  }
  const _item = list?.find((item) => item.value === value);
  return _item?.label || undefined;
};
