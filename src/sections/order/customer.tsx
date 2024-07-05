import { SetStateAction, useState } from "react";

import {
  Avatar,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Order } from "@medusajs/types";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

interface ICustomer {
  order: Order;
}

export default function Customer({ order }: ICustomer) {
  const [open, setOpen] = useState<Element | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
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
          sx={{ width: 36, height: 36, mr: 2 }}
        />
        <TitleValueField
          title={order.customer.email}
          value={order.region.name}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <TitleValueField title="Contact" value={order.customer.phone} />
        <TitleValueField
          title="Shipping"
          value={`${order.shipping_address?.city}, ${order.shipping_address?.country_code?.toUpperCase()}`}
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
          onClick={() => navigate(`/customers/${order.customer_id}`)}
          sx={{ fontSize: 12 }}
        >
          Go to Customer
        </MenuItem>
        {/* <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Transfer ownership
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Shipping Address
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Email Address
        </MenuItem> */}
      </Popover>
    </SectionBox>
  );
}
