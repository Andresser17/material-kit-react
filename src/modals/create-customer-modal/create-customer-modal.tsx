import { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import {
  CustomerRequest,
  useCreateCustomer,
} from "src/mutations/use-create-customer";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface ICreateCustomerModal {
  redirect_url: string;
}

export default function CreateCustomerModal() {
  const { onClose: closeModal, onUpdate: updateModal } =
    useModal<ICreateCustomerModal>("create-customer-modal");
  const { handleSubmit, control } = useForm<CustomerRequest>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "12345678",
      document: "",
      mercado_libre: "",
      instagram: "",
      facebook: "",
      phone: "",
    },
    mode: "onChange",
  });
  const {
    data: customer,
    mutate: createCustomerMutation,
    isSuccess,
  } = useCreateCustomer();
  const onSubmit = (data: CustomerRequest) => {
    createCustomerMutation({
      newCustomer: data,
    });
  };

  useEffect(() => {
    if (isSuccess && customer) {
      updateModal({ redirect_url: customer.id });
      closeModal(false);
    }
  }, [isSuccess, customer]);

  return (
    <BaseModal
      modalId="create-customer-modal"
      title="Create Customer"
      open
      closeOnTap
      onSubmit={() => {}}
      onClose={() => closeModal()}
    >
      <form id="create-customer-modal" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="subtitle2" sx={{ fontSize: "16px", mb: 1 }}>
          Account
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <ControlledField
            id="email"
            label="Email"
            control={control}
            required
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="password"
            label="Password"
            control={control}
            required
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
            required
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="last_name"
            label="Last Name"
            control={control}
            required
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="phone"
            label="Phone"
            control={control}
            required
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="document"
            label="Document"
            control={control}
            required
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="mercado_libre"
            label="ML Account"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="facebook"
            label="Facebook Account"
            control={control}
            sx={{ width: "48%" }}
          />
          <ControlledField
            id="instagram"
            label="Instagram Account"
            control={control}
            sx={{ width: "48%" }}
          />
        </Box>
      </form>
    </BaseModal>
  );
}
