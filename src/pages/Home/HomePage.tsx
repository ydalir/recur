import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { LogEntry } from "../../utils/logEntry";
import { getEntriesForDate, getTasks } from "../../utils/idb";
import style from "./HomePage.module.css";
import { LinkButton } from "../../components/Button/LinkButton";
import { EntryComponent } from "../../components/Entry/Entry";
import { useParams } from "react-router";
import { Task, toTask } from "../../utils/task";
import { sortDates, today } from "../../utils/date";
import { TaskButton } from "../../components/Task/Task";

export const HomePage = () => {
  const params = useParams();
  const date = useMemo(() => dayjs(params["date"]), [params]);
  const [entries, setEntries] = useState<LogEntry[]>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getEntriesForDate(date).then(setEntries);
  }, [date]);

  useEffect(() => {
    const now = today();
    if (!date.isSame(now, "day")) return setTasks([]);

    getTasks().then((tasks) => {
      setTasks(
        Object.values(tasks)
          .map(toTask)
          .filter(
            (task) =>
              task.dueDate &&
              (task.dueDate.isSame(now, "day") ||
                task.dueDate.isBefore(now, "day"))
          )
          .sort((a, b) => sortDates(a.dueDate, b.dueDate))
      );
    });
  }, [date]);

  if (!entries) return "Loading";

  return (
    <div className={style.homepage}>
      <DatePicker />
      {tasks.length !== 0 && (
        <>
          <h2>Quick-add</h2>
          {tasks.map((task) => (
            <TaskButton key={task.id} task={task} />
          ))}
        </>
      )}
      <div className={style.entriesContainer}>
        {!entries.length && "No entries"}
        {entries.map((entry) => (
          <EntryComponent entry={entry} key={entry.id} />
        ))}
      </div>
      <LinkButton className={style.addButton} to={`add`}>
        +
      </LinkButton>
    </div>
  );
};
