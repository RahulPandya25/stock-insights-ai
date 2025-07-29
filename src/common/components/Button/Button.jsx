import { clsNames } from "../../../utils/helper";
import styles from "./Button.module.scss";

export const Button = ({
  className,
  children,
  disabled,
  onClick,
  title,
  primary = false,
  secondary = false,
}) => {
  const classes = clsNames(
    styles.button,
    secondary ? styles.secondary : "",
    primary ? styles.primary : "",
    className
  );
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};
