import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { LogEntry } from "../../utils/logEntry";
import { getEntriesForDate } from "../../utils/idb";
import { formatDate } from "../../utils/date";
import { useLocation } from "react-router";
import style from "./HomePage.module.css";
import { LinkButton } from "../../components/Button/LinkButton";
import { EntryComponent } from "../../components/Entry/Entry";

export const HomePage = () => {
  const location = useLocation();
  const [date, setDate] = useState<dayjs.Dayjs>(
    dayjs(location.hash.replace("#", "") || undefined)
  );
  const [entries, setEntries] = useState<LogEntry[]>();

  useEffect(() => {
    getEntriesForDate(date).then(setEntries);
  }, [date]);

  if (!entries) return "Loading";

  return (
    <div className={style.homepage}>
      <DatePicker date={date} setDate={setDate} />
      <div className={style.entriesContainer}>
        {!entries.length && "No entries"}
        {entries.map((entry) => (
          <EntryComponent entry={entry} key={entry.id} />
        ))}
      </div>
      <LinkButton className={style.addButton} to={`add/${formatDate(date)}`}>
        +
      </LinkButton>
    </div>
  );
};
