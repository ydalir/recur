import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "../../utils/date";
import { useEffect, useState } from "react";
import { DBTask } from "../../utils/task";
import { addEntry, getTasks } from "../../utils/idb";

export const AddEntryPage = () => {
  const params = useParams();
  const date = dayjs(params["date"]);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<DBTask[]>([]);
  useEffect(() => {
    getTasks().then((tasks) => {
      setTasks(Object.values(tasks));
    });
  }, []);

  return (
    <div>
      {formatDate(date)}
      {tasks.map((task) => (
        <div key={task.id}>
          <button
            onClick={() => {
              addEntry({
                date: formatDate(date),
                id: crypto.randomUUID(),
                taskId: task.id,
                title: task.title,
              }).then(() => {
                navigate({ pathname: "/", hash: formatDate(date) });
              });
            }}
          >
            {task.title}
          </button>
        </div>
      ))}
    </div>
  );
};
