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

import { useNavigate } from "react-router-dom";
import Iconify from "src/components/iconify";
import { formatToLocalTimeEs } from "src/utils/format-time";

// ----------------------------------------------------------------------

interface IWarrantiesTableRow {
  warranty: Warranty;
}

export default function OrdersTableRow({ warranty }: IWarrantiesTableRow) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<Element | null>(null);

  const handleOpenMenu = (event: {
    currentTarget: SetStateAction<Element | null>;
  }) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    navigate(`/orders/${warranty.id}`);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            {warranty.time} Days
          </Typography>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Avatar
            // alt={customer.thumbnail as string}
            // src={customer.thumbnail as string}
            variant="square"
            sx={{ width: 64, height: 64 }}
          />
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
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}
