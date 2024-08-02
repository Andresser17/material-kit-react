import { Address, DraftOrderResponse } from "@medusajs/types";
import { useEffect, useState } from "react";
import AddressCard from "src/components/controlled-card";
import { useUpdateDraftOrderShippingAddress } from "src/mutations/use-update-draft-order-shipping-address";
import { useGetCustomer } from "src/queries/use-get-customer";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IEditDraftOrderShippingAddressModal {
  draft_order: DraftOrderResponse;
  customer_id: string;
}

export default function EditDraftOrderShippingAddressModal() {
  const {
    props: { draft_order, customer_id },
    onClose: closeModal,
  } = useModal<IEditDraftOrderShippingAddressModal>(
    "edit-draft-order-shipping-address-modal",
  );
  const { data: customer } = useGetCustomer(customer_id);
  const { mutate: updateDraftOrderMutation, isSuccess } =
    useUpdateDraftOrderShippingAddress();
  const [selected, setSelected] = useState<Address | null>(null);

  const onSubmit = () => {
    updateDraftOrderMutation({
      draft_order_id: draft_order.id,
      shipping_address: {
        first_name: selected?.first_name ?? "",
        last_name: selected?.last_name ?? "",
        phone: selected?.phone ?? "",
        company: selected?.company ?? "",
        address_1: selected?.address_1 ?? "",
        address_2: selected?.address_2 ?? "",
        city: selected?.city ?? "",
        country_code: selected?.country_code ?? "",
        province: selected?.province ?? "",
        postal_code: selected?.postal_code ?? "",
        metadata: selected?.metadata ?? {},
      },
    });
  };

  useEffect(() => {
    if (draft_order) {
      setSelected(draft_order.cart.shipping_address);
    }
  }, [draft_order]);

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <BaseModal
      modalId="edit-draft-order-shipping-address-modal"
      title="Edit Shipping Address"
      open
      closeOnTap
      onSubmit={onSubmit}
      onClose={() => closeModal()}
    >
      {customer &&
        customer.shipping_addresses &&
        customer.shipping_addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
    </BaseModal>
  );
}
