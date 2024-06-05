import { Control, FieldValues } from "react-hook-form";

import { SxProps, Autocomplete, createFilterOptions } from "@mui/material";

import ControlledField from "../controlled-field";

interface Options {
  inputValue: string;
  id: string;
  value?: string;
  title?: string;
}

export interface IControlledSelect<T extends Options, Y extends FieldValues> {
  control: Control<Y>;
  id: string;
  label: string;
  placeholder?: string;
  options: T[];
  sx: SxProps;
  multiple?: boolean;
}

export default function ControlledSelect<
  T extends Options,
  Y extends FieldValues,
>({
  control,
  id,
  label,
  placeholder,
  options,
  sx,
  multiple,
}: IControlledSelect<T, Y>) {
  const filter = createFilterOptions<T>();

  return (
    <Autocomplete
      multiple={multiple}
      limitTags={2}
      id="multiple-limit-tags"
      options={options}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === option.value,
        );
        if (inputValue !== "" && !isExisting) {
          const newValue = {
            inputValue,
            value: `Add "${inputValue}"`,
          } as T;
          filtered.push(newValue);
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }

        if (option.value) return option.value;
        if (option.title) return option.title;
        // Regular option
        return "";
      }}
      renderInput={(params) => (
        <ControlledField
          {...params}
          control={control}
          {...{ id, label, placeholder }}
        />
      )}
      sx={sx}
    />
  );
}
