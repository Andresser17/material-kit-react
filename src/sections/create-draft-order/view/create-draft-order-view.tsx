import {
  Address,
  Customer,
  DraftOrderRequest,
  LineItem,
} from "@medusajs/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";
import { useCreateDraftOrder } from "src/mutations/use-create-draft-order";

import { ListCustomersResponse } from "src/queries/use-list-customers";
import { ListRegionsResponse } from "src/queries/use-list-regions";
import { useListShippingOptions } from "src/queries/use-list-shipping-options";
import ChooseRegion from "../choose-region";
import CustomerAndShipping from "../customer-and-shipping";

// ----------------------------------------------------------------------

interface ICreateDraftOrderView {
  customers: ListCustomersResponse;
  regions: ListRegionsResponse;
}

export default function CreateDraftOrderView({
  customers,
  regions,
}: ICreateDraftOrderView) {
  const [regionId, setRegionId] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const { handleSubmit, control, setValue } = useForm<DraftOrderRequest>({
    defaultValues: {
      email: "",
      region_id: "",
      customer_id: "",
      shipping_methods: [{ option_id: "", data: {}, price: 0 }],
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

  const { mutate: createDraftOrderMutation } = useCreateDraftOrder();
  const onSubmit: SubmitHandler<DraftOrderRequest> = (data) => {
    if (!address || !customer) return;

    const {
      created_at: _created_at,
      updated_at: _updated_at,
      deleted_at: _deleted_at,
      id: _id,
      customer_id: customer_id,
      ...shipping_address
    } = address;

    const shipping_methods = data.shipping_methods.map((method) => ({
      ...method,
      data: {
        ...method.data,
        customer: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          document: customer.document,
          phone: customer.phone,
        },
        destination: {
          agency: "Placeholder",
          city: "Placeholder",
          state: "Placeholder",
        },
      },
    }));

    createDraftOrderMutation({
      new_draft_order: {
        ...data,
        email: customer.email,
        items: lineItems,
        shipping_methods,
        billing_address: shipping_address,
        shipping_address,
      },
    });
  };

  const { data: shipping_options } = useListShippingOptions({
    query: { region_id: regionId, is_return: false },
  });

  // Autoselect first value in every Select component
  useEffect(() => {
    if (regions) {
      setValue("region_id", regions.regions[0].id);
      setRegionId(regions.regions[0].id);
    }
  }, [regions]);

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
            control={control}
            regions={regions.regions}
            setLineItems={setLineItems}
          />
          {shipping_options && (
            <CustomerAndShipping
              control={control}
              address={address}
              setAddress={setAddress}
              customers={customers.customers}
              customer={customer}
              setCustomer={setCustomer}
              shippingOptions={shipping_options.shipping_options}
            />
          )}
          {floatingButtons}
        </Box>
      </Box>
    </form>
  );
}
