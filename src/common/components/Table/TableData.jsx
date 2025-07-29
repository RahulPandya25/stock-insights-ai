import { useEffect, useRef, useState } from "react";
import { clsNames } from "../../../utils/helper";
import styles from "./Table.module.scss";
import { TextInput } from "../TextInput/TextInput";

export const TableData = ({
  className,
  children,
  onValueChange,
  isMutable,
  isEdited,
}) => {
  const canEdit = isMutable && !!onValueChange;
  const value = children;

  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode) {
      inputRef.current?.focus();
    }
  }, [editMode]);

  return (
    <td
      className={clsNames(
        styles.cell,
        canEdit ? styles.mutable : "",
        isEdited ? styles.updated : "",
        className
      )}
      onClick={() => {
        if (canEdit && !editMode) {
          setEditMode(true);
        }
      }}
      onBlur={() => {
        if (editMode) {
          setEditMode(false);
        }
      }}
    >
      {editMode ? (
        <TextInput ref={inputRef} value={value} onChange={onValueChange} />
      ) : (
        <>{value}</>
      )}
    </td>
  );
};
