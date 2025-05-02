import { FC } from "react";
import { LogEntry } from "../../utils/logEntry";
import style from "./Entry.module.css";
import { Link } from "react-router";

type Props = {
  entry: LogEntry;
};

export const EntryComponent: FC<Props> = ({ entry }) => {
  return (
    <span className={style.entry}>
      <span>»</span>
      <span>{entry.title}</span>
      <Link to="." className={style.cross}>
        x
      </Link>
    </span>
  );
};
