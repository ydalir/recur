import { FC } from "react";

export type Task = {
  id: string;
  title: string;
  dueDate: string;
  interval: number | null;
};

type Props = {
  task: Task;
  editTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TaskComponent: FC<Props> = ({ editTask, deleteTask, task }) => {
  return (
    <li>
      {task.title} <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
};
