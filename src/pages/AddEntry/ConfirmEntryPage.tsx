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

  const dueDateText = task.oneOff
    ? "This is a one-off task and will be removed"
    : newDueDate !== null
    ? formatDate(newDueDate)
    : "This task does not recur";

  return (
    <div className={style.confirmEntryPage}>
      <div>
        Task:
        <br></br>"{task.title}"
      </div>
      <div>
        Date:
        <br></br>
        {date}
      </div>
      <div>
        Due next:
        <br></br>
        {dueDateText}
      </div>
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
        Confirm
      </Button>
      <LinkButton to=".." variant="secondary">
        Cancel
      </LinkButton>
    </div>
  );
};
