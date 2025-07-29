import { clsNames } from "../../../utils/helper";

import styles from "./Flex.module.scss";

export const Flex = ({
  className,
  children,
  gap,
  row = false,
  column = false,
  center = false,
  justifyContent = "",
  alignItems = "",
  wrap = false,
}) => {
  return (
    <div
      className={clsNames(
        styles.flex,
        row ? styles.row : "",
        column ? styles.column : "",
        className
      )}
      style={{
        gap: gap ? `${gap}rem` : "",
        flexWrap: wrap ? "wrap" : "",
        alignItems: center ? "center" : alignItems,
        justifyContent: center ? "center" : justifyContent,
      }}
    >
      {children}
    </div>
  );
};
