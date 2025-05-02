import { FC, useState } from "react";
import { DBTask } from "../../utils/task";
import dayjs from "dayjs";
import { LinkButton } from "../Button/LinkButton";
import style from "./TaskForm.module.css";
import { Button } from "../Button/Button";

type Props = {
  task: DBTask;
  saveTask: (task: DBTask) => void;
};

export const TaskForm: FC<Props> = ({ task, saveTask }) => {
  const [title, setTitle] = useState(task.title);

  const [dueDate, setDueDate] = useState<string>(task.dueDate ?? "");
  const [interval, setInterval] = useState<string>(
    task.interval?.toString() ?? ""
  );
  const [shouldRecur, setShouldRecur] = useState<boolean>(interval !== "");

  return (
    <div className={style.taskForm}>
      <label>
        Title
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="..."
        />
      </label>
      <label>
        Due date
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </label>
      <label>
        Interval
        <span>
          <input
            type="number"
            value={shouldRecur ? interval : ""}
            onChange={(e) => {
              if (e.target.value === "") setShouldRecur(false);
              else setShouldRecur(true);

              setInterval(e.target.value);
            }}
            placeholder="Never"
          />
          <input
            type="checkbox"
            checked={shouldRecur}
            onChange={() => setShouldRecur((prev) => !prev)}
          />
        </span>
      </label>
      <div className={style.buttonsContainer}>
        <Button
          variant="success"
          onClick={() => {
            const intervalNumber = Number(interval);
            const isNumber = interval !== "" && !isNaN(intervalNumber);

            const isValidDate = dayjs(dueDate).isValid();

            saveTask({
              id: task.id,
              title,
              dueDate: isValidDate ? dueDate : null,
              interval: isNumber && shouldRecur ? intervalNumber : null,
            });
          }}
        >
          Save
        </Button>
        <LinkButton to={".."} variant="secondary">
          Cancel
        </LinkButton>
      </div>
    </div>
  );
};
