import { Lot } from "@medusajs/types";
import { useState, SetStateAction } from "react";

import Box from "@mui/material/Box";
import { Divider, Popover, MenuItem, Typography } from "@mui/material";

import { useModal } from "src/modals/useModal";
import { useDeleteLot } from "src/mutations/use-delete-lot";

import Iconify from "src/components/iconify";
import SectionBox from "src/components/section-box";
import TitleValueField from "src/components/title-value-field";
import LotStatusLabel from "src/components/lot-status-label/LotStatusLabel";

interface ILotDetails {
  lot: Lot;
}

export default function LotDetails({ lot }: ILotDetails) {
  const { onOpen: openModal } = useModal("update-lot-status-modal");
  const [open, setOpen] = useState<Element | null>(null);
  const deleteLotMutation = useDeleteLot();
  const costAmount =
    (lot.cost?.amount ?? 0) +
    (lot.cost?.payment.fee.amount ?? 0) +
    (lot.courier?.cost.amount ?? 0);

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    openModal({ currentStatus: lot.status, lot_id: lot.id });
    handleCloseMenu();
  };

  const handleDelete = () => {
    deleteLotMutation({ lot_id: lot.id });
    handleCloseMenu();
  };

  return (
    <SectionBox sx={{ minWidth: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {lot.name}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontSize: 12, color: "#888" }}>
            {lot.description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LotStatusLabel
            onClick={handleOpenMenu}
            status={lot.status}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem sx={{ mt: 2, mb: 3 }} />
      <Box sx={{ display: "flex" }}>
        <TitleValueField
          title="Cost"
          value={`${costAmount} ${lot.cost?.currency}` ?? "N/A"}
        />
        <TitleValueField
          title="Courier"
          value={lot.courier?.company ?? "N/A"}
        />
        <TitleValueField
          title="Items"
          value={lot.items?.quantity.toString() ?? "N/A"}
        />
      </Box>
      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Update Status
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete Lot
        </MenuItem>
      </Popover>
    </SectionBox>
  );
}
