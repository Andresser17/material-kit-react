import { LineItem, Order } from "@medusajs/types";
import moment from "moment";
import { useState } from "react";
import { useCreateWarranty } from "src/mutations/use-create-warranty";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";
import LineItemsTable from "./line-items-table";

export interface ICreateWarrantyModal {
  order: Order;
}

export default function CreateWarrantyModal() {
  const {
    props: { order },
    onClose: closeModal,
  } = useModal<ICreateWarrantyModal>("create-warranty-modal");
  const [selected, setSelected] = useState<LineItem[]>([]);
  const { mutate: createWarrantyMutation } = useCreateWarranty();
  const handleSubmit = () => {
    selected.forEach((sel) => {
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

  // useEffect(() => {
  //   if (isSuccess) closeModal();
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (customer) {
  //     setValue("email", customer.email);
  //     setValue("first_name", customer.first_name);
  //     setValue("last_name", customer.last_name);
  //     setValue("document", customer.document);
  //     setValue("mercado_libre", customer.mercado_libre);
  //     setValue("instagram", customer.instagram);
  //     setValue("facebook", customer.facebook);
  //     setValue("phone", customer.phone);
  //   }
  // }, [customer]);

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
