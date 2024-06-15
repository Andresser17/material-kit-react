import { useEffect } from "react";
import { Lot } from "@medusajs/types";
import { useForm, SubmitHandler } from "react-hook-form";

import { LotStatus } from "src/enums";
import { useUpdateLot } from "src/mutations/use-update-lot";

import ControlledSelect from "src/components/controlled-select";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IUpdateLotStatusModal {
  currentStatus: LotStatus;
  lot_id: string;
}

export default function UpdateLotStatusModal() {
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

  const {
    props: { currentStatus, lot_id },
    onClose: closeModal,
  } = useModal<IUpdateLotStatusModal>("update-lot-status-modal");
  const { handleSubmit, control, setValue } = useForm<Lot>({
    defaultValues: {
      status: LotStatus.FUTURE_PURCHASE,
    },
    mode: "onChange",
  });
  const updateLotMutation = useUpdateLot();
  const onSubmit: SubmitHandler<Lot> = (data) => {
    updateLotMutation({
      lot_id,
      lot: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (currentStatus) setValue("status", currentStatus);
  }, [currentStatus]);

  return (
    <BaseModal
      modalId="update-lot-status-modal"
      title="Update Status"
      open
      closeOnTap
      onClose={closeModal}
    >
      <form id="update-lot-status-modal" onSubmit={handleSubmit(onSubmit)}>
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
        />
      </form>
    </BaseModal>
  );
}
