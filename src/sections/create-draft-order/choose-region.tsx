import { Control } from "react-hook-form";

import Box from "@mui/material/Box";
import { Select, Divider, MenuItem, Typography } from "@mui/material";

import { DraftOrderRequest } from "src/mutations/use-create-draft-order";

import SectionBox from "src/components/section-box";

import ItemsTable from "./items-table/items-table";

export default function ChooseRegion({
  control,
}: {
  control: Control<DraftOrderRequest>;
}) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Choose region</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Select
          id="region"
          label="Region"
          variant="outlined"
          required
          fullWidth
          defaultValue={"venezuela"}
        >
          <MenuItem value="venezuela">Venezuela</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Items for the order
      </Typography>
      <ItemsTable control={control} />
    </SectionBox>
  );
}
