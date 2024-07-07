import { DraftOrder } from "@medusajs/types";
import { SyntheticEvent, useState } from "react";

import {
  Avatar,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

interface ICustomer {
  draftOrder: DraftOrder;
}

export default function Customer({ draftOrder }: ICustomer) {
  const [open, setOpen] = useState<Element | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (e: SyntheticEvent) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancelOrder = () => {};

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Customer</Typography>
        <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
          <Iconify icon="bi-three-dots" />
        </IconButton>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          // alt={data.thumbnail as string}
          // src={data.thumbnail as string}
          src="string"
          variant="square"
          sx={{ width: 36, height: 36, mr: 1 }}
        />
        <TitleValueField
          title={draftOrder.cart.customer.email}
          value={`${draftOrder.cart?.shipping_address?.city}, ${draftOrder.cart?.shipping_address?.province}`}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <TitleValueField
          title="Contact"
          value={draftOrder?.cart.customer.email}
        />
        <TitleValueField
          title="Shipping"
          value={`${draftOrder.cart?.shipping_address?.city}, ${draftOrder.cart?.shipping_address?.province}`}
        />
        <TitleValueField
          title="Billing"
          value={`${draftOrder.cart?.shipping_address?.city}, ${draftOrder.cart?.shipping_address?.province}`}
        />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => navigate(`/customers/${draftOrder.cart.customer_id}`)}
          sx={{ fontSize: 12 }}
        >
          Go to Customer
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
