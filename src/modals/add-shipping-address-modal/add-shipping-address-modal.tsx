import { Box, Typography } from "@mui/material";
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
      country_code: "",
      postal_code: 0,
      phone: "",
      company: "",
      address_2: "",
      province: "",
    },
    mode: "onChange",
  });
  const { mutate: addShippingAddressMutation } = useAddShippingAddress();
  const onSubmit = (data: AddShippingAddressRequest) => {
    addShippingAddressMutation({
      customer_id,
      new_shipping_address: data,
    });
  };

  // useEffect(() => {
  //   if (isSuccess && customer) {
  //     updateModal({ redirect_url: customer.id });
  //     closeModal(false);
  //   }
  // }, [isSuccess, customer]);

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
        <Typography variant="subtitle2" sx={{ fontSize: "16px", mb: 1 }}>
          Account
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <ControlledField
            id="email"
            label="Email"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="password"
            label="Password"
            control={control}
            sx={{ width: "48%" }}
          />
        </Box>
        <Typography variant="subtitle2" sx={{ fontSize: "16px", mb: 1 }}>
          Customer Information
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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
        </Box>
      </form>
    </BaseModal>
  );
}
