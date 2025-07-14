export const displayMoney = (amount: number | undefined): string => {
  if (amount === undefined || amount === null || Number.isNaN(amount)) {
    return '_';
  }
  return new Intl.NumberFormat('vi-VN').format(amount);
};

/**
 * Hàm loại bỏ dấu tiếng Việt sử dụng biểu thức chính quy
 * @param str chuỗi tiếng việt
 * @returns chuỗi xoá bỏ dấu
 */
export const removeVietnameseTones = (str: string): string => {
  return String(str)
    .normalize('NFD') // Tách các dấu ra khỏi ký tự gốc
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
    .replace(/đ/g, 'd') // Chuyển đổi đ thành d
    .replace(/Đ/g, 'D') // Chuyển đổi Đ thành D
    .toLowerCase();
};

export const displayString = (input?: any) => {
  if (input === undefined || input === null) {
    return '_';
  }
  return String(input);
};

export const formatMoney = (amount: number | undefined) => {
  if (typeof amount !== 'number' || amount < 0) {
    return '0 K';
  }

  if (amount >= 1000000000) {
    // Tỷ (billion)
    const value = amount / 1000000000;
    return value % 1 === 0 ? `${value}T` : `${value.toFixed(2)}T`;
  } else if (amount >= 1000000) {
    // Triệu (million)
    const value = amount / 1000000;
    return value % 1 === 0 ? `${value}M` : `${value.toFixed(2)}M`;
  } else if (amount >= 1000) {
    // Nghìn (thousand)
    const value = amount / 1000;
    return value % 1 === 0 ? `${value}K` : `${value.toFixed(2)}K`;
  } else {
    // Dưới 1k thì hiển thị số gốc
    return amount.toString();
  }
};
