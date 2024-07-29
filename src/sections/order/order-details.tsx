import { MouseEvent, useRef, useState } from "react";

import {
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Order } from "@medusajs/types";
import { useReactToPrint } from "react-to-print";
import Iconify from "src/components/iconify";
import { Invoice } from "src/components/invoice";
import OrderStatusLabel from "src/components/order-status-label/order-status-label";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";
import { OrderStatus } from "src/enums";
import { useArchiveOrder } from "src/mutations/use-archive-order";
import { useCancelOrder } from "src/mutations/use-cancel-order";
import { useCompleteOrder } from "src/mutations/use-complete-order";
import { useListWarranties } from "src/queries/use-list-warranties";
import { formatToLocalTimeEs } from "src/utils/format-time";

interface IOrderDetails {
  order: Order;
}

export default function OrderDetails({ order }: IOrderDetails) {
  const [open, setOpen] = useState<Element | null>(null);
  const invoicePrintRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => invoicePrintRef.current,
  });
  const { mutate: completeOrderMutation } = useCompleteOrder();
  const { mutate: cancelOrderMutation } = useCancelOrder();
  const { mutate: archiveOrderMutation } = useArchiveOrder();
  const { data: warranties } = useListWarranties({
    query: { order_id: order.id },
  });

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handlePrintVoice = () => {
    handlePrint();
    handleCloseMenu();
  };

  const handleArchiveOrder = () => {
    archiveOrderMutation({ order_id: order.id });
    handleCloseMenu();
  };

  const handleCompleteOrder = () => {
    completeOrderMutation({ order_id: order.id });
    handleCloseMenu();
  };

  const handleCancelOrder = () => {
    cancelOrderMutation({ order_id: order.id });
    handleCloseMenu();
  };

  let options;
  switch (order.status) {
    case OrderStatus.PENDING:
      options = (
        <>
          <MenuItem
            onClick={handleCompleteOrder}
            sx={{ color: "success.main", fontSize: 12 }}
          >
            Complete Order
          </MenuItem>
          <MenuItem
            onClick={handleCancelOrder}
            sx={{ color: "error.main", fontSize: 12 }}
          >
            Cancel Order
          </MenuItem>
        </>
      );
      break;
    case OrderStatus.COMPLETED:
      options = (
        <>
          <MenuItem onClick={handleArchiveOrder} sx={{ fontSize: 12 }}>
            Archive Order
          </MenuItem>
          <MenuItem
            onClick={handleCancelOrder}
            sx={{ color: "error.main", fontSize: 12 }}
          >
            Cancel Order
          </MenuItem>
        </>
      );
      break;
  }

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "none" }}>
        <Invoice
          ref={invoicePrintRef}
          order={order}
          warranties={warranties ?? []}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            #{order.display_id}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {formatToLocalTimeEs(order.created_at)}
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
        <MenuItem onClick={handlePrintVoice} sx={{ fontSize: 12 }}>
          Print Invoice
        </MenuItem>
        {options}
      </Popover>
    </SectionBox>
  );
}
