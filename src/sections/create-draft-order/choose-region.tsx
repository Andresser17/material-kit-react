import { Dispatch, useEffect, SetStateAction } from "react";
import { Region, DraftOrderLineItem } from "@medusajs/types";

import Box from "@mui/material/Box";
import { Select, Divider, MenuItem, Typography } from "@mui/material";

import { useListRegions } from "src/queries/use-list-regions";

import SectionBox from "src/components/section-box";

import ItemsTable from "./items-table/items-table";

interface IChooseRegion {
  lineItems: DraftOrderLineItem[];
  setLineItems: Dispatch<SetStateAction<DraftOrderLineItem[]>>;
  selectedRegion: Region | null;
  setSelectedRegion: Dispatch<SetStateAction<Region | null>>;
}

export default function ChooseRegion({
  lineItems,
  setLineItems,
  selectedRegion,
  setSelectedRegion,
}: IChooseRegion) {
  const { regions } = useListRegions();

  const handleSelectedRegion = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    const found = regions.find((region) => region.id === e.target.value);
    setSelectedRegion(found ?? null);
  };

  useEffect(() => {
    if (regions.length > 0) {
      setSelectedRegion(regions[0]);
    }
  }, [regions]);

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
          value={selectedRegion?.id ?? ""}
          onChange={handleSelectedRegion}
        >
          {regions &&
            regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
        </Select>
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Items for the order
      </Typography>
      <ItemsTable lineItems={lineItems} setLineItems={setLineItems} />
    </SectionBox>
  );
}
