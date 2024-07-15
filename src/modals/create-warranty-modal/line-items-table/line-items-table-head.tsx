import { TableSortLabel } from "@mui/material";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// ----------------------------------------------------------------------

interface ILineItemsTableHead {
  headLabel: Array<{
    id: string;
    label: string;
    align?: TableCellProps["align"];
    width?: number;
    minWidth?: number;
  }>;
}

export default function LineItemsTableHead({ headLabel }: ILineItemsTableHead) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align || "left"}
            sx={{
              width: cell.width,
              minWidth: cell.minWidth,
              p: 0,
              px: 1,
            }}
          >
            <TableSortLabel hideSortIcon>{cell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
