import { MouseEvent, useState } from "react";

import {
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { OrderStatus } from "src/enums";

import { Order } from "@medusajs/types";
import Iconify from "src/components/iconify";
import OrderStatusLabel from "src/components/order-status-label/order-status-label";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";
import { useCompleteOrder } from "src/mutations/use-complete-order";

interface IOrderDetails {
  order: Order;
  status: OrderStatus;
}

export default function OrderDetails({ order, status }: IOrderDetails) {
  const [open, setOpen] = useState<Element | null>(null);
  const { mutate: completeOrder } = useCompleteOrder();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCompleteOrder = () => {
    completeOrder({ order_id: order.id });
    handleCloseMenu();
  };

  const handleCancelOrder = () => {
    handleCloseMenu();
  };

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            #{order.display_id}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {order.created_at}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <OrderStatusLabel status={order.status} />
          <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
            <Iconify icon="bi-three-dots" />
          </IconButton>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <TitleValueField title="Email" value={order.email ?? "N/A"} />
        <TitleValueField title="Phone" value={order.customer.phone ?? "N/A"} />
        <TitleValueField
          title="Payment"
          value={order.payments[0].provider_id ?? "N/A"}
        />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCompleteOrder} sx={{ fontSize: 12 }}>
          Complete Order
        </MenuItem>
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

function LabelStatus() {}
