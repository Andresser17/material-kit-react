import { Control } from "react-hook-form";

import Box from "@mui/material/Box";
import {
  Divider,
  SxProps,
  Typography,
  Autocomplete,
  createFilterOptions,
} from "@mui/material";

import { Product } from "src/queries/use-list-products";
import { Tag, useListTags } from "src/queries/use-list-tags";
import {
  Collection,
  useListCollections,
} from "src/queries/use-list-collections";
import {
  ProductType,
  useListProductTypes,
} from "src/queries/use-list-product-types";

import SectionBox from "src/components/section-box";
import ControlledField from "src/components/controlled-field";

export default function GeneralInfo({
  control,
}: {
  control: Control<Product>;
}) {
  const { types } = useListProductTypes();
  const { tags } = useListTags();
  const { collections } = useListCollections();

  return (
    <SectionBox>
      <Typography variant="h4">General Information</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledField
          control={control}
          id="title"
          label="Title"
          variant="outlined"
          required
          rules={{ required: true }}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="subtitle"
          label="Subtitle"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="handle"
          label="Handle"
          variant="outlined"
          sx={{ width: "48%" }}
        />
      </Box>
      <ControlledField
        control={control}
        id="description="
        label="Description"
        variant="outlined"
        multiline
        rows="5"
        fullWidth
        sx={{ mt: 4 }}
      />
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Organize Product
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <AddSelect<ProductType>
          control={control}
          id="type"
          label="Choose a Type"
          options={types}
          sx={{ width: "48%" }}
        />
        <AddSelect<Collection>
          control={control}
          label="Choose a collection"
          id="collection"
          options={collections}
          sx={{ width: "48%" }}
        />
        <AddSelect<Tag>
          control={control}
          label="Tags"
          id="tags"
          placeholder="Select most used tags or add a new one"
          options={tags}
          sx={{ width: "48%" }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Metadata
      </Typography>
    </SectionBox>
  );
}

interface IAddSelect<T> {
  control: Control<Product>;
  id: string;
  label: string;
  placeholder?: string;
  options: T[];
  sx: SxProps;
}

function AddSelect<
  T extends { inputValue: string; id: string; value?: string; title?: string },
>({ control, id, label, placeholder, options, sx }: IAddSelect<T>) {
  const filter = createFilterOptions<T>();

  return (
    <Autocomplete
      multiple
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
