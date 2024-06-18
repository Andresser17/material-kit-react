import { Lot } from "@medusajs/types";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { LotStatus } from "src/enums";
import { useUpdateLot } from "src/mutations/use-update-lot";

import ControlledSelect from "src/components/controlled-select";

import BaseModal from "../base-modal";
import { useModal } from "../useModal";

import { status } from "src/layouts/lot/config-select";

export interface IUpdateLotStatusModal {
  currentStatus: LotStatus;
  lot_id: string;
}

export default function UpdateLotStatusModal() {
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
  const { mutate: updateLotMutation } = useUpdateLot();
  const onSubmit: SubmitHandler<Lot> = (data) => {
    updateLotMutation({
      lot_id,
      lot: {
        ...data,
      },
    });
    closeModal();
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
