import dayjs from "dayjs";

export const convertTimestampToDateString = (
  timestamp: number | string | undefined,
  format = "DD/MM/YYYY"
): string => {
  if (!timestamp) {
    return "";
  }
  return dayjs(timestamp).format(format);
};
