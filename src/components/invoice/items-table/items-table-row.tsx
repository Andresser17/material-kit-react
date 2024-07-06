import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// ----------------------------------------------------------------------

interface IItemsTableRow {
  item: {
    id: string;
    concepto: string;
    cantidad: number;
    precioUnitario: string;
    subtotal: string;
  };
}

export default function ItemsTableRow({ item }: IItemsTableRow) {
  return (
    <TableRow>
      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.concepto}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.cantidad}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.precioUnitario}
        </Typography>
      </TableCell>

      <TableCell sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Typography variant="body1" sx={{ fontSize: "12px" }}>
          {item.subtotal}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
