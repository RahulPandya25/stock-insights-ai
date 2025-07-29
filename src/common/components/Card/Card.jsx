import { clsNames } from "../../../utils/helper";
import styles from "./Card.module.scss";

export const Card = ({
  className,
  children,
  onClick,
  raiseOnHover = false,
}) => {
  const classes = clsNames(
    styles.card,
    raiseOnHover ? styles.raiseOnHover : "",
    onClick ? styles.clickable : "",
    className
  );
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
