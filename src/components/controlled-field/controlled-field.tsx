import { Control, Controller, FieldValues } from "react-hook-form";

import { SxProps, TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface IControlledField<T extends FieldValues>
  extends Omit<TextFieldProps, "variant"> {
  control: Control<T>;
  id: string;
  variant?: "outlined";
  rules?: { required: boolean };
  sx?: SxProps;
}

function ControlledField<T extends FieldValues>({
  id,
  control,
  label,
  ...props
}: IControlledField<T>) {
  return (
    <Controller
      name={id}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        //formState,
      }) => (
        <TextField
          className="controlled-field"
          id={id}
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          {...props}
        />
      )}
    />
  );
}

export default ControlledField;
