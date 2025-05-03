import { FC, useState } from "react";
import { DBTask } from "../../utils/task";
import dayjs from "dayjs";
import { LinkButton } from "../Button/LinkButton";
import style from "./TaskForm.module.css";
import { Button } from "../Button/Button";

type Props = {
  task: DBTask;
  saveTask: (task: DBTask) => void;
  existingTask: boolean;
};

export const TaskForm: FC<Props> = ({ task, saveTask, existingTask }) => {
  const [title, setTitle] = useState(task.title);

  const [dueDate, setDueDate] = useState<string>(task.dueDate ?? "");
  const [interval, setInterval] = useState<string>(
    task.interval?.toString() ?? ""
  );
  const [oneOff, setOneOff] = useState<boolean>(Boolean(task.oneOff));
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
        One-off
        <input
          type="checkbox"
          checked={oneOff}
          onChange={() => setOneOff((prev) => !prev)}
        />
      </label>
      {!oneOff && (
        <label>
          Interval
          <span className={style.intervalInputs}>
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
      )}
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
              oneOff,
            });
          }}
        >
          Save
        </Button>

        {existingTask && (
          <LinkButton to={`../delete/${task.id}`} variant="warning">
            Delete
          </LinkButton>
        )}
      </div>
      <LinkButton to={".."} variant="secondary">
        Cancel
      </LinkButton>
    </div>
  );
};
