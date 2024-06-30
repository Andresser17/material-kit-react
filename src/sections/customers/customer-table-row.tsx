import { ChangeEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Stack, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { CustomerDTO } from "@medusajs/types";
import Iconify from "src/components/iconify";
import Label from "src/components/label";

// ----------------------------------------------------------------------

interface ICustomerTableRow {
  customer: CustomerDTO;
  selectedRow: boolean;
  handleClick: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function CustomerTableRow({
  customer,
  selectedRow,
  handleClick,
}: ICustomerTableRow) {
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
    navigate(`/customers/${customer.id}`);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selectedRow}>
        <TableCell padding="checkbox">
          <Checkbox
            disableRipple
            checked={selectedRow}
            onChange={handleClick}
          />
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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="column">
            <Typography
              sx={{ fontSize: 10, color: "#888" }}
              variant="subtitle2"
              noWrap
            >
              #{customer.id}
            </Typography>
            <Typography variant="subtitle2">{customer.email}</Typography>
          </Stack>
        </TableCell>

        <TableCell align="center">
          {customer.first_name} {customer.last_name}
        </TableCell>

        <TableCell>
          <Label color={(customer.has_account && "success") || "error"}>
            Account
          </Label>
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
          Edit
        </MenuItem>
      </Popover>
    </>
  );
}
