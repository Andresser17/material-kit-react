import { Address } from "@medusajs/types";
import { Box, Card, Radio, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface IAddressCard {
  address: Address;
  selected: Address | null;
  setSelected: Dispatch<SetStateAction<Address | null>>;
}

export default function AddressCard({
  address,
  selected,
  setSelected,
}: IAddressCard) {
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
