import dayjs, { Dayjs } from "dayjs";

export const formatDate = (date: dayjs.Dayjs) => date.format("YYYY-MM-DD");

export const sortDates = (a: Dayjs | null, b: Dayjs | null): number => {
  if (!a) return 1;
  if (!b) return -1;

  return a.diff(b);
};

export const today = () => dayjs().startOf("day");
