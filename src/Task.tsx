import { FC } from "react";

export type Task = {
  id: string;
  title: string;
  dueDate: string | null;
  interval: number | null;
};

type Props = {
  task: Task;
  logTask: (task: Task) => void;
  editTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TaskComponent: FC<Props> = ({
  logTask,
  editTask,
  deleteTask,
  task,
}) => {
  return (
    <li>
      {task.title} Due {task.dueDate}
      <button onClick={() => logTask(task)}>Log</button>
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
};
