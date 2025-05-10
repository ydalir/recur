import { useContext, useEffect, useState } from "react";
import { DatePicker } from "../../components/DatePicker";
import { LogEntry } from "../../utils/logEntry";
import { getEntriesForDate, getTasks } from "../../utils/idb";
import style from "./HomePage.module.css";
import { EntryComponent } from "../../components/Entry/Entry";
import { Task, toTask } from "../../utils/task";
import { sortDates, today } from "../../utils/date";
import { TaskButton } from "../../components/Task/Task";
import { DateContext } from "../../components/DateContext/DateContext";
import { Link } from "react-router";

export const HomePage = () => {
  const [date] = useContext(DateContext);

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
      {tasks.length !== 0 ? (
        <div className={style.quickAdd}>
          <div className={style.header}>
            <h2>Quick-add</h2>
            <Link to={`add`}>All tasks →</Link>
          </div>
          <div className={style.tasks}>
            {tasks.map((task) => (
              <TaskButton key={task.id} task={task} pathPrefix="add/" />
            ))}
          </div>
        </div>
      ) : (
        <div className={style.entriesContainer}>No tasks due</div>
      )}
      <hr></hr>
      <div className={style.entriesContainer}>
        {!entries.length && "No entries"}
        {entries.map((entry) => (
          <EntryComponent entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
};
