import { FC } from "react";
import { Task } from "../../utils/task";
import style from "./Task.module.css";
import { Dayjs } from "dayjs";
import clsx from "clsx";
import { Button } from "../Button/Button";
import { today } from "../../utils/date";
import { LinkButton } from "../Button/LinkButton";

type Props = {
  task: Task;
};

const formatDueDate = (date: Dayjs | null): [string, string | undefined] => {
  if (date === null) return ["No due date", style.dueNever];
  const now = today();

  if (date.isBefore(now, "day") || date.isSame(now, "day"))
    return ["Due now", style.dueNow];

  const diff = date.diff(now, "days");

  if (diff === 1) return ["Due in 1 day", style.dueLater];

  return [`Due in ${diff} days`, style.dueLater];
};

const formatInterval = (interval: number | null) => {
  if (interval === null) return "never";
  if (interval === 0) return "immediately";
  if (interval === 1) return "1 day";
  return `${interval} days`;
};

export const TaskComponent: FC<Props> = ({ task }) => {
  const recurs = formatInterval(task.interval);

  const [text, dueStyle] = formatDueDate(task.dueDate);

  return (
    <LinkButton to={`edit/${task.id}`} className={style.task}>
      <span>{task.title}</span>
      <div className={style.dueInfoContainer}>
        <span className={clsx(style.due, dueStyle)}>{text}</span>
        <span>⟲ {recurs}</span>
      </div>
    </LinkButton>
  );
};

export const TaskButton: FC<Props & { onClick: () => void }> = ({
  task,
  onClick,
}) => {
  const [, dueStyle] = formatDueDate(task.dueDate);
  return (
    <Button className={style.taskButton} onClick={onClick}>
      <span>{task.title}</span>
      <div className={style.dueInfoContainer}>
        <span className={clsx(style.due, dueStyle)}></span>
      </div>
    </Button>
  );
};
