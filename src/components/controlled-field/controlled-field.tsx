import { Control, Controller } from "react-hook-form";

import { SxProps, TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

export interface IControlledField extends Omit<TextFieldProps, "variant"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  id: string;
  variant?: "outlined";
  rules?: { required: boolean };
  sx?: SxProps;
}

function ControlledField({ id, control, label, ...props }: IControlledField) {
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
