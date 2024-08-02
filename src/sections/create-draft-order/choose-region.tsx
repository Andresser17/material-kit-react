import { DraftOrderRequest, LineItem, Region } from "@medusajs/types";

import { Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";

import { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import ControlledSelect from "src/components/controlled-select";
import ItemsTable from "./items-table/items-table";

interface IChooseRegion {
  control: Control<DraftOrderRequest>;
  regions: Region[];
  setLineItems: Dispatch<SetStateAction<LineItem[]>>;
}

export default function ChooseRegion({
  control,
  regions,
  setLineItems,
}: IChooseRegion) {
  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Typography variant="h4">Choose region</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />

      <ControlledSelect
        control={control}
        options={regions.map((region) => ({
          id: region.id,
          label: region.name,
          inputValue: "",
        }))}
        mapControlValueToOption={(region_id: string) => {
          const found = regions.find((region) => region.id === region_id);
          if (found)
            return { inputValue: "", id: region_id, label: found.name };
          return { inputValue: "", id: "", label: "" };
        }}
        handleSelectOption={(option: {
          inputValue: string;
          id: string;
          label: string;
        }) => {
          return option.id;
        }}
        id="region_id"
        label="Region"
        required
        sx={{ width: "100%" }}
      />

      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Items for the order
      </Typography>
      <ItemsTable setLineItems={setLineItems} />
    </SectionBox>
  );
}
