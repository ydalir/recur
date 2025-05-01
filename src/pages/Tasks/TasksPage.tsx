import { useEffect, useState } from "react";
import { DBTask } from "../../utils/task";
import { getTasks } from "../../utils/idb";
import { Link } from "react-router";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./TasksPage.module.css";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<DBTask[]>();

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(Object.values(tasks));
    });
  }, []);

  if (!tasks) return "Loading";

  return (
    <div className={style.tasksPage}>
      <div className={style.tasksContainer}>
        {tasks.map((task) => (
          <div key={task.id}>
            {task.title} <Link to={`edit/${task.id}`}>Edit</Link>
          </div>
        ))}
      </div>
      <LinkButton className={style.addButton} to="edit">
        +
      </LinkButton>
    </div>
  );
};
