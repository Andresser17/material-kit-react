import { Lot } from "@medusajs/types";
import { Control } from "react-hook-form";

import { Box, Divider, Typography, InputAdornment } from "@mui/material";

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
    { inputValue: "", id: "bnc", title: "BNC", metadata: {} },
    { inputValue: "", id: "zinli", title: "Zinli", metadata: {} },
    { inputValue: "", id: "zelle", title: "Zelle", metadata: {} },
  ];

  const couriers = [
    { inputValue: "", id: "zoom", title: "Zoom", metadata: {} },
    {
      inputValue: "",
      id: "liberty-express",
      title: "Liberty Express",
      metadata: {},
    },
    { inputValue: "", id: "ock21", title: "Oceanika 21", metadata: {} },
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
          id="items.quantity"
          label="Items Quantity"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="items.cost_per_item"
          label="Cost Per Item (USD)"
          variant="outlined"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <ControlledField
          control={control}
          id="cost.amount"
          label="Total Cost (USD)"
          variant="outlined"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
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
        Payment
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledSelect<PaymentMethodType, Lot>
          control={control}
          id="payment-method"
          label="Choose Payment Method"
          options={paymentMethods}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="cost.payment.fee.amount"
          label="Fee (USD)"
          variant="outlined"
          type="number"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Courier
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledSelect<PaymentMethodType, Lot>
          control={control}
          id="courier"
          label="Choose Courier"
          options={couriers}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="courier.cost.amount"
          label="Cost (USD)"
          variant="outlined"
          type="number"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <ControlledField
          control={control}
          type="number"
          id="courier.weight.amount"
          label="Weight"
          variant="outlined"
          sx={{ width: "48%" }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
        <ControlledSelect<PaymentMethodType, Lot>
          control={control}
          id="courier-payment-method"
          label="Choose Courier Payment Method"
          options={paymentMethods}
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="courier.payment.fee.amount"
          label="Fee (USD)"
          variant="outlined"
          type="number"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
      <Typography variant="subtitle2" sx={{ my: 2 }}>
        Ownership
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledField
          control={control}
          id="ownership[0].name"
          label="Name"
          variant="outlined"
          sx={{ width: "48%" }}
        />
        <ControlledField
          control={control}
          id="ownership[0].investment.amount"
          label="Investment"
          variant="outlined"
          type="number"
          sx={{ width: "48%" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </Box>
    </SectionBox>
  );
}
