import { Customer } from "@medusajs/types";
import { MouseEvent, useState } from "react";

import {
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";

interface IDetails {
  customer: Customer;
}

export default function Details({ customer }: IDetails) {
  const [open, setOpen] = useState<Element | null>(null);
  // const { mutate: deleteDraftOrderMutation } = useDeleteDraftOrder();

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCancelOrder = () => {
    // deleteDraftOrderMutation({ draft_order_id: custo.id });
  };

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {customer.first_name} {customer.last_name}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {customer.email}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
            <Iconify icon="bi-three-dots" />
          </IconButton>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex" }}>
        <TitleValueField
          title="First seen"
          value={customer.created_at.toLocaleString()}
        />
        <TitleValueField
          title="Phone"
          value={customer.phone?.toString() ?? "N/A"}
        />
        <TitleValueField title="Orders" value="0" />
        <TitleValueField
          title="User"
          value={customer.has_account ? "Registered" : "Guest"}
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
