import { clsNames } from "../../../utils/helper";
import styles from "./Page.module.scss";

export const Page = ({ className, children }) => {
  return (
    <div className={clsNames(styles.container, className)}>{children}</div>
  );
};
