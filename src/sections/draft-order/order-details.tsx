import { useState, MouseEvent } from "react";
import { DraftOrderResponse } from "@medusajs/types";

import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Popover,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";

import { DraftOrderStatus } from "src/enums";

import Label from "src/components/label";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

interface IOrderDetails {
  data: DraftOrderResponse | null;
}

export default function OrderDetails({ data }: IOrderDetails) {
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancelOrder = () => {};

  if (!data) return <div>Loading!!!</div>;

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Order #{data?.display_id}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            12 April 2024 05:05 pm
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Label
            color={
              data.status === DraftOrderStatus.COMPLETED ? "success" : "info"
            }
            sx={{ mr: 1 }}
          >
            {data.status}
          </Label>
          {data.status === DraftOrderStatus.COMPLETED ? (
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
        <TitleValueField title="Email" value={data.cart.email ?? "N/A"} />
        <TitleValueField
          title="Phone"
          value={data.cart.customer.phone ?? "N/A"}
        />
        <TitleValueField title="Amount USD" value={`$${data?.cart.total}`} />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCancelOrder} sx={{ fontSize: 12 }}>
          Generate Order
        </MenuItem>
        <MenuItem
          onClick={handleCancelOrder}
          sx={{ color: "error.main", fontSize: 12 }}
        >
          Cancel Draft Order
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
