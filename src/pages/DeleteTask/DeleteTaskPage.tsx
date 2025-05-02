import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteTask, getTask } from "../../utils/idb";
import style from "./DeleteTaskPage.module.css";
import { Button } from "../../components/Button/Button";
import { LinkButton } from "../../components/Button/LinkButton";
import { DBTask } from "../../utils/task";

export const DeleteTaskPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<DBTask | null>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!taskId) return;

    getTask(taskId).then(setTask);
  }, [taskId]);

  if (task === undefined) return <div>Loading</div>;
  if (task === null) return <div>Task not found</div>;

  return (
    <div className={style.deleteTaskPage}>
      <span>
        Delete task <br></br>"{task.title}"?
      </span>
      <div className={style.buttonsContainer}>
        <Button
          variant="warning"
          onClick={() => {
            deleteTask(task.id).then(() => navigate({ pathname: ".." }));
          }}
        >
          Delete
        </Button>
        <LinkButton to={{ pathname: `../edit/${task.id}` }} variant="secondary">
          Cancel
        </LinkButton>
      </div>
    </div>
  );
};
