import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Region,
  CustomerDTO,
  ShippingAddress,
  DraftOrderRequest,
  DraftOrderLineItem,
  DraftOrderShippingMethod,
} from "@medusajs/types";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import { DraftOrderStatus } from "src/enums";
import { useCreateDraftOrder } from "src/mutations/use-create-draft-order";

import ChooseRegion from "../choose-region";
import CustomerAndShipping from "../customer-and-shipping";

// ----------------------------------------------------------------------

export default function CreateDraftOrderView() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedMethod, setSelectedMethod] =
    useState<DraftOrderShippingMethod | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDTO | null>(
    null,
  );
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingAddress | null>(null);

  const [status, setStatus] = useState(DraftOrderStatus.OPEN);
  const [lineItems, setLineItems] = useState<DraftOrderLineItem[]>([]);
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
  const createDraftOrder = useCreateDraftOrder(resetForm);
  const onSubmit: SubmitHandler<DraftOrderRequest> = (data) => {
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
                  document: selectedCustomer?.id, // replace with selectedCustomer?.document on future
                  phone: selectedCustomer?.phone,
                  destination_agency: "Zoom MRW Tealca Placeholder",
                  destination_city: "Placeholder",
                  destination_state: "Placeholder",
                },
              },
            ]
          : [],
        billing_address: selectedAddress
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
            },
        shipping_address: selectedAddress
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
            },
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
