import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// ----------------------------------------------------------------------

interface IItemsTableRowTotal {
  totalAmount: string;
}

export default function ItemsTableRowTotal({
  totalAmount,
}: IItemsTableRowTotal) {
  return (
    <TableRow>
      <TableCell
        sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "none" }}
      ></TableCell>
      <TableCell
        sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "none" }}
      ></TableCell>

      <TableCell
        sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "none" }}
      >
        <Typography
          variant="body1"
          sx={{ fontSize: "12px", fontWeight: "bold" }}
        >
          Total
        </Typography>
      </TableCell>

      <TableCell
        sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "none" }}
      >
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {totalAmount}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
