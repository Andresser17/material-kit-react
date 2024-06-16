import { Lot } from "@medusajs/types";
import { Control } from "react-hook-form";

import { Box, Divider, Typography, InputAdornment } from "@mui/material";

import { LotStatus } from "src/enums";

import SectionBox from "src/components/section-box";
import ControlledField from "src/components/controlled-field";
import ControlledSelect from "src/components/controlled-select/controlled-select";

interface IGeneralInfo {
  control: Control<Lot>;
}

export default function GeneralInfo({ control }: IGeneralInfo) {
  const paymentMethods = [
    { inputValue: "", id: "pago-movil", label: "Pago Movil" },
    { inputValue: "", id: "bancamiga", label: "Bancamiga" },
    {
      inputValue: "",
      id: "exterior",
      label: "Banco Exterior",
    },
    {
      inputValue: "",
      id: "venezuela",
      label: "Banco de Venezuela",
    },
    { inputValue: "", id: "bnc", label: "BNC" },
    { inputValue: "", id: "zinli", label: "Zinli" },
    { inputValue: "", id: "zelle", label: "Zelle" },
  ];

  const couriers = [
    { inputValue: "", id: "zoom", label: "Zoom" },
    {
      inputValue: "",
      id: "liberty-express",
      label: "Liberty Express",
    },
    { inputValue: "", id: "ock21", label: "Oceanika 21" },
  ];

  const status = [
    { inputValue: "", id: LotStatus.ON_STOCK, label: "On Stock" },
    {
      inputValue: "",
      id: LotStatus.OUT_OF_STOCK,
      label: "Out of Stock",
    },
    {
      inputValue: "",
      id: LotStatus.WAITING_DELIVERY,
      label: "Waiting Delivery",
    },
    {
      inputValue: "",
      id: LotStatus.ORDER_PROBLEM,
      label: "Order Problem",
    },
    {
      inputValue: "",
      id: LotStatus.FUTURE_PURCHASE,
      label: "Future Purchase",
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
        <ControlledSelect<Lot>
          control={control}
          id="status"
          label="Status"
          options={status}
          mapControlValueToOption={(value: string) => {
            const found = status.find((st) => st.id === value);
            if (found) return found;
            else return { inputValue: "", id: value, label: value };
          }}
          handleSelectOption={(option): string => option.id}
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
        Payment
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <ControlledSelect<Lot>
          control={control}
          id="cost.payment.method"
          label="Choose Payment Method"
          options={paymentMethods}
          mapControlValueToOption={(value: string) => {
            const found = paymentMethods.find(
              (method) => method.label === value,
            );
            if (found) return found;
            else return { inputValue: "", id: value, label: value };
          }}
          handleSelectOption={(option): string => option.label}
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
        <ControlledSelect<Lot>
          control={control}
          id="courier.company"
          label="Courier Company"
          options={couriers}
          mapControlValueToOption={(value: string) => {
            const found = couriers.find((courier) => courier.label === value);
            if (found) return found;
            else return { inputValue: "", id: value, label: value };
          }}
          handleSelectOption={(option): string => option.label}
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
        <ControlledSelect<Lot>
          control={control}
          id="courier.payment.method"
          label="Payment Method"
          options={paymentMethods}
          mapControlValueToOption={(value: string) => {
            const found = paymentMethods.find(
              (method) => method.label === value,
            );
            if (found) return found;
            else return { inputValue: "", id: value, label: value };
          }}
          handleSelectOption={(option): string => option.label}
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
