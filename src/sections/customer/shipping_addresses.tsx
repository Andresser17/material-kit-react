import { Address } from "@medusajs/types";
import { Box, Button, Typography } from "@mui/material";
import AddressCard from "src/components/controlled-card";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import { IAddShippingAddressModal } from "src/modals/add-shipping-address-modal";
import { useModal } from "src/modals/useModal";

interface IShippingAddresses {
  customer_id: string;
  addresses: Address[];
}

export default function ShippingAddresses({
  customer_id,
  addresses,
}: IShippingAddresses) {
  const { onOpen: openModal } = useModal<IAddShippingAddressModal>(
    "add-shipping-address-modal",
  );

  return (
    <SectionBox>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6">
          Shipping Addresses ({addresses.length})
        </Typography>
        <Button
          onClick={() => openModal({ customer_id })}
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ fontSize: "10px" }}
        >
          New Address
        </Button>
      </Box>

      {addresses &&
        addresses.length > 0 &&
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            selected={null}
            disabled
            setSelected={() => {}}
          />
        ))}
    </SectionBox>
  );
}
