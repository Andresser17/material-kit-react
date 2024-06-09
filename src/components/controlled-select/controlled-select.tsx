import { Control, Controller, FieldValues } from "react-hook-form";

import {
  SxProps,
  TextField,
  Autocomplete,
  FilterOptionsState,
  createFilterOptions,
} from "@mui/material";

export interface Option {
  inputValue: string;
  id: string;
  label: string;
}

export interface IControlledSelect<T extends Option, Y extends FieldValues> {
  control: Control<Y>;
  id: string;
  label: string;
  placeholder?: string;
  options: T[];
  sx: SxProps;
  multiple?: boolean;
  dinamicOptions?: boolean;
}

export default function ControlledSelect<
  T extends Option,
  Y extends FieldValues,
>({
  control,
  id,
  label,
  placeholder,
  options,
  sx,
  multiple,
  dinamicOptions,
}: IControlledSelect<T, Y>) {
  const filter = createFilterOptions<T>();

  const handleFilterOptions = (options: T[], params: FilterOptionsState<T>) => {
    const filtered = filter(options, params);

    const { inputValue } = params;

    if (dinamicOptions) {
      // Suggest the creation of a new value
      const isExisting = options.some((option) => inputValue === option.label);
      if (inputValue !== "" && !isExisting) {
        const newValue = {
          inputValue,
          label: `Add "${inputValue}"`,
        } as T;
        filtered.push(newValue);
      }
    }

    return filtered;
  };

  const handleGetOptionLabel = (option: T) => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
      return option;
    }
    // Add option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }

    if (option.label) {
      // onChange(option.id);
      return option.label;
    }

    // Regular option
    return "";
  };

  return (
    <Controller
      name={id}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        //formState,
      }) => {
        const valueOption = options.find((option) => {
          if (multiple) {
            if (option.id === value?.id) return option;
          } else if (option.id === value) return option;
        });

        return (
          <Autocomplete
            limitTags={2}
            {...{ sx, multiple, id, options, placeholder }}
            onChange={(_event: unknown, newValue: Option | Option[]) => {
              if (multiple && Array.isArray(newValue)) {
                onChange(newValue);
              } else if (!Array.isArray(newValue) && newValue?.id)
                onChange(newValue.id);
            }}
            value={valueOption ? valueOption.label : value}
            filterOptions={handleFilterOptions}
            getOptionLabel={handleGetOptionLabel}
            renderInput={(params) => (
              <TextField
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
