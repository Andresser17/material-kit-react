import { Link } from "react-router-dom";
import { Dispatch, useEffect, SetStateAction } from "react";
import {
  CustomerDTO,
  ShippingAddress,
  ShippingOptionDTO,
} from "@medusajs/types";

import {
  Box,
  Card,
  Radio,
  Select,
  Button,
  MenuItem,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

import { useListCustomers } from "src/queries/use-list-customers";
import { useListShippingOptions } from "src/queries/use-list-shipping-options";

import SectionBox from "src/components/section-box";

// ----------------------------------------------------------------------

interface ICustomerAndShipping {
  regionId: string;
  regionName: string;
  selectedMethod: ShippingOptionDTO | null;
  setSelectedMethod: Dispatch<SetStateAction<ShippingOptionDTO | null>>;
  selectedCustomer: CustomerDTO | null;
  setSelectedCustomer: Dispatch<SetStateAction<CustomerDTO | null>>;
  selectedAddress: ShippingAddress | null;
  setSelectedAddress: Dispatch<SetStateAction<ShippingAddress | null>>;
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
  const { shipping_options } = useListShippingOptions({
    query: { region_id: regionId, is_return: false },
  });
  const { customers } = useListCustomers();

  const handleShippingOptions = (e: { target: { value: string } }) => {
    const found = shipping_options.find(
      (shipping_option) => shipping_option.id === e.target.value,
    );
    setSelectedMethod(found ?? null);
  };

  const handleCustomers = (e: { target: { value: string } }) => {
    const found = customers.find((customer) => customer.id === e.target.value);
    setSelectedCustomer(found ?? null);
  };

  useEffect(() => {
    if (shipping_options.length > 0) setSelectedMethod(shipping_options[0]);
    if (customers.length > 0) setSelectedCustomer(customers[0]);
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
          value={selectedMethod?.id ?? ""}
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

      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Customer and shipping details
      </Typography>

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
            customers.map((customer) => {
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
          Shipping addresses not found: <Link to="#">add an address</Link>
        </Typography>
      )}
    </SectionBox>
  );
}

interface IAddressCard {
  address: ShippingAddress;
  selected: ShippingAddress | null;
  setSelected: Dispatch<SetStateAction<ShippingAddress | null>>;
}

function AddressCard({ address, selected, setSelected }: IAddressCard) {
  const handleClick = () => {
    setSelected(address);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: "flex",
        p: 2,
        mb: 2,
        borderRadius: 1.5,
        "&:last-child": { mb: 0 },
        cursor: "pointer",
      }}
    >
      <Radio
        checked={selected?.id === address.id}
        name={address.id}
        value={address}
        sx={{ mr: 2 }}
      />
      <Box>
        <Typography variant="subtitle2">
          {address.first_name} {address.last_name}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 10, color: "#888" }}>
          {address.address_1}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 10, color: "#888" }}>
          {address.address_2}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 10, color: "#888" }}>
          {address.city}
        </Typography>
      </Box>
    </Card>
  );
}
