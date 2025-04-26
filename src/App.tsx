import dayjs from "dayjs";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { mockTaskRecord } from "./mock";
import { TasksPage } from "./pages/Tasks/TasksPage";

type LogEntry = {
  id: string;
  title: string;
  date: string;
  taskId: string;
};

type TaskView = {
  name: "tasks";
};

type LogView = {
  name: "log";
};

type EditView = {
  name: "edit";
  task: Task;
};

export type View = TaskView | LogView | EditView;

export const App = () => {
  const [view, setView] = useState<View>({ name: "log" });

  const [tasks, setTasks] = useState<Record<string, Task>>(mockTaskRecord);
  const setEditTask = (task: Task) => {
    setView({ name: "edit", task });
  };
  const [log, setLog] = useState<LogEntry[]>([]);
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

  const deleteTask = (task: Task) =>
    setTasks(({ [task.id]: _, ...tasks }) => tasks);

  const saveTask = (task: Task) => {
    setTasks((tasks) => {
      return { ...tasks, [task.id]: task };
    });
    setView({ name: "tasks" });
  };

  const editTask = (task: Task) => {
    setTasks((tasks) => {
      return { ...tasks, [task.id]: task };
    });
  };

  const logTask = (task: Task) => {
    const logEntry: LogEntry = {
      id: crypto.randomUUID(),
      title: task.title,
      date: date.format("YYYY-MM-DD"),
      taskId: task.id,
    };
    setLog((prev) => [...prev, logEntry]);

    if (task.interval === null) return editTask({ ...task, dueDate: null });

    if (task.dueDate === null)
      return editTask({
        ...task,
        dueDate: date.add(task.interval, "days").format("YYYY-MM-DD"),
      });

    const dueDate = dayjs(task.dueDate);
    const pickedDate = date.add(task.interval, "days");

    if (pickedDate.isAfter(dueDate))
      return editTask({ ...task, dueDate: pickedDate.format("YYYY-MM-DD") });
  };

  return (
    <div>
      <h1>Recur</h1>
      {view.name === "log" && (
        <>
          <div>
            <button onClick={() => setView({ name: "log" })}>Log</button>
            <button onClick={() => setView({ name: "tasks" })}>Tasks</button>
          </div>
          <h2>Log</h2>
          <DatePicker date={date} setDate={setDate} />
          <ul>
            {log.map((entry) => (
              <li key={entry.id}>
                {entry.title} {entry.date}
              </li>
            ))}
          </ul>
        </>
      )}
      {view.name === "tasks" && (
        <>
          <div>
            <button onClick={() => setView({ name: "log" })}>Log</button>
            <button onClick={() => setView({ name: "tasks" })}>Tasks</button>
          </div>
          <TasksPage
            tasks={Object.values(tasks)}
            logTask={logTask}
            setEditTask={setEditTask}
            deleteTask={deleteTask}
          />
        </>
      )}
      {view.name === "edit" && (
        <TaskForm task={view.task} saveTask={saveTask} />
      )}
    </div>
  );
};
