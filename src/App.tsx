import dayjs from "dayjs";
import { Task, TaskComponent } from "./Task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

const defaultTask: Omit<Task, "id"> = {
  title: "",
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
};

type LogEntry = {
  id: string;
  title: string;
  date: string;
  taskId: string;
};

export const App = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>({});
  const [editTask, setEditTask] = useState<Task>();
  const [log, setLog] = useState<LogEntry[]>([]);

  const deleteTask = (task: Task) =>
    setTasks(({ [task.id]: _, ...tasks }) => tasks);

  const saveTask = (task: Task) => {
    setTasks((tasks) => {
      return { ...tasks, [task.id]: task };
    });
    setEditTask(undefined);
  };

  const logTask = (task: Task) => {
    const dueDate =
      task.interval !== null
        ? dayjs(task.dueDate ?? undefined)
            .add(task.interval, "days")
            .format("YYYY-MM-DD")
        : null;

    saveTask({ ...task, dueDate });

    const logEntry: LogEntry = {
      id: crypto.randomUUID(),
      title: task.title,
      date: dayjs().format("YYYY-MM-DD"),
      taskId: task.id,
    };
    setLog((prev) => [...prev, logEntry]);
  };

  return (
    <div>
      <h1>Recur</h1>
      <h2>Tasks:</h2>
      <ul>
        {Object.values(tasks)
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
      <hr></hr>
      {editTask ? (
        <TaskForm task={editTask} saveTask={saveTask} />
      ) : (
        <button
          onClick={() =>
            setEditTask({ ...defaultTask, id: crypto.randomUUID() })
          }
        >
          New task
        </button>
      )}
      <hr></hr>
      <h2>Log</h2>
      <ul>
        {log.map((entry) => (
          <li key={entry.id}>
            {entry.title} {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
};
