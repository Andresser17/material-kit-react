import { Control } from "react-hook-form";
import { ProductRequest } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Divider, Typography } from "@mui/material";

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
import ControlledSelect from "src/components/controlled-select";

export default function GeneralInfo({
  control,
}: {
  control: Control<ProductRequest>;
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
        <ControlledSelect<ProductType, ProductRequest>
          control={control}
          id="type"
          label="Choose a Type"
          options={types}
          sx={{ width: "48%" }}
        />
        <ControlledSelect<Collection, ProductRequest>
          control={control}
          label="Choose a collection"
          id="collection"
          options={collections}
          sx={{ width: "48%" }}
        />
        <ControlledSelect<Tag, ProductRequest>
          control={control}
          label="Tags"
          id="tags"
          placeholder="Select most used tags or add a new one"
          options={tags}
          multiple
          sx={{ width: "48%" }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Metadata
      </Typography>
    </SectionBox>
  );
}
