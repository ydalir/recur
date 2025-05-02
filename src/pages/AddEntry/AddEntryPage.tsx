import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import { formatDate, sortDates } from "../../utils/date";
import { useEffect, useMemo, useState } from "react";
import { Task, toTask } from "../../utils/task";
import { addEntry, getTasks } from "../../utils/idb";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./AddEntryPage.module.css";
import { TaskButton } from "../../components/Task/Task";

export const AddEntryPage = () => {
  const params = useParams();
  const date = dayjs(params["date"]);
  const navigate = useNavigate();

  const [onlyDue, setOnlyDue] = useState<boolean>(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(
        Object.values(tasks)
          .map(toTask)
          .sort((a, b) => sortDates(a.dueDate, b.dueDate))
      );
    });
  }, []);

  const filteredTasks = useMemo(() => {
    if (!onlyDue) return tasks;

    const now = dayjs();
    return tasks.filter(
      (task) =>
        task.dueDate &&
        (task.dueDate.isSame(now, "day") || task.dueDate.isBefore(now, "day"))
    );
  }, [onlyDue, tasks]);

  return (
    <div className={style.addEntryPage}>
      <label className={style.checkbox}>
        Only due tasks{" "}
        <input
          type="checkbox"
          checked={onlyDue}
          onChange={() => setOnlyDue((prev) => !prev)}
        />
      </label>

      <div className={style.taskContainer}>
        {!filteredTasks.length && "No more tasks"}
        {filteredTasks.map((task) => (
          <TaskButton
            key={task.id}
            task={task}
            onClick={() => {
              addEntry(
                {
                  date: formatDate(date),
                  id: crypto.randomUUID(),
                  taskId: task.id,
                  title: task.title,
                },
                task
              ).then(() => {
                navigate({ pathname: "..", hash: formatDate(date) });
              });
            }}
          />
        ))}
      </div>
      <LinkButton
        to={{ pathname: "..", hash: formatDate(date) }}
        variant="secondary"
      >
        Cancel
      </LinkButton>
    </div>
  );
};
