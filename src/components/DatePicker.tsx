import dayjs from "dayjs";
import { FC } from "react";
import { Button } from "./Button/Button";
import style from "./DatePicker.module.css";

type Props = {
  date: dayjs.Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

export const DatePicker: FC<Props> = ({ date, setDate }) => {
  return (
    <div className={style.datePicker}>
      <Button onClick={() => setDate((prev) => prev.add(-1, "day"))}>
        {"←"}
      </Button>
      <h2>{date.format("YYYY-MM-DD")}</h2>
      <Button onClick={() => setDate((prev) => prev.add(1, "day"))}>
        {"→"}
      </Button>
    </div>
  );
};
