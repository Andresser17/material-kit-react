import { Lot } from "@medusajs/types";
import { Control } from "react-hook-form";

import { Box, Divider, Typography } from "@mui/material";

import SectionBox from "src/components/section-box";
import ControlledField from "src/components/controlled-field";
import ControlledSelect from "src/components/controlled-select/controlled-select";

export type PaymentMethodType = {
  inputValue: string;
  id: string;
  title: string;
  metadata: Record<string, unknown>;
};

interface IGeneralInfo {
  control: Control<Lot>;
}

export default function GeneralInfo({ control }: IGeneralInfo) {
  const paymentMethods = [
    { inputValue: "", id: "bancamiga", title: "Bancamiga", metadata: {} },
    {
      inputValue: "",
      id: "exterior",
      title: "Banco Exterior",
      metadata: {},
    },
    {
      inputValue: "",
      id: "venezuela",
      title: "Banco de Venezuela",
      metadata: {},
    },
  ];

  return (
    <SectionBox>
      <Typography variant="h4">General Information</Typography>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledField
          control={control}
          id="name"
          label="Name"
          variant="outlined"
          required
          rules={{ required: true }}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="items"
          label="items"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="cost_per_item"
          label="Cost per item"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="cost"
          label="Total Cost USD"
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
        <ControlledSelect<PaymentMethodType, Lot>
          control={control}
          id="type"
          label="Choose Payment Method"
          options={paymentMethods}
          sx={{ width: "48%" }}
        />
      </Box>
    </SectionBox>
  );
}
