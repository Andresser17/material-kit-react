import { DraftOrder, LineItem } from "@medusajs/types";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";

import { SetStateAction, useEffect, useState } from "react";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import Sentence from "src/components/sentence";
import SummaryField from "src/components/summary-field";
import { IAddLineItemModal } from "src/modals/add-line-item-modal";
import { useModal } from "src/modals/useModal";
import { useDeleteLineItem } from "src/mutations/use-delete-line-item";
import { useUpdateLineItem } from "src/mutations/use-update-line-item";
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
          <CartItemSummary
            key={item.id}
            draftOrderId={draftOrder.id}
            data={item}
          />
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
  draftOrderId: string;
  data: LineItem;
}

function CartItemSummary({ draftOrderId, data }: ICartItemSummary) {
  const theme = useTheme();
  const [title, setTitle] = useState("");

  const { mutate: updateLineItemMutation } = useUpdateLineItem();

  const { mutate: deleteLineItemMutation } = useDeleteLineItem();

  const handleUpdate = () => {
    if (title === data.title) return;

    updateLineItemMutation({
      draft_order_id: draftOrderId,
      line_item_id: data.id,
      update_line_item: {
        title,
        unit_price: data.unit_price,
        quantity: data.quantity,
      },
    });
  };

  const handleDelete = () => {
    deleteLineItemMutation({
      draft_order_id: draftOrderId,
      line_item_id: data.id,
    });
  };

  useEffect(() => {
    if (data.title) setTitle(data.title);
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          alt={data.title}
          src={data.thumbnail as string}
          variant="square"
          sx={{ width: 24, height: 24, mr: 2 }}
        />
        <Sentence
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onBlur={() => handleUpdate()}
        />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          sx={{ fontSize: 12, color: "#888", mr: 2 }}
          variant="subtitle2"
          noWrap
        >
          {formatCurrency(data.unit_price)} x{data.quantity}
        </Typography>
        <Typography sx={{ fontSize: 12, mr: 0.8 }} variant="subtitle2" noWrap>
          {data.total && formatCurrency(data.total)}
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          USD
        </Typography>
      </Box>
      <IconButton
        onClick={handleDelete}
        sx={{
          p: "5px",
          borderRadius: "5px",
        }}
      >
        <Iconify
          icon="mdi:trash-outline"
          sx={{
            color: theme.palette.error.main,
          }}
        />
      </IconButton>
    </Box>
  );
}
