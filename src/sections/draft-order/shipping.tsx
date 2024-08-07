import { DraftOrder } from "@medusajs/types";
import { IconButton, MenuItem, Popover, useTheme } from "@mui/material";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import Iconify from "src/components/iconify";

import SectionBox from "src/components/section-box";
import { useModal } from "src/modals/useModal";

interface ShippingOptionData {
  first_name: string;
  last_name: string;
  phone: string;
  shipping_option_id: string;
  document: string;
  destination_agency: string;
  destination_city: string;
  destination_state: string;
}

interface IShipping {
  draftOrder: DraftOrder;
}

export default function Shipping({ draftOrder }: IShipping) {
  const theme = useTheme();
  const { onOpen: openModal } = useModal(
    "edit-draft-order-shipping-address-modal",
  );
  const [open, setOpen] = useState<Element | null>(null);
  const itemsLength = draftOrder?.cart.items.length;
  const shippingMethodData = draftOrder.cart.shipping_methods.map((method) => {
    const data: ShippingOptionData = method.data;

    return (
      <Box key={method.id}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          First Name: {data.first_name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Last Name: {data.last_name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Phone: {data.phone}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Document: {data.document}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination Agency: {data.destination_agency}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination City: {data.destination_city}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Destination State: {data.destination_state}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Shipping Option ID: {data.shipping_option_id}
        </Typography>
      </Box>
    );
  });

  const handleOpenMenu = (e: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Shipping</Typography>
        {!draftOrder.order_id && (
          <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
            <Iconify icon="bi-three-dots" />
          </IconButton>
        )}
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Typography variant="body2" sx={{ color: "#888" }}>
        Shipping Method
      </Typography>
      {draftOrder.cart.shipping_methods &&
        draftOrder.cart.shipping_methods.map((method) => {
          return (
            <Box key={method.id}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {method.shipping_option?.name}
                {method.shipping_option.data.id === "pickup_in_person" &&
                  " (Pickup in Person)"}
              </Typography>
            </Box>
          );
        })}
      <Box sx={{ display: "flex", mb: 2 }}>
        <Typography variant="subtitle2">Data</Typography>
        <Typography variant="subtitle2" sx={{ ml: 0.5, color: "#888" }}>
          ({itemsLength} {itemsLength > 1 ? "items" : "item"})
        </Typography>
      </Box>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <Iconify icon="ep:arrow-down-bold" sx={{ width: 16, height: 16 }} />
          }
          sx={{
            boxShadow: theme.shadows[1],
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Typography variant="body2" sx={{ color: "#888" }}>
            {`{...}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            boxShadow: theme.customShadows.card,
            borderColor: theme.palette.background.default,
          }}
        >
          {shippingMethodData}
        </AccordionDetails>
      </Accordion>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            openModal({
              draft_order: draftOrder,
              customer_id: draftOrder.cart.customer_id,
            });
            handleCloseMenu();
          }}
          sx={{ fontSize: 12 }}
        >
          Edit Shipping Address
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
