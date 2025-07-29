import { clsNames } from "../../../utils/helper";
import styles from "./Action.module.scss";

export const Action = ({
  classname,
  icon,
  size = "2.5",
  onClick = () => {},
}) => {
  return (
    <div
      className={clsNames(styles.action, classname)}
      style={{ height: `${size}rem`, width: `${size}rem` }}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};
