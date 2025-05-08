import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import style from "./DatePicker.module.css";
import { formatDate, today } from "../utils/date";
import { useParams } from "react-router";
import { LinkButton } from "./Button/LinkButton";

const dateDisplay = (date: Dayjs): string => {
  const now = today();

  if (date.isSame(now, "day")) return "Today";

  return formatDate(date);
};

export const DatePicker: FC = () => {
  const params = useParams();
  const dateString = params["date"];
  const now = today();
  const date = dateString ? dayjs(dateString) : now;
  const nextDate = date.add(1, "day");

  return (
    <div className={style.datePicker}>
      <LinkButton to={`/log/${formatDate(date.add(-1, "day"))}`}>
        {"←"}
      </LinkButton>
      <h2>{dateDisplay(date)}</h2>
      <LinkButton
        to={
          nextDate.isSame(now, "day") ? "/log" : `/log/${formatDate(nextDate)}`
        }
      >
        {"→"}
      </LinkButton>
    </div>
  );
};
