import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { LinkButton } from "../../components/Button/LinkButton";
import style from "./AddEntryPage.module.css";
import { Task, toTask, updateDueDate } from "../../utils/task";
import { addEntry, getTask } from "../../utils/idb";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../../utils/date";

export const ConfirmEntryPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const taskId = params["taskId"];
  const date = params["date"];
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then((dbTask) => setTask(toTask(dbTask)));
    }
  }, [taskId]);

  if (!task || !date) return "One sec";

  const { dueDate: newDueDate } = updateDueDate(task, date);

  const dueDateText =
    newDueDate !== null ? formatDate(newDueDate) : "Does not recur";

  return (
    <div className={style.confirmEntryPage}>
      Task
      <div>{task.title}</div>
      Date
      <div>{date}</div>
      Next due date
      {task.oneOff ? (
        <div>This is a one-off task and will be removed</div>
      ) : (
        <div>{dueDateText}</div>
      )}
      <div>
        <Button
          variant="success"
          onClick={() => {
            addEntry(
              {
                date: date,
                id: crypto.randomUUID(),
                taskId: task.id,
                title: task.title,
              },
              task
            ).then(() => {
              navigate("..");
            });
          }}
        >
          Log task
        </Button>
        <LinkButton to=".." variant="secondary">
          Cancel
        </LinkButton>
      </div>
    </div>
  );
};
