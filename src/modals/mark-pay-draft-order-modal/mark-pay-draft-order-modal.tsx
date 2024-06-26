import { useForm } from "react-hook-form";

import ControlledField from "src/components/controlled-field";

import { Box, InputAdornment, Typography } from "@mui/material";
import ControlledSelect from "src/components/controlled-select";
import { paymentMethods } from "src/layouts/lot/config-select";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface MarkPayDraftOrderData {
  transaction_id: string;
  payment: {
    amount: number;
    currency_code: string;
    method: { id: string; label: string };
  };
  references: File[];
  change: {
    description: string;
    amount: number;
    currency_code: string;
    method: { id: string; label: string };
  };
}

export interface IMarkPayDraftOrderModal {
  data: MarkPayDraftOrderData;
}

export default function IMarkPayDraftOrderModal() {
  const { onClose: closeModal, onUpdate: updatePayDraftOrder } =
    useModal<IMarkPayDraftOrderModal>("mark-pay-draft-order-modal");
  const { handleSubmit, control } = useForm<MarkPayDraftOrderData>({
    defaultValues: {
      transaction_id: "",
      payment: {
        amount: 0,
        currency_code: "usd",
        method: { id: "", label: "" },
      },
      references: [],
      change: {
        description: "",
        amount: 0,
        currency_code: "usd",
        method: { id: "", label: "" },
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: MarkPayDraftOrderData) => {
    console.log({ data });
    updatePayDraftOrder({ data });
  };

  return (
    <BaseModal
      modalId="mark-pay-draft-order-modal"
      title="Mark Draft Order Has Paid"
      open
      closeOnTap
      onSubmit={() => {}}
      onClose={() => closeModal()}
    >
      <form id="mark-pay-draft-order-modal" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ControlledField
            id="transaction_id"
            label="Transaction Id"
            control={control}
            required
            sx={{ width: "48%" }}
          />
          <ControlledSelect<MarkPayDraftOrderData>
            control={control}
            id="payment.method"
            label="Payment Method"
            options={paymentMethods}
            required
            mapControlValueToOption={(value: { id: string; label: string }) => {
              const found = paymentMethods.find(
                (method) => method.id === value.id,
              );
              if (found) return found;
              else return { inputValue: "", id: value.id, label: value.label };
            }}
            handleSelectOption={(option): { id: string; label: string } => ({
              id: option.id,
              label: option.label,
            })}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="payment.amount"
            label="Amount (USD)"
            type="number"
            required
            control={control}
            sx={{ width: "48%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant="subtitle2" sx={{ my: 2 }}>
          Change
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          <ControlledField
            id="change.amount"
            label="Amount (USD)"
            type="number"
            required
            control={control}
            sx={{ width: "48%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <ControlledSelect<MarkPayDraftOrderData>
            control={control}
            id="change.method"
            label="Payment Method"
            options={paymentMethods}
            required
            mapControlValueToOption={(value: { id: string; label: string }) => {
              const found = paymentMethods.find(
                (method) => method.id === value.id,
              );
              if (found) return found;
              else return { inputValue: "", id: value.id, label: value.label };
            }}
            handleSelectOption={(option): { id: string; label: string } => ({
              id: option.id,
              label: option.label,
            })}
            sx={{ width: "48%" }}
          />
          <ControlledField
            control={control}
            required
            id="change.description"
            label="Description"
            variant="outlined"
            multiline
            rows="5"
            fullWidth
          />
        </Box>
      </form>
    </BaseModal>
  );
}
