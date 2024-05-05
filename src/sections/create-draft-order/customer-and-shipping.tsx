import { Dispatch, useState, SetStateAction } from "react";

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

import SectionBox from "src/components/section-box";

// ----------------------------------------------------------------------

export default function ShippingMethod() {
  const [method, setMethod] = useState("no-shipping");
  const [address, setAddress] = useState("");

  const handleChange = (e: { target: { value: string } }) => {
    setMethod(e.target.value);
  };

  return (
    <SectionBox
      sx={{
        width: "100%",
        mb: 3,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontSize: 16, mb: 3 }}>
        Shipping method (To {`{country}`})
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Choose a shipping method
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={method}
          label="Choose a shipping method"
          onChange={handleChange}
        >
          <MenuItem value="no-shipping">No shipping - 0 USD</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          value={method}
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
