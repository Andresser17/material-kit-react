import { LineItem, Order, Warranty } from "@medusajs/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCreateWarranty } from "src/mutations/use-create-warranty";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import LineItemsTable from "./line-items-table";

export interface ICreateWarrantyModal {
  order: Order;
  warranties: Warranty[];
}

export default function CreateWarrantyModal() {
  const {
    props: { order, warranties },
    onClose: closeModal,
  } = useModal<ICreateWarrantyModal>("create-warranty-modal");
  const [selected, setSelected] = useState<LineItem[]>([]);
  const { mutate: createWarrantyMutation } = useCreateWarranty();
  const handleSubmit = () => {
    selected.forEach((sel) => {
      const found = warranties.find(
        (warranty) => warranty.line_item.id === sel.id,
      );
      if (found) return;

      const time = sel.variant.product.warranty_time;
      createWarrantyMutation({
        order_id: order.id,
        new_warranty: {
          time,
          expiration_date: moment().add(time, "days").toDate(),
          barcodes: [],
          photos: [],
          line_item_id: sel.id,
        },
      });
    });

    closeModal();
  };

  useEffect(() => {
    if (warranties) {
      const newSelected: LineItem[] = [];
      for (const warranty of warranties) {
        const found = order.items.find(
          (item) => item.id === warranty.line_item.id,
        );
        if (found) newSelected.push(found);
      }
      setSelected(newSelected);
    }
  }, [warranties]);

  return (
    <BaseModal
      modalId="create-warranty-modal"
      title="Create Warranty"
      open
      closeOnTap
      onSubmit={handleSubmit}
      onClose={() => closeModal()}
    >
      <LineItemsTable
        lineItems={order.items}
        selected={selected}
        setSelected={setSelected}
      />
    </BaseModal>
  );
}
