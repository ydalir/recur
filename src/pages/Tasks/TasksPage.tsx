import { FC, useState } from "react";
import { Task, TaskComponent } from "../../Task";
import dayjs from "dayjs";

const defaultTask: Omit<Task, "id"> = {
  title: "",
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
};

type Props = {
  tasks: Task[];
  logTask: (task: Task) => void;
  setEditTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TasksPage: FC<Props> = ({
  tasks,
  logTask,
  setEditTask,
  deleteTask,
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  return (
    <div>
      <h2>Tasks:</h2>
      <label>
        <input
          type="checkbox"
          checked={showAll}
          onChange={() => setShowAll((prev) => !prev)}
        />{" "}
        Vis alle
      </label>
      <ul>
        {Object.values(tasks)
          .filter(
            (task) =>
              showAll ||
              (!dayjs(task.dueDate).isAfter(dayjs(), "day") && task.dueDate)
          )
          .sort((a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix())
          .map((task) => (
            <TaskComponent
              key={task.id}
              task={task}
              logTask={logTask}
              editTask={setEditTask}
              deleteTask={deleteTask}
            />
          ))}
      </ul>
      <button
        onClick={() => setEditTask({ ...defaultTask, id: crypto.randomUUID() })}
      >
        New task
      </button>
    </div>
  );
};
