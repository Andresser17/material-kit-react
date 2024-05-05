import { useState } from "react";

import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Popover,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

export default function Customer() {
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
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
          sx={{ width: 36, height: 36, mr: 2 }}
        />
        <TitleValueField title="user@example.com" value=", Venezuela" />
      </Box>
      <Box sx={{ display: "flex" }}>
        <TitleValueField title="Contact" value="user@example.com" />
        <TitleValueField title="Shipping" value=", VE" />
        <TitleValueField title="Billing" value="N/A" />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Shipping Address
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Edit Billing Address
        </MenuItem>
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Go to Customer
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
