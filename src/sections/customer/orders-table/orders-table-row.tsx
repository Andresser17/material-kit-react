import { Order } from "@medusajs/types";
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
import Label from "src/components/label";
import { FulfillmentStatus, PaymentStatus } from "src/enums";

// ----------------------------------------------------------------------

interface IOrdersTableRow {
  order: Order;
}

export default function OrdersTableRow({ order }: IOrdersTableRow) {
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
    navigate(`/orders/${order.id}`);
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
            #{order.display_id}
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

        <TableCell align="center">{order.created_at}</TableCell>

        <TableCell>
          <Label
            color={
              (order.fulfillment_status === FulfillmentStatus.FULFILLED &&
                "success") ||
              "info"
            }
          >
            {order.fulfillment_status}
          </Label>
        </TableCell>

        <TableCell>
          <Label
            color={
              (order.payment_status === PaymentStatus.CAPTURED && "success") ||
              "info"
            }
          >
            {order.payment_status}
          </Label>
        </TableCell>

        <TableCell>
          <Typography
            sx={{ fontSize: 10, color: "#888" }}
            variant="subtitle2"
            noWrap
          >
            N/A
          </Typography>
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
