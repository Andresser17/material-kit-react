import {
  Address,
  Customer,
  DraftOrderRequest,
  ShippingOption,
} from "@medusajs/types";
import { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import { Control } from "react-hook-form";
import ControlledSelect from "src/components/controlled-select";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import { ICreateCustomerMlModal } from "src/modals/create-customer-ml-modal";
import { ICreateCustomerModal } from "src/modals/create-customer-modal";
import { useModal } from "src/modals/useModal";
import { formatCurrency } from "src/utils/format-number";

// ----------------------------------------------------------------------

interface ICustomerAndShipping {
  control: Control<DraftOrderRequest>;
  customers: Customer[];
  shippingOptions: ShippingOption[];
}

export default function CustomerAndShipping({
  control,
  customers,
  shippingOptions,
}: ICustomerAndShipping) {
  const { onOpen: openCreateCustomerModal } = useModal<ICreateCustomerModal>(
    "create-customer-modal",
  );
  const {
    props: { new_customer },
    onOpen: openCreateCustomerMlModal,
  } = useModal<ICreateCustomerMlModal>("create-customer-ml-modal");

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [address, setAddress] = useState<Address | null>(null);

  // select first customer address
  useEffect(() => {
    if (customer) setAddress(customer.shipping_addresses[0]);
  }, [customer]);

  // update selected customer after a new one created
  useEffect(() => {
    if (new_customer) {
      setCustomer(new_customer);
    }
  }, [new_customer]);

  return (
    <SectionBox
      sx={{
        width: "100%",
        mb: 3,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Shipping method (To {})
      </Typography>

      <ControlledSelect
        control={control}
        options={shippingOptions.map((shipping_option) => ({
          id: shipping_option.id,
          label: `${shipping_option.name} - ${formatCurrency(shipping_option.amount)} ${shipping_option.region.currency_code.toUpperCase()}`,
          inputValue: "",
        }))}
        mapControlValueToOption={(shipping_methods: ShippingOption[]) => {
          if (shipping_methods.length === 0)
            return { inputValue: "", id: "", label: "" };

          const shipping_option = shipping_methods[0];
          return {
            inputValue: "",
            id: shipping_option.id,
            label: `${shipping_option.name} - ${formatCurrency(shipping_option.amount)} ${shipping_option.region.currency_code.toUpperCase()}`,
          };
        }}
        handleSelectOption={(option: {
          inputValue: string;
          id: string;
          label: string;
        }) => {
          const found = shippingOptions.find(
            (shipping_option) => shipping_option.id === option.id,
          );
          if (found) return [found];
          return [];
        }}
        id="shipping_methods"
        label="Choose a shipping method"
        required
        sx={{ width: "100%", mb: 3 }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          sx={{ fontWeight: "500" }}
        >
          Set custom price
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: 2, mt: 4 }}
      >
        <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
          Customer and shipping details
        </Typography>

        <Box>
          <Button
            onClick={() => openCreateCustomerMlModal()}
            variant="contained"
            size="small"
            color="warning"
            startIcon={<Iconify icon="eva:plus-fill" />}
            sx={{ mr: 2 }}
          >
            New ML
          </Button>
          <Button
            onClick={() => openCreateCustomerModal()}
            variant="contained"
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New
          </Button>
        </Box>
      </Box>

      <ControlledSelect
        control={control}
        options={customers.map((customer) => ({
          id: customer.id,
          label: `${customer.first_name} ${customer.last_name} (${customer.email})`,
          inputValue: "",
        }))}
        mapControlValueToOption={(customer_id: string) => {
          const found = customers.find(
            (customer) => customer.id === customer_id,
          );
          if (found)
            return {
              inputValue: "",
              id: customer_id,
              label: `${found.first_name} ${found.last_name} (${found.email})`,
            };
          return { inputValue: "", id: "", label: "" };
        }}
        handleSelectOption={(option: {
          inputValue: string;
          id: string;
          label: string;
        }) => {
          const found = customers.find((customer) => customer.id === option.id);
          if (found) setCustomer(found);
          return option.id;
        }}
        id="customer_id"
        label="Find Existing Customer"
        required
        sx={{ width: "100%", mb: 3 }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
          Choose existing addresses
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New
        </Button>
      </Box>

      {/* {customer && customer.shipping_addresses.length > 0 ? (
        customer.shipping_addresses.map((shipping_address) => (
          <AddressCard
            key={shipping_address.id}
            address={shipping_address}
            selected={address}
            setSelected={setAddress}
          />
        ))
      ) : (
        <Typography variant="subtitle2">
          This customer don't have an address added
        </Typography>
      )} */}
    </SectionBox>
  );
}
