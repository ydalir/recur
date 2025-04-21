import { FC, useState } from "react";
import { Task } from "./Task";

type Props = {
  task: Task;
  saveTask: (task: Task) => void;
};

export const TaskForm: FC<Props> = ({ task, saveTask }) => {
  const [name, setName] = useState(task.name);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => saveTask({ id: task.id, name })}>Save</button>
    </div>
  );
};
