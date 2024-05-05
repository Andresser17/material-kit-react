import { useState, MouseEvent } from "react";

import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Popover,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import { OrderStatus } from "src/enums";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

interface IOrderDetails {
  status: OrderStatus;
}

export default function OrderDetails({ status }: IOrderDetails) {
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
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            #26
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            12 April 2024 05:05 pm
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Label
            color={status === OrderStatus.COMPLETED ? "success" : "info"}
            sx={{ mr: 1 }}
          >
            {status}
          </Label>
          {status === OrderStatus.COMPLETED ? (
            <Button>Go to order</Button>
          ) : (
            <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
              <Iconify icon="bi-three-dots" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex" }}>
        <TitleValueField title="Email" value="user@example.com" />
        <TitleValueField title="Phone" value="N/A" />
        <TitleValueField title="Payment" value="Manual-payment" />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={handleCancelOrder}
          sx={{ color: "error.main", fontSize: 12 }}
        >
          Cancel Order
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
