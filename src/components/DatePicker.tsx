import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import style from "./DatePicker.module.css";
import { formatDate, today } from "../utils/date";
import { useParams } from "react-router";
import { LinkButton } from "./Button/LinkButton";

const dateDisplay = (date: Dayjs): string => {
  const now = today();

  if (date.isSame(now, "day")) return "Today";
  if (date.isSame(now.add(1, "d"), "day")) return "Tomorrow";
  if (date.isSame(now.add(-1, "d"), "day")) return "Yesterday";

  return formatDate(date);
};

export const DatePicker: FC = () => {
  const params = useParams();
  const date = dayjs(params["date"]);

  return (
    <div className={style.datePicker}>
      <LinkButton to={`/log/${formatDate(date.add(-1, "day"))}`}>
        {"←"}
      </LinkButton>
      <h2>{dateDisplay(date)}</h2>
      <LinkButton to={`/log/${formatDate(date.add(1, "day"))}`}>
        {"→"}
      </LinkButton>
    </div>
  );
};
