import { LineItem } from "@medusajs/types";
import { useEffect, useState } from "react";

import {
  LineItemRequest,
  useCreateLineItem,
} from "src/mutations/use-create-line-item";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import ProductsTable from "./products-table";

export interface IAddLineItemModal {
  draft_order_id: string;
  line_items: LineItem[];
}

export default function AddLineItemModal() {
  const {
    props: { draft_order_id, line_items },
    onClose: closeModal,
  } = useModal<IAddLineItemModal>("add-line-item-modal");
  const [selected, setSelected] = useState<LineItemRequest[]>([]);

  const { mutate: createLineItemMutation, isSuccess } = useCreateLineItem();

  const handleSubmit = () => {
    for (const sel of selected) {
      const found = line_items.find(
        (item) => item.variant_id === sel.variant_id,
      );
      if (!found)
        createLineItemMutation({ draft_order_id, new_line_item: sel });
    }
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <BaseModal
      modalId="add-line-item-modal"
      title="Add Products"
      open
      closeOnTap
      onSubmit={handleSubmit}
      onClose={() => closeModal()}
    >
      <ProductsTable
        lineItems={line_items}
        selected={selected}
        setSelected={setSelected}
      />
    </BaseModal>
  );
}
