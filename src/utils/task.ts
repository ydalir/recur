import dayjs from "dayjs";
import { formatDate, today } from "./date";

type BaseTask = {
  id: string;
  title: string;
  interval: number | null;
};

export type DBTask = {
  dueDate: string | null;
} & BaseTask;

export type Task = {
  dueDate: dayjs.Dayjs | null;
} & BaseTask;

export const toDBTask = (task: Task): DBTask => {
  return {
    ...task,
    dueDate: task.dueDate === null ? null : formatDate(task.dueDate),
  };
};

export const toTask = (dbTask: DBTask): Task => {
  return {
    ...dbTask,
    dueDate: dbTask.dueDate === null ? null : dayjs(dbTask.dueDate),
  };
};

export const updateDueDate = (task: Task): Task => {
  if (task.interval === null) return { ...task, dueDate: null };

  const dueDate = task.dueDate ?? today();

  return { ...task, dueDate: dueDate.add(task.interval, "days") };
};

export const defaultTask = (): DBTask => ({
  title: "",
  id: crypto.randomUUID(),
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
});
