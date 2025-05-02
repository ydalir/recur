import { get, update } from "idb-keyval";
import { DBTask, Task, toDBTask, updateDueDate } from "./task";
import { LogEntry } from "./logEntry";
import dayjs from "dayjs";

const tasksKey = "TASKS" as const;
const entriesKey = "ENTRIES" as const;

export const getTasks = async (): Promise<Record<string, DBTask>> => {
  return get(tasksKey).then((tasks) => tasks ?? {});
};

export const getTask = async (key: string): Promise<DBTask> => {
  const tasks = await getTasks();
  const task = tasks[key];
  if (!task) throw "Task not found";
  return task;
};

export const updateTask = async (task: DBTask) => {
  await update<Record<string, DBTask>>(tasksKey, (tasks) => {
    return { ...tasks, [task.id]: task };
  });
};

export const deleteTask = async (taskId: string) => {
  await update<Record<string, DBTask>>(tasksKey, (tasks) => {
    if (!tasks) return {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [taskId]: _, ...rest } = tasks;

    return rest;
  });
};

export const getEntry = async (id: string): Promise<LogEntry | null> => {
  const entries = await getEntries();
  return entries.find((entry) => entry.id === id) ?? null;
};

const getEntries = async (): Promise<LogEntry[]> => {
  return get(entriesKey).then((entries) => entries ?? []);
};

export const getEntriesForDate = async (
  date: dayjs.Dayjs
): Promise<LogEntry[]> => {
  const entries = await getEntries();
  const dateString = date.format("YYYY-MM-DD");
  return entries.filter((entry) => entry.date === dateString);
};

export const addEntry = async (entry: LogEntry, task: Task) => {
  await update<LogEntry[]>(entriesKey, (entries) => [
    ...(entries ?? []),
    entry,
  ]);

  const dbTask = toDBTask(updateDueDate(task));

  await updateTask(dbTask);
};

export const deleteEntry = async (id: string) => {
  await update<LogEntry[]>(entriesKey, (entries) =>
    (entries ?? []).filter((entry) => entry.id !== id)
  );
};
