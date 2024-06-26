import { ProductRequest } from "@medusajs/types";
import { Control } from "react-hook-form";

import { Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useListCollections } from "src/queries/use-list-collections";
import { useListProductTypes } from "src/queries/use-list-product-types";
import { useListTags } from "src/queries/use-list-tags";

import ControlledField from "src/components/controlled-field";
import ControlledSelect from "src/components/controlled-select";
import SectionBox from "src/components/section-box";

interface IGeneralInfo {
  control: Control<ProductRequest>;
}

export default function GeneralInfo({ control }: IGeneralInfo) {
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
        id="description"
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
        <ControlledSelect<ProductRequest>
          control={control}
          id="type"
          label="Choose a Type"
          options={types.map((type) => ({
            inputValue: "",
            id: type.id,
            label: type.value,
          }))}
          mapControlValueToOption={(value: { value: string; id: string }) => {
            return { inputValue: "", label: value.value, id: value.id };
          }}
          handleSelectOption={(option): { value: string; id: string } => {
            if (option.label && option.inputValue.length === 0)
              return { value: option.label, id: option.id };
            return { value: option.inputValue, id: option.id };
          }}
          dinamicOptions
          sx={{ width: "48%" }}
        />
        <ControlledSelect<ProductRequest>
          control={control}
          label="Choose a collection"
          id="collection_id"
          options={collections.map((collection) => ({
            inputValue: "",
            id: collection.id,
            label: collection.title,
          }))}
          mapControlValueToOption={(value: string) => {
            const collection = collections.find(
              (collection) => collection.id === value,
            );
            return {
              inputValue: "",
              label: collection?.title ?? value,
              id: value,
            };
          }}
          handleSelectOption={(option): { value: string; id: string } => {
            return option.id;
          }}
          sx={{ width: "48%" }}
        />
        <ControlledSelect<ProductRequest>
          control={control}
          label="Tags"
          id="tags"
          placeholder="Select most used tags or add a new one"
          options={tags.map((tag) => ({
            inputValue: "",
            id: tag.id,
            label: tag.value,
          }))}
          multiple
          mapMultiControlValueToOption={(
            options: { value: string; id: string }[],
          ) => {
            return options.map((option) => ({
              inputValue: "",
              label: option.value,
              id: option.id,
            }));
          }}
          handleSelectMultiOption={(
            options,
          ): { value: string; id: string }[] => {
            return options.map((option) => {
              if (option.inputValue)
                return {
                  value: option.inputValue,
                  id: option.id,
                };

              return {
                value: option.label,
                id: option.id,
              };
            });
          }}
          dinamicOptions
          sx={{ width: "48%" }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Metadata
      </Typography>
    </SectionBox>
  );
}
