import { Customer } from "@medusajs/types";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import { CustomerRequest } from "src/mutations/use-create-customer";
import { useUpdateCustomer } from "src/mutations/use-update-customer";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

export interface IEditCustomerModal {
  customer: Customer;
}

export default function CreateCustomerModal() {
  const {
    props: { customer },
    onClose: closeModal,
  } = useModal<IEditCustomerModal>("edit-customer-modal");
  const { handleSubmit, control, setValue } = useForm<CustomerRequest>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      document: "",
      mercado_libre: "",
      instagram: "",
      facebook: "",
      phone: "",
    },
    mode: "onChange",
  });
  const { mutate: updateCustomerMutation, isSuccess } = useUpdateCustomer();
  const onSubmit = (data: CustomerRequest) => {
    updateCustomerMutation({
      customer_id: customer.id,
      customer: data,
    });
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  useEffect(() => {
    if (customer) {
      setValue("email", customer.email);
      setValue("first_name", customer.first_name);
      setValue("last_name", customer.last_name);
      setValue("document", customer.document);
      setValue("mercado_libre", customer.mercado_libre);
      setValue("instagram", customer.instagram);
      setValue("facebook", customer.facebook);
      setValue("phone", customer.phone);
    }
  }, [customer]);

  return (
    <BaseModal
      modalId="edit-customer-modal"
      title="Edit Customer"
      open
      closeOnTap
      onClose={() => closeModal()}
    >
      <form id="edit-customer-modal" onSubmit={handleSubmit(onSubmit)}>
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
          <ControlledField
            id="document"
            label="Document"
            control={control}
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
