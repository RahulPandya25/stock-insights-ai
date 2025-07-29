import { Button } from "../Button/Button";
import { Flex } from "../Flex/Flex";
import { Label } from "../Label/Label";
import { TextInput } from "../TextInput/TextInput";
import { useForm } from "../../hooks/useForm";

export const Form = ({
  className,
  fields,
  requiredFields,
  onSubmit,
  primaryCTA,
  onFormDataChange,
  rowWise = false,
  validateOnFieldChange = false,
}) => {
  const { formData, formFields, formFieldsError, setFieldValue, validateForm } =
    useForm(fields, requiredFields, onFormDataChange, validateOnFieldChange);

  return (
    <div className={className}>
      <Flex gap={"1"} column={!rowWise}>
        {Object.keys(formData).map((field, kIndex) => (
          <Label
            key={kIndex}
            label={field}
            required={formData[field].required}
            columnWise
          >
            <TextInput
              field={field}
              value={formFields[field]}
              required={formFieldsError[field] && formData[field].required}
              onChange={(value) => setFieldValue(field, value)}
              errorMessage={formFieldsError[field]}
            />
          </Label>
        ))}
      </Flex>
      {primaryCTA && (
        <>
          <br />
          <Button
            onClick={(e) => {
              e.preventDefault();
              const isValid = validateForm();
              if (isValid) {
                onSubmit(formFields);
              }
            }}
            primary
          >
            {primaryCTA}
          </Button>
        </>
      )}
    </div>
  );
};
