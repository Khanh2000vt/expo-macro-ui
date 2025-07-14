import { ItemSelectType } from "../global";
import { removeVietnameseTones } from "./string-handle";
import { sortArrayByKey } from "./array";

/**
 * Hàm tìm kiếm theo tên và sắp xếp theo thứ tự index tìm thấy
 * @param array array cần search
 * @param searchString chuỗi search
 * @returns mảng search
 */
export const searchAndSortFilterSelect = (
  array: ItemSelectType[] | undefined,
  searchString: string,
  sort = true
): ItemSelectType[] => {
  if (!array?.length) {
    return [];
  }
  if (!searchString) {
    return sort ? sortArrayByKey(array, "value") : array;
  }
  const lowerSearchTerm = removeVietnameseTones(searchString).toLowerCase();
  const filteredArray =
    array?.filter((item) =>
      removeVietnameseTones(item?.label).toLowerCase().includes(lowerSearchTerm)
    ) || [];
  return sort
    ? filteredArray?.sort((a, b) => {
        const indexA = removeVietnameseTones(a?.label)
          .toLowerCase()
          .indexOf(lowerSearchTerm);
        const indexB = removeVietnameseTones(b?.label)
          .toLowerCase()
          .indexOf(lowerSearchTerm);
        return indexA - indexB;
      })
    : filteredArray;
};

/**
 * Hàm delay
 * @param seconds số giây để delay
 * @returns Promise<void>
 */
export const delay = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
