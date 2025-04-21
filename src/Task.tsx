import { FC } from "react";

export type Task = {
  id: string;
  name: string;
};

type Props = {
  task: Task;
  editTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TaskComponent: FC<Props> = ({ editTask, deleteTask, task }) => {
  return (
    <li>
      {task.name} <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
};
