import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router";
import style from "./Button.module.css";
import { ButtonProps, getVariantStyle } from "./common";

type Props = ButtonProps & Parameters<typeof Link>[0];

export const LinkButton: FC<Props> = ({
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <Link
      className={clsx(
        style.button,
        getVariantStyle(variant),
        style.linkButton,
        className
      )}
      {...props}
    />
  );
};
