import { Dayjs } from "dayjs";
import { createContext } from "react";
import { formatDate, today } from "../../utils/date";

export const DateContext = createContext<[Dayjs, string]>([
  today(),
  formatDate(today()),
]);
