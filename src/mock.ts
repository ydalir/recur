import dayjs, { Dayjs } from "dayjs";
import { Task } from "./Task";

const formatDay = (day: Dayjs) => day.format("YYYY-MM-DD");

const generateTask = (partialTask: Omit<Task, "id">): Task => {
  return { ...partialTask, id: crypto.randomUUID() };
};

const mockTasks: Task[] = [
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

export const mockTaskRecord: Record<string, Task> = mockTasks.reduce((acc, task) => {
  return { ...acc, [task.id]: task };
}, {});
