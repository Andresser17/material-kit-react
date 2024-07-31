import { useEffect } from "react";

import { Customer } from "@medusajs/types";
import { useForm } from "react-hook-form";
import ControlledField from "src/components/controlled-field";
import { useCreateCustomer } from "src/mutations/use-create-customer";
import BaseModal from "../base-modal";
import { useModal } from "../useModal";

interface CustomerRequestMl {
  details: string;
}

export interface ICreateCustomerMlModal {
  new_customer: Customer;
}

export default function CreateCustomerMlModal() {
  const { onClose: closeModal, onUpdate: updateModal } =
    useModal<ICreateCustomerMlModal>("create-customer-ml-modal");
  const { handleSubmit, control } = useForm<CustomerRequestMl>({
    defaultValues: {
      details: "",
    },
    mode: "onChange",
  });
  const {
    data: customer,
    mutate: createCustomerMutation,
    isSuccess,
  } = useCreateCustomer();
  const onSubmit = (data: CustomerRequestMl) => {
    const lines = data.details.split(/\n/);

    const details = {
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      document: "",
      email: "",
    };
    for (const line of lines) {
      const splitted = line.split(":");

      if (splitted.length > 1) {
        const key = splitted[0];
        const value = splitted[1].trim();

        switch (key) {
          case "Quien recibe":
            const full_name = value.split(" ").filter((value) => value !== "");

            details.first_name =
              full_name.length === 4
                ? `${full_name[0]} ${full_name[1]}`
                : full_name[0];
            details.last_name =
              full_name.length === 4
                ? `${full_name[2]} ${full_name[3]}`
                : full_name[1];
            break;
          case "Dirección":
            details.address = value;
            break;
          case "Teléfono":
            details.phone = value;
            break;
          case "CI / RIF para la factura":
            details.document = value;
            break;
        }
      }
    }
    if (details.document)
      details.email = `${details.document}@noregistered.com`;

    createCustomerMutation({
      newCustomer: {
        first_name: details.first_name,
        last_name: details.last_name,
        email: details.email,
        password: "12345678",
        document: details.document,
        phone: details.phone,
        mercado_libre: `${details.first_name} ${details.last_name}`,
        instagram: "",
        facebook: "",
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      updateModal({ new_customer: customer });
      closeModal();
    }
  }, [isSuccess, customer]);

  return (
    <BaseModal
      modalId="create-customer-ml-modal"
      title="Paste MercadoEnvios Customer Details"
      open
      closeOnTap
      onClose={() => closeModal()}
    >
      <form id="create-customer-ml-modal" onSubmit={handleSubmit(onSubmit)}>
        <ControlledField
          id="details"
          control={control}
          required
          multiline
          minRows="8"
          fullWidth
        />
      </form>
    </BaseModal>
  );
}
