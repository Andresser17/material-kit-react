import { DraftOrderResponse } from "@medusajs/types";
import { MouseEvent, useState } from "react";

import {
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { DraftOrderStatus } from "src/enums";

import Iconify from "src/components/iconify";
import Label from "src/components/label";
import Link from "src/components/link";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";
import { useDeleteDraftOrder } from "src/mutations/use-delete-draft-order";
import { PaymentAmounts } from "./view/draft-order-view";

interface IOrderDetails {
  data: DraftOrderResponse;
  paymentAmounts: PaymentAmounts;
}

export default function OrderDetails({ data, paymentAmounts }: IOrderDetails) {
  const [open, setOpen] = useState<Element | null>(null);
  const { mutate: deleteDraftOrderMutation } = useDeleteDraftOrder();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancelOrder = () => {
    deleteDraftOrderMutation({ draft_order_id: data.id });
  };

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Order #{data?.display_id}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {data?.created_at}
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
            <Link to={`/orders/${data?.order_id}`}>Go to order</Link>
          ) : (
            <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
              <Iconify icon="bi-three-dots" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex" }}>
        <TitleValueField title="Email" value={data.cart?.email ?? "N/A"} />
        <TitleValueField
          title="Phone"
          value={data.cart?.customer?.phone ?? "N/A"}
        />
        <TitleValueField
          title="Amount USD"
          value={`$${paymentAmounts.total}`}
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
          onClick={handleCancelOrder}
          sx={{ color: "error.main", fontSize: 12 }}
        >
          Cancel Draft Order
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
