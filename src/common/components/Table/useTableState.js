import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";

const useRowSelectorActions = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const selectRow = (rIndex) => {
    if (!selectedRows.includes(rIndex)) {
      setSelectedRows([...selectedRows, rIndex]);
    }
  };
  const deselectRow = (rIndex) => {
    setSelectedRows(selectedRows.filter((r) => r !== rIndex));
  };
  return {
    selectedRows,
    setSelectedRows,
    selectRow,
    deselectRow,
  };
};

const useRowUpdatorActions = (data, tableData, setTableData) => {
  const [updatedRows, setUpdatedRows] = useState([]);

  const setTableCellValue = (rIndex, cIndex, val) => {
    const isMatch = val === data[rIndex][cIndex];

    // add or remove from updated rows
    if (!updatedRows.includes(rIndex) && !isMatch) {
      setUpdatedRows([...updatedRows, rIndex]);
    } else if (updatedRows.includes(rIndex) && isMatch) {
      setUpdatedRows(updatedRows.filter((r) => r !== rIndex));
    }

    const newTableData = [...tableData];
    newTableData[rIndex][cIndex] = val;
    setTableData(newTableData);
  };
  return {
    updatedRows,
    setUpdatedRows,
    setTableCellValue,
  };
};

const useNewRowActions = (header, immutableCols, onSaveNewRow) => {
  const {
    formFields,
    formFieldsError,
    setFieldValue,
    validateForm,
    resetForm,
    isDirty,
  } = useForm(header, immutableCols);

  const handleSaveNewRow = () => {
    if (validateForm()) {
      onSaveNewRow(formFields);
      resetForm();
    }
  };

  return {
    newRowDirty: isDirty,
    saveNewRow: handleSaveNewRow,
    newRowData: formFields,
    newRowDataError: formFieldsError,
    setNewRowFieldValue: setFieldValue,
  };
};

export const useTableState = ({
  data,
  header,
  immutableCols,
  onSaveNewRow,
}) => {
  const stringifiedData = JSON.stringify(data);
  const [tableData, setTableData] = useState(JSON.parse(stringifiedData));

  const { selectedRows, setSelectedRows, selectRow, deselectRow } =
    useRowSelectorActions();
  const { isTableMutable, updatedRows, setUpdatedRows, setTableCellValue } =
    useRowUpdatorActions(data, tableData, setTableData);
  const {
    newRowDirty,
    saveNewRow,
    newRowData,
    newRowDataError,
    setNewRowFieldValue,
  } = useNewRowActions(header, immutableCols, onSaveNewRow);

  useEffect(() => {
    setTableData(JSON.parse(stringifiedData));
    // clear states
    setUpdatedRows([]);
    setSelectedRows([]);
  }, [stringifiedData, setUpdatedRows, setSelectedRows, setTableData]);

  return {
    tableData,
    rowSelectorActions: {
      selectedRows,
      selectRow,
      deselectRow,
    },
    rowUpdatorActions: {
      isTableMutable,
      updatedRows,
      setTableCellValue,
    },
    newRowActions: {
      newRowDirty,
      saveNewRow,
      newRowData,
      newRowDataError,
      setNewRowFieldValue,
    },
  };
};
