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
  mapControlToValue?: (value: any) => string;
  mapValueToControl?: (values: any[], newValue: string) => any;
}

function ControlledField<T extends FieldValues>({
  id,
  control,
  label,
  mapControlToValue,
  mapValueToControl,
  ...props
}: IControlledField<T>) {
  const handleChange = (
    controlOnChange: {
      (...event: unknown[]): void;
      (arg0: string): void;
    },
    newValue: string,
  ) => {
    if (mapValueToControl && newValue) {
      const arr = control._formValues[id];
      controlOnChange(mapValueToControl(arr, newValue));
    } else controlOnChange(newValue);
  };

  return (
    <Controller
      name={id}
      control={control}
      render={({
        field: { onChange: controlOnChange, value },
        fieldState: { error },
        //formState,
      }) => {
        let newValue: string;

        if (mapControlToValue && value) {
          newValue = mapControlToValue(value);
        } else {
          // newValue = typeof value !== "string" ? String(value) : value;
          newValue = value;
        }

        return (
          <TextField
            className="controlled-field"
            id={id}
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            onChange={(e) => {
              handleChange(controlOnChange, e.target.value);
            }}
            value={newValue}
            label={label}
            {...props}
          />
        );
      }}
    />
  );
}

export default ControlledField;
