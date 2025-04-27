import { useEffect, useState } from "react";
import { DBTask } from "../../utils/task";
import { getTasks } from "../../utils/idb";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<DBTask[]>();

  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(Object.values(tasks));
    });
  }, []);

  if (!tasks) return "Loading";

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};
