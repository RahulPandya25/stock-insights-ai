import { clsNames } from "../../../utils/helper";
import styles from "./Label.module.scss";

export const Label = ({
  className,
  label = "",
  children,
  columnWise = false,
  required = false,
}) => {
  return (
    <div
      className={clsNames(
        styles.label,
        columnWise ? styles.columnWise : "",
        className
      )}
    >
      {label && (
        <span className={clsNames(styles.key, required ? styles.required : "")}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
};
