import { Address } from "@medusajs/types";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import { AddShippingAddressRequest } from "src/mutations/use-add-shipping-address";
import { useUpdateShippingAddress } from "src/mutations/use-update-shipping-address";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IEditShippingAddressModal {
  customer_id: string;
  shipping_address: Address;
}

export default function EditShippingAddressModal() {
  const {
    props: { customer_id, shipping_address },
    onClose: closeModal,
  } = useModal<IEditShippingAddressModal>("edit-shipping-address-modal");
  const { handleSubmit, control, setValue } =
    useForm<AddShippingAddressRequest>({
      defaultValues: {
        first_name: "",
        last_name: "",
        address_1: "",
        city: "",
        country_code: "ve",
        postal_code: "",
        phone: "",
        company: "",
        address_2: "",
        province: "",
      },
      mode: "onChange",
    });
  const { mutate: editShippingAddressMutation, isSuccess } =
    useUpdateShippingAddress();
  const onSubmit = (data: AddShippingAddressRequest) => {
    editShippingAddressMutation({
      customer_id,
      shipping_address_id: shipping_address.id,
      shipping_address: data,
    });
  };

  useEffect(() => {
    if (shipping_address.first_name)
      setValue("first_name", shipping_address.first_name);
    if (shipping_address.last_name)
      setValue("last_name", shipping_address.last_name);
    if (shipping_address.address_1)
      setValue("address_1", shipping_address.address_1);
    if (shipping_address.city) setValue("city", shipping_address.city);
    if (shipping_address.postal_code)
      setValue("postal_code", shipping_address.postal_code);
    if (shipping_address.phone) setValue("phone", shipping_address.phone);
    if (shipping_address.company) setValue("company", shipping_address.company);
    if (shipping_address.address_2)
      setValue("address_2", shipping_address.address_2);
    if (shipping_address.province)
      setValue("province", shipping_address.province);
  }, [shipping_address]);

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <BaseModal
      modalId="edit-shipping-address-modal"
      title="Edit Shipping Address"
      open
      closeOnTap
      onSubmit={() => {}}
      onClose={() => closeModal()}
    >
      <form id="add-shipping-address-modal" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Personal Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <ControlledField
            id="first_name"
            label="First Name"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="last_name"
            label="Last Name"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="phone"
            label="Phone"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="company"
            label="Company"
            control={control}
            sx={{ width: "48%" }}
          />
        </Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Address
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <ControlledField
            id="address_1"
            label="Address 1"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="address_2"
            label="Address 2"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="city"
            label="City"
            control={control}
            sx={{ width: "48%" }}
          />
          {/* <ControlledField
            id="country_code"
            label="Country Code"
            control={control}
            sx={{ width: "48%" }}
          /> */}
          <ControlledField
            id="postal_code"
            label="Postal Code"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="province"
            label="Province (State)"
            control={control}
            sx={{ width: "48%" }}
          />
        </Box>
      </form>
    </BaseModal>
  );
}
