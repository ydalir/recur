import { useEffect, useState } from "react";
import { Task, toTask } from "../../utils/task";
import { getTasks } from "../../utils/idb";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./TasksPage.module.css";
import { TaskComponent } from "../../components/Task/Task";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(Object.values(tasks).map(toTask));
    });
  }, []);

  if (!tasks) return "Loading";

  return (
    <div className={style.tasksPage}>
      <div className={style.tasksContainer}>
        {tasks.map((task) => (
          <TaskComponent task={task} key={task.id} />
        ))}
      </div>
      <LinkButton className={style.addButton} to="edit">
        +
      </LinkButton>
    </div>
  );
};
