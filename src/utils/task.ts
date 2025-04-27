import dayjs from "dayjs";

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

export const defaultTask = (): DBTask => ({
  title: "",
  id: crypto.randomUUID(),
  dueDate: dayjs().format("YYYY-MM-DD"),
  interval: null,
});
