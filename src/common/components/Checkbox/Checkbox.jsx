import { useState } from "react";
import styles from "./Checkbox.module.scss";
import { clsNames } from "../../../utils/helper";
import { Flex } from "../Flex/Flex";

export const Checkbox = ({
  className,
  onCheck = () => {},
  checked = false,
  size = "1.25",
  containerSize = "2.5",
}) => {
  const [isChecked, setChecked] = useState(checked);

  return (
    <Flex
      center
      className={clsNames(styles.container, className)}
      style={{ height: `${containerSize}rem`, width: `${containerSize}rem` }}
    >
      <input
        className={styles.checkbox}
        style={{ height: `${size}rem`, width: `${size}rem` }}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newVal = !isChecked;
          setChecked(newVal);
          onCheck(newVal);
        }}
      />
    </Flex>
  );
};
