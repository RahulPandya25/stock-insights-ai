import React from "react";
import { clsNames } from "../../../utils/helper";
import styles from "./Table.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";
import { Flex } from "../Flex/Flex";
import { TextInput } from "../TextInput/TextInput";
import { Label } from "../Label/Label";
import { Button } from "../Button/Button";
import { Action } from "../Action/Action";
import { MdSaveAlt } from "react-icons/md";
import { useTableState } from "./useTableState";
import { TableData } from "./TableData";

export const Table = ({
  className,
  header = [],
  data = [],
  caption,
  // user actions
  rowActions = [],
  selectRowsActions = [],
  // table mutablility
  immutableCols = [],
  onTableCommit,
  onSaveNewRow,
  // show message overlay
  loadingMessage,
}) => {
  const isTableMutable = !!onTableCommit;
  const canAddNewRow = !!onSaveNewRow;

  const {
    tableData,
    rowSelectorActions: { selectedRows, selectRow, deselectRow },
    rowUpdatorActions: { updatedRows, setTableCellValue },
    newRowActions: {
      newRowDirty,
      newRowData,
      newRowDataError,
      setNewRowFieldValue,
      saveNewRow,
    },
  } = useTableState({
    data,
    header,
    immutableCols,
    onSaveNewRow,
  });

  return (
    <>
      <Flex gap={"1"} className={styles.tableActions}>
        <>
          {selectRowsActions.length > 0 &&
            selectRowsActions.map((rowAction, actionIndex) => {
              const handleOnClick = rowAction.props.onClick || (() => {});
              const filteredRows = tableData.filter((_, rIndex) =>
                selectedRows.includes(rIndex)
              );
              return React.cloneElement(rowAction, {
                key: actionIndex,
                onClick: () => handleOnClick(filteredRows),
                disabled: selectedRows.length === 0 || loadingMessage,
              });
            })}
        </>
        {(isTableMutable || canAddNewRow) && (
          <Button
            className={styles.saveChanges}
            disabled={
              (updatedRows.length === 0 && !newRowDirty) || loadingMessage
            }
            onClick={() => {
              if (isTableMutable && updatedRows.length !== 0) {
                onTableCommit(
                  tableData.filter((_, rIndex) => updatedRows.includes(rIndex))
                );
              }
              if (canAddNewRow && newRowDirty) {
                saveNewRow();
              }
            }}
            primary
          >
            Save Changes
          </Button>
        )}
      </Flex>
      <table className={clsNames(styles.table, className)}>
        {loadingMessage && (
          <tr className={styles.loadingMessage}>
            <td>{loadingMessage}</td>
          </tr>
        )}
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            {selectRowsActions.length > 0 && <th />}
            {header.map((column, cIndex) => {
              return (
                <th
                  key={cIndex}
                  className={clsNames(styles.cell, styles.header)}
                >
                  <Label
                    label={column}
                    required={immutableCols.includes(column)}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {tableData.map((row, rIndex) => {
            return (
              <tr
                key={rIndex}
                className={clsNames(
                  styles.tableRow,
                  selectedRows.includes(rIndex) ? styles.selected : ""
                )}
              >
                {selectRowsActions.length > 0 && (
                  <TableData
                    className={clsNames(
                      styles.rowActions,
                      styles.checkboxContainer
                    )}
                  >
                    <Checkbox
                      className={styles.action}
                      onCheck={(val) => {
                        if (val) {
                          selectRow(rIndex);
                        } else {
                          deselectRow(rIndex);
                        }
                      }}
                    />
                  </TableData>
                )}

                {header.map((column, cIndex) => {
                  return (
                    <TableData
                      key={rIndex + "-" + cIndex}
                      className={clsNames(
                        immutableCols.includes(column)
                          ? styles.immutable
                          : styles.mutable
                      )}
                      onValueChange={(val) =>
                        setTableCellValue(rIndex, column, val)
                      }
                      isMutable={
                        isTableMutable && !immutableCols.includes(column)
                      }
                      isEdited={row[column] !== data[rIndex]?.[column]}
                    >
                      {row[column]}
                    </TableData>
                  );
                })}

                {rowActions.length > 0 && (
                  <TableData className={styles.rowActions}>
                    {rowActions.map((rowAction, raIndex) => {
                      const handleOnClick =
                        rowAction.props.onClick || (() => {});
                      const cloneElement = React.cloneElement(rowAction, {
                        key: raIndex,
                        onClick: () => handleOnClick(row),
                      });
                      return (
                        <div key={raIndex} className={styles.action}>
                          {cloneElement}
                        </div>
                      );
                    })}
                  </TableData>
                )}
              </tr>
            );
          })}
          {canAddNewRow && (
            <tr className={styles.tableRow}>
              {selectRowsActions.length > 0 && <TableData />}
              {header.map((column, cIndex) => {
                return (
                  <TableData
                    key={cIndex}
                    className={clsNames(
                      styles.newRow,
                      immutableCols.includes(column)
                        ? styles.immutable
                        : styles.mutable,
                      !!newRowData[column] && styles.updated
                    )}
                  >
                    <TextInput
                      value={newRowData[column]}
                      onChange={(val) => setNewRowFieldValue(column, val)}
                      errorMessage={newRowDataError[column]}
                      required={newRowDataError[column]}
                    />
                  </TableData>
                );
              })}

              <TableData className={styles.rowActions}>
                <div className={clsNames(styles.action, styles.toEnd)}>
                  <Action icon={<MdSaveAlt />} onClick={saveNewRow} />
                </div>
              </TableData>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
