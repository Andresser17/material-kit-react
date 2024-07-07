import {
  Address,
  Customer,
  DraftOrderRequest,
  DraftOrderShippingMethod,
  LineItem,
  Region,
} from "@medusajs/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import { useCreateDraftOrder } from "src/mutations/use-create-draft-order";

import ChooseRegion from "../choose-region";
import CustomerAndShipping from "../customer-and-shipping";

// ----------------------------------------------------------------------

export default function CreateDraftOrderView() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedMethod, setSelectedMethod] =
    useState<DraftOrderShippingMethod | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [status, setStatus] = useState(DraftOrderStatus.OPEN);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const { handleSubmit, reset } = useForm<DraftOrderRequest>({
    defaultValues: {
      email: "",
      region_id: "",
      shipping_methods: [],
      status: DraftOrderStatus.OPEN,
      billing_address: {},
      shipping_address: {
        first_name: "",
        last_name: "",
        phone: "",
        company: "",
        address_1: "",
        address_2: "",
        city: "",
        country_code: "ve",
        province: "",
        postal_code: "",
        metadata: {},
      },
      items: [],
      discounts: [],
      no_notification_order: false,
      metadata: {},
    },
    mode: "onChange",
  });
  const resetForm = () => {
    reset();
    setStatus(DraftOrderStatus.OPEN);
  };
  const { mutate: createDraftOrder } = useCreateDraftOrder(resetForm);
  const onSubmit: SubmitHandler<DraftOrderRequest> = (data) => {
    const shipping_address = selectedAddress
      ? {
          first_name: selectedAddress.first_name,
          last_name: selectedAddress.last_name,
          phone: selectedAddress.phone,
          company: selectedAddress.company,
          address_1: selectedAddress.address_1,
          address_2: selectedAddress.address_2,
          city: selectedAddress.city,
          country_code: selectedAddress.country_code,
          province: selectedAddress.province,
          postal_code: selectedAddress.postal_code,
          metadata: selectedAddress.metadata,
        }
      : {
          first_name: "",
          last_name: "",
          phone: "",
          company: "",
          address_1: "",
          address_2: "",
          city: "",
          country_code: "ve",
          province: "",
          postal_code: "",
          metadata: {},
        };

    createDraftOrder({
      newDraftOrder: {
        ...data,
        status,
        email: selectedCustomer?.email ?? "",
        region_id: selectedRegion?.id ?? "",
        customer_id: selectedCustomer?.id ?? "",
        items: lineItems,
        shipping_methods: selectedMethod
          ? [
              {
                ...selectedMethod,
                data: {
                  first_name: selectedCustomer?.first_name,
                  last_name: selectedCustomer?.last_name,
                  document: selectedCustomer?.document,
                  phone: selectedCustomer?.phone,
                  destination_agency: "Zoom MRW Tealca Placeholder",
                  destination_city: "Placeholder",
                  destination_state: "Placeholder",
                },
              },
            ]
          : [],
        billing_address: shipping_address,
        shipping_address,
      },
    });
  };

  const floatingButtons = (
    <Box sx={{ position: "fixed", bottom: 10, right: 5, zIndex: 99 }}>
      <Button
        type="submit"
        variant="contained"
        color="success"
        size="large"
        sx={{ mr: 2 }}
      >
        Save
      </Button>
      <Button variant="text" color="error">
        Cancel
      </Button>
    </Box>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: {
              sm: "500px",
            },
            maxWidth: {
              xs: "100%",
            },
          }}
        >
          <ChooseRegion
            setLineItems={setLineItems}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
          <CustomerAndShipping
            regionName={selectedRegion?.name ?? ""}
            regionId={selectedRegion?.id ?? ""}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
          {floatingButtons}
        </Box>
      </Box>
    </form>
  );
}
