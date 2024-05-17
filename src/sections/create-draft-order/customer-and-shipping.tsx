import { ShippingOptionDTO } from "@medusajs/types";
import { Dispatch, useState, useEffect, SetStateAction } from "react";

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

import { useListShippingOptions } from "src/queries/use-list-shipping-options";

import SectionBox from "src/components/section-box";

// ----------------------------------------------------------------------

export default function ShippingMethod({
  regionId,
  regionName,
}: {
  regionId: string;
  regionName: string;
}) {
  const { shipping_options } = useListShippingOptions({
    query: { region_id: regionId, is_return: false },
  });
  const [selectedMethod, setSelectedMethod] =
    useState<ShippingOptionDTO | null>(null);
  const [address, setAddress] = useState("");

  const handleChange = (e: { target: { value: string } }) => {
    const found = shipping_options.find(
      (shipping_option) => shipping_option.id === e.target.value,
    );
    setSelectedMethod(found ?? null);
  };

  useEffect(() => {
    if (shipping_options.length > 0) setSelectedMethod(shipping_options[0]);
  }, [shipping_options]);

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
          onChange={handleChange}
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
          value={selectedMethod?.id ?? ""}
          label="Find existing customer"
          onChange={handleChange}
        >
          <MenuItem value="no-shipping">No shipping - 0 USD</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Choose existing addresses
      </Typography>
      <AddressCardGroup
        name="address"
        addresses={[
          {
            value: "address-1",
            customer: "Alejandro Jose Serrano Navarro",
            address: "Calle 26 Casa #9 Viento Colao, 6201 Maturin VE",
          },
          {
            value: "address-2",
            customer: "Alejandro Jose Serrano Navarro",
            address: "Calle 26 Casa #9 Viento Colao, 6201 Maturin VE",
          },
        ]}
        selected={address}
        setSelected={setAddress}
      />
    </SectionBox>
  );
}

interface IAddressCardGroup {
  name: string;
  addresses: { value: string; customer: string; address: string }[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

function AddressCardGroup({
  name,
  addresses,
  selected,
  setSelected,
}: IAddressCardGroup) {
  return addresses.map((address) => (
    <AddressCard
      key={address.value}
      name={name}
      value={address.value}
      customer={address.customer}
      address={address.address}
      checked={address.value === selected}
      setSelected={setSelected}
    />
  ));
}

interface IAddressCard {
  name: string;
  value: string;
  customer: string;
  address: string;
  checked: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}

function AddressCard({
  name,
  value,
  customer,
  address,
  checked,
  setSelected,
}: IAddressCard) {
  const handleClick = () => {
    setSelected(value);
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
      <Radio checked={checked} name={name} value={value} sx={{ mr: 2 }} />
      <Box>
        <Typography variant="subtitle2">{customer}</Typography>
        <Typography variant="subtitle2" sx={{ fontSize: 10, color: "#888" }}>
          {address}
        </Typography>
      </Box>
    </Card>
  );
}
