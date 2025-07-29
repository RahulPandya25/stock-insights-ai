import { clsNames } from "../../../utils/helper";
import styles from "./Title.module.scss";

export const Title = ({
  className,
  children,
  underline = false,
  spaceBetween = false,
}) => {
  return (
    <div
      className={clsNames(
        styles.title,
        spaceBetween ? styles.spaceBetween : "",
        underline ? styles.underline : "",
        className
      )}
    >
      {children}
    </div>
  );
};
