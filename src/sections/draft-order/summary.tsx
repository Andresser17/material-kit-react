import { DraftOrder, LineItem } from "@medusajs/types";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";

import { SetStateAction, useEffect, useState } from "react";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import SummaryField from "src/components/summary-field";
import { IAddLineItemModal } from "src/modals/add-line-item-modal";
import { useModal } from "src/modals/useModal";
import { formatCurrency } from "src/utils/format-number";

interface ISummary {
  draftOrder: DraftOrder;
}

export default function Summary({ draftOrder: draftOrder }: ISummary) {
  const [open, setOpen] = useState<Element | null>(null);
  const { onOpen: openModal, onUpdate: updateModal } =
    useModal<IAddLineItemModal>("add-line-item-modal");

  const handleOpenMenu = (e: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCreateLineItems = () => {
    openModal({
      draft_order_id: draftOrder.id,
      line_items: draftOrder.cart.items,
    });
    handleCloseMenu();
  };

  useEffect(() => {
    if (draftOrder.cart.items) {
      updateModal({
        draft_order_id: draftOrder.id,
        line_items: draftOrder.cart.items,
      });
    }
  }, [draftOrder]);

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Summary</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
            <Iconify icon="bi-three-dots" />
          </IconButton>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {draftOrder &&
        draftOrder.cart.items.map((item: LineItem) => (
          <CartItemSummary key={item.id} data={item} />
        ))}
      <SummaryField
        title="Subtotal"
        value={`${formatCurrency(draftOrder.cart.subtotal)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Shipping"
        value={`${formatCurrency(draftOrder.cart.shipping_total)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Tax"
        value={`${formatCurrency(draftOrder.cart.tax_total ?? 0)} USD`}
        sx={{ color: "#888", fontSize: 14 }}
      />
      <SummaryField
        title="Total to pay"
        value={`${formatCurrency(draftOrder.cart.total)} USD`}
        bold
      />
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCreateLineItems} sx={{ fontSize: 12 }}>
          Edit Line Items
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}

interface ICartItemSummary {
  data: LineItem;
}

function CartItemSummary({ data }: ICartItemSummary) {
  const [amounts, setAmounts] = useState<{
    [x: string]: string;
    unit_price: string;
    total: string;
  }>({ unit_price: "", total: "" });

  useEffect(() => {
    if (data) {
      setAmounts((prev) => {
        const newState = { ...prev };
        Object.keys(amounts).forEach((key) => {
          let amountArr = data[key].toString().split("");
          amountArr = amountArr.slice(0, amountArr.length - 2).join("");
          if (amountArr.length === 0) amountArr = ["0"];
          const amount = `${amountArr}.00`;
          newState[key] = amount;
        });

        return newState;
      });
    }
  }, [data]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          alt={data.title}
          src={data.thumbnail as string}
          variant="square"
          sx={{ width: 24, height: 24, mr: 2 }}
        />
        <Typography sx={{ fontSize: 12 }} variant="subtitle2" noWrap>
          {data.title}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: 12, color: "#888", mr: 2 }}
          variant="subtitle2"
          noWrap
        >
          ${amounts.unit_price} x{data.quantity}
        </Typography>
        <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
          ${amounts.total}
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          USD
        </Typography>
      </Box>
    </Box>
  );
}
