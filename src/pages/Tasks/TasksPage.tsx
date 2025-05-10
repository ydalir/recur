import { useEffect, useState } from "react";
import { Task, toTask } from "../../utils/task";
import { getTasks } from "../../utils/idb";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./TasksPage.module.css";
import { TaskComponent } from "../../components/Task/Task";
import { sortDates } from "../../utils/date";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(
        Object.values(tasks)
          .map(toTask)
          .sort((a, b) => sortDates(a.dueDate, b.dueDate))
      );
    });
  }, []);

  if (!tasks) return "Loading";

  return (
    <div className={style.tasksPage}>
      <div className={style.tasksContainer}>
        <h2>Edit tasks</h2>
        {tasks.map((task) => (
          <TaskComponent task={task} pathPrefix="edit/" key={task.id} />
        ))}
      </div>
      <LinkButton className={style.addButton} to="edit">
        +
      </LinkButton>
    </div>
  );
};
