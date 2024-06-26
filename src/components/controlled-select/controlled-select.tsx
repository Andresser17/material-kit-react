import { Control, Controller, FieldValues } from "react-hook-form";

import {
  Autocomplete,
  FilterOptionsState,
  SxProps,
  TextField,
  createFilterOptions,
} from "@mui/material";

export interface Option {
  inputValue: string;
  id: string;
  label: string;
}

export interface IControlledSelect<Y extends FieldValues> {
  control: Control<Y>;
  id: string;
  label: string;
  placeholder?: string;
  options: Option[];
  mapControlValueToOption?: (value: any) => Option;
  mapMultiControlValueToOption?: (value: any[]) => Option[];
  handleSelectOption?: (option: any) => unknown;
  handleSelectMultiOption?: (option: any[]) => unknown;
  sx?: SxProps;
  multiple?: boolean;
  dinamicOptions?: boolean;
  required?: boolean;
}

export default function ControlledSelect<Y extends FieldValues>({
  control,
  id,
  label,
  placeholder,
  options,
  sx,
  multiple,
  required,
  mapControlValueToOption,
  mapMultiControlValueToOption,
  handleSelectOption,
  handleSelectMultiOption,
  dinamicOptions,
}: IControlledSelect<Y>) {
  const filter = createFilterOptions<Option>();

  const handleChange = (
    controlOnChange: {
      (...event: unknown[]): void;
      (arg0: string | Option[]): void;
    },
    newValue: Option | Option[],
  ) => {
    if (
      multiple &&
      Array.isArray(newValue) &&
      handleSelectMultiOption &&
      newValue
    )
      controlOnChange(handleSelectMultiOption(newValue));
    else if (handleSelectOption && !Array.isArray(newValue) && newValue)
      controlOnChange(handleSelectOption(newValue));
    else controlOnChange(newValue);
  };

  const handleFilterOptions = (
    options: Option[],
    params: FilterOptionsState<Option>,
  ) => {
    const filtered = filter(options, params);

    const { inputValue } = params;

    if (dinamicOptions) {
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option.label);
      if (inputValue !== "" && !isExisting) {
        const newValue = {
          inputValue,
          id: "new-option",
          label: `Add "${inputValue}"`,
        };
        filtered.push(newValue);
      }
    }

    return filtered;
  };

  const handleGetOptionLabel = (option: Option) => {
    if (option.label) return option.label;

    return "";
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
        let newValue: Option | Option[];

        if (mapControlValueToOption && value) {
          newValue = mapControlValueToOption(value);
        } else if (mapMultiControlValueToOption && value) {
          newValue = mapMultiControlValueToOption(value);
        } else {
          newValue = value;
        }

        return (
          <Autocomplete
            limitTags={2}
            {...{ sx, multiple, id, options, placeholder }}
            onChange={(_e, newValue) => {
              if (newValue) handleChange(controlOnChange, newValue);
            }}
            value={newValue}
            // clearOnBlur
            filterOptions={handleFilterOptions}
            getOptionLabel={handleGetOptionLabel}
            renderInput={(params) => (
              <TextField
                required={required}
                className="controlled-field"
                helperText={error ? error.message : null}
                error={!!error}
                label={label}
                {...params}
              />
            )}
          />
        );
      }}
    />
  );
}
