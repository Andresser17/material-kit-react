import { Address, Customer, DraftOrderShippingMethod } from "@medusajs/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { useListCustomers } from "src/queries/use-list-customers";
import { useListShippingOptions } from "src/queries/use-list-shipping-options";

import AddressCard from "src/components/address-card";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import { ICreateCustomerModal } from "src/modals/create-customer-modal";
import { useModal } from "src/modals/useModal";

// ----------------------------------------------------------------------

interface ICustomerAndShipping {
  regionId: string;
  regionName: string;
  selectedMethod: DraftOrderShippingMethod | null;
  setSelectedMethod: Dispatch<SetStateAction<DraftOrderShippingMethod | null>>;
  selectedCustomer: Customer | null;
  setSelectedCustomer: Dispatch<SetStateAction<Customer | null>>;
  selectedAddress: Address | null;
  setSelectedAddress: Dispatch<SetStateAction<Address | null>>;
}

export default function CustomerAndShipping({
  regionId,
  regionName,
  selectedMethod,
  setSelectedMethod,
  selectedAddress,
  setSelectedAddress,
  selectedCustomer,
  setSelectedCustomer,
}: ICustomerAndShipping) {
  const {
    props: { redirect_url },
    onOpen: openCreateCustomerModal,
  } = useModal<ICreateCustomerModal>("create-customer-modal");

  const { shipping_options } = useListShippingOptions({
    query: { region_id: regionId, is_return: false },
  });
  const { data: customers } = useListCustomers();

  const handleShippingOptions = (e: { target: { value: string } }) => {
    const found = shipping_options.find(
      (shipping_option) => shipping_option.id === e.target.value,
    );
    if (found)
      setSelectedMethod({
        option_id: found.id,
        data: found.data ?? {},
        price: found.amount,
      });
  };

  const handleCustomers = (e: { target: { value: string } }) => {
    if (customers) {
      const found = customers.customers.find(
        (customer) => customer.id === e.target.value,
      );
      setSelectedCustomer(found ?? null);
    }
  };

  useEffect(() => {
    if (shipping_options.length > 0) {
      const option = shipping_options[0];
      if (option)
        setSelectedMethod({
          option_id: option.id,
          data: option.data ?? {},
          price: option.amount,
        });
    }
    if (customers && customers.customers.length > 0)
      setSelectedCustomer(customers.customers[0]);
  }, [shipping_options, customers]);

  useEffect(() => {
    if (!selectedAddress) {
      const newAddress =
        selectedCustomer?.shipping_addresses &&
        selectedCustomer.shipping_addresses.length > 0
          ? selectedCustomer?.shipping_addresses[0]
          : null;
      setSelectedAddress(newAddress);
    }
  }, [selectedAddress, selectedCustomer]);

  return (
    <SectionBox
      sx={{
        width: "100%",
        mb: 3,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Shipping method (To {regionName})
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose a shipping method
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedMethod?.option_id ?? ""}
          label="Choose a shipping method"
          onChange={handleShippingOptions}
        >
          {shipping_options &&
            shipping_options.map((shippingOption) => {
              const amount = shippingOption.amount.toString().split("");
              const amountPrint = amount
                .slice(
                  0,
                  amount.length >= 3 ? amount.length - 2 : amount.length,
                )
                .join("");

              return (
                <MenuItem key={shippingOption.id} value={shippingOption.id}>
                  {`${shippingOption.name} - ${amountPrint} ${shippingOption.region.currency_code.toUpperCase()}`}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
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

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="existing-customer-label">
          Find a existing customer
        </InputLabel>
        <Select
          labelId="existing-customer-label"
          id="existing-customer"
          value={selectedCustomer?.id ?? ""}
          label="Find existing customer"
          onChange={handleCustomers}
        >
          {customers &&
            customers.customers.map((customer) => {
              const label =
                customer.first_name && customer.last_name
                  ? `${customer.first_name} ${customer.last_name} (${customer.email})`
                  : customer.email;

              return (
                <MenuItem key={customer.id} value={customer.id}>
                  {label}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Choose existing addresses
      </Typography>
      {selectedCustomer?.shipping_addresses &&
      selectedCustomer?.shipping_addresses.length > 0 ? (
        selectedCustomer?.shipping_addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={selectedAddress}
            setSelected={setSelectedAddress}
          />
        ))
      ) : (
        <Typography variant="subtitle2">
          Shipping addresses not found:{" "}
          <Link to={`/customers/${selectedCustomer?.id}`}>Add an address</Link>
        </Typography>
      )}
    </SectionBox>
  );
}
