import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getTask, updateTask } from "../../utils/idb";
import { DBTask, defaultTask } from "../../utils/task";
import { TaskForm } from "../../components/TaskForm/TaskForm";
import style from "./EditTaskPage.module.css";

export const EditTaskPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const taskId = params["taskId"];
  const [task, setTask] = useState<DBTask | undefined>(
    taskId ? undefined : defaultTask()
  );

  useEffect(() => {
    if (taskId) {
      getTask(taskId).then(setTask);
    }
  }, [taskId]);

  const saveTask = (updatedTask: DBTask) => {
    updateTask(updatedTask).then(() => {
      navigate("..");
    });
  };

  if (!task) return "Loading";

  return (
    <div className={style.editTaskPage}>
      <TaskForm
        task={task}
        saveTask={saveTask}
        existingTask={Boolean(taskId)}
      />
    </div>
  );
};
