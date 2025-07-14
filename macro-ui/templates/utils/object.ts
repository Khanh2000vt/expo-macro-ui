/**
 *
 * @param obj 1 object bất kỳ
 * @param filterDeep có filter sâu hay không (nếu là true sẽ loại cả số 0, chuỗi rỗng)
 * @returns object đã loại bỏ các thuộc tính empty
 */
export const filterAttributeEmptyObject = <T extends object>(
  obj: T,
  filterDeep = true,
): Partial<T> => {
  const entries = Object.entries(obj);
  const filteredEntries = entries.filter(([_, value]) => {
    if (filterDeep) {
      return !!value;
    }
    return !(value === undefined || value === null || Number.isNaN(value));
  });
  const filteredObject = Object.fromEntries(filteredEntries);
  return filteredObject as Partial<T>;
};

/**
 * Kiểm tra xem 1 object có là rỗng hay không
 * @param obj 1 object
 * @returns true là object rỗng
 */
export const isEmptyObject = (obj: object | null | undefined) => {
  if (!obj) {
    return true;
  }
  return JSON.stringify(obj) === '{}';
};
