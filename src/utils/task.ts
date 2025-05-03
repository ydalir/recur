import dayjs from "dayjs";
import { formatDate } from "./date";

type BaseTask = {
  id: string;
  title: string;
  interval: number | null;
  oneOff: boolean | undefined;
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

export const updateDueDate = (task: Task, date: string): Task => {
  if (task.interval === null) return { ...task, dueDate: null };

  const offsetLogDate = dayjs(date).add(task.interval, "days");

  if (!task.dueDate) return { ...task, dueDate: offsetLogDate };

  return {
    ...task,
    dueDate: task.dueDate.isAfter(offsetLogDate, "days")
      ? task.dueDate
      : offsetLogDate,
  };
};

export const defaultTask = (): DBTask => ({
  title: "",
  id: crypto.randomUUID(),
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
  oneOff: false,
});
