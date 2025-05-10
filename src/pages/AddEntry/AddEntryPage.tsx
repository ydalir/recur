import { sortDates } from "../../utils/date";
import { useEffect, useState } from "react";
import { Task, toTask } from "../../utils/task";
import { getTasks } from "../../utils/idb";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./AddEntryPage.module.css";
import { TaskComponent } from "../../components/Task/Task";
import { DatePicker } from "../../components/DatePicker";

export const AddEntryPage = () => {
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

  return (
    <div className={style.addEntryPage}>
      <DatePicker disabled />
      <div className={style.taskContainer}>
        {!tasks.length && "No tasks"}
        {tasks.map((task) => (
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
      <LinkButton to={".."} variant="secondary" className={style.cancelButton}>
        Cancel
      </LinkButton>
    </div>
  );
};
