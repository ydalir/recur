import clsx from "clsx";
import { FC, HTMLAttributes } from "react";
import style from "./Button.module.css";
import { ButtonProps, getVariantStyle } from "./common";

type Props = ButtonProps & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  className,
  variant = "primary",
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(style.button, getVariantStyle(variant), className)}
      {...props}
    >
      {children}
    </button>
  );
};
