import { Lot } from "@medusajs/types";
import { SubmitHandler, useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

import { Box, InputAdornment, Typography } from "@mui/material";
import { useEffect } from "react";
import ControlledSelect from "src/components/controlled-select";
import { couriers, paymentMethods } from "src/layouts/lot/config-select";
import { useUpdateLot } from "src/mutations/use-update-lot";

export interface IEditLotSummaryModal {
  lot: Lot;
}

export default function EditLotSummaryModal() {
  const {
    props: { lot },
    onClose: closeModal,
  } = useModal<IEditLotSummaryModal>("edit-lot-summary-modal");
  const { handleSubmit, control, setValue } = useForm<Lot>({
    defaultValues: {
      name: "",
      description: "",
      cost: {
        amount: 0,
        currency: "USD",
        payment: {
          method: "",
          fee: {
            amount: 0,
            currency: "USD",
          },
        },
      },
      items: {
        quantity: 0,
        cost_per_item: 0,
      },
      courier: {
        company: "",
        weight: {
          amount: 0,
          unit: "",
        },
        cost: {
          amount: 0,
          currency: "USD",
        },
        payment: {
          method: "",
          fee: {
            amount: 0,
            currency: "USD",
          },
        },
      },
      ownership: [{ name: "", investment: { amount: 0, currency: "USD" } }],
    },
    mode: "onChange",
  });

  const { mutate: updateLotMutation } = useUpdateLot();
  const onSubmit: SubmitHandler<Lot> = (data) => {
    updateLotMutation({ lot_id: lot.id, lot: data });
    closeModal();
  };

  useEffect(() => {
    setValue("name", lot.name);
    setValue("items.quantity", lot.items.quantity);
    setValue("items.cost_per_item", lot.items.cost_per_item);
    setValue("description", lot.description);
    if (lot.cost) setValue("cost.payment.method", lot.cost?.payment.method);
    if (lot.cost)
      setValue("cost.payment.fee.amount", lot.cost?.payment.fee.amount);
    setValue("courier.company", lot.courier.company);
    setValue("courier.cost.amount", lot.courier.cost.amount);
    setValue("courier.payment.method", lot.courier.payment.method);
    setValue("courier.weight.amount", lot.courier.weight.amount);
    setValue("courier.payment.fee.amount", lot.courier.payment.fee.amount);
    // setValue("ownership[0].name", lot.ownership[0]?.name);
    // setValue(
    //   "ownership[0].investment.amount",
    //   lot.ownership[0]?.investment.amount,
    // );
  }, []);

  return (
    <BaseModal
      modalId="edit-lot-summary-modal"
      title="Edit Summary"
      open
      closeOnTap
      onClose={closeModal}
    >
      <form id="edit-lot-summary-modal" onSubmit={handleSubmit(onSubmit)}>
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <ControlledField
            control={control}
            id="cost.amount"
            label="Total Cost (USD)"
            variant="outlined"
            sx={{ width: "48%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
      </form>
    </BaseModal>
  );
}
