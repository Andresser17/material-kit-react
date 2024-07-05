import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

// ----------------------------------------------------------------------

export enum TableOrder {
  // eslint-disable-next-line no-unused-vars
  ASC = "asc",
  // eslint-disable-next-line no-unused-vars
  DESC = "desc",
}

interface IProductTableHead {
  headLabel: Array<{
    id: string;
    label: string;
    align?: TableCellProps["align"];
    width?: number;
    minWidth?: number;
  }>;
}

export default function ItemsTableHead({ headLabel }: IProductTableHead) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((cell) => (
          <TableCell
            key={cell.id}
            align={cell.align || "left"}
            sx={{ width: cell.width, minWidth: cell.minWidth }}
          >
            <TableSortLabel hideSortIcon>{cell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
