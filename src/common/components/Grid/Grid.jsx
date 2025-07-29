import { Children } from "react";
import { clsNames } from "../../../utils/helper";
import styles from "./Grid.module.scss";

export const Grid = ({ className, children, repeat = false, gap }) => {
  return (
    <div
      className={clsNames(styles.grid, repeat ? styles.repeat : "", className)}
      style={{ gap: gap ? `${gap}rem` : "" }}
    >
      {children}
    </div>
  );
};

export const GridRow = ({ className, children }) => {
  const numColumns = Children.count(children) || 1;
  const repeatValue = `repeat(${numColumns}, 1fr)`;

  return (
    <div
      className={clsNames(styles.grid, className)}
      style={{ gridTemplateColumns: repeatValue }}
    >
      {children}
    </div>
  );
};
