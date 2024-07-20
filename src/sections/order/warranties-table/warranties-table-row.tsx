import { Warranty } from "@medusajs/types";
import { SetStateAction, useState } from "react";

import {
  Avatar,
  IconButton,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Iconify from "src/components/iconify";
import { IAddWarrantyPhotosModal } from "src/modals/add-warranty-photos-modal";
import { useModal } from "src/modals/useModal";
import { useDeleteWarranty } from "src/mutations/use-delete-warranty";
import { formatToLocalTimeEs } from "src/utils/format-time";

// ----------------------------------------------------------------------

interface IWarrantiesTableRow {
  warranty: Warranty;
}

export default function OrdersTableRow({ warranty }: IWarrantiesTableRow) {
  const [open, setOpen] = useState<Element | null>(null);
  const { onOpen: openModal } = useModal<IAddWarrantyPhotosModal>(
    "add-warranty-photos-modal",
  );
  const { mutate: deleteWarrantyMutation } = useDeleteWarranty();

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAddPhotos = () => {
    openModal({ warranty });
    handleCloseMenu();
  };

  const handleDelete = () => {
    deleteWarrantyMutation({ warranty_id: warranty.id });
    handleCloseMenu();
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <Avatar
            alt={warranty.line_item.title}
            src={warranty.line_item.thumbnail as string}
            variant="square"
            sx={{ width: 64, height: 64 }}
          />
        </TableCell>

        <TableCell>
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            {warranty.line_item.title}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            {warranty.time} Days
          </Typography>
        </TableCell>

        <TableCell align="center">
          {formatToLocalTimeEs(warranty.expiration_date)}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={open != null}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem onClick={handleAddPhotos}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Add Photos
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Remove
        </MenuItem>
      </Popover>
    </>
  );
}
