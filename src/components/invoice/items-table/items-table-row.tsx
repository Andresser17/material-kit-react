import { LineItem } from "@medusajs/types";
import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { formatCurrency } from "src/utils/format-number";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  item: LineItem;
}

export default function ItemsTableRow({ item }: IItemsTableRow) {
  return (
    <TableRow>
      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.title}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.quantity}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {formatCurrency(item.unit_price)}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {formatCurrency(item.subtotal ?? 0)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
