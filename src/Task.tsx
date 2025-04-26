import dayjs from "dayjs";
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
  const dueDate = dayjs(task.dueDate);
  const notDue = dueDate.isAfter(dayjs(), "day");

  return (
    <li>
      {task.title}
      {notDue && <> Due in {dueDate.diff(dayjs(), "days")} days</>}
      {task.dueDate === null && " Completed"}
      <button onClick={() => logTask(task)}>Log</button>
      <button onClick={() => editTask(task)}>Edit</button>
      <button onClick={() => deleteTask(task)}>Delete</button>
    </li>
  );
};
