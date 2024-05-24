import { OrderDTO } from "@medusajs/types";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { PaymentStatus } from "src/enums";

import Label from "src/components/label";

// ----------------------------------------------------------------------

interface IOrderTableRow {
  order: OrderDTO;
  selectedRow: boolean;
}

export default function OrderTableRow({ order, selectedRow }: IOrderTableRow) {
  const navigate = useNavigate();

  const amount = order.payments
    .reduce((prev, { amount }: { amount: number }) => prev + amount, 0)
    .toString()
    .split("");

  return (
    <TableRow
      hover
      onClick={() => navigate(`/orders/${order.id}`)}
      tabIndex={-1}
      role="checkbox"
      selected={selectedRow}
      sx={{ textDecoration: "none", cursor: "pointer" }}
    >
      <TableCell sx={{ pl: 2 }} component="th" scope="row" padding="none">
        <Typography
          sx={{ fontSize: 10, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          {/* #{order.id.split("").slice(5)} */}#{order.display_id}
        </Typography>
      </TableCell>

      <TableCell align="center">{order.created_at?.toString()}</TableCell>

      <TableCell align="center">{order.email}</TableCell>

      <TableCell>{order.fulfillment_status}</TableCell>

      <TableCell>
        <Label
          color={
            (order.payment_status === PaymentStatus.CAPTURED && "success") ||
            "error"
          }
        >
          {order.payment_status}
        </Label>
      </TableCell>

      <TableCell>{order.sales_channel.name}</TableCell>

      <TableCell>{`${amount.slice(0, amount.length - 2).join("")} ${order.currency_code.toUpperCase()}`}</TableCell>
    </TableRow>
  );
}
