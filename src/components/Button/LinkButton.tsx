import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router";
import style from "./Button.module.css";

type Props = {} & Parameters<typeof Link>[0];

export const LinkButton: FC<Props> = ({ className, ...props }) => {
  return (
    <Link
      className={clsx(style.button, style.linkButton, className)}
      {...props}
    />
  );
};
