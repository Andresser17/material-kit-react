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
      <TableCell>
        <Typography variant="body1">{item.concepto}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1">{item.cantidad}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1">{item.precioUnitario}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1">{item.subtotal}</Typography>
      </TableCell>
    </TableRow>
  );
}
