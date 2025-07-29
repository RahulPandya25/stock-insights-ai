import { useEffect, useState } from "react";

const getInitialState = (fields, requiredFields = []) => {
  const initalState = {};
  fields.forEach((key) => {
    initalState[key] = {
      value: "",
      error: "",
      required: requiredFields.includes(key),
    };
  });
  return initalState;
};

const getFormAttr = (fdata, attr) => {
  return Object.fromEntries(
    Object.entries(fdata).map(([field, fieldData]) => [field, fieldData[attr]])
  );
};

export const useForm = (
  fields = [],
  requiredFields = [],
  onFormDataChange,
  validateOnFieldChange = false
) => {
  const [fdata, setFormData] = useState(
    getInitialState(fields, requiredFields)
  );

  useEffect(() => {
    if (onFormDataChange) {
      onFormDataChange(getFormAttr(fdata, "value"));
    }
  }, [fdata]);

  const setFieldAttr = (field, attr, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: {
          ...prev[field],
          error:
            validateOnFieldChange && fdata[field].required
              ? value !== ""
                ? ""
                : "This field is required"
              : "",
          [attr]: value,
        },
      };
    });
  };
  const validateForm = () => {
    let isValid = true;
    Object.keys(fdata).forEach((field) => {
      if (fdata[field].required && fdata[field].value === "") {
        setFieldAttr(field, "error", "This field is required");
        isValid = false;
      }
    });
    return isValid;
  };

  const resetForm = () => {
    setFormData(getInitialState(fields, requiredFields));
  };

  return {
    formData: fdata,
    formFields: getFormAttr(fdata, "value"),
    formFieldsError: getFormAttr(fdata, "error"),
    setFieldValue: (field, value) => setFieldAttr(field, "value", value),
    validateForm,
    resetForm,
    isDirty: Object.keys(fdata).some((field) => fdata[field].value !== ""),
  };
};
