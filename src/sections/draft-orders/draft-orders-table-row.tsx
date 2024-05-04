import { DraftOrder } from "@medusajs/types";
import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { DraftOrderStatus } from "src/enums";

import Label from "src/components/label";

// ----------------------------------------------------------------------

interface IDraftOrdersTableRow {
  data: DraftOrder;
}

export default function DraftOrdersTableRow({ data }: IDraftOrdersTableRow) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/draft-orders/${data.id}`);
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      onClick={handleEdit}
      sx={{ cursor: "pointer" }}
    >
      <TableCell sx={{ pl: 2 }} component="th" scope="row" padding="none">
        <Typography
          sx={{ fontSize: 10, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          #{data.id.split("").slice(7)}
        </Typography>
      </TableCell>

      <TableCell sx={{ pl: 2 }} component="th" scope="row" padding="none">
        <Typography
          sx={{ fontSize: 10, color: "#888" }}
          variant="subtitle2"
          noWrap
        >
          {data.order_id
            ? `#${data.order_id.split("").slice(6).join("")}`
            : "-"}
        </Typography>
      </TableCell>

      <TableCell>{data.created_at}</TableCell>

      <TableCell>{data.cart.email}</TableCell>

      <TableCell>
        <Label
          color={data.status === DraftOrderStatus.OPEN ? "info" : "success"}
        >
          {data.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
