import { Dayjs } from "dayjs";
import { FC, useContext } from "react";
import style from "./DatePicker.module.css";
import { formatDate, today } from "../utils/date";
import { LinkButton } from "./Button/LinkButton";
import { DateContext } from "./DateContext/DateContext";

type Props = {
  disabled?: boolean;
};

const dateLink = (date: Dayjs) => `/log/${formatDate(date)}`;

export const DatePicker: FC<Props> = ({ disabled = false }) => {
  const [date] = useContext(DateContext);
  const now = today();

  const prevDay = date.add(-1, "day");
  const nextDay = date.add(1, "day");
  const isToday = date.isSame(now, "day");
  const isYesterday = nextDay.isSame(now, "day");
  const displayDate = date.format("ddd D. MMM");

  return (
    <div className={style.datePicker}>
      {!disabled && <LinkButton to={dateLink(prevDay)}>{"←"}</LinkButton>}
      <span className={style.heading}>
        <h2>{displayDate}</h2>
        {isToday && "Today"}
      </span>
      {!isToday && !disabled && (
        <LinkButton to={isYesterday ? "/log" : dateLink(nextDay)}>
          {"→"}
        </LinkButton>
      )}
    </div>
  );
};
