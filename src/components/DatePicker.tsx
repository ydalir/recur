import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { Button } from "./Button/Button";
import style from "./DatePicker.module.css";
import { formatDate, today } from "../utils/date";

type Props = {
  date: dayjs.Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const dateDisplay = (date: Dayjs): string => {
  const now = today();

  if (date.isSame(now, "day")) return "Today";
  if (date.isSame(now.add(1, "d"), "day")) return "Tomorrow";
  if (date.isSame(now.add(-1, "d"), "day")) return "Yesterday";

  return formatDate(date);
};

export const DatePicker: FC<Props> = ({ date, setDate }) => {
  return (
    <div className={style.datePicker}>
      <Button onClick={() => setDate((prev) => prev.add(-1, "day"))}>
        {"←"}
      </Button>
      <h2>{dateDisplay(date)}</h2>
      <Button onClick={() => setDate((prev) => prev.add(1, "day"))}>
        {"→"}
      </Button>
    </div>
  );
};
