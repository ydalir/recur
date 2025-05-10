import { Dayjs } from "dayjs";
import { createContext } from "react";
import { today } from "../../utils/date";

export const DateContext = createContext<Dayjs>(today());
