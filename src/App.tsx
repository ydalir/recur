import { Task, TaskComponent } from "./Task";
import { TaskForm } from "./TaskForm";
import { useState } from "react";

const defaultTask: Omit<Task, "id"> = { name: "" };

export const App = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>({});
  const [editTask, setEditTask] = useState<Task>();

  const deleteTask = (task: Task) =>
    setTasks(({ [task.id]: _, ...tasks }) => tasks);

  const saveTask = (task: Task) => {
    setTasks((tasks) => {
      return { ...tasks, [task.id]: task };
    });
    setEditTask(undefined);
  };

  return (
    <div>
      <h1>Recur</h1>
      <h2>Tasks:</h2>
      <ul>
        {Object.values(tasks).map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
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
    </div>
  );
};
