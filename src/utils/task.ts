import dayjs from "dayjs";
import { formatDate } from "./date";

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

export const toTask = (task: DBTask): Task => {
  return {
    ...task,
    dueDate: task.dueDate === null ? null : dayjs(task.dueDate),
  };
};

export const defaultTask = (): DBTask => ({
  title: "",
  id: crypto.randomUUID(),
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
});
