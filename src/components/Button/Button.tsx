import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import style from "./Button.module.css";

type Props = {} & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ className, children, ...props }) => {
  return (
    <button className={clsx(style.button, className)} {...props}>
      {children}
    </button>
  );
};
