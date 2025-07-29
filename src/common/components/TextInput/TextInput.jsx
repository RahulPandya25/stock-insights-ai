import { clsNames } from "../../../utils/helper";
import { Flex } from "../Flex/Flex";
import styles from "./TextInput.module.scss";

export const TextInput = ({
  className,
  ref,
  field,
  value,
  onChange = () => {},
  required = false,
  disabled = false,
  errorMessage = "",
}) => {
  const classes = clsNames(
    styles.input,
    required && value === "" ? styles.required : "",
    className
  );

  return (
    <Flex column>
      <input
        ref={ref}
        className={classes}
        name={field}
        id={field}
        type="text"
        required={required || !!errorMessage}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </Flex>
  );
};
