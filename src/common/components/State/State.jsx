import { clsNames } from "../../../utils/helper";
import styles from "./State.module.scss";

export const State = ({ className, value }) => {
  if (!value) {
    return <></>;
  }

  const classes = clsNames(
    styles.state,
    styles[value.toLowerCase()],
    className
  );

  return <span className={classes}>{value}</span>;
};
