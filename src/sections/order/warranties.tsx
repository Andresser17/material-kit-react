import { Order } from "@medusajs/types";

import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";

import { SetStateAction, useState } from "react";
import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import { ICreateWarrantyModal } from "src/modals/create-warranty-modal";
import { useModal } from "src/modals/useModal";
import { useListWarranties } from "src/queries/use-list-warranties";
import WarrantiesTable from "./warranties-table/warranties-table";

interface IWarranties {
  order: Order;
}

export default function Warranties({ order }: IWarranties) {
  const [open, setOpen] = useState<Element | null>(null);
  const { onOpen: openModal } = useModal<ICreateWarrantyModal>(
    "create-warranty-modal",
  );
  const { data: warranties } = useListWarranties({});

  const handleOpenMenu = (e: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleCreateWarranty = () => {
    openModal({ order });
    handleCloseMenu();
  };

  // useEffect(() => {
  //   if (order && order.items) {
  //     updateModal({ draft_order_id: order.id, line_items: order.items });
  //   }
  // }, [order]);

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Warranties</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleOpenMenu} sx={{ borderRadius: "5px" }}>
            <Iconify icon="bi-three-dots" />
          </IconButton>
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ my: 2 }} />
      {warranties && <WarrantiesTable warranties={warranties} />}
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleCreateWarranty} sx={{ fontSize: 12 }}>
          Create New Warranty
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
