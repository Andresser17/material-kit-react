import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import {
  AddShippingAddressRequest,
  useAddShippingAddress,
} from "src/mutations/use-add-shipping-address";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IAddShippingAddressModal {
  customer_id: string;
}

export default function AddShippingAddressModal() {
  const {
    props: { customer_id },
    onClose: closeModal,
  } = useModal<IAddShippingAddressModal>("add-shipping-address-modal");
  const { handleSubmit, control } = useForm<AddShippingAddressRequest>({
    defaultValues: {
      first_name: "",
      last_name: "",
      address_1: "",
      city: "",
      country_code: "ve",
      postal_code: 0,
      phone: "",
      company: "",
      address_2: "",
      province: "",
    },
    mode: "onChange",
  });
  const { mutate: addShippingAddressMutation, isSuccess } =
    useAddShippingAddress();
  const onSubmit = (data: AddShippingAddressRequest) => {
    addShippingAddressMutation({
      customer_id,
      new_shipping_address: data,
    });
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <BaseModal
      modalId="add-shipping-address-modal"
      title="Add Shipping Address"
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
