import { FC, useState } from "react";
import { Task } from "./Task";
import dayjs from "dayjs";

type Props = {
  task: Task;
  saveTask: (task: Task) => void;
};

export const TaskForm: FC<Props> = ({ task, saveTask }) => {
  const [title, setTitle] = useState(task.title);

  const [dueDate, setDueDate] = useState<string>(task.dueDate ?? "");
  const [interval, setInterval] = useState<string>(
    task.interval?.toString() ?? ""
  );

  return (
    <div>
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due"
      />
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        placeholder="Interval"
      />
      <button
        onClick={() => {
          const intervalNumber = Number(interval);
          const isNumber = interval !== "" && !isNaN(intervalNumber);

          const isValidDate = dayjs(dueDate).isValid();

          saveTask({
            id: task.id,
            title,
            dueDate: isValidDate ? dueDate : null,
            interval: isNumber ? intervalNumber : null,
          });
        }}
      >
        Save
      </button>
    </div>
  );
};
