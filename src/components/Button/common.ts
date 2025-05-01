import style from "./Button.module.css";

type Variant = "primary" | "secondary";

export type ButtonProps = {
  variant?: Variant;
};

export const getVariantStyle = (variant: Variant) => {
  switch (variant) {
    case "primary":
      return style.primary;
    case "secondary":
      return style.secondary;
  }
};
