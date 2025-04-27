import dayjs, { Dayjs } from "dayjs";
import { DBTask } from "./task";

const formatDay = (day: Dayjs) => day.format("YYYY-MM-DD");

const generateTask = (partialTask: Omit<DBTask, "id">): DBTask => {
  return { ...partialTask, id: crypto.randomUUID() };
};

const mockTasks: DBTask[] = [
  generateTask({
    dueDate: formatDay(dayjs()),
    interval: 1,
    title: "Daily task",
  }),
  generateTask({
    dueDate: formatDay(dayjs().add(2, "days")),
    interval: 1,
    title: "Future task",
  }),
  generateTask({
    dueDate: formatDay(dayjs().add(-2, "days")),
    interval: 1,
    title: "Past task",
  }),
  generateTask({
    dueDate: formatDay(dayjs().add(-2, "days")),
    interval: null,
    title: "One-off",
  }),
  generateTask({
    dueDate: null,
    interval: null,
    title: "Finished task",
  }),
];

export const mockTaskRecord: Record<string, DBTask> = mockTasks.reduce((acc, task) => {
  return { ...acc, [task.id]: task };
}, {});
