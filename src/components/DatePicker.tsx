import dayjs from "dayjs";
import { FC } from "react";

type Props = {
  date: dayjs.Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

export const DatePicker: FC<Props> = ({ date, setDate }) => {
  return (
    <div>
      <button onClick={() => setDate((prev) => prev.add(-1, "day"))}>
        Prev
      </button>
      {date.format("YYYY-MM-DD")}
      <button onClick={() => setDate((prev) => prev.add(1, "day"))}>
        Next
      </button>
    </div>
  );
};
