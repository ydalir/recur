import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { LogEntry } from "../../utils/logEntry";
import { getEntriesForDate } from "../../utils/idb";
import { formatDate } from "../../utils/date";
import { Link, useLocation } from "react-router";

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
    <div>
      <DatePicker date={date} setDate={setDate} />
      {entries.map((entry) => (
        <div key={entry.id}>{entry.title}</div>
      ))}
      <Link to={`entry/${formatDate(date)}/add`}>Log</Link>
    </div>
  );
};
